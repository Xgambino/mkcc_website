import React from 'react';
import Icon from '../AppIcon';

const GradientButton = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-accent font-medium tracking-wide rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'text-white gradient-primary hover:scale-105 active:scale-95 focus:ring-purple-500 disabled:opacity-50 disabled:hover:scale-100',
    secondary: 'text-white border-2 border-transparent bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-border hover:scale-105 active:scale-95 focus:ring-purple-500 disabled:opacity-50 disabled:hover:scale-100',
    outline: 'text-purple-400 border-2 border-purple-500 hover:bg-purple-500 hover:text-white focus:ring-purple-500 disabled:opacity-50',
    ghost: 'text-purple-400 hover:bg-purple-500 hover:bg-opacity-10 focus:ring-purple-500 disabled:opacity-50'
  };
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  const iconSizes = {
    small: 16,
    medium: 20,
    large: 24
  };

  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick?.(e);
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          Loading...
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Icon name={icon} size={iconSizes[size]} className="mr-2" />
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <Icon name={icon} size={iconSizes[size]} className="ml-2" />
          )}
        </>
      )}
    </button>
  );
};

export default GradientButton;