import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

const Hero = () => {
    return (
        <section
            id="home"
            style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                paddingTop: '140px',
                paddingBottom: '80px',
            }}
        >
            {/* Background Elements */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                {/* Gradient Orbs */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    style={{
                        position: 'absolute',
                        top: '25%',
                        left: '25%',
                        width: '384px',
                        height: '384px',
                        backgroundColor: 'rgba(255, 107, 53, 0.2)',
                        borderRadius: '9999px',
                        filter: 'blur(120px)',
                    }}
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 80, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    style={{
                        position: 'absolute',
                        bottom: '25%',
                        right: '25%',
                        width: '320px',
                        height: '320px',
                        backgroundColor: 'rgba(57, 255, 20, 0.1)',
                        borderRadius: '9999px',
                        filter: 'blur(100px)',
                    }}
                />

                {/* Grid Pattern */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0.03,
                        backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>

            <div style={{
                maxWidth: '1400px',
                width: '100%',
                margin: '0 auto',
                padding: '0 16px',
                position: 'relative',
                zIndex: 10,
            }}
                className="sm:px-6 lg:px-10"
            >
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '40px',
                    alignItems: 'center',
                }}
                    className="lg:grid-cols-2 lg:gap-20"
                >
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ textAlign: 'center' }}
                        className="lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 24px',
                                backgroundColor: '#1a1a1a',
                                borderRadius: '9999px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                marginBottom: '32px',
                            }}
                        >
                            <Sparkles style={{ width: '18px', height: '18px', color: '#ff6b35' }} />
                            <span style={{ fontSize: '15px', color: '#d1d5db', fontWeight: '500' }}>Premium Artisan Pizza</span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 'clamp(48px, 8vw, 80px)',
                                fontWeight: '700',
                                lineHeight: '1.1',
                                marginBottom: '32px',
                            }}
                        >
                            <span style={{ color: 'white' }}>Crafted with</span>
                            <br />
                            <span className="gradient-text">Passion & Fire</span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            style={{
                                fontSize: '19px',
                                color: '#9ca3af',
                                maxWidth: '520px',
                                margin: '0 auto 44px',
                                lineHeight: '1.8',
                            }}
                            className="lg:mx-0"
                        >
                            Experience the perfect blend of authentic Italian tradition and bold American flavors.
                            Every slice tells a story of fresh ingredients and culinary excellence.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '56px',
                            }}
                            className="sm:flex-row lg:justify-start"
                        >
                            <motion.a
                                href="#menu"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-primary"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    minWidth: '200px',
                                    padding: '18px 36px',
                                    fontSize: '16px',
                                }}
                            >
                                <span>Build Your Own</span>
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </motion.a>
                            <motion.a
                                href="#menu"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-secondary"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minWidth: '200px',
                                    padding: '18px 36px',
                                    fontSize: '16px',
                                }}
                            >
                                View Menu
                            </motion.a>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '24px',
                                justifyContent: 'center',
                            }}
                            className="lg:justify-start lg:gap-12"
                        >
                            {[
                                { number: '50K+', label: 'Happy Customers' },
                                { number: '4.9', label: 'Rating' },
                                { number: '30min', label: 'Avg Delivery' },
                            ].map((stat, index) => (
                                <div key={index} style={{ textAlign: 'center' }} className="lg:text-left">
                                    <div style={{
                                        fontSize: '32px',
                                        fontWeight: '700',
                                        color: 'white',
                                        marginBottom: '4px',
                                    }}>
                                        {stat.number}
                                    </div>
                                    <div style={{ fontSize: '14px', color: '#6b7280' }}>{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Floating Pizza */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px',
                        }}
                        className="hidden lg:flex lg:p-10"
                    >
                        {/* Glow Ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                            style={{
                                position: 'absolute',
                                width: 'min(450px, 90vw)',
                                height: 'min(450px, 90vw)',
                                borderRadius: '9999px',
                                border: '1px solid rgba(255, 107, 53, 0.2)',
                                background: 'radial-gradient(circle, transparent 60%, rgba(255,107,53,0.1) 100%)',
                            }}
                        />

                        {/* Second Ring */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                            style={{
                                position: 'absolute',
                                width: 'min(400px, 80vw)',
                                height: 'min(400px, 80vw)',
                                borderRadius: '9999px',
                                border: '1px solid rgba(57, 255, 20, 0.1)',
                            }}
                        />

                        {/* Pizza Image */}
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotateZ: [0, 2, -2, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            style={{ position: 'relative', zIndex: 10 }}
                        >
                            <motion.img
                                src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80"
                                alt="Delicious Pizza"
                                style={{
                                    width: 'min(360px, 75vw)',
                                    height: 'min(360px, 75vw)',
                                    objectFit: 'cover',
                                    borderRadius: '9999px',
                                    boxShadow: '0 50px 100px rgba(255,107,53,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
                                }}
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            />

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    right: '-20px',
                                    width: '80px',
                                    height: '80px',
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                }}
                            >
                                <span style={{ fontSize: '36px' }}>🔥</span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity }}
                                style={{
                                    position: 'absolute',
                                    bottom: '-10px',
                                    left: '-24px',
                                    width: '68px',
                                    height: '68px',
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                }}
                            >
                                <span style={{ fontSize: '32px' }}>🌿</span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [-5, 15, -5] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '-40px',
                                    width: '60px',
                                    height: '60px',
                                    backgroundColor: '#ff6b35',
                                    borderRadius: '9999px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 10px 30px rgba(255,107,53,0.4)',
                                }}
                            >
                                <span style={{ fontSize: '28px' }}>🍕</span>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            >
                <motion.a
                    href="#features"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',
                        color: '#6b7280',
                        textDecoration: 'none',
                        transition: 'color 0.3s ease',
                    }}
                    className="hover:text-orange-500"
                >
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>Scroll to explore</span>
                    <ChevronDown style={{ width: '22px', height: '22px' }} />
                </motion.a>
            </motion.div>
        </section>
    );
};

export default Hero;
