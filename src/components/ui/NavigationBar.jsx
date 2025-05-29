import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBar = () => {
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
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-dark-surface bg-opacity-95 backdrop-blur-md border-b border-dark-border' :'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/homepage" className="flex items-center space-x-2 group">
            {/* <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Icon name="Building2" size={24} color="white" />
            </div> */}
            <span className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-light-text hidden sm:block">
              MK<span className="gradient-text">CC</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-body font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-dark-bg rounded-md px-3 py-2 ${
                  location.pathname === item.path
                    ? 'text-white gradient-text' :'text-muted-text hover:text-white'
                }`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
            
            {/* CTA Button */}
            <Link
              to="/contact-us"
              className="btn-primary"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-muted-text hover:text-white hover:bg-dark-surface transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen 
          ? 'max-h-96 opacity-100' :'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-dark-surface bg-opacity-95 backdrop-blur-md border-t border-dark-border">
          <div className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-lg text-body font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  location.pathname === item.path
                    ? 'text-white bg-gradient-to-r from-purple-700 to-blue-600' :'text-muted-text hover:text-white hover:bg-dark-border'
                }`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-2">
              <Link
                to="/contact-us#contact-form"
                className="block w-full text-center btn-primary"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;