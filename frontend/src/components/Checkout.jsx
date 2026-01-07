import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    ArrowLeft,
    ArrowRight,
    User,
    MapPin,
    Check,
    Loader2,
    Truck,
} from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const steps = [
    { id: 1, name: 'Contact', icon: User },
    { id: 2, name: 'Address', icon: MapPin },
];

const API_URL = import.meta.env.VITE_API_URL;

const Checkout = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [confetti, setConfetti] = useState([]);
    const [orderId, setOrderId] = useState('');
    const [orderError, setOrderError] = useState('');

    const { items, getSubtotal, getTax, getTotal, clearCart } = useCartStore();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        notes: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const nextStep = () => {
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        setIsProcessing(true);
        setOrderError('');

        try {
            const orderData = {
                customer: formData,
                items: items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
                subtotal: getSubtotal(),
                tax: getTax(),
                total: getTotal(),
            };

            const response = await fetch(`${API_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to place order');
            }

            setOrderId(result.orderId);
            setIsComplete(true);

            const newConfetti = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                color: ['#ff6b35', '#39ff14', '#ffd93d', '#ff6b9d'][Math.floor(Math.random() * 4)],
                delay: Math.random() * 0.5,
            }));
            setConfetti(newConfetti);

            setTimeout(() => {
                clearCart();
            }, 1000);

        } catch (error) {
            console.error('Order submission failed:', error);
            setOrderError(error.message || 'Failed to place order. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleClose = () => {
        setCurrentStep(1);
        setIsComplete(false);
        setConfetti([]);
        setOrderId('');
        setOrderError('');
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            setCurrentStep(1);
            setIsComplete(false);
            setConfetti([]);
            setOrderId('');
            setOrderError('');
        }
    }, [isOpen]);

    const inputStyle = {
        width: '100%',
        padding: '18px 20px',
        backgroundColor: '#1a1a1a',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '14px',
        color: 'white',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    };

    const labelStyle = {
        display: 'block',
        fontSize: '14px',
        fontWeight: '500',
        color: '#9ca3af',
        marginBottom: '10px',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.85)',
                            backdropFilter: 'blur(12px)',
                            zIndex: 50,
                        }}
                    />

                    {/* Modal Wrapper for centering */}
                    <div
                        style={{
                            position: 'fixed',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 51,
                            padding: '20px',
                            pointerEvents: 'none',
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{
                                width: '100%',
                                maxWidth: '600px',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                backgroundColor: '#0f0f0f',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '28px',
                                pointerEvents: 'auto',
                            }}
                        >
                            {/* Confetti */}
                            {confetti.map((c) => (
                                <motion.div
                                    key={c.id}
                                    initial={{ y: -20, x: `${c.x}%`, opacity: 1 }}
                                    animate={{ y: '100vh', opacity: 0, rotate: 720 }}
                                    transition={{ duration: 3, delay: c.delay, ease: 'linear' }}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: `${c.x}%`,
                                        width: '10px',
                                        height: '10px',
                                        backgroundColor: c.color,
                                        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                                        pointerEvents: 'none',
                                    }}
                                />
                            ))}

                            {/* Header */}
                            <div
                                style={{
                                    position: 'sticky',
                                    top: 0,
                                    backgroundColor: '#0f0f0f',
                                    padding: '20px 20px',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                    zIndex: 10,
                                    borderRadius: '28px 28px 0 0',
                                }}
                                className="sm:px-8 sm:py-7"
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: isComplete ? '0' : '32px',
                                    }}
                                >
                                    <h2
                                        style={{
                                            fontFamily: "'Playfair Display', serif",
                                            fontSize: '28px',
                                            fontWeight: '700',
                                            color: 'white',
                                        }}
                                    >
                                        {isComplete ? 'Order Confirmed! 🎉' : 'Checkout'}
                                    </h2>
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={handleClose}
                                        style={{
                                            width: '44px',
                                            height: '44px',
                                            backgroundColor: '#1a1a1a',
                                            borderRadius: '9999px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <X style={{ width: '20px', height: '20px', color: 'white' }} />
                                    </motion.button>
                                </div>

                                {/* Progress Steps */}
                                {!isComplete && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '12px',
                                        }}
                                    >
                                        {steps.map((step, index) => {
                                            const StepIcon = step.icon;
                                            const isActive = currentStep === step.id;
                                            const isCompleted = currentStep > step.id;

                                            return (
                                                <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
                                                    <motion.div
                                                        animate={{ scale: isActive ? 1.1 : 1 }}
                                                        style={{
                                                            width: '48px',
                                                            height: '48px',
                                                            borderRadius: '9999px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            backgroundColor: isCompleted
                                                                ? '#39ff14'
                                                                : isActive
                                                                    ? '#ff6b35'
                                                                    : '#1a1a1a',
                                                            boxShadow: isActive ? '0 0 0 4px rgba(255, 107, 53, 0.3)' : 'none',
                                                        }}
                                                        className="sm:w-14 sm:h-14"
                                                    >
                                                        {isCompleted ? (
                                                            <Check style={{ width: '22px', height: '22px', color: 'black' }} />
                                                        ) : (
                                                            <StepIcon
                                                                style={{
                                                                    width: '22px',
                                                                    height: '22px',
                                                                    color: isActive ? 'white' : '#6b7280',
                                                                }}
                                                            />
                                                        )}
                                                    </motion.div>
                                                    <span
                                                        style={{
                                                            marginLeft: '10px',
                                                            fontWeight: '600',
                                                            fontSize: '14px',
                                                            color: isActive ? 'white' : '#6b7280',
                                                            display: 'none',
                                                        }}
                                                        className="sm:block"
                                                    >
                                                        {step.name}
                                                    </span>
                                                    {index < steps.length - 1 && (
                                                        <div
                                                            style={{
                                                                width: '40px',
                                                                height: '2px',
                                                                marginLeft: '12px',
                                                                backgroundColor: isCompleted ? '#39ff14' : '#1a1a1a',
                                                                borderRadius: '2px',
                                                            }}
                                                            className="sm:w-16 sm:ml-4"
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div style={{ padding: '20px' }} className="sm:p-8">
                                <AnimatePresence mode="wait">
                                    {isComplete ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            style={{ textAlign: 'center', padding: '40px 0' }}
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: 'spring', delay: 0.2 }}
                                                style={{
                                                    width: '100px',
                                                    height: '100px',
                                                    backgroundColor: 'rgba(57, 255, 20, 0.15)',
                                                    borderRadius: '9999px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    margin: '0 auto 32px',
                                                }}
                                            >
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: 'spring', delay: 0.4 }}
                                                    style={{
                                                        width: '72px',
                                                        height: '72px',
                                                        backgroundColor: '#39ff14',
                                                        borderRadius: '9999px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Check
                                                        style={{ width: '36px', height: '36px', color: 'black' }}
                                                        strokeWidth={3}
                                                    />
                                                </motion.div>
                                            </motion.div>

                                            <motion.h3
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                style={{
                                                    fontFamily: "'Playfair Display', serif",
                                                    fontSize: '32px',
                                                    fontWeight: '700',
                                                    color: 'white',
                                                    marginBottom: '16px',
                                                }}
                                            >
                                                Thank You!
                                            </motion.h3>
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.6 }}
                                                style={{
                                                    color: '#9ca3af',
                                                    maxWidth: '360px',
                                                    margin: '0 auto 32px',
                                                    fontSize: '16px',
                                                    lineHeight: '1.7',
                                                }}
                                            >
                                                Your order has been placed successfully. Our delivery partner will contact
                                                you shortly.
                                            </motion.p>

                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.7 }}
                                                style={{
                                                    padding: '24px',
                                                    backgroundColor: '#1a1a1a',
                                                    borderRadius: '20px',
                                                    display: 'inline-block',
                                                    marginBottom: '24px',
                                                }}
                                            >
                                                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>
                                                    Order Number
                                                </p>
                                                <p
                                                    style={{
                                                        color: 'white',
                                                        fontFamily: 'monospace',
                                                        fontSize: '24px',
                                                        fontWeight: '700',
                                                    }}
                                                >
                                                    {orderId}
                                                </p>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.75 }}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '12px',
                                                    padding: '16px 24px',
                                                    backgroundColor: 'rgba(57, 255, 20, 0.1)',
                                                    borderRadius: '12px',
                                                    marginBottom: '32px',
                                                }}
                                            >
                                                <Truck style={{ width: '24px', height: '24px', color: '#39ff14' }} />
                                                <span style={{ color: '#39ff14', fontWeight: '600', fontSize: '15px' }}>
                                                    Cash on Delivery
                                                </span>
                                            </motion.div>

                                            <motion.button
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.8 }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleClose}
                                                className="btn-primary"
                                                style={{ padding: '18px 40px', fontSize: '16px' }}
                                            >
                                                Continue Shopping
                                            </motion.button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key={currentStep}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {currentStep === 1 && (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                                    <div
                                                        style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: '1fr',
                                                            gap: '16px',
                                                        }}
                                                        className="sm:grid-cols-2"
                                                    >
                                                        <div>
                                                            <label style={labelStyle}>First Name</label>
                                                            <input
                                                                type="text"
                                                                name="firstName"
                                                                value={formData.firstName}
                                                                onChange={handleInputChange}
                                                                placeholder="John"
                                                                style={inputStyle}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label style={labelStyle}>Last Name</label>
                                                            <input
                                                                type="text"
                                                                name="lastName"
                                                                value={formData.lastName}
                                                                onChange={handleInputChange}
                                                                placeholder="Doe"
                                                                style={inputStyle}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label style={labelStyle}>Email Address</label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleInputChange}
                                                            placeholder="john@example.com"
                                                            style={inputStyle}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label style={labelStyle}>Phone Number</label>
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            value={formData.phone}
                                                            onChange={handleInputChange}
                                                            placeholder="+1 (555) 123-4567"
                                                            style={inputStyle}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {currentStep === 2 && (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                                    <div>
                                                        <label style={labelStyle}>Street Address</label>
                                                        <input
                                                            type="text"
                                                            name="address"
                                                            value={formData.address}
                                                            onChange={handleInputChange}
                                                            placeholder="123 Main Street, Apt 4"
                                                            style={inputStyle}
                                                        />
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: '1fr',
                                                            gap: '16px',
                                                        }}
                                                        className="sm:grid-cols-2"
                                                    >
                                                        <div>
                                                            <label style={labelStyle}>City</label>
                                                            <input
                                                                type="text"
                                                                name="city"
                                                                value={formData.city}
                                                                onChange={handleInputChange}
                                                                placeholder="New York"
                                                                style={inputStyle}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label style={labelStyle}>State</label>
                                                            <input
                                                                type="text"
                                                                name="state"
                                                                value={formData.state}
                                                                onChange={handleInputChange}
                                                                placeholder="NY"
                                                                style={inputStyle}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label style={labelStyle}>ZIP Code</label>
                                                        <input
                                                            type="text"
                                                            name="zipCode"
                                                            value={formData.zipCode}
                                                            onChange={handleInputChange}
                                                            placeholder="10001"
                                                            style={inputStyle}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label style={labelStyle}>Delivery Notes (Optional)</label>
                                                        <textarea
                                                            name="notes"
                                                            value={formData.notes}
                                                            onChange={handleInputChange}
                                                            placeholder="E.g., Ring doorbell, leave at door, etc."
                                                            rows={3}
                                                            style={{ ...inputStyle, resize: 'none' }}
                                                        />
                                                    </div>

                                                    {/* Delivery Info */}
                                                    <div
                                                        style={{
                                                            padding: '20px',
                                                            backgroundColor: '#1a1a1a',
                                                            borderRadius: '16px',
                                                            border: '1px solid rgba(255, 255, 255, 0.05)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '12px',
                                                                marginBottom: '16px',
                                                            }}
                                                        >
                                                            <Truck style={{ width: '24px', height: '24px', color: '#39ff14' }} />
                                                            <span
                                                                style={{ color: 'white', fontWeight: '600', fontSize: '16px' }}
                                                            >
                                                                Delivery Information
                                                            </span>
                                                        </div>
                                                        <p
                                                            style={{
                                                                color: '#9ca3af',
                                                                fontSize: '14px',
                                                                lineHeight: '1.6',
                                                                marginBottom: '12px',
                                                            }}
                                                        >
                                                            🚀 Estimated delivery:{' '}
                                                            <span style={{ color: 'white', fontWeight: '600' }}>
                                                                25-35 minutes
                                                            </span>
                                                        </p>
                                                        <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6' }}>
                                                            💵 Payment:{' '}
                                                            <span style={{ color: '#39ff14', fontWeight: '600' }}>
                                                                Cash on Delivery
                                                            </span>
                                                        </p>
                                                    </div>

                                                    {/* Order Summary */}
                                                    <div
                                                        style={{
                                                            padding: '24px',
                                                            backgroundColor: '#1a1a1a',
                                                            borderRadius: '16px',
                                                            border: '1px solid rgba(255, 255, 255, 0.05)',
                                                        }}
                                                    >
                                                        <h4
                                                            style={{
                                                                fontWeight: '700',
                                                                color: 'white',
                                                                marginBottom: '20px',
                                                                fontSize: '18px',
                                                            }}
                                                        >
                                                            Order Summary
                                                        </h4>
                                                        {items.map((item) => (
                                                            <div
                                                                key={item.id}
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    fontSize: '15px',
                                                                    marginBottom: '12px',
                                                                }}
                                                            >
                                                                <span style={{ color: '#9ca3af' }}>
                                                                    {item.name} × {item.quantity}
                                                                </span>
                                                                <span style={{ color: 'white', fontWeight: '500' }}>
                                                                    ${(item.price * item.quantity).toFixed(2)}
                                                                </span>
                                                            </div>
                                                        ))}
                                                        <div
                                                            style={{
                                                                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                                                                paddingTop: '16px',
                                                                marginTop: '16px',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    fontSize: '14px',
                                                                    color: '#9ca3af',
                                                                    marginBottom: '10px',
                                                                }}
                                                            >
                                                                <span>Subtotal</span>
                                                                <span>${getSubtotal().toFixed(2)}</span>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    fontSize: '14px',
                                                                    color: '#9ca3af',
                                                                    marginBottom: '10px',
                                                                }}
                                                            >
                                                                <span>Tax</span>
                                                                <span>${getTax().toFixed(2)}</span>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    fontWeight: '700',
                                                                    color: 'white',
                                                                    fontSize: '18px',
                                                                    marginTop: '12px',
                                                                }}
                                                            >
                                                                <span>Total</span>
                                                                <span style={{ color: '#ff6b35' }}>${getTotal().toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Footer Navigation */}
                            {!isComplete && (
                                <div
                                    style={{
                                        position: 'sticky',
                                        bottom: 0,
                                        backgroundColor: '#0f0f0f',
                                        padding: '20px',
                                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '0 0 28px 28px',
                                    }}
                                    className="sm:px-8 sm:py-6"
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {orderError && (
                                            <div
                                                style={{
                                                    padding: '14px 18px',
                                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                                    borderRadius: '12px',
                                                    color: '#ef4444',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                {orderError}
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', gap: '16px' }}>
                                        {currentStep > 1 && (
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={prevStep}
                                                style={{
                                                    flex: 1,
                                                    padding: '18px',
                                                    backgroundColor: '#1a1a1a',
                                                    color: 'white',
                                                    fontWeight: '600',
                                                    fontSize: '16px',
                                                    borderRadius: '16px',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '10px',
                                                }}
                                            >
                                                <ArrowLeft style={{ width: '20px', height: '20px' }} />
                                                Back
                                            </motion.button>
                                        )}
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={currentStep === 2 ? handleSubmit : nextStep}
                                            disabled={isProcessing}
                                            style={{
                                                flex: currentStep > 1 ? 1 : '1 1 100%',
                                                padding: '18px',
                                                background: 'linear-gradient(135deg, #ff6b35 0%, #e55a28 100%)',
                                                color: 'white',
                                                fontWeight: '700',
                                                fontSize: '16px',
                                                borderRadius: '16px',
                                                border: 'none',
                                                cursor: isProcessing ? 'not-allowed' : 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '10px',
                                                boxShadow: '0 10px 30px rgba(255, 107, 53, 0.3)',
                                                opacity: isProcessing ? 0.7 : 1,
                                            }}
                                        >
                                            {isProcessing ? (
                                                <>
                                                    <Loader2
                                                        style={{
                                                            width: '20px',
                                                            height: '20px',
                                                            animation: 'spin 1s linear infinite',
                                                        }}
                                                    />
                                                    Processing...
                                                </>
                                            ) : currentStep === 2 ? (
                                                <>Place Order - ${getTotal().toFixed(2)}</>
                                            ) : (
                                                <>
                                                    Continue
                                                    <ArrowRight style={{ width: '20px', height: '20px' }} />
                                                </>
                                            )}
                                        </motion.button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Checkout;
