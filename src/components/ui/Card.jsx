import React from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';

const Card = ({ 
  variant = 'service', 
  title, 
  description, 
  icon, 
  image, 
  step, 
  name, 
  role, 
  social,
  onClick,
  className = '',
  children,
  ...props 
}) => {
  const baseClasses = 'relative bg-dark-surface rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 focus-within:scale-105';

  const variantClasses = {
    service: 'p-6 border border-dark-border hover:border-purple-500/50 group cursor-pointer',
    portfolio: 'group cursor-pointer hover:shadow-2xl',
    team: 'p-6 text-center group cursor-pointer',
    process: 'p-6 border border-dark-border'
  };

  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  if (variant === 'service') {
    return (
      <div 
        className={cardClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={onClick ? 0 : undefined}
        role={onClick ? 'button' : undefined}
        {...props}
      >
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        <div className="absolute inset-[1px] bg-dark-surface rounded-lg" />
        
        <div className="relative z-10">
          {icon && (
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Icon name={icon} size={24} color="white" />
            </div>
          )}
          
          <h3 className="text-card text-light-text mb-3 group-hover:gradient-text transition-all duration-300">
            {title}
          </h3>
          
          <p className="text-body-small text-muted-text leading-relaxed group-hover:text-light-text transition-colors duration-300">
            {description}
          </p>
          
          {children}
        </div>
      </div>
    );
  }

  if (variant === 'portfolio') {
    return (
      <div 
        className={cardClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={onClick ? 0 : undefined}
        role={onClick ? 'button' : undefined}
        {...props}
      >
        <div className="relative overflow-hidden">
          {image && (
            <Image
              src={image}
              alt={title}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300" />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <div>
              <h3 className="text-card text-light-text mb-2">
                {title}
              </h3>
              <p className="text-body-small text-muted-text">
                {description}
              </p>
            </div>
          </div>
        </div>
        
        {children}
      </div>
    );
  }

  if (variant === 'team') {
    return (
      <div 
        className={cardClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={onClick ? 0 : undefined}
        role={onClick ? 'button' : undefined}
        {...props}
      >
        <div className="relative">
          {image && (
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-r from-purple-700 to-blue-600 p-1 group-hover:scale-110 transition-transform duration-300">
              <Image
                src={image}
                alt={name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          )}
          
          <h3 className="text-card text-light-text mb-1 group-hover:gradient-text transition-all duration-300">
            {name}
          </h3>
          
          <p className="text-body-small text-muted-text mb-4">
            {role}
          </p>
          
          {/* Social Links - Revealed on Hover */}
          {social && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
              <div className="flex justify-center space-x-3">
                {social.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="p-2 rounded-lg text-muted-text hover:text-white hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-600 transition-all duration-200"
                    aria-label={`${name}'s ${link.platform}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name={link.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>
          )}
          
          {children}
        </div>
      </div>
    );
  }

  if (variant === 'process') {
    return (
      <div className={cardClasses} {...props}>
        <div className="flex items-start space-x-4">
          {step && (
            <div className="flex-shrink-0 w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-lg font-heading font-bold text-white">
                {step}
              </span>
            </div>
          )}
          
          <div className="flex-1">
            {icon && (
              <div className="w-10 h-10 rounded-lg bg-purple-700/20 flex items-center justify-center mb-3">
                <Icon name={icon} size={20} className="text-purple-400" />
              </div>
            )}
            
            <h3 className="text-card text-light-text mb-3">
              {title}
            </h3>
            
            <p className="text-body-small text-muted-text leading-relaxed">
              {description}
            </p>
            
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;