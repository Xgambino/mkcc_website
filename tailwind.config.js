/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary-dark': '#1e1b4b', // Main background color for dark sections - indigo-950
        'primary-blue': '#2563eb', // Primary accent color for interactive elements - blue-600
        'primary-purple': '#7e22ce', // Secondary accent color for highlights and gradients - purple-700
        
        // Neutral Colors
        'dark-bg': '#0e0e2f', // Main background color for the website - slate-950
        'dark-surface': '#0f172a', // Card and surface backgrounds - slate-900
        'dark-border': '#1e293b', // Subtle borders and dividers - slate-800
        'light-text': '#f5f5f7', // Primary text color on dark backgrounds - slate-50
        'muted-text': '#94a3b8', // Secondary and muted text - slate-400
        
        // Semantic Colors
        'success': '#059669', // Success states and confirmations - emerald-600
        'error': '#e11d48', // Error states and alerts - rose-600
        'primary-gold': '#f59e0b', // Gold accent color - amber-500
        'gold-light': '#fcd34d', // Light gold - yellow-300
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
        accent: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(45deg, #7e22ce, #2563eb)', // Primary gradient
        'gradient-accent': 'linear-gradient(45deg, #f59e0b, #fcd34d)', // Gold accent gradient
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-gradient': 'pulseGradient 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulseGradient: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}