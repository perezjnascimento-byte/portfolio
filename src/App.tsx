import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PROJECTS_DATA } from './data/projectsData';
import type { Project } from './types/portfolio';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ProjectsView } from './components/ProjectsView';
import { CaseStudyView } from './components/CaseStudyView';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'projects' | 'about' | 'casestudy'>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Scroll to top whenever tab or selected project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, selectedProject]);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setActiveTab('casestudy');
  };

  const handleNavigateProjects = () => {
    setSelectedProject(null);
    setActiveTab('projects');
  };

  const handleNavigateAbout = () => {
    setSelectedProject(null);
    setActiveTab('about');
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-slate-100 flex flex-col justify-between selection:bg-[#05F2F2] selection:text-[#050505] overflow-x-clip">
      {/* Glassmorphism Header */}
      <Header
        activeTab={activeTab === 'casestudy' ? 'projects' : activeTab}
        setActiveTab={(tab) => {
          setSelectedProject(null);
          setActiveTab(tab);
        }}
      />


      {/* Main Page View Switcher */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <HomeView
                projects={PROJECTS_DATA}
                onSelectProject={handleSelectProject}
                onNavigateProjects={handleNavigateProjects}
                onNavigateAbout={handleNavigateAbout}
              />
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectsView
                projects={PROJECTS_DATA}
                onSelectProject={handleSelectProject}
              />
            </motion.div>
          )}

          {activeTab === 'casestudy' && selectedProject && (
            <motion.div
              key={`casestudy-${selectedProject.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <CaseStudyView
                project={selectedProject}
                onBack={handleNavigateProjects}
                onSelectNextProject={handleSelectProject}
                allProjects={PROJECTS_DATA}
              />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <AboutView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        onNavigateProjects={handleNavigateProjects}
        onNavigateAbout={handleNavigateAbout}
      />
    </div>
  );
}

export default App;
