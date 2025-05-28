import React from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import ServiceCard from '../../components/ui/ServiceCard';
import SectionHeading from '../../components/ui/SectionHeading';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';

const Services = () => {
  const servicesData = [
    {
      id: 1,
      icon: "Compass",
      title: "Construction Design",
      description: `Comprehensive architectural and engineering design services that transform your vision into detailed construction plans. Our expert team creates innovative, sustainable, and cost-effective designs that meet all regulatory requirements while maximizing functionality and aesthetic appeal.`,
      link: "#construction-design",
      isHighlighted: true
    },
    {
      id: 2,
      icon: "FileCheck",
      title: "Regulatory Approvals",
      description: `Navigate complex regulatory landscapes with confidence. We handle all permit applications, compliance documentation, and regulatory submissions to ensure your project meets local building codes, environmental standards, and safety regulations from conception to completion.`,
      link: "#regulatory-approvals"
    },
    {
      id: 3,
      icon: "Users",
      title: "Project Management",
      description: `End-to-end project management services that ensure timely delivery within budget. Our certified project managers coordinate all stakeholders, manage resources efficiently, and maintain quality standards throughout the construction lifecycle using proven methodologies.`,
      link: "#project-management"
    },
    {
      id: 4,
      icon: "Smartphone",
      title: "Digitalization",
      description: `Leverage cutting-edge technology to modernize your construction processes. We implement BIM modeling, digital project tracking, IoT monitoring systems, and cloud-based collaboration tools to enhance efficiency, reduce costs, and improve project outcomes.`,
      link: "#digitalization"
    },
    {
      id: 5,
      icon: "Handshake",
      title: "Strategic Partnerships",
      description: `Build lasting relationships with trusted industry partners. We facilitate connections with reliable contractors, suppliers, and specialists while managing partnership agreements to ensure seamless collaboration and optimal project delivery for all stakeholders involved.`,
      link: "#strategic-partnerships"
    }
  ];

  const approachPoints = [
    {
      icon: "Target",
      title: "Client-Centric Approach",
      description: "Every solution is tailored to meet your specific needs and objectives."
    },
    {
      icon: "Award",
      title: "Quality Excellence",
      description: "We maintain the highest standards in every aspect of our service delivery."
    },
    {
      icon: "Clock",
      title: "Timely Delivery",
      description: "Committed to meeting deadlines without compromising on quality or safety."
    },
    {
      icon: "Shield",
      title: "Risk Management",
      description: "Proactive identification and mitigation of potential project risks."
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      <NavigationBar />
      
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionHeading
              subtitle="Our Services"
              title="Comprehensive Construction Solutions"
              description="From initial design concepts to final project delivery, MKCC provides end-to-end construction consultancy services that ensure your project's success. Our integrated approach combines technical expertise with innovative solutions to deliver exceptional results."
              size="large"
            />
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {servicesData.map((service) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                link={service.link}
                isHighlighted={service.isHighlighted}
                className="h-full"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 lg:py-24 bg-dark-surface bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionHeading
              subtitle="Our Approach"
              title="Why Choose MKCC"
              description="Our proven methodology and commitment to excellence sets us apart in the construction consultancy industry. We combine traditional expertise with modern innovation to deliver outstanding results."
              size="medium"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approachPoints.map((point, index) => (
              <div 
                key={index}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-dark-border group-hover:gradient-primary transition-all duration-300 flex items-center justify-center">
                  <Icon 
                    name={point.icon} 
                    size={32} 
                    color="white"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-heading font-semibold text-light-text mb-4 group-hover:gradient-text transition-all duration-300">
                  {point.title}
                </h3>
                <p className="text-muted-text text-body leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 font-outfit">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl gradient-primary p-8 lg:p-12 text-center overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white bg-opacity-20 -translate-x-16 -translate-y-16" />
              <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-white bg-opacity-10 translate-x-24 translate-y-24" />
            </div>
            
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-white text-opacity-90 mb-8 max-w-2xl mx-auto font-outfit">
                Let's discuss how MKCC can bring your construction vision to life with our comprehensive consultancy services.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <a
                  href="/contact-us"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-purple-700 font-accent font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-700"
                >
                  <span>Get Started Today</span>
                  <Icon name="ArrowRight" size={20} />
                </a>
                <a
                  href="/portfolio-showcase"
                  className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white text-white font-accent font-semibold rounded-lg hover:bg-white hover:text-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-700"
                >
                  <span>View Our Work</span>
                  <Icon name="ExternalLink" size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;