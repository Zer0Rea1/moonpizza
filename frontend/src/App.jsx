import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductMenu from './components/ProductMenu';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import { useCartStore } from './store/cartStore';

function App() {
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const { isCartOpen, toggleCart, closeCart } = useCartStore();

    const handleOpenCheckout = () => {
        closeCart();
        setIsCheckoutOpen(true);
    };

    const handleCloseCheckout = () => {
        setIsCheckoutOpen(false);
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0f0f0f' }}>
            {/* Navigation */}
            <Navbar onCartClick={toggleCart} />

            {/* Main Content */}
            <main>
                {/* Hero Section */}
                <Hero />

                {/* Features Section */}
                <Features />

                {/* Menu Section */}
                <ProductMenu />

                {/* About Section */}
                <section
                    id="about"
                    style={{
                        paddingTop: '120px',
                        paddingBottom: '120px',
                        backgroundColor: '#0f0f0f',
                    }}
                >
                    <div style={{
                        maxWidth: '1280px',
                        margin: '0 auto',
                        padding: '0 40px',
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                            gap: '80px',
                            alignItems: 'center',
                        }}
                            className="lg:grid-cols-2"
                        >
                            {/* Image Grid */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '20px',
                            }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&q=80"
                                        alt="Pizza making"
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover',
                                            borderRadius: '20px',
                                        }}
                                    />
                                    <img
                                        src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80"
                                        alt="Fresh ingredients"
                                        style={{
                                            width: '100%',
                                            height: '280px',
                                            objectFit: 'cover',
                                            borderRadius: '20px',
                                        }}
                                    />
                                </div>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '20px',
                                    paddingTop: '40px',
                                }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80"
                                        alt="Gourmet burger"
                                        style={{
                                            width: '100%',
                                            height: '280px',
                                            objectFit: 'cover',
                                            borderRadius: '20px',
                                        }}
                                    />
                                    <img
                                        src="https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80"
                                        alt="Fresh drinks"
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover',
                                            borderRadius: '20px',
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div style={{ padding: '20px 0' }}>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '12px 24px',
                                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                                    borderRadius: '9999px',
                                    color: '#ff6b35',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    marginBottom: '24px',
                                }}>
                                    Our Story
                                </span>
                                <h2 style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: 'clamp(36px, 5vw, 52px)',
                                    fontWeight: '700',
                                    color: 'white',
                                    marginBottom: '28px',
                                    lineHeight: '1.2',
                                }}>
                                    Passion in Every <span style={{ color: '#ff6b35' }}>Bite</span>
                                </h2>
                                <p style={{
                                    color: '#9ca3af',
                                    fontSize: '17px',
                                    lineHeight: '1.8',
                                    marginBottom: '24px',
                                }}>
                                    Founded in 2010, Slice & Sizzle was born from a simple dream: to create
                                    the perfect pizza that brings people together. Our journey started in a
                                    small kitchen with a wood-fired oven and has grown into a beloved destination
                                    for food lovers everywhere.
                                </p>
                                <p style={{
                                    color: '#9ca3af',
                                    fontSize: '17px',
                                    lineHeight: '1.8',
                                    marginBottom: '40px',
                                }}>
                                    Every ingredient is carefully selected, every dough is hand-stretched,
                                    and every dish is crafted with the same passion and attention to detail
                                    that started our story.
                                </p>

                                {/* Stats */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '20px',
                                }}>
                                    {[
                                        { number: '14+', label: 'Years Experience' },
                                        { number: '50K+', label: 'Happy Customers' },
                                        { number: '25+', label: 'Locations' },
                                    ].map((stat, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                textAlign: 'center',
                                                padding: '24px 16px',
                                                backgroundColor: '#1a1a1a',
                                                borderRadius: '20px',
                                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                            }}
                                        >
                                            <div style={{
                                                fontSize: '28px',
                                                fontWeight: '700',
                                                color: '#ff6b35',
                                                marginBottom: '6px',
                                            }}>
                                                {stat.number}
                                            </div>
                                            <div style={{ fontSize: '13px', color: '#6b7280' }}>{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />

            {/* Cart Sidebar */}
            <Cart
                isOpen={isCartOpen}
                onClose={closeCart}
                onCheckout={handleOpenCheckout}
            />

            {/* Checkout Modal */}
            <Checkout
                isOpen={isCheckoutOpen}
                onClose={handleCloseCheckout}
            />
        </div>
    );
}

export default App;
