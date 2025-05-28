import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const SideBar = ({ isOpen, onClose, variant = 'main' }) => {
  const sidebarRef = useRef(null);
  const location = useLocation();

  const mainNavigationItems = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'Services', path: '/services', icon: 'Briefcase' },
    { name: 'Portfolio', path: '/portfolio-showcase', icon: 'FolderOpen' },
    { name: 'Contact', path: '/contact-us', icon: 'MessageCircle' },
  ];

  const serviceNavigationItems = [
    { name: 'Web Development', path: '/services#web-development', icon: 'Code' },
    { name: 'Mobile Apps', path: '/services#mobile-apps', icon: 'Smartphone' },
    { name: 'UI/UX Design', path: '/services#ui-ux-design', icon: 'Palette' },
    { name: 'Digital Marketing', path: '/services#digital-marketing', icon: 'TrendingUp' },
    { name: 'SEO Optimization', path: '/services#seo-optimization', icon: 'Search' },
    { name: 'Brand Strategy', path: '/services#brand-strategy', icon: 'Target' },
  ];

  const navigationItems = variant === 'service' ? serviceNavigationItems : mainNavigationItems;

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const firstFocusableElement = sidebarRef.current?.querySelector('button, a');
      firstFocusableElement?.focus();
    }
  }, [isOpen]);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-80 bg-dark-surface border-r border-dark-border z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-border">
          <Link 
            to="/homepage" 
            className="flex items-center space-x-2 group"
            onClick={handleLinkClick}
          >
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Icon name="Zap" size={24} color="white" />
            </div>
            <span className="text-xl font-heading font-bold text-light-text">
              Digital<span className="gradient-text">Pro</span>
            </span>
          </Link>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-text hover:text-white hover:bg-dark-bg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Close navigation menu"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6">
          <div className="space-y-2">
            {variant === 'service' && (
              <div className="mb-6">
                <h3 className="text-sm font-accent font-semibold text-muted-text uppercase tracking-wider mb-3">
                  Our Services
                </h3>
              </div>
            )}

            {navigationItems.map((item) => {
              const isActive = variant === 'service' 
                ? location.pathname === '/services' && location.hash === item.path.split('#')[1]
                : location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-accent font-medium transition-all duration-200 group ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-purple-700/20 to-blue-600/20 border-l-4 border-purple-500' :'text-muted-text hover:text-white hover:bg-dark-bg'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={`transition-colors duration-200 ${
                      isActive ? 'text-purple-400' : 'text-muted-text group-hover:text-purple-400'
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Contact Information */}
        <div className="p-6 border-t border-dark-border">
          <div className="space-y-4">
            <h3 className="text-sm font-accent font-semibold text-muted-text uppercase tracking-wider">
              Get in Touch
            </h3>
            
            <div className="space-y-3">
              <a 
                href="tel:+1234567890"
                className="flex items-center space-x-3 text-muted-text hover:text-white transition-colors duration-200 group"
              >
                <Icon name="Phone" size={18} className="text-purple-400 group-hover:text-purple-300" />
                <span className="text-sm">+1 (234) 567-890</span>
              </a>
              
              <a 
                href="mailto:hello@digitalpro.com"
                className="flex items-center space-x-3 text-muted-text hover:text-white transition-colors duration-200 group"
              >
                <Icon name="Mail" size={18} className="text-purple-400 group-hover:text-purple-300" />
                <span className="text-sm">hello@digitalpro.com</span>
              </a>
            </div>

            <Link
              to="/contact-us"
              onClick={handleLinkClick}
              className="block w-full mt-4 btn-primary text-center"
            >
              Start Project
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;