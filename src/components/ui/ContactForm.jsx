import React, { useState } from 'react';
import Icon from '../AppIcon';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subjectOptions = [
    { value: '', label: '' },
    { value: 'project-inquiry', label: 'Project Inquiry' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'general', label: 'General' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({}); // clear previous submit errors

    try {
      const response = await fetch('https://formspree.io/f/xvgaenkv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-dark-surface rounded-xl p-8 border border-dark-border">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center">
            <Icon name="CheckCircle" size={32} color="white" />
          </div>
          <h3 className="text-2xl font-heading font-semibold text-light-text mb-4">
            Message Sent Successfully!
          </h3>
          <p className="text-muted-text text-body mb-6">
            Thank you for contacting MKCC. We've received your message and will respond within 24-48 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="btn-primary"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="contact-form" className="bg-dark-surface rounded-xl p-8 border border-dark-border">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-light-text mb-4">
          Send Us a Message
        </h2>
        <p className="text-muted-text text-body">
          Ready to start your construction project? Get in touch with our expert team.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-dark-bg border-2 rounded-lg text-light-text placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-dark-surface transition-all duration-200 ${
              errors.name
                ? 'border-error'
                : formData.name
                  ? 'border-gradient-to-r border-purple-500' : 'border-dark-border focus:border-purple-500'
            }`}
            placeholder="Full Name"
            required
          />
          <label
            htmlFor="name"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              formData.name
                ? '-top-2 text-xs bg-dark-surface px-2 text-purple-400' : 'top-3 text-muted-text'
            }`}
          >
            Full Name *
          </label>
          {errors.name && (
            <p className="mt-2 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={16} />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-dark-bg border-2 rounded-lg text-light-text placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-dark-surface transition-all duration-200 ${
              errors.email
                ? 'border-error'
                : formData.email
                  ? 'border-gradient-to-r border-purple-500' : 'border-dark-border focus:border-purple-500'
            }`}
            placeholder="Email Address"
            required
          />
          <label
            htmlFor="email"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              formData.email
                ? '-top-2 text-xs bg-dark-surface px-2 text-purple-400' : 'top-3 text-muted-text'
            }`}
          >
            Email Address *
          </label>
          {errors.email && (
            <p className="mt-2 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={16} />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className="relative">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-dark-bg border-2 rounded-lg text-light-text placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-dark-surface transition-all duration-200 ${
              formData.phone
                ? 'border-gradient-to-r border-purple-500' : 'border-dark-border focus:border-purple-500'
            }`}
            placeholder="Phone Number"
          />
          <label
            htmlFor="phone"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              formData.phone
                ? '-top-2 text-xs bg-dark-surface px-2 text-purple-400' : 'top-3 text-muted-text'
            }`}
          >
            Phone Number (Optional)
          </label>
        </div>

        {/* Subject Dropdown */}
        <div className="relative">
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-dark-bg border-2 rounded-lg text-light-text focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-dark-surface transition-all duration-200 ${
              errors.subject
                ? 'border-error'
                : formData.subject
                  ? 'border-gradient-to-r border-purple-500' : 'border-dark-border focus:border-purple-500'
            }`}
            required
          >
            {subjectOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-dark-bg text-light-text">
                {option.label}
              </option>
            ))}
          </select>
          <label
            htmlFor="subject"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              formData.subject
                ? '-top-2 text-xs bg-dark-surface px-2 text-purple-400' : 'top-3 text-muted-text'
            }`}
          >
            Subject *
          </label>
          {errors.subject && (
            <p className="mt-2 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={16} />
              <span>{errors.subject}</span>
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="relative">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            className={`w-full px-4 py-3 bg-dark-bg border-2 rounded-lg text-light-text placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-dark-surface transition-all duration-200 resize-vertical ${
              errors.message
                ? 'border-error'
                : formData.message
                  ? 'border-gradient-to-r border-purple-500' : 'border-dark-border focus:border-purple-500'
            }`}
            placeholder="Your Message"
            required
          />
          <label
            htmlFor="message"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              formData.message
                ? '-top-2 text-xs bg-dark-surface px-2 text-purple-400' : 'top-3 text-muted-text'
            }`}
          >
            Your Message *
          </label>
          {errors.message && (
            <p className="mt-2 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={16} />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="p-4 bg-error bg-opacity-10 border border-error rounded-lg">
            <p className="text-error flex items-center space-x-2">
              <Icon name="AlertTriangle" size={20} />
              <span>{errors.submit}</span>
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-accent font-medium tracking-wide text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-dark-surface ${
            isSubmitting
              ? 'bg-dark-border cursor-not-allowed' : 'gradient-primary hover:scale-105 active:scale-95'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Sending Message...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Send" size={20} />
              <span>Send Message</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
