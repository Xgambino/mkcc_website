import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const Dropdown = ({
  trigger,
  children,
  variant = 'navigation',
  position = 'bottom-left',
  className = '',
  onOpen,
  onClose,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        if (onClose) onClose();
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const toggleDropdown = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    
    if (newState && onOpen) {
      onOpen();
    } else if (!newState && onClose) {
      onClose();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown();
    } else if (event.key === 'ArrowDown' && isOpen) {
      event.preventDefault();
      const firstItem = dropdownRef.current?.querySelector('[role="menuitem"], button, a');
      firstItem?.focus();
    }
  };

  const positionClasses = {
    'bottom-left': 'top-full left-0 mt-2',
    'bottom-right': 'top-full right-0 mt-2',
    'top-left': 'bottom-full left-0 mb-2',
    'top-right': 'bottom-full right-0 mb-2',
  };

  const variantClasses = {
    navigation: 'bg-dark-surface border border-dark-border shadow-xl rounded-lg min-w-48',
    filter: 'bg-dark-surface border border-dark-border shadow-xl rounded-lg min-w-40',
    select: 'bg-dark-surface border border-dark-border shadow-xl rounded-lg w-full min-w-full',
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef} {...props}>
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="cursor-pointer focus:outline-none"
      >
        {trigger}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute z-50 ${positionClasses[position]} ${variantClasses[variant]} animate-fade-in`}
          role="menu"
          aria-orientation="vertical"
        >
          {variant === 'navigation' && (
            <NavigationDropdown onItemClick={() => setIsOpen(false)}>
              {children}
            </NavigationDropdown>
          )}
          
          {variant === 'filter' && (
            <FilterDropdown onItemClick={() => setIsOpen(false)}>
              {children}
            </FilterDropdown>
          )}
          
          {variant === 'select' && (
            <SelectDropdown onItemClick={() => setIsOpen(false)}>
              {children}
            </SelectDropdown>
          )}
        </div>
      )}
    </div>
  );
};

const NavigationDropdown = ({ children, onItemClick }) => {
  return (
    <div className="py-2">
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          onClick={onItemClick}
          className="px-4 py-3 text-muted-text hover:text-white hover:bg-gradient-to-r hover:from-purple-700/20 hover:to-blue-600/20 transition-all duration-200 cursor-pointer focus:outline-none focus:bg-purple-700/20"
          role="menuitem"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onItemClick();
            }
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

const FilterDropdown = ({ children, onItemClick }) => {
  return (
    <div className="py-2">
      <div className="px-4 py-2 text-xs font-accent font-semibold text-muted-text uppercase tracking-wider border-b border-dark-border">
        Filter Options
      </div>
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          onClick={onItemClick}
          className="px-4 py-3 text-muted-text hover:text-white hover:bg-gradient-to-r hover:from-purple-700/20 hover:to-blue-600/20 transition-all duration-200 cursor-pointer focus:outline-none focus:bg-purple-700/20 flex items-center justify-between"
          role="menuitem"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onItemClick();
            }
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

const SelectDropdown = ({ children, onItemClick }) => {
  return (
    <div className="max-h-60 overflow-y-auto">
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          onClick={onItemClick}
          className="px-4 py-3 text-light-text hover:bg-gradient-to-r hover:from-purple-700/20 hover:to-blue-600/20 transition-all duration-200 cursor-pointer focus:outline-none focus:bg-purple-700/20 first:rounded-t-lg last:rounded-b-lg"
          role="option"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onItemClick();
            }
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// Dropdown Item Component for easier usage
export const DropdownItem = ({ 
  children, 
  icon, 
  selected = false, 
  onClick,
  className = '',
  ...props 
}) => {
  return (
    <div 
      className={`flex items-center space-x-3 ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && (
        <Icon 
          name={icon} 
          size={18} 
          className={selected ? 'text-purple-400' : 'text-muted-text'} 
        />
      )}
      <span className="flex-1">{children}</span>
      {selected && (
        <Icon name="Check" size={16} className="text-purple-400" />
      )}
    </div>
  );
};

export default Dropdown;