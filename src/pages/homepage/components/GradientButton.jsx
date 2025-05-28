import React from 'react';
import Icon from '../../../components/AppIcon';

const GradientButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  icon, 
  iconPosition = 'left',
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-accent font-medium tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-dark-bg rounded-lg";
  
  const variantClasses = {
    primary: "text-white gradient-primary hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl",
    secondary: "text-white border-2 border-transparent bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-border hover:scale-105 active:scale-95",
    outline: "text-light-text border-2 border-purple-500 hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-600 hover:border-transparent hover:scale-105 active:scale-95",
    ghost: "text-muted-text hover:text-light-text hover:bg-dark-border hover:scale-105 active:scale-95"
  };

  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg"
  };

  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed hover:scale-100 active:scale-100" :"";

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  const iconSize = size === 'small' ? 16 : size === 'large' ? 24 : 20;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <Icon name={icon} size={iconSize} className="mr-2" />
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <Icon name={icon} size={iconSize} className="ml-2" />
      )}
    </button>
  );
};

export default GradientButton;