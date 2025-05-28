import React from 'react';

const SectionHeading = ({ 
  title, 
  subtitle, 
  description, 
  alignment = 'center',
  size = 'large',
  className = "" 
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const sizeClasses = {
    small: {
      title: 'text-2xl md:text-3xl',
      subtitle: 'text-sm',
      description: 'text-base'
    },
    medium: {
      title: 'text-3xl md:text-4xl',
      subtitle: 'text-base',
      description: 'text-lg'
    },
    large: {
      title: 'text-4xl md:text-5xl lg:text-6xl',
      subtitle: 'text-base md:text-lg',
      description: 'text-lg md:text-xl'
    }
  };

  return (
    <div className={`${alignmentClasses[alignment]} ${className}`}>
      {subtitle && (
        <div className="mb-4">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-dark-surface border border-purple-500 border-opacity-30">
            <span className="text-purple-400 font-accent font-medium tracking-wide uppercase text-sm">
              {subtitle}
            </span>
          </span>
        </div>
      )}
      
      <h2 className={`font-heading font-bold text-light-text mb-6 tracking-tight ${sizeClasses[size].title}`}>
        {title}
      </h2>
      
      {description && (
        <p className={`text-muted-text font-body leading-relaxed max-w-3xl ${
          alignment === 'center' ? 'mx-auto' : ''
        } ${sizeClasses[size].description}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;