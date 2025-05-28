import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import ImageCarousel from './ImageCarousel';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'gallery', label: 'Gallery', icon: 'Images' },
    { id: 'testimonial', label: 'Testimonial', icon: 'MessageSquare' },
    { id: 'stats', label: 'Statistics', icon: 'BarChart3' },
  ];

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-dark-surface rounded-2xl border border-dark-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-border">
          <div>
            <h2 id="modal-title" className="text-2xl font-heading font-bold text-light-text">
              {project.title}
            </h2>
            <p className="text-muted-text mt-1">{project.category}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-text hover:text-white hover:bg-dark-border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Close modal"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-dark-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset ${
                activeTab === tab.id
                  ? 'text-white border-b-2 border-purple-500 bg-dark-border bg-opacity-50' :'text-muted-text hover:text-white hover:bg-dark-border bg-opacity-30'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-heading font-semibold text-light-text mb-3">
                  Project Description
                </h3>
                <p className="text-muted-text text-body leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-heading font-semibold text-light-text mb-3">
                    Project Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Icon name="Calendar" size={16} className="text-purple-500" />
                      <span className="text-muted-text">Completed: {project.completionDate}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="MapPin" size={16} className="text-purple-500" />
                      <span className="text-muted-text">Location: {project.location}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="User" size={16} className="text-purple-500" />
                      <span className="text-muted-text">Client: {project.clientName}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Clock" size={16} className="text-purple-500" />
                      <span className="text-muted-text">Duration: {project.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-heading font-semibold text-light-text mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-purple-700 to-blue-600 text-white text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div>
              <h3 className="text-lg font-heading font-semibold text-light-text mb-4">
                Project Gallery
              </h3>
              <ImageCarousel images={project.gallery} />
            </div>
          )}

          {activeTab === 'testimonial' && (
            <div className="space-y-6">
              <h3 className="text-lg font-heading font-semibold text-light-text mb-4">
                Client Testimonial
              </h3>
              <div className="bg-dark-border bg-opacity-50 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-700 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <Icon name="User" size={24} color="white" />
                  </div>
                  <div className="flex-1">
                    <blockquote className="text-light-text text-body italic mb-4">
                      "{project.testimonial.content}"
                    </blockquote>
                    <div>
                      <p className="text-white font-medium">{project.testimonial.author}</p>
                      <p className="text-muted-text text-sm">{project.testimonial.position}</p>
                      <p className="text-muted-text text-sm">{project.testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-6">
              <h3 className="text-lg font-heading font-semibold text-light-text mb-4">
                Project Statistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.stats.map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-dark-border bg-opacity-50 rounded-lg">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-700 to-blue-600 flex items-center justify-center">
                      <Icon name={stat.icon} size={24} color="white" />
                    </div>
                    <div className="text-3xl font-heading font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-muted-text text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;