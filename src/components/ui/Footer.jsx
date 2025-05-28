import React from "react";
import { Link } from "react-router-dom";
import Icon from "../AppIcon";

const Footer = ({ variant = "full" }) => {
  const navigationItems = [
    { name: "Home", path: "/homepage" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio-showcase" },
    { name: "Contact", path: "/contact-us" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: "Facebook",
      url: "#",
      label: "Follow us on Facebook",
    },
    {
      name: "Twitter",
      icon: "Twitter",
      url: "#",
      label: "Follow us on Twitter",
    },
    {
      name: "LinkedIn",
      icon: "Linkedin",
      url: "#",
      label: "Connect with us on LinkedIn",
    },
    {
      name: "Instagram",
      icon: "Instagram",
      url: "#",
      label: "Follow us on Instagram",
    },
  ];

  const services = [
    "Construction Design",
    "Regulatory Approvals",
    "Project Management",
    "Digitalization",
    "Strategic Partnerships",
  ];

  if (variant === "simple") {
    return (
      <footer className="bg-dark-surface border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Logo */}
            <Link to="/homepage" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <span className="text-lg font-heading font-bold text-light-text">
                Digital<span className="gradient-text">Pro</span>
              </span>
            </Link>

            {/* Copyright */}
            <p className="text-sm text-muted-text">
              © 2025 The_Dev. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="p-2 rounded-lg text-muted-text hover:text-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name={social.icon} size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-dark-surface border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/homepage" className="flex items-center space-x-2 group">
              {/* <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Icon name="Zap" size={24} color="white" />
              </div> */}
              <span className="text-xl font-heading font-bold text-light-text">
                MK<span className="gradient-text">CC</span>
              </span>
            </Link>
            <p className="text-muted-text text-body-small leading-relaxed">
              Transforming spaces through innovative construction solutions. We
              build exceptional structures that drive value and lasting success.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="p-2 rounded-lg text-muted-text hover:text-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name={social.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-light-text mb-4">
              Navigation
            </h3>
            <nav className="space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block text-muted-text hover:text-white hover:gradient-text transition-colors duration-200 focus:outline-none focus:text-white"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-light-text mb-4">
              Services
            </h3>
            <nav className="space-y-3">
              {services.map((service) => (
                <Link
                  key={service}
                  to="/services"
                  className="block text-muted-text hover:text-white hover:gradient-text transition-colors duration-200 focus:outline-none focus:text-white"
                >
                  {service}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-light-text mb-4">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Icon
                  name="MapPin"
                  size={20}
                  className="text-purple-500 mt-0.5 flex-shrink-0"
                />
                <p className="text-muted-text text-body-small">
                  4th Floor,Equity Building
                  <br />
                  Embu, Kenya.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Icon
                  name="Phone"
                  size={20}
                  className="text-purple-500 flex-shrink-0"
                />
                <a
                  href="tel:+1234567890"
                  className="text-muted-text hover:text-white transition-colors duration-200 focus:outline-none focus:text-white"
                >
                  +254 (768) 761-105
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Icon
                  name="Mail"
                  size={20}
                  className="text-purple-500 flex-shrink-0"
                />
                <a
                  href="mailto:hello@digitalpro.com"
                  className="text-muted-text hover:text-white transition-colors duration-200 focus:outline-none focus:text-white"
                >
                  namutebikanyike2@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-dark-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-muted-text">
              © 2025 MKCC. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                to="#"
                className="text-sm text-muted-text hover:text-white transition-colors duration-200 focus:outline-none focus:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-text hover:text-white transition-colors duration-200 focus:outline-none focus:text-white"
              >
                Terms of Service
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-text hover:text-white transition-colors duration-200 focus:outline-none focus:text-white"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
