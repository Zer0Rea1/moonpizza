import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const Cart = ({ isOpen, onClose, onCheckout }) => {
    const {
        items,
        removeItem,
        incrementQuantity,
        decrementQuantity,
        getSubtotal,
        getTax,
        getTotal,
        clearCart,
    } = useCartStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 50,
                        }}
                    />

                    {/* Cart Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            right: 0,
                            top: 0,
                            height: '100%',
                            width: '100%',
                            maxWidth: '440px',
                            backgroundColor: '#0f0f0f',
                            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                            zIndex: 50,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '28px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{
                                    width: '52px',
                                    height: '52px',
                                    backgroundColor: 'rgba(255, 107, 53, 0.15)',
                                    borderRadius: '9999px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <ShoppingBag style={{ width: '24px', height: '24px', color: '#ff6b35' }} />
                                </div>
                                <div>
                                    <h2 style={{
                                        fontFamily: "'Playfair Display', serif",
                                        fontSize: '24px',
                                        fontWeight: '700',
                                        color: 'white',
                                        marginBottom: '4px',
                                    }}>
                                        Your Cart
                                    </h2>
                                    <p style={{ fontSize: '14px', color: '#6b7280' }}>
                                        {items.length} item{items.length !== 1 ? 's' : ''}
                                    </p>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
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
                                    transition: 'background-color 0.3s ease',
                                }}
                            >
                                <X style={{ width: '20px', height: '20px', color: 'white' }} />
                            </motion.button>
                        </div>

                        {/* Cart Items */}
                        <div style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '28px',
                        }}>
                            {items.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <div style={{
                                        width: '100px',
                                        height: '100px',
                                        backgroundColor: '#1a1a1a',
                                        borderRadius: '9999px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '28px',
                                    }}>
                                        <ShoppingBag style={{ width: '48px', height: '48px', color: '#4b5563' }} />
                                    </div>
                                    <h3 style={{
                                        fontSize: '22px',
                                        fontWeight: '700',
                                        color: 'white',
                                        marginBottom: '12px',
                                    }}>
                                        Your cart is empty
                                    </h3>
                                    <p style={{ color: '#6b7280', marginBottom: '28px', fontSize: '15px' }}>
                                        Looks like you haven't added any items yet.
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={onClose}
                                        className="btn-primary"
                                    >
                                        Browse Menu
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {items.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50, height: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            style={{
                                                display: 'flex',
                                                gap: '20px',
                                                padding: '20px',
                                                backgroundColor: '#1a1a1a',
                                                borderRadius: '20px',
                                                marginBottom: '16px',
                                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                            }}
                                        >
                                            {/* Image */}
                                            <div style={{
                                                width: '88px',
                                                height: '88px',
                                                borderRadius: '16px',
                                                overflow: 'hidden',
                                                flexShrink: 0,
                                            }}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>

                                            {/* Details */}
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <h4 style={{
                                                    fontWeight: '600',
                                                    color: 'white',
                                                    fontSize: '16px',
                                                    marginBottom: '4px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}>
                                                    {item.name}
                                                </h4>
                                                <p style={{
                                                    fontSize: '13px',
                                                    color: '#6b7280',
                                                    textTransform: 'capitalize',
                                                    marginBottom: '8px',
                                                }}>
                                                    {item.category}
                                                </p>
                                                <p style={{
                                                    color: '#ff6b35',
                                                    fontWeight: '700',
                                                    fontSize: '18px',
                                                }}>
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-end',
                                                justifyContent: 'space-between',
                                            }}>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => removeItem(item.id)}
                                                    style={{
                                                        padding: '8px',
                                                        color: '#6b7280',
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        transition: 'color 0.3s ease',
                                                    }}
                                                    className="hover:text-red-500"
                                                >
                                                    <Trash2 style={{ width: '18px', height: '18px' }} />
                                                </motion.button>

                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    backgroundColor: '#252525',
                                                    borderRadius: '9999px',
                                                    padding: '6px',
                                                }}>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => decrementQuantity(item.id)}
                                                        style={{
                                                            width: '32px',
                                                            height: '32px',
                                                            borderRadius: '9999px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            background: 'none',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            transition: 'background-color 0.3s ease',
                                                        }}
                                                        className="hover:bg-[#303030]"
                                                    >
                                                        <Minus style={{ width: '16px', height: '16px', color: 'white' }} />
                                                    </motion.button>
                                                    <span style={{
                                                        width: '28px',
                                                        textAlign: 'center',
                                                        color: 'white',
                                                        fontWeight: '600',
                                                        fontSize: '15px',
                                                    }}>
                                                        {item.quantity}
                                                    </span>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => incrementQuantity(item.id)}
                                                        style={{
                                                            width: '32px',
                                                            height: '32px',
                                                            borderRadius: '9999px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            background: 'none',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            transition: 'background-color 0.3s ease',
                                                        }}
                                                        className="hover:bg-[#303030]"
                                                    >
                                                        <Plus style={{ width: '16px', height: '16px', color: 'white' }} />
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    padding: '28px',
                                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                                    backgroundColor: '#0a0a0a',
                                }}
                            >
                                {/* Clear Cart */}
                                <button
                                    onClick={clearCart}
                                    style={{
                                        width: '100%',
                                        textAlign: 'center',
                                        fontSize: '14px',
                                        color: '#6b7280',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        marginBottom: '20px',
                                        transition: 'color 0.3s ease',
                                    }}
                                    className="hover:text-red-500"
                                >
                                    Clear Cart
                                </button>

                                {/* Summary */}
                                <div style={{ marginBottom: '24px' }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        color: '#9ca3af',
                                        fontSize: '15px',
                                        marginBottom: '12px',
                                    }}>
                                        <span>Subtotal</span>
                                        <span>${getSubtotal().toFixed(2)}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        color: '#9ca3af',
                                        fontSize: '15px',
                                        marginBottom: '16px',
                                    }}>
                                        <span>Tax (8.75%)</span>
                                        <span>${getTax().toFixed(2)}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        color: 'white',
                                        fontSize: '20px',
                                        fontWeight: '700',
                                        paddingTop: '16px',
                                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                                    }}>
                                        <span>Total</span>
                                        <span style={{ color: '#ff6b35' }}>${getTotal().toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onCheckout}
                                    style={{
                                        width: '100%',
                                        padding: '18px',
                                        background: 'linear-gradient(135deg, #ff6b35 0%, #e55a28 100%)',
                                        color: 'white',
                                        fontWeight: '700',
                                        fontSize: '16px',
                                        borderRadius: '16px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        boxShadow: '0 10px 30px rgba(255, 107, 53, 0.3)',
                                        transition: 'box-shadow 0.3s ease',
                                    }}
                                >
                                    Proceed to Checkout
                                    <ArrowRight style={{ width: '20px', height: '20px' }} />
                                </motion.button>

                                {/* Secure Notice */}
                                <p style={{
                                    textAlign: 'center',
                                    fontSize: '13px',
                                    color: '#4b5563',
                                    marginTop: '20px',
                                }}>
                                    🔒 Secure checkout with 256-bit SSL encryption
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;
