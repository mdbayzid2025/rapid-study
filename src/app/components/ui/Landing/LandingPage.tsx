import React from 'react';
import LandingHeader from './LandingHeader';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import AboutSection from './AboutSection';
import DashboardPreview from './DashboardPreview';
import TestimonialsSection from './TestimonialsSection';
import LandingFooter from './LandingFooter';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* <LandingHeader /> */}
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <DashboardPreview />
      <TestimonialsSection />      
      <LandingFooter />
    </div>
  );
};

export default LandingPage;