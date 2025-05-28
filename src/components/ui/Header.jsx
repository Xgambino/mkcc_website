import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import Icon from '../AppIcon';

const Header = ({ variant = 'default' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/homepage' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio-showcase' },
    { name: 'Contact', path: '/contact-us' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isTransparent = variant === 'transparent';
  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isTransparent && !isScrolled
      ? 'bg-transparent' :'bg-dark-surface/95 backdrop-blur-md border-b border-dark-border'
  }`;

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link 
            to="/homepage" 
            className="flex items-center space-x-2 group"
            onClick={closeMenu}
          >
            {/* <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Icon name="Zap" size={24} color="white" />
            </div> */}
            <span className="text-xl font-heading font-bold text-light-text">
              Digital<span className="gradient-text">Pro</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-base font-accent font-medium transition-colors duration-200 hover:text-white group ${
                  location.pathname === item.path
                    ? 'text-white' :'text-muted-text'
                }`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-700 to-blue-600 transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'w-full' :'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Contact Button & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <Link
              to="/contact-us"
              className="hidden sm:inline-flex btn-primary"
            >
              Get Started
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg text-muted-text hover:text-white hover:bg-dark-surface transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 space-y-2 border-t border-dark-border">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`block px-4 py-3 rounded-lg text-base font-accent font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-white bg-gradient-to-r from-purple-700/20 to-blue-600/20 border-l-4 border-purple-500' :'text-muted-text hover:text-white hover:bg-dark-surface'
                }`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 px-4">
              <Link
                to="/contact-us"
                onClick={closeMenu}
                className="block w-full text-center btn-primary"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;