import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  success,
  disabled = false,
  required = false,
  icon,
  className = '',
  variant = 'text',
  options = [],
  rows = 4,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const hasValue = value && value.toString().length > 0;
  const showFloatingLabel = isFocused || hasValue;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleSelectOption = (option) => {
    if (onChange) {
      onChange({ target: { value: option.value } });
    }
    setIsDropdownOpen(false);
  };

  const baseInputClasses = `w-full bg-transparent border-0 border-b-2 px-0 py-3 text-light-text placeholder-transparent focus:outline-none focus:ring-0 transition-all duration-300 ${
    disabled ? 'cursor-not-allowed opacity-50' : ''
  }`;

  const borderClasses = error 
    ? 'border-error focus:border-error' 
    : success 
    ? 'border-success focus:border-success'
    : isFocused 
    ? 'border-transparent bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-border' :'border-dark-border focus:border-purple-500';

  const labelClasses = `absolute left-0 transition-all duration-300 pointer-events-none ${
    showFloatingLabel
      ? '-top-6 text-sm text-purple-400' :'top-3 text-base text-muted-text'
  }`;

  if (variant === 'textarea') {
    return (
      <div className={`relative ${className}`}>
        <div className="relative">
          <textarea
            ref={inputRef}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            rows={rows}
            placeholder={placeholder}
            className={`${baseInputClasses} ${borderClasses} resize-none`}
            {...props}
          />
          {label && (
            <label className={labelClasses}>
              {label} {required && <span className="text-error">*</span>}
            </label>
          )}
          <div className={`absolute bottom-0 left-0 h-0.5 w-full transition-all duration-300 ${
            isFocused ? 'bg-gradient-to-r from-purple-700 to-blue-600 scale-x-100' : 'scale-x-0'
          }`} />
        </div>
        {error && (
          <p className="mt-2 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {error}
          </p>
        )}
        {success && (
          <p className="mt-2 text-sm text-success flex items-center">
            <Icon name="CheckCircle" size={16} className="mr-1" />
            {success}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'select') {
    const selectedOption = options.find(opt => opt.value === value);
    
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <div className="relative">
          <button
            type="button"
            onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            className={`${baseInputClasses} ${borderClasses} flex items-center justify-between cursor-pointer`}
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
          >
            <span className={selectedOption ? 'text-light-text' : 'text-muted-text'}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <Icon 
              name="ChevronDown" 
              size={20} 
              className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>
          
          {label && (
            <label className={labelClasses}>
              {label} {required && <span className="text-error">*</span>}
            </label>
          )}
          
          <div className={`absolute bottom-0 left-0 h-0.5 w-full transition-all duration-300 ${
            isFocused || isDropdownOpen ? 'bg-gradient-to-r from-purple-700 to-blue-600 scale-x-100' : 'scale-x-0'
          }`} />
        </div>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-dark-surface border border-dark-border rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelectOption(option)}
                className="w-full px-4 py-3 text-left text-light-text hover:bg-gradient-to-r hover:from-purple-700/20 hover:to-blue-600/20 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg focus:outline-none focus:bg-purple-700/20"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {error && (
          <p className="mt-2 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {error}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'checkbox' || variant === 'radio') {
    return (
      <label className={`flex items-center space-x-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
        <div className="relative">
          <input
            type={variant}
            checked={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className="sr-only"
            {...props}
          />
          <div className={`w-5 h-5 border-2 transition-all duration-200 ${
            variant === 'checkbox' ? 'rounded' : 'rounded-full'
          } ${
            value 
              ? 'bg-gradient-to-r from-purple-700 to-blue-600 border-transparent' :'border-dark-border hover:border-purple-500'
          }`}>
            {value && (
              <Icon 
                name={variant === 'checkbox' ? 'Check' : 'Circle'} 
                size={12} 
                color="white" 
                className="absolute top-0.5 left-0.5"
              />
            )}
          </div>
        </div>
        <span className="text-light-text">
          {label} {required && <span className="text-error">*</span>}
        </span>
      </label>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {icon && (
          <div className="absolute left-0 top-3 text-muted-text">
            <Icon name={icon} size={20} />
          </div>
        )}
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          className={`${baseInputClasses} ${borderClasses} ${icon ? 'pl-8' : ''}`}
          {...props}
        />
        {label && (
          <label className={`${labelClasses} ${icon ? 'left-8' : ''}`}>
            {label} {required && <span className="text-error">*</span>}
          </label>
        )}
        <div className={`absolute bottom-0 left-0 h-0.5 w-full transition-all duration-300 ${
          isFocused ? 'bg-gradient-to-r from-purple-700 to-blue-600 scale-x-100' : 'scale-x-0'
        }`} />
      </div>
      {error && (
        <p className="mt-2 text-sm text-error flex items-center">
          <Icon name="AlertCircle" size={16} className="mr-1" />
          {error}
        </p>
      )}
      {success && (
        <p className="mt-2 text-sm text-success flex items-center">
          <Icon name="CheckCircle" size={16} className="mr-1" />
          {success}
        </p>
      )}
    </div>
  );
};

export default Input;