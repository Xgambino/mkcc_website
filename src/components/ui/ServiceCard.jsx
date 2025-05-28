import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const ServiceCard = ({ 
  icon, 
  title, 
  description, 
  link, 
  isHighlighted = false,
  className = "" 
}) => {
  const CardContent = () => (
    <div 
      className={`group relative bg-dark-surface rounded-xl p-6 lg:p-8 border border-dark-border hover:border-purple-500 bg-opacity-70 backdrop-blur-md transition-all duration-300 hover:transform hover:translate-y-[-3px] hover:shadow-2xl hover:shadow-purple-500 hover:shadow-opacity-20 ${className}`}
      role="article"
      tabIndex={link ? 0 : undefined}
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-700 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
      
      {/* Icon */}
      <div className="relative mb-6">
        <div className={`w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-300 ${
          isHighlighted 
            ? 'gradient-primary' :'bg-dark-border group-hover:gradient-primary'
        }`}>
          <Icon 
            name={icon || "Settings"} 
            size={32} 
            color="white"
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-xl lg:text-2xl font-heading font-semibold text-light-text mb-4 group-hover:gradient-text transition-all duration-300">
          {title}
        </h3>
        <p className="text-muted-text text-body leading-relaxed mb-6">
          {description}
        </p>

        {/* Link Arrow */}
        {link && (
          <div className="flex items-center text-purple-500 group-hover:text-white transition-colors duration-300">
            <span className="text-sm font-accent font-medium mr-2">Learn More</span>
            <Icon 
              name="ArrowRight" 
              size={16} 
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-700 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
    </div>
  );

  if (link) {
    return (
      <Link 
        to={link} 
        className="block focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-dark-bg rounded-xl"
        aria-label={`Learn more about ${title}`}
      >
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};

export default ServiceCard;