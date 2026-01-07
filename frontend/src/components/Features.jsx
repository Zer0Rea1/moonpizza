import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Truck, Wheat, Award, Clock, Leaf, Shield } from 'lucide-react';

const features = [
    {
        icon: Truck,
        title: 'Fast Delivery',
        description: 'Hot and fresh to your door in 30 minutes or less. Track your order in real-time.',
        color: '#ff6b35',
    },
    {
        icon: Wheat,
        title: 'Fresh Dough',
        description: 'Hand-stretched daily using our secret 48-hour fermented recipe.',
        color: '#39ff14',
    },
    {
        icon: Award,
        title: 'Premium Toppings',
        description: 'Imported Italian ingredients and locally sourced organic produce.',
        color: '#ff6b35',
    },
    {
        icon: Clock,
        title: 'Quick Prep',
        description: 'From order to oven in under 5 minutes. Perfection takes precision.',
        color: '#39ff14',
    },
    {
        icon: Leaf,
        title: 'Eco Friendly',
        description: 'Sustainable packaging and carbon-neutral delivery options.',
        color: '#ff6b35',
    },
    {
        icon: Shield,
        title: 'Quality Promise',
        description: "Not satisfied? We'll remake it or refund you. No questions asked.",
        color: '#39ff14',
    },
];

const FeatureCard = ({ feature, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            style={{
                position: 'relative',
                padding: '40px 32px',
                backgroundColor: '#1a1a1a',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s ease',
            }}
            className="group"
        >
            {/* Gradient Background on Hover */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '24px',
                    opacity: 0,
                    transition: 'opacity 0.5s ease',
                    background: `radial-gradient(circle at center, ${feature.color}10 0%, transparent 70%)`,
                }}
                className="group-hover:opacity-100"
            />

            {/* Icon */}
            <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                style={{
                    position: 'relative',
                    width: '72px',
                    height: '72px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    backgroundColor: `${feature.color}15`,
                }}
            >
                <feature.icon
                    style={{ width: '32px', height: '32px', color: feature.color }}
                />
            </motion.div>

            {/* Content */}
            <h3
                style={{
                    position: 'relative',
                    fontSize: '22px',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '12px',
                    fontFamily: "'Playfair Display', serif",
                }}
            >
                {feature.title}
            </h3>
            <p
                style={{
                    position: 'relative',
                    color: '#9ca3af',
                    lineHeight: '1.7',
                    fontSize: '15px',
                }}
            >
                {feature.description}
            </p>

            {/* Arrow */}
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                style={{
                    position: 'absolute',
                    bottom: '32px',
                    right: '32px',
                    fontSize: '24px',
                    color: feature.color,
                }}
            >
                →
            </motion.div>
        </motion.div>
    );
};

const Features = () => {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

    return (
        <section
            id="features"
            style={{
                paddingTop: '120px',
                paddingBottom: '120px',
                backgroundColor: '#0f0f0f',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Decoration */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '800px',
                    height: '400px',
                    backgroundColor: 'rgba(255, 107, 53, 0.05)',
                    borderRadius: '9999px',
                    filter: 'blur(150px)',
                }}
            />

            <div
                style={{
                    maxWidth: '1280px',
                    margin: '0 auto',
                    padding: '0 24px',
                    position: 'relative',
                    zIndex: 10,
                }}
            >
                {/* Section Header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{
                        textAlign: 'center',
                        maxWidth: '672px',
                        margin: '0 auto 64px',
                    }}
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={isHeaderInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: 'rgba(255, 107, 53, 0.1)',
                            borderRadius: '9999px',
                            color: '#ff6b35',
                            fontSize: '14px',
                            fontWeight: '500',
                            marginBottom: '20px',
                        }}
                    >
                        Why Choose Us
                    </motion.span>
                    <h2
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(32px, 5vw, 48px)',
                            fontWeight: '700',
                            color: 'white',
                            marginBottom: '20px',
                        }}
                    >
                        The <span style={{ color: '#ff6b35' }}>Slice & Sizzle</span> Difference
                    </h2>
                    <p style={{ color: '#9ca3af', fontSize: '18px', lineHeight: '1.7' }}>
                        We're not just making pizza – we're crafting experiences.
                        Here's what sets us apart from the rest.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '32px',
                    }}
                >
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    style={{ marginTop: '80px', textAlign: 'center' }}
                >
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '12px 24px 12px 12px',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '9999px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <div style={{ display: 'flex', marginLeft: '0' }}>
                            {['🍕', '🍔', '🥤'].map((emoji, i) => (
                                <div
                                    key={i}
                                    style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '9999px',
                                        backgroundColor: '#252525',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '3px solid #1a1a1a',
                                        marginLeft: i > 0 ? '-12px' : '0',
                                    }}
                                >
                                    <span style={{ fontSize: '20px' }}>{emoji}</span>
                                </div>
                            ))}
                        </div>
                        <span style={{ color: '#9ca3af', fontSize: '15px' }}>
                            Join <span style={{ color: 'white', fontWeight: '600' }}>50,000+</span> happy customers
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
