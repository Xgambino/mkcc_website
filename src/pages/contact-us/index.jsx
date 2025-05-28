import React from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import ContactForm from '../../components/ui/ContactForm';
import GoogleMap from '../../components/ui/GoogleMap';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';

const ContactUs = () => {
  const contactInfo = [
    {
      icon: 'MapPin',
      title: 'Office Address',
      details: `4th Floor,Equity Building
Embu, Kenya.`,
      link: null
    },
    {
      icon: 'Phone',
      title: 'Phone Number',
      details: '+254 (768) 761-105',
      link: 'tel:+254 (768) 761-105'
    },
    {
      icon: 'Mail',
      title: 'Email Address',
      details: 'namutebikanyike2@gmail.com',
      link: 'mailto:namutebikanyike2@gmail.com'
    },
    {
      icon: 'Clock',
      title: 'Business Hours',
      details: `Monday - Friday: 8:00 AM - 6:00 PM
Saturday: 9:00 AM - 4:00 PM
Sunday: Closed`,
      link: null
    }
  ];

  const officeFeatures = [
    {
      icon: 'Shield',
      title: 'Licensed & Insured',
      description: 'Fully licensed construction consultants with comprehensive insurance coverage.'
    },
    {
      icon: 'Award',
      title: '15+ Years Experience',
      description: 'Over a decade of successful construction projects across Uganda.'
    },
    {
      icon: 'Users',
      title: 'Expert Team',
      description: 'Certified engineers, architects, and project management professionals.'
    },
    {
      icon: 'CheckCircle',
      title: 'Quality Assured',
      description: 'Committed to delivering projects on time and within budget.'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      <NavigationBar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-light-text mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-muted-text max-w-3xl mx-auto leading-relaxed">
              Ready to bring your construction vision to life? Contact Maryann Kanyike Construction Consultants today for expert guidance and professional service.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-dark-surface rounded-xl p-6 border border-dark-border hover:border-purple-500 transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Icon name={info.icon} size={24} color="white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-heading font-semibold text-light-text mb-2">
                      {info.title}
                    </h3>
                    {info.link ? (
                      <a 
                        href={info.link}
                        className="text-muted-text hover:text-white transition-colors duration-200 focus:outline-none focus:text-white"
                      >
                        {info.details}
                      </a>
                    ) : (
                      <p className="text-muted-text whitespace-pre-line">
                        {info.details}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Google Map */}
              <div>
                <h3 className="text-2xl font-heading font-bold text-light-text mb-6">
                  Find Our Office
                </h3>
                <GoogleMap 
                  latitude={-0.536318589438083} 
                  longitude={37.45151388425389}
                  height="400px"
                  title="MKCC Office Location"
                  className="shadow-lg"
                />
              </div>

              {/* Office Features */}
              <div className="bg-dark-surface rounded-xl p-8 border border-dark-border">
                <h3 className="text-2xl font-heading font-bold text-light-text mb-6">
                  Why Choose MKCC?
                </h3>
                <div className="space-y-6">
                  {officeFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                        <Icon name={feature.icon} size={20} color="white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-heading font-semibold text-light-text mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-muted-text text-body-small">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-700 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-white text-opacity-90 mb-8 leading-relaxed">
            Let's discuss your construction needs and create something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="tel:+256700123456"
              className="inline-flex items-center space-x-2 bg-white text-purple-700 px-8 py-4 rounded-lg font-accent font-medium tracking-wide hover:bg-opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-700"
            >
              <Icon name="Phone" size={20} />
              <span>Call Now</span>
            </a>
            <a
              href="mailto:info@mkcc.co.ug"
              className="inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg font-accent font-medium tracking-wide hover:bg-white hover:text-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-700"
            >
              <Icon name="Mail" size={20} />
              <span>Send Email</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;