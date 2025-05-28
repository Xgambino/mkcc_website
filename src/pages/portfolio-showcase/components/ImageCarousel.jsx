import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState({});
  const [imageError, setImageError] = useState({});

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleImageLoad = (index) => {
    setImageLoaded(prev => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index) => {
    setImageError(prev => ({ ...prev, [index]: true }));
    setImageLoaded(prev => ({ ...prev, [index]: true }));
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-dark-border bg-opacity-50 rounded-lg">
        <div className="text-center">
          <Icon name="Image" size={48} className="text-muted-text mx-auto mb-2" />
          <p className="text-muted-text">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-video bg-dark-border bg-opacity-50 rounded-lg overflow-hidden">
        {!imageLoaded[currentIndex] && (
          <div className="absolute inset-0 bg-dark-border animate-pulse flex items-center justify-center">
            <Icon name="Image" size={48} className="text-muted-text" />
          </div>
        )}
        
        <Image
          src={imageError[currentIndex] ? '/assets/images/no_image.png' : images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded[currentIndex] ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => handleImageLoad(currentIndex)}
          onError={() => handleImageError(currentIndex)}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              onKeyPress={(e) => handleKeyPress(e, handlePrevious)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label="Previous image"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            
            <button
              onClick={handleNext}
              onKeyPress={(e) => handleKeyPress(e, handleNext)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label="Next image"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 px-3 py-1 bg-black bg-opacity-50 text-white text-sm rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                index === currentIndex
                  ? 'border-purple-500' :'border-dark-border hover:border-muted-text'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={imageError[index] ? '/assets/images/no_image.png' : image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;