import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ServiceCard = ({ icon, title, description, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-dark-surface rounded-xl p-6 border border-dark-border hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
      
      {/* Card Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="w-16 h-16 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon name={icon} size={32} color="white" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-heading font-semibold text-light-text mb-3 group-hover:gradient-text transition-all duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-text text-body-small leading-relaxed group-hover:text-light-text transition-colors duration-300">
          {description}
        </p>

        {/* Hover Arrow */}
        <div className={`mt-4 flex items-center text-purple-500 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-2' : 'opacity-0 translate-x-0'
        }`}>
          <span className="text-sm font-accent font-medium mr-2">Learn More</span>
          <Icon name="ArrowRight" size={16} />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;