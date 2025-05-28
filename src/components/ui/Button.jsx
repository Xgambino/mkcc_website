import React from 'react';
import Icon from '../AppIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-accent font-medium tracking-wide rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

  const variantClasses = {
    primary: 'text-white gradient-primary hover:scale-105 active:scale-95 focus:ring-purple-500 shadow-lg hover:shadow-xl',
    secondary: 'text-white border-2 border-transparent bg-transparent hover:scale-105 active:scale-95 focus:ring-purple-500 relative overflow-hidden',
    text: 'text-muted-text hover:text-white bg-transparent hover:bg-dark-surface focus:ring-purple-500',
    icon: 'text-white gradient-primary rounded-full hover:scale-110 active:scale-95 focus:ring-purple-500 shadow-lg hover:shadow-xl'
  };

  const sizeClasses = {
    small: variant === 'icon' ? 'w-8 h-8' : 'px-4 py-2 text-sm',
    medium: variant === 'icon' ? 'w-10 h-10' : 'px-6 py-3 text-base',
    large: variant === 'icon' ? 'w-12 h-12' : 'px-8 py-4 text-lg'
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  const renderIcon = (iconName, position) => {
    if (!iconName) return null;
    
    const iconSize = size === 'small' ? 16 : size === 'large' ? 24 : 20;
    const iconClasses = variant === 'icon' ? '' : position === 'left' ? 'mr-2' : 'ml-2';
    
    return (
      <Icon 
        name={iconName} 
        size={iconSize} 
        className={iconClasses}
      />
    );
  };

  const renderContent = () => {
    if (variant === 'icon') {
      return loading ? (
        <Icon name="Loader2" size={size === 'small' ? 16 : size === 'large' ? 24 : 20} className="animate-spin" />
      ) : (
        renderIcon(icon, 'center')
      );
    }

    return (
      <>
        {loading && <Icon name="Loader2" size={16} className="mr-2 animate-spin" />}
        {!loading && iconPosition === 'left' && renderIcon(icon, 'left')}
        {children}
        {!loading && iconPosition === 'right' && renderIcon(icon, 'right')}
      </>
    );
  };

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-label={variant === 'icon' && typeof children === 'string' ? children : undefined}
      {...props}
    >
      {variant === 'secondary' && (
        <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-700 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-200 -z-10" />
      )}
      {variant === 'secondary' && (
        <span className="absolute inset-[2px] rounded-md bg-dark-surface" />
      )}
      <span className={variant === 'secondary' ? 'relative z-10' : ''}>
        {renderContent()}
      </span>
    </button>
  );
};

export default Button;