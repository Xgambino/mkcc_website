import React, { useEffect, useRef, useState } from "react";
import NavigationBar from "./components/NavigationBar";
import GradientButton from "./components/GradientButton";
import ServiceCard from "./components/ServiceCard";
import Footer from "../../components/ui/Footer";
import Icon from "../../components/AppIcon";
import Image from "../../components/AppImage";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Homepage = () => {
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const services = [
    {
      id: 1,
      icon: "Building2",
      title: "Construction Management",
      description:
        "Comprehensive project management services ensuring timely delivery and quality construction with expert oversight and coordination.",
    },
    {
      id: 2,
      icon: "Compass",
      title: "Architectural Design",
      description:
        "Innovative architectural solutions that blend functionality with aesthetic appeal, creating spaces that inspire and endure.",
    },
    {
      id: 3,
      icon: "Calculator",
      title: "Cost Estimation",
      description:
        "Accurate project cost analysis and budgeting services to help you plan and execute construction projects within budget.",
    },
    {
      id: 4,
      icon: "Shield",
      title: "Quality Assurance",
      description:
        "Rigorous quality control and inspection services ensuring all construction meets the highest industry standards and regulations.",
    },
    {
      id: 5,
      icon: "Users",
      title: "Project Consulting",
      description:
        "Expert consultation services providing strategic guidance and technical expertise for complex construction challenges.",
    },
    {
      id: 6,
      icon: "FileText",
      title: "Permit & Documentation",
      description:
        "Complete permit acquisition and documentation services, handling all regulatory requirements and compliance matters.",
    },
  ];

  const companyStats = [
    { number: "150+", label: "Projects Completed" },
    { number: "25+", label: "Years Experience" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Expert Team Members" },
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <NavigationBar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-dark-bg to-dark-surface animate-pulse-gradient" />

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-purple-500 rounded-full animate-pulse" />
          <div
            className="absolute top-40 right-32 w-24 h-24 border border-blue-500 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-32 left-1/4 w-40 h-40 border border-amber-500 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in">
            {/* Company Name */}
            <h1 className="text-hero leading-tight">
              <span className="block text-light-text font-heading font-bold">
                Maryann Kanyike
              </span>
              <span className="block gradient-text font-heading font-bold">
                Construction Consultants
              </span>
            </h1>

            {/* Slogan */}
            <p className="text-2xl md:text-3xl font-accent font-medium gradient-text">
              The Best of Construction
            </p>

            {/* Description */}
            <div
              id="hero-description"
              data-animate
              className={`max-w-3xl mx-auto transition-all duration-1000 ${
                isVisible["hero-description"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-body-large text-muted-text leading-relaxed mb-8">
                With over 25 years of excellence in construction consulting, we
                transform visions into reality through innovative design,
                meticulous planning, and uncompromising quality. Your trusted
                partner for exceptional construction solutions.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <GradientButton
                size="large"
                icon="ArrowRight"
                iconPosition="right"
                onClick={() => scrollToSection("about")}
              >
                Learn More
              </GradientButton>

              <GradientButton
                variant="outline"
                size="large"
                icon="Phone"
                onClick={() => scrollToSection("contact")}
              >
                Get Quote
              </GradientButton>
            </div>

            {/* Stats */}
            <div
              ref={ref}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-dark-border"
            >
              {companyStats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center animate-fadeInUp"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-2">
                    <CountUp end={parseInt(stat.number)} duration={2} />
                    {stat.number.replace(/[0-9]/g, "")}
                  </div>
                  <div className="text-muted-text text-body-small">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection("about")}
            className="p-2 rounded-full text-muted-text hover:text-light-text transition-colors duration-200"
            aria-label="Scroll to about section"
          >
            <Icon name="ChevronDown" size={24} />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="about-content"
            data-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible["about-content"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-section text-light-text mb-6">
              Building Excellence Since 2019
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-body-large text-muted-text leading-relaxed mb-8">
                Maryann Kanyike Construction Consultants has been at the
                forefront of construction innovation for over two decades. We
                specialize in delivering comprehensive construction consulting
                services that ensure your projects are completed on time, within
                budget, and to the highest quality standards.
              </p>
              <p className="text-body text-muted-text leading-relaxed">
                Our team of experienced professionals brings together expertise
                in project management, architectural design, cost estimation,
                and quality assurance to provide end-to-end solutions for
                residential, commercial, and industrial construction projects.
              </p>
            </div>
          </div>

          {/* Company Image */}
          <div
            id="about-image"
            data-animate
            className={`relative max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible["about-image"]
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="https://thumbs.dreamstime.com/b/workers-construction-site-hard-work-building-along-ngong-road-nairobi-kenya-61385013.jpg"
                alt="Construction site with modern building"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="services-header"
            data-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible["services-header"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-section text-light-text mb-6">
              Our Core Services
            </h2>
            <p className="text-body-large text-muted-text max-w-3xl mx-auto leading-relaxed">
              We offer comprehensive construction consulting services designed
              to meet every aspect of your project needs, from initial planning
              to final delivery.
            </p>
          </div>

          {/* Services Grid */}
          <div
            id="services-grid"
            data-animate
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
              isVisible["services-grid"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="contact-content"
            data-animate
            className={`text-center transition-all duration-1000 ${
              isVisible["contact-content"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-section text-light-text mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-body-large text-muted-text max-w-3xl mx-auto leading-relaxed mb-12">
              Get in touch with our expert team today for a consultation. We're
              here to help bring your construction vision to life with
              professional guidance and exceptional service.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <GradientButton
                size="large"
                icon="MessageCircle"
                onClick={() => (window.location.href = "/contact-us")}
              >
                Get Free Consultation
              </GradientButton>

              <GradientButton
                variant="outline"
                size="large"
                icon="Phone"
                onClick={() =>
                  (window.location.href = "tel:+254 (768) 761-105")
                }
              >
                Call Now: +254 (768) 761-105
              </GradientButton>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-dark-bg rounded-xl p-6 border border-dark-border">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Icon name="MapPin" size={24} color="white" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-light-text mb-2">
                  Visit Our Office
                </h3>
                <p className="text-muted-text text-body-small">
                  4th Floor,Equity Buildinge
                  <br />
                  Embu, Kenya.
                </p>
              </div>

              <div className="bg-dark-bg rounded-xl p-6 border border-dark-border">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Icon name="Phone" size={24} color="white" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-light-text mb-2">
                  Call Us
                </h3>
                <p className="text-muted-text text-body-small">
                  +254 (768) 761-105
                  <br />
                  {/* +256-750-987654 */}
                </p>
              </div>

              <div className="bg-dark-bg rounded-xl p-6 border border-dark-border">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" size={24} color="white" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-light-text mb-2">
                  Email Us
                </h3>
                <p className="text-muted-text text-body-small">
                  namutebikanyike2@gmail.com
                  <br />
                  {/* projects@mkcc.co.ug */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="full" />
    </div>
  );
};

export default Homepage;
