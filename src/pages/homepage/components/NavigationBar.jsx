import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'About', href: '#about', external: false },
    { name: 'Services', href: '/services', external: true },
    { name: 'Portfolio', href: '/portfolio-showcase', external: true },
    { name: 'Contact', href: '/contact-us', external: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
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
                item.external ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-muted-text hover:text-light-text hover:gradient-text transition-all duration-200 font-accent font-medium focus:outline-none focus:text-light-text"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-muted-text hover:text-light-text hover:gradient-text transition-all duration-200 font-accent font-medium focus:outline-none focus:text-light-text"
                  >
                    {item.name}
                  </button>
                )
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-muted-text hover:text-light-text hover:bg-dark-border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-dark-bg bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 w-64 h-full bg-dark-surface border-l border-dark-border transform transition-transform duration-300 ease-in-out">
            <div className="p-6 pt-20">
              <nav className="space-y-4">
                {navigationItems.map((item) => (
                  item.external ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-muted-text hover:text-light-text hover:gradient-text transition-all duration-200 font-accent font-medium py-2 focus:outline-none focus:text-light-text"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full text-left text-muted-text hover:text-light-text hover:gradient-text transition-all duration-200 font-accent font-medium py-2 focus:outline-none focus:text-light-text"
                    >
                      {item.name}
                    </button>
                  )
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationBar;