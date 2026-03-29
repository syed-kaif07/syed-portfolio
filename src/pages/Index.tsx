import MainLayout from "@/layouts/MainLayout";
import DockNav from "@/components/DockNav";
import HeroSection from "@/components/sections/HeroSection";
import TechStackSection from "@/components/sections/TechStackSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import WhatIBuildSection from "@/components/sections/WhatIBuildSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <MainLayout>
      <DockNav />
      <HeroSection />
      <TechStackSection />
      <ProjectsSection />
      <WhatIBuildSection />
      <SkillsSection />
      <ContactSection />
    </MainLayout>
  );
};

export default Index;