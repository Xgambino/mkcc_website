import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProjectCard = ({ project, onViewDetails }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onViewDetails(project);
    }
  };

  return (
    <div 
      className="group relative bg-dark-surface rounded-xl overflow-hidden border border-dark-border hover:border-purple-500 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-dark-bg"
      onClick={() => onViewDetails(project)}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-dark-border animate-pulse flex items-center justify-center">
            <Icon name="Image" size={32} className="text-muted-text" />
          </div>
        )}
        
        <Image
          src={imageError ? '/assets/images/no_image.png' : project.thumbnail}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Hover Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-xl font-heading font-bold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-gray-200 mb-4 line-clamp-2">
              {project.category}
            </p>
            <button className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-600 text-white text-sm font-medium rounded-lg hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent">
              <span>View Details</span>
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-dark-surface bg-opacity-90 text-light-text border border-dark-border">
            {project.category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-lg font-heading font-semibold text-light-text mb-2 group-hover:gradient-text transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-muted-text text-body-small line-clamp-2 mb-4">
          {project.description.substring(0, 100)}...
        </p>
        
        {/* Project Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-muted-text">
              <Icon name="Calendar" size={14} />
              <span>{project.completionDate}</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-text">
              <Icon name="MapPin" size={14} />
              <span>{project.location}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-primary-gold">
            <Icon name="Star" size={14} />
            <span className="font-medium">{project.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;