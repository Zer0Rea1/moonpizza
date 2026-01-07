import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Star, Flame, Heart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const ProductCard = ({ product, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showFlyAnimation, setShowFlyAnimation] = useState(false);
    const cardRef = useRef(null);
    const addItem = useCartStore((state) => state.addItem);
    const openCart = useCartStore((state) => state.openCart);

    const handleAddToCart = () => {
        if (cardRef.current) {
            setShowFlyAnimation(true);
            setTimeout(() => {
                addItem(product);
                openCart();
            }, 300);
            setTimeout(() => {
                setShowFlyAnimation(false);
            }, 800);
        }
    };

    const isGlass = product.category === 'drink';

    const cardStyle = {
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '24px',
        backgroundColor: isGlass ? 'rgba(255, 255, 255, 0.05)' : '#1a1a1a',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'all 0.5s ease',
        backdropFilter: isGlass ? 'blur(25px)' : 'none',
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={cardStyle}
            className="group hover:border-orange-500/30"
        >
            {/* Flying Image Animation */}
            <AnimatePresence>
                {showFlyAnimation && (
                    <motion.div
                        initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        animate={{
                            opacity: 0,
                            scale: 0.3,
                            x: window.innerWidth - (cardRef.current?.getBoundingClientRect().left || 0) - 100,
                            y: -(cardRef.current?.getBoundingClientRect().top || 0) + 50,
                        }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none' }}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '24px 24px 0 0' }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Image Container */}
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                {/* Shimmer Loading */}
                {!imageLoaded && (
                    <div className="shimmer" style={{ position: 'absolute', inset: 0 }} />
                )}

                <motion.img
                    src={product.image}
                    alt={product.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'all 0.5s ease',
                        opacity: imageLoaded ? 1 : 0,
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    }}
                    onLoad={() => setImageLoaded(true)}
                />

                {/* Overlay on Hover */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent)',
                    }}
                />

                {/* Tags */}
                <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {product.tags?.includes('popular') && (
                        <span style={{
                            padding: '6px 12px',
                            backgroundColor: '#ff6b35',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '700',
                            borderRadius: '9999px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}>
                            <Flame style={{ width: '12px', height: '12px' }} /> Popular
                        </span>
                    )}
                    {product.tags?.includes('spicy') && (
                        <span style={{
                            padding: '6px 12px',
                            backgroundColor: 'rgba(239, 68, 68, 0.9)',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '700',
                            borderRadius: '9999px',
                        }}>
                            🌶️ Spicy
                        </span>
                    )}
                    {product.tags?.includes('vegetarian') && (
                        <span style={{
                            padding: '6px 12px',
                            backgroundColor: 'rgba(34, 197, 94, 0.9)',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '700',
                            borderRadius: '9999px',
                        }}>
                            🌱 Veg
                        </span>
                    )}
                    {product.tags?.includes('premium') && (
                        <span style={{
                            padding: '6px 12px',
                            backgroundColor: 'rgba(245, 158, 11, 0.9)',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '700',
                            borderRadius: '9999px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}>
                            <Star style={{ width: '12px', height: '12px' }} /> Premium
                        </span>
                    )}
                </div>

                {/* Wishlist Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(4px)',
                        borderRadius: '9999px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        cursor: 'pointer',
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                    }}
                >
                    <Heart style={{ width: '20px', height: '20px', color: 'white' }} />
                </motion.button>

                {/* Quick Add Button (visible on hover for desktop, always visible on mobile) */}
                <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    style={{
                        position: 'absolute',
                        bottom: '16px',
                        left: '16px',
                        right: '16px',
                        padding: '14px',
                        backgroundColor: '#ff6b35',
                        color: 'white',
                        fontWeight: '600',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                    }}
                    className="md:opacity-0 md:group-hover:opacity-100 max-md:!opacity-100 max-md:!transform-none"
                >
                    <Plus style={{ width: '20px', height: '20px' }} />
                    Add to Cart
                </motion.button>
            </div>

            {/* Content */}
            <div style={{ padding: '24px' }}>
                {/* Category & Calories */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: isGlass ? '#93c5fd' : '#ff6b35',
                    }}>
                        {product.category}
                    </span>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>{product.calories} cal</span>
                </div>

                {/* Title */}
                <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '20px',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '10px',
                    transition: 'color 0.3s ease',
                }} className="group-hover:text-orange-500">
                    {product.name}
                </h3>

                {/* Description */}
                <p style={{
                    color: '#9ca3af',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {product.description}
                </p>

                {/* Price & Add Button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                        <span style={{ fontSize: '24px', fontWeight: '700', color: 'white' }}>${product.price.toFixed(2)}</span>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleAddToCart}
                        style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: '#252525',
                            borderRadius: '9999px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255,255,255,0.1)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                        className="group-hover:bg-orange-500 group-hover:border-orange-500"
                    >
                        <Plus style={{ width: '24px', height: '24px', color: 'white' }} />
                    </motion.button>
                </div>
            </div>

            {/* Glass Effect Overlay for Drinks */}
            {isGlass && (
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '33%',
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)',
                    }} />
                </div>
            )}
        </motion.div>
    );
};

export default ProductCard;
