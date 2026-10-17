import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection, { projectsData } from './components/ProjectsSection';
import ContactModal from './components/ContactModal';
import PricingModal from './components/PricingModal';
import ProjectModal, { ProjectData } from './components/ProjectModal';
import FloatingBackToTop from './components/FloatingBackToTop';
import Footer from './components/Footer';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  const handleOpenPricing = () => setIsPricingOpen(true);
  const handleClosePricing = () => setIsPricingOpen(false);

  const handleOpenProject = (project: ProjectData) => setSelectedProject(project);
  const handleCloseProject = () => setSelectedProject(null);

  return (
    <div
      className="bg-[#0C0C0C] text-[#D7E2EA] min-h-screen w-full relative selection:bg-[#B600A8] selection:text-white"
      style={{ overflowX: 'clip' }}
    >
      {/* SECTION ORDER:
          1. HeroSection
          2. MarqueeSection
          3. AboutSection
          4. ServicesSection
          5. ProjectsSection
      */}
      <HeroSection
        onOpenContact={handleOpenContact}
        onOpenPrice={handleOpenPricing}
      />

      <MarqueeSection />

      <AboutSection onOpenContact={handleOpenContact} />

      <ServicesSection />

      <ProjectsSection onOpenProject={handleOpenProject} />

      <Footer onOpenContact={handleOpenContact} />

      {/* Floating Back to Top Button */}
      <FloatingBackToTop />

      {/* Interactive modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={handleCloseContact}
      />

      <PricingModal
        isOpen={isPricingOpen}
        onClose={handleClosePricing}
        onOpenContact={handleOpenContact}
      />

      <ProjectModal
        project={selectedProject}
        onClose={handleCloseProject}
        onSelectProject={setSelectedProject}
        allProjects={projectsData}
        onOpenContact={handleOpenContact}
      />
    </div>
  );
}
