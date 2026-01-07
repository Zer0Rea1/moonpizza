import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Pizza, Beef, Salad, GlassWater, Sparkles, Search, SlidersHorizontal } from 'lucide-react';
import { pizzas, burgers, sides, drinks, categories } from '../data/products';
import ProductCard from './ProductCard';

const iconMap = {
    Sparkles,
    Pizza,
    Beef,
    Salad,
    GlassWater,
};

const ProductMenu = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [showFilters, setShowFilters] = useState(false);

    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

    const getProducts = () => {
        let products = [];

        switch (activeCategory) {
            case 'pizza':
                products = pizzas;
                break;
            case 'burger':
                products = burgers;
                break;
            case 'side':
                products = sides;
                break;
            case 'drink':
                products = drinks;
                break;
            default:
                products = [...pizzas, ...burgers, ...sides, ...drinks];
        }

        if (searchQuery) {
            products = products.filter(
                (p) =>
                    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        switch (sortBy) {
            case 'price-low':
                products = [...products].sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                products = [...products].sort((a, b) => b.price - a.price);
                break;
            case 'name':
                products = [...products].sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        return products;
    };

    const products = getProducts();

    return (
        <section
            id="menu"
            style={{
                paddingTop: '120px',
                paddingBottom: '120px',
                backgroundColor: '#0a0a0a',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Elements */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '384px',
                height: '384px',
                backgroundColor: 'rgba(255, 107, 53, 0.05)',
                borderRadius: '9999px',
                filter: 'blur(150px)',
            }} />
            <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '320px',
                height: '320px',
                backgroundColor: 'rgba(57, 255, 20, 0.05)',
                borderRadius: '9999px',
                filter: 'blur(120px)',
            }} />

            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 24px',
                position: 'relative',
                zIndex: 10,
            }}>
                {/* Section Header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{
                        textAlign: 'center',
                        maxWidth: '672px',
                        margin: '0 auto 48px',
                    }}
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={isHeaderInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: 'rgba(57, 255, 20, 0.1)',
                            borderRadius: '9999px',
                            color: '#39ff14',
                            fontSize: '14px',
                            fontWeight: '500',
                            marginBottom: '20px',
                        }}
                    >
                        Our Menu
                    </motion.span>
                    <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        fontWeight: '700',
                        color: 'white',
                        marginBottom: '20px',
                    }}>
                        Discover <span className="gradient-text">Flavor Excellence</span>
                    </h2>
                    <p style={{ color: '#9ca3af', fontSize: '18px', lineHeight: '1.7' }}>
                        From wood-fired pizzas to juicy gourmet burgers, explore our handcrafted menu
                        designed to satisfy every craving.
                    </p>
                </motion.div>

                {/* Search and Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        marginBottom: '32px',
                    }}
                    className="md:flex-row"
                >
                    {/* Search */}
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search style={{
                            position: 'absolute',
                            left: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '20px',
                            height: '20px',
                            color: '#6b7280',
                        }} />
                        <input
                            type="text"
                            placeholder="Search for your favorite item..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                paddingLeft: '56px',
                                paddingRight: '20px',
                                paddingTop: '18px',
                                paddingBottom: '18px',
                                backgroundColor: '#1a1a1a',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '16px',
                                color: 'white',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border-color 0.3s ease',
                            }}
                            className="focus:border-orange-500"
                        />
                    </div>

                    {/* Filter Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowFilters(!showFilters)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '18px 28px',
                            backgroundColor: '#1a1a1a',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            color: 'white',
                            fontSize: '16px',
                            cursor: 'pointer',
                            transition: 'border-color 0.3s ease',
                        }}
                        className="hover:border-orange-500"
                    >
                        <SlidersHorizontal style={{ width: '20px', height: '20px' }} />
                        <span>Filters</span>
                    </motion.button>
                </motion.div>

                {/* Filters Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ marginBottom: '32px', overflow: 'hidden' }}
                        >
                            <div style={{
                                padding: '24px',
                                backgroundColor: '#1a1a1a',
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                                    <span style={{ color: '#9ca3af' }}>Sort by:</span>
                                    {[
                                        { id: 'default', label: 'Featured' },
                                        { id: 'price-low', label: 'Price: Low to High' },
                                        { id: 'price-high', label: 'Price: High to Low' },
                                        { id: 'name', label: 'Name' },
                                    ].map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => setSortBy(option.id)}
                                            style={{
                                                padding: '10px 20px',
                                                borderRadius: '9999px',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                border: 'none',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                backgroundColor: sortBy === option.id ? '#ff6b35' : '#252525',
                                                color: sortBy === option.id ? 'white' : '#9ca3af',
                                            }}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{
                        display: 'flex',
                        overflowX: 'auto',
                        paddingBottom: '8px',
                        gap: '10px',
                        marginBottom: '32px',
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                    className="md:flex-wrap md:justify-center md:overflow-visible md:pb-0 md:mb-12 hide-scrollbar"
                >
                    {categories.map((category) => {
                        const IconComponent = iconMap[category.icon];
                        const isActive = activeCategory === category.id;

                        return (
                            <motion.button
                                key={category.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(category.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 20px',
                                    borderRadius: '9999px',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    background: isActive
                                        ? 'linear-gradient(135deg, #ff6b35 0%, #e55a28 100%)'
                                        : '#1a1a1a',
                                    color: isActive ? 'white' : '#9ca3af',
                                    boxShadow: isActive ? '0 10px 30px rgba(255, 107, 53, 0.3)' : 'none',
                                    flexShrink: 0,
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {IconComponent && <IconComponent style={{ width: '20px', height: '20px' }} />}
                                <span>{category.name}</span>
                                {isActive && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        style={{
                                            width: '8px',
                                            height: '8px',
                                            backgroundColor: 'white',
                                            borderRadius: '9999px',
                                        }}
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Products Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory + searchQuery + sortBy}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
                            gap: '24px',
                        }}
                        className="md:gap-8"
                    >
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    index={index}
                                />
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{
                                    gridColumn: '1 / -1',
                                    textAlign: 'center',
                                    padding: '80px 20px',
                                }}
                            >
                                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🍕</div>
                                <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>
                                    No items found
                                </h3>
                                <p style={{ color: '#9ca3af' }}>Try adjusting your search or filters</p>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Results Count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ marginTop: '48px', textAlign: 'center', color: '#6b7280' }}
                >
                    Showing {products.length} item{products.length !== 1 ? 's' : ''}
                </motion.div>
            </div>
        </section>
    );
};

export default ProductMenu;
