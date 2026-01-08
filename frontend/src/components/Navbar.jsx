import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pizza, Menu, X, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const Navbar = ({ onCartClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const itemCount = useCartStore((state) => state.getItemCount());

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Menu', href: '#menu' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${isScrolled
                ? 'bg-[#0f0f0f]/95 backdrop-blur-lg shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-full">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        className="flex items-center gap-2 sm:gap-3 flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#ff6b35] to-[#e55a28] rounded-full flex items-center justify-center"
                            >
                                <Pizza className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </motion.div>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-[#39ff14] rounded-full"
                            />
                        </div>
                        <div className="block">
                            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white whitespace-nowrap">
                                Moon Pizza
                            </h1>
                        </div>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-8">
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative text-gray-300 hover:text-white font-medium transition-colors group text-sm lg:text-base"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ff6b35] transition-all duration-300 group-hover:w-full" />
                            </motion.a>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        {/* Cart Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onCartClick}
                            className="relative p-2 sm:p-3 bg-[#1a1a1a] rounded-full hover:bg-[#252525] transition-colors"
                        >
                            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            <AnimatePresence>
                                {itemCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-[#ff6b35] rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-white"
                                    >
                                        {itemCount}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Order Now Button */}
                        <motion.a
                            href="#menu"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden md:block btn-primary whitespace-nowrap text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
                        >
                            Order Now
                        </motion.a>

                        {/* Mobile Menu Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 sm:p-3 bg-[#1a1a1a] rounded-full"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            ) : (
                                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#0f0f0f] border-t border-white/10 overflow-hidden absolute w-full left-0 top-20 shadow-2xl"
                    >
                        <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg text-gray-300 hover:text-[#ff6b35] font-medium py-2 transition-colors border-b border-white/5 last:border-0"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.a
                                href="#menu"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="btn-primary text-center mt-4 w-full py-3"
                            >
                                Order Now
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
