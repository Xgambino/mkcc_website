import React from 'react';

const GoogleMap = ({ 
  latitude = 0.3476, 
  longitude = 32.5825, 
  zoom = 14, 
  height = '400px',
  className = '',
  title = 'MKCC Location'
}) => {
  const mapSrc = `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`;

  return (
    <div className={`relative overflow-hidden rounded-xl border border-dark-border ${className}`}>
      <div 
        className="relative bg-dark-surface"
        style={{ height }}
      >
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={title}
          referrerPolicy="no-referrer-when-downgrade"
          src={mapSrc}
          className="absolute inset-0 w-full h-full filter contrast-125 brightness-75"
          style={{
            filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)'
          }}
        />
        
        {/* Dark overlay for better integration with dark theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg from-0% via-transparent via-50% to-transparent pointer-events-none opacity-30"></div>
        
        {/* Location marker overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center shadow-lg animate-pulse">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Map controls overlay */}
      <div className="absolute bottom-4 left-4 bg-dark-surface bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-2 border border-dark-border">
        <p className="text-xs text-light-text font-medium">
          MKCC Office Location
        </p>
      </div>
    </div>
  );
};

export default GoogleMap;