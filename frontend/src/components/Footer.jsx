import { motion } from 'framer-motion';
import {
    Pizza,
    MapPin,
    Phone,
    Mail,
    Clock,
    Instagram,
    Facebook,
    Twitter,
    Youtube,
    ArrowUp,
} from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const footerLinks = {
        menu: [
            { name: 'Pizzas', href: '#menu' },
            { name: 'Burgers', href: '#menu' },
            { name: 'Sides', href: '#menu' },
            { name: 'Drinks', href: '#menu' },
            { name: 'Specials', href: '#menu' },
        ],
        company: [
            { name: 'About Us', href: '#about' },
            { name: 'Careers', href: '#' },
            { name: 'Franchise', href: '#' },
            { name: 'Blog', href: '#' },
            { name: 'Press', href: '#' },
        ],
        support: [
            { name: 'FAQ', href: '#' },
            { name: 'Contact', href: '#contact' },
            { name: 'Delivery Info', href: '#' },
            { name: 'Track Order', href: '#' },
            { name: 'Refund Policy', href: '#' },
        ],
    };

    const socialLinks = [
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Youtube, href: '#', label: 'Youtube' },
    ];

    const linkStyle = {
        color: '#9ca3af',
        textDecoration: 'none',
        fontSize: '15px',
        transition: 'color 0.3s ease',
        display: 'block',
        paddingTop: '6px',
        paddingBottom: '6px',
    };

    return (
        <footer
            id="contact"
            style={{
                backgroundColor: '#0a0a0a',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                paddingTop: '80px',
                paddingBottom: '40px',
            }}
        >
            <div style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '0 24px',
            }}>
                {/* Top Section - Main Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '48px',
                    marginBottom: '64px',
                }}>
                    {/* Brand Column */}
                    <div style={{ gridColumn: 'span 1' }}>
                        <motion.a
                            href="#home"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                marginBottom: '24px',
                                textDecoration: 'none',
                            }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'linear-gradient(135deg, #ff6b35 0%, #e55a28 100%)',
                                borderRadius: '9999px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Pizza style={{ width: '28px', height: '28px', color: 'white' }} />
                            </div>
                            <h3 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '24px',
                                fontWeight: '700',
                                color: 'white',
                            }}>
                                Slice<span style={{ color: '#ff6b35' }}>&</span>Sizzle
                            </h3>
                        </motion.a>

                        <p style={{
                            color: '#9ca3af',
                            marginBottom: '24px',
                            maxWidth: '280px',
                            lineHeight: '1.7',
                            fontSize: '15px',
                        }}>
                            Crafting the perfect slice since 2010. Premium ingredients,
                            authentic recipes, and a passion for flavor that sets us apart.
                        </p>

                        {/* Contact Info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <a
                                href="tel:+15551234567"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    color: '#9ca3af',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    transition: 'color 0.3s ease',
                                }}
                                className="hover:text-orange-500"
                            >
                                <Phone style={{ width: '18px', height: '18px' }} />
                                <span>+1 (555) 123-4567</span>
                            </a>
                            <a
                                href="mailto:hello@sliceandsizzle.com"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    color: '#9ca3af',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    transition: 'color 0.3s ease',
                                }}
                                className="hover:text-orange-500"
                            >
                                <Mail style={{ width: '18px', height: '18px' }} />
                                <span>hello@sliceandsizzle.com</span>
                            </a>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                color: '#9ca3af',
                                fontSize: '14px',
                            }}>
                                <MapPin style={{ width: '18px', height: '18px', flexShrink: 0 }} />
                                <span>123 Pizza Lane, Flavor City</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                color: '#9ca3af',
                                fontSize: '14px',
                            }}>
                                <Clock style={{ width: '18px', height: '18px' }} />
                                <span>Open Daily: 11AM - 11PM</span>
                            </div>
                        </div>
                    </div>

                    {/* Menu Links */}
                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '18px',
                            fontWeight: '700',
                            color: 'white',
                            marginBottom: '24px',
                        }}>
                            Menu
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {footerLinks.menu.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} style={linkStyle} className="hover:text-orange-500">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '18px',
                            fontWeight: '700',
                            color: 'white',
                            marginBottom: '24px',
                        }}>
                            Company
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} style={linkStyle} className="hover:text-orange-500">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '18px',
                            fontWeight: '700',
                            color: 'white',
                            marginBottom: '24px',
                        }}>
                            Support
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} style={linkStyle} className="hover:text-orange-500">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        padding: '40px',
                        background: 'linear-gradient(135deg, #1a1a1a 0%, #252525 100%)',
                        borderRadius: '24px',
                        marginBottom: '48px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '24px',
                    }}
                        className="md:flex-row md:items-center"
                    >
                        <div style={{ textAlign: 'center' }} className="md:text-left">
                            <h4 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '28px',
                                fontWeight: '700',
                                color: 'white',
                                marginBottom: '8px',
                            }}>
                                Get <span style={{ color: '#ff6b35' }}>20% Off</span> Your First Order
                            </h4>
                            <p style={{ color: '#9ca3af', fontSize: '16px' }}>
                                Subscribe to our newsletter for exclusive deals and updates.
                            </p>
                        </div>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            maxWidth: '400px',
                            gap: '12px',
                        }}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                style={{
                                    flex: 1,
                                    padding: '16px 20px',
                                    backgroundColor: '#0f0f0f',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontSize: '15px',
                                    outline: 'none',
                                    transition: 'border-color 0.3s ease',
                                }}
                                className="focus:border-orange-500"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '16px 28px',
                                    backgroundColor: '#ff6b35',
                                    color: 'white',
                                    fontWeight: '600',
                                    borderRadius: '12px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Subscribe
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Section */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '24px',
                    paddingTop: '32px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                }}
                    className="md:flex-row"
                >
                    {/* Copyright */}
                    <p style={{
                        color: '#6b7280',
                        fontSize: '14px',
                        textAlign: 'center',
                    }}>
                        © 2024 Slice & Sizzle. All rights reserved. Made with 🍕 and ❤️
                    </p>

                    {/* Social Links */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                whileHover={{ scale: 1.2, y: -2 }}
                                whileTap={{ scale: 0.9 }}
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '9999px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#9ca3af',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                }}
                                className="hover:bg-orange-500 hover:text-white"
                                aria-label={social.label}
                            >
                                <social.icon style={{ width: '20px', height: '20px' }} />
                            </motion.a>
                        ))}
                    </div>

                    {/* Back to Top */}
                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: '#ff6b35',
                            borderRadius: '9999px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 10px 30px rgba(255, 107, 53, 0.3)',
                        }}
                    >
                        <ArrowUp style={{ width: '20px', height: '20px' }} />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
