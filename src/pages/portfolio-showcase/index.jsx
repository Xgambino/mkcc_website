import React, { useState, useEffect } from "react";
import NavigationBar from "./components/NavigationBar";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import Footer from "../../components/ui/Footer";
import Icon from "../../components/AppIcon";
import CountUp from "react-countup";

const PortfolioShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [loading, setLoading] = useState(false);
  const [startCounting, setStartCounting] = useState(false);
  // Mock project data
  const projects = [
    {
      id: 1,
      title: "Modern Corporate Headquarters",
      category: "Commercial Construction",
      thumbnail:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      description: `A state-of-the-art corporate headquarters featuring sustainable design principles and cutting-edge technology integration. This 15-story building incorporates green building materials, energy-efficient systems, and modern architectural elements that reflect the client's commitment to innovation and environmental responsibility.

The project showcased our expertise in large-scale commercial construction, delivering a workspace that enhances productivity while maintaining environmental consciousness.`,
      clientName: "TechCorp Industries",
      completionDate: "March 2024",
      location: "Downtown Business District",
      duration: "18 months",
      rating: 4.9,
      technologies: [
        "Steel Frame",
        "Glass Curtain Wall",
        "Smart Building Systems",
        "Solar Panels",
        "HVAC Automation",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      ],
      testimonial: {
        content:
          "MKCC delivered exceptional results on our headquarters project. Their attention to detail, commitment to sustainability, and ability to meet tight deadlines exceeded our expectations. The building has become a landmark in our city.",
        author: "Sarah Johnson",
        position: "Chief Operations Officer",
        company: "TechCorp Industries",
      },
      stats: [
        { icon: "Building", value: "15", label: "Floors" },
        { icon: "Users", value: "500+", label: "Employees" },
        { icon: "Zap", value: "30%", label: "Energy Savings" },
      ],
    },
    {
      id: 2,
      title: "Luxury Residential Complex",
      category: "Residential Development",
      thumbnail:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      description: `An exclusive residential complex featuring 120 luxury apartments with premium amenities and modern design. The development includes landscaped gardens, a fitness center, swimming pool, and underground parking. Each unit is designed with high-end finishes and smart home technology.

This project demonstrates our capability in creating sophisticated living spaces that combine comfort, luxury, and functionality for discerning residents.`,
      clientName: "Premier Living Group",
      completionDate: "January 2024",
      location: "Uptown Residential Area",
      duration: "24 months",
      rating: 4.8,
      technologies: [
        "Reinforced Concrete",
        "Smart Home Systems",
        "Landscaping",
        "Security Systems",
        "Parking Automation",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      ],
      testimonial: {
        content:
          "The attention to detail and quality of construction in our residential complex is outstanding. MKCC managed the entire project seamlessly, from design to completion, creating a truly exceptional living environment.",
        author: "Michael Chen",
        position: "Development Director",
        company: "Premier Living Group",
      },
      stats: [
        { icon: "Home", value: "120", label: "Apartments" },
        { icon: "Car", value: "150", label: "Parking Spaces" },
        { icon: "TreePine", value: "5000", label: "Sq Ft Gardens" },
      ],
    },
    {
      id: 3,
      title: "Healthcare Facility Expansion",
      category: "Healthcare Construction",
      thumbnail:
        "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop",
      description: `A comprehensive expansion of a regional medical center, adding specialized treatment wings, advanced diagnostic facilities, and patient care areas. The project required careful coordination with ongoing hospital operations while maintaining the highest standards of cleanliness and safety.

The expansion includes state-of-the-art medical equipment installation, specialized HVAC systems for different medical environments, and patient-centered design elements that promote healing and comfort.`,
      clientName: "Regional Medical Center",
      completionDate: "November 2023",
      location: "Medical District",
      duration: "20 months",
      rating: 4.9,
      technologies: [
        "Medical Grade HVAC",
        "Lead-Lined Walls",
        "Emergency Power Systems",
        "Medical Gas Systems",
        "Infection Control",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop",
      ],
      testimonial: {
        content:
          "MKCC's expertise in healthcare construction was evident throughout the project. They understood the unique requirements of medical facilities and delivered a space that enhances our ability to provide quality patient care.",
        author: "Dr. Emily Rodriguez",
        position: "Chief Medical Officer",
        company: "Regional Medical Center",
      },
      stats: [
        { icon: "Heart", value: "50", label: "Patient Rooms" },
        { icon: "Activity", value: "8", label: "Operating Theaters" },
        { icon: "Shield", value: "100%", label: "Safety Compliance" },
      ],
    },
    {
      id: 4,
      title: "Educational Campus Renovation",
      category: "Educational Construction",
      thumbnail:
        "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
      description: `A comprehensive renovation of a university campus, modernizing classrooms, laboratories, and common areas while preserving the historic character of the original buildings. The project included technology upgrades, accessibility improvements, and energy-efficient systems.

The renovation transformed outdated facilities into modern learning environments that support contemporary educational methods while respecting the architectural heritage of the institution.`,
      clientName: "State University",
      completionDate: "August 2023",
      location: "University District",
      duration: "16 months",
      rating: 4.7,
      technologies: [
        "Historic Preservation",
        "AV Technology",
        "Accessibility Features",
        "Energy Efficiency",
        "Classroom Technology",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
      ],
      testimonial: {
        content:
          "The campus renovation exceeded our expectations. MKCC successfully balanced modern functionality with historic preservation, creating spaces that inspire learning while honoring our institution's heritage.",
        author: "Dr. James Wilson",
        position: "Facilities Director",
        company: "State University",
      },
      stats: [
        { icon: "BookOpen", value: "25", label: "Classrooms" },
        { icon: "Users", value: "2000", label: "Students Served" },
        { icon: "Award", value: "LEED", label: "Gold Certified" },
      ],
    },
    {
      id: 5,
      title: "Industrial Manufacturing Plant",
      category: "Industrial Construction",
      thumbnail:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
      description: `A state-of-the-art manufacturing facility designed for automotive parts production, featuring advanced automation systems, quality control laboratories, and efficient workflow design. The facility incorporates lean manufacturing principles and environmental sustainability measures.

The project required specialized knowledge of industrial processes, heavy equipment installation, and compliance with strict manufacturing standards and safety regulations.`,
      clientName: "AutoTech Manufacturing",
      completionDate: "September 2023",
      location: "Industrial Park",
      duration: "22 months",
      rating: 4.8,
      technologies: [
        "Heavy Steel Construction",
        "Crane Systems",
        "Industrial HVAC",
        "Quality Control Labs",
        "Automation Systems",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
      ],
      testimonial: {
        content:
          "MKCC's industrial construction expertise was crucial to our project's success. They delivered a facility that meets our production requirements while maintaining the highest safety and quality standards.",
        author: "Robert Martinez",
        position: "Plant Manager",
        company: "AutoTech Manufacturing",
      },
      stats: [
        { icon: "Factory", value: "200K", label: "Sq Ft Facility" },
        { icon: "Cog", value: "15", label: "Production Lines" },
        { icon: "TrendingUp", value: "40%", label: "Efficiency Increase" },
      ],
    },
    {
      id: 6,
      title: "Retail Shopping Center",
      category: "Retail Construction",
      thumbnail:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      description: `A modern shopping center featuring diverse retail spaces, dining areas, and entertainment facilities. The design emphasizes natural light, open spaces, and customer flow optimization. The center includes anchor stores, specialty shops, and a food court with outdoor seating areas.

The project showcases our ability to create engaging retail environments that attract customers and provide flexible spaces for various business types while ensuring efficient operations and maintenance.`,
      clientName: "Retail Development Corp",
      completionDate: "December 2023",
      location: "Suburban Commercial Zone",
      duration: "14 months",
      rating: 4.6,
      technologies: [
        "Retail Design",
        "Customer Flow Systems",
        "Parking Management",
        "Security Systems",
        "Tenant Improvements",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519201945132-7b9e46fa1db8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      ],
      testimonial: {
        content:
          "The shopping center design perfectly balances functionality with aesthetic appeal. MKCC created a space that enhances the shopping experience while providing excellent value for our tenants.",
        author: "Lisa Thompson",
        position: "Development Manager",
        company: "Retail Development Corp",
      },
      stats: [
        { icon: "Store", value: "45", label: "Retail Spaces" },
        { icon: "Car", value: "800", label: "Parking Spots" },
        { icon: "Users", value: "10K", label: "Daily Visitors" },
      ],
    },
    {
      id: 7,
      title: "Mixed-Use Development",
      category: "Mixed-Use Construction",
      thumbnail:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      description: `A comprehensive mixed-use development combining residential units, commercial spaces, and office areas in a single integrated complex. The project features sustainable design elements, shared amenities, and pedestrian-friendly spaces that create a vibrant community environment.

This development represents the future of urban planning, creating live-work-play environments that reduce commute times and foster community interaction while maximizing land use efficiency.`,
      clientName: "Urban Development Partners",
      completionDate: "February 2024",
      location: "City Center",
      duration: "26 months",
      rating: 4.9,
      technologies: [
        "Mixed-Use Design",
        "Shared Utilities",
        "Community Spaces",
        "Transit Integration",
        "Sustainable Materials",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      ],
      testimonial: {
        content:
          "MKCC's vision for mixed-use development has created a thriving community space. The integration of residential, commercial, and office spaces has exceeded our expectations for urban development.",
        author: "David Park",
        position: "Project Director",
        company: "Urban Development Partners",
      },
      stats: [
        { icon: "Building2", value: "3", label: "Building Types" },
        { icon: "Home", value: "200", label: "Residential Units" },
        { icon: "Briefcase", value: "50K", label: "Sq Ft Office Space" },
      ],
    },
    {
      id: 8,
      title: "Sports Complex Renovation",
      category: "Sports & Recreation",
      thumbnail:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      description: `A complete renovation of a community sports complex, upgrading facilities for multiple sports, improving accessibility, and adding modern amenities. The project included new playing surfaces, lighting systems, locker rooms, and spectator areas.

The renovation transformed an aging facility into a modern sports complex that serves the community's recreational needs while meeting professional standards for competitive events and tournaments.`,
      clientName: "City Recreation Department",
      completionDate: "June 2023",
      location: "Community Sports District",
      duration: "12 months",
      rating: 4.7,
      technologies: [
        "Sports Surfaces",
        "LED Lighting",
        "Sound Systems",
        "Accessibility Features",
        "Spectator Seating",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      ],
      testimonial: {
        content:
          "The sports complex renovation has revitalized our community's recreational opportunities. MKCC delivered a facility that serves athletes of all levels while creating a gathering place for our community.",
        author: "Maria Gonzalez",
        position: "Recreation Director",
        company: "City Recreation Department",
      },
      stats: [
        { icon: "Trophy", value: "6", label: "Sports Facilities" },
        { icon: "Users", value: "1500", label: "Seating Capacity" },
        { icon: "Calendar", value: "300+", label: "Events Per Year" },
      ],
    },
    {
      id: 9,
      title: "Green Office Building",
      category: "Sustainable Construction",
      thumbnail:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      description: `An innovative office building designed with sustainability as the primary focus, featuring renewable energy systems, rainwater harvesting, green roofs, and energy-efficient building materials. The building serves as a model for environmentally responsible construction.

This project demonstrates our commitment to sustainable building practices and our ability to create structures that minimize environmental impact while providing comfortable, productive work environments for occupants.`,
      clientName: "EcoTech Solutions",
      completionDate: "October 2023",
      location: "Green Business Park",
      duration: "15 months",
      rating: 4.9,
      technologies: [
        "Solar Panels",
        "Rainwater Harvesting",
        "Green Roof Systems",
        "Energy Recovery",
        "Sustainable Materials",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      ],
      testimonial: {
        content:
          "MKCC's expertise in sustainable construction helped us achieve our environmental goals while creating an inspiring workplace. The building has become a showcase for green building practices in our industry.",
        author: "Jennifer Adams",
        position: "Sustainability Director",
        company: "EcoTech Solutions",
      },
      stats: [
        { icon: "Leaf", value: "LEED", label: "Platinum Certified" },
        { icon: "Zap", value: "50%", label: "Energy Reduction" },
        { icon: "Droplets", value: "40%", label: "Water Savings" },
      ],
    },
  ];

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleProjects((prev) => Math.min(prev + 3, projects.length));
      setLoading(false);
    }, 1000);
  };

  const displayedProjects = projects.slice(0, visibleProjects);
  const hasMoreProjects = visibleProjects < projects.length;
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setStartCounting(true);
        observer.disconnect(); // Only run once
      }
    },
    {
      threshold: 0.3, // Trigger when 30% visible
    }
  );

  const statsSection = document.getElementById('stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }

  return () => observer.disconnect();
}, []);

  return (
    <div className="min-h-screen bg-dark-bg">
      <NavigationBar />

      {/* Hero Section */}
 <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden font-outfit">
  <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-dark-bg to-blue-900 opacity-50" />
  <div className="relative max-w-7xl mx-auto text-center">
    <div className="mb-8">
      <h1 className="text-4xl md:text-6xl font-heading font-bold text-light-text mb-6">
        Our <span className="gradient-text">Portfolio</span>
      </h1>
      <p className="text-xl text-muted-text max-w-3xl mx-auto leading-relaxed">
        Explore our diverse collection of construction projects that
        showcase our expertise, innovation, and commitment to excellence
        across various sectors.
      </p>
    </div>

    {/* Stats */}
    <div
      id="stats-section"
      className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-10"
    >
      {[
        {
          label: "Completed Projects",
          end: projects.length,
          suffix: "+",
        },
        { label: "Years Experience", end: 5, suffix: "+" },
        { label: "Client Satisfaction", end: 98, suffix: "%" },
        { label: "Team Members", end: 50, suffix: "+" },
      ].map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-4xl font-bold text-white mb-2">
            {startCounting ? (
              <CountUp end={stat.end} duration={2} suffix={stat.suffix} />
            ) : (
              `0${stat.suffix}`
            )}
          </div>
          <div className="text-muted-text text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Portfolio Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              "All Projects",
              "Commercial",
              "Residential",
              "Healthcare",
              "Educational",
              "Industrial",
            ].map((filter) => (
              <button
                key={filter}
                className="px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-dark-surface border border-dark-border text-muted-text hover:text-white hover:border-purple-500"
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreProjects && (
            <div className="text-center">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-700 to-blue-600 text-white font-medium rounded-lg hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-dark-bg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <Icon name="Loader2" size={20} className="animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>Load More Projects</span>
                    <Icon name="ChevronDown" size={20} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-surface">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-light-text mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-muted-text mb-8 leading-relaxed">
            Let's discuss how we can bring your construction vision to life with
            our expertise and dedication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-700 to-blue-600 text-white font-medium rounded-lg hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-dark-surface">
              <Icon name="MessageSquare" size={20} />
              <span>Get a Quote</span>
            </button>
            <button className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-purple-500 text-white font-medium rounded-lg hover:bg-purple-500 hover:bg-opacity-10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-dark-surface">
              <Icon name="Phone" size={20} />
              <span>Call Us Today</span>
            </button>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <Footer />
    </div>
  );
};

export default PortfolioShowcase;
