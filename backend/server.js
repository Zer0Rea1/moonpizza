import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
const app = express();
dotenv.config()
const PORT = process.env.PORT;
// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.use(cors({
    origin: process.env.ORIGIN,  // Only allow frontend
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

// Format order for Telegram message
function formatOrderMessage(order, orderId) {
    const { customer, items, subtotal, tax, total } = order;

    let message = `🍕 *NEW ORDER*\n`;
    message += `━━━━━━━━━━━━━━━\n\n`;

    // Customer info
    message += `🆔 *Order ID:* ${orderId}\n`;
    message += `👤 *Customer:* ${customer.firstName} ${customer.lastName}\n`;
    message += `📧 *Email:* ${customer.email}\n`;
    message += `📱 *Phone:* ${customer.phone}\n\n`;

    // Delivery address
    message += `📍 *Delivery Address:*\n`;
    message += `${customer.address}\n`;
    message += `${customer.city}, ${customer.state} ${customer.zipCode}\n\n`;

    // Order items
    message += `🛒 *Order Items:*\n`;
    items.forEach((item, index) => {
        message += `${index + 1}. ${item.name} x${item.quantity} - PKR ${(item.price * item.quantity).toFixed(0)}\n`;
    });

    message += `\n━━━━━━━━━━━━━━━\n`;
    message += `💵 Subtotal: PKR ${subtotal.toFixed(0)}\n`;
    message += `💰 *Total: PKR ${total.toFixed(0)}*\n`;
    message += `━━━━━━━━━━━━━━━\n\n`;
    message += `⏰ ${new Date().toLocaleString()}`;

    return message;
}

// Send message to Telegram
async function sendTelegramMessage(message) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.error('Telegram credentials not configured');
        return { success: false, error: 'Telegram not configured' };
    }

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        const data = await response.json();

        if (!data.ok) {
            console.error('Telegram API error:', data);
            return { success: false, error: data.description };
        }

        return { success: true };
    } catch (error) {
        console.error('Failed to send Telegram message:', error);
        return { success: false, error: error.message };
    }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', telegram_configured: !!(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) });
});

// Order submission endpoint
app.post('/api/orders', async (req, res) => {
    try {
        const order = req.body;

        // Validate required fields
        if (!order.customer || !order.items || order.items.length === 0) {
            return res.status(400).json({ error: 'Invalid order data' });
        }

        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        // Format and send to Telegram
        const message = formatOrderMessage(order, orderId);
        const telegramResult = await sendTelegramMessage(message);

        if (!telegramResult.success) {
            console.warn('Telegram notification failed:', telegramResult.error);
            console.log(message)
            // Still accept the order even if Telegram fails
        }

        // Generate order ID

        res.json({
            success: true,
            orderId,
            telegramNotified: telegramResult.success
        });

    } catch (error) {
        console.error('Order submission error:', error);
        res.status(500).json({ error: 'Failed to process order' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Telegram configured: ${!!(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID)}`);
});
