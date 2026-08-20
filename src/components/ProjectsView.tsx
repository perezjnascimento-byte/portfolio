import React, { useState } from 'react';
import type { Project } from '../types/portfolio';
import { ProjectCard } from './ProjectCard';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
};


interface ProjectsViewProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onSelectProject
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['Todos', 'Design', 'Audiovisual', 'Motion Graphics', 'Fotografia'];

  const filteredProjects = projects.filter((project) => {
    if (project.hideFromGallery) return false;

    const matchesCategory =
      selectedCategory === 'Todos' || 
      (project.categories && project.categories.includes(selectedCategory));

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });


  return (
    <div className="pt-28 pb-24 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 text-left">
      
      {/* Header */}
      <div className="space-y-3 pb-6">
        <motion.h1 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
          className="text-4xl sm:text-6xl font-bold font-heading text-white tracking-tight"
        >
          Todos os projetos
        </motion.h1>
        <p className="text-slate-500 max-w-xl text-sm font-body leading-relaxed">
          Identidades visuais, direção de arte, mídia OOH e motion design.
        </p>
      </div>

      {/* Filter & Search — text-based filters, no pills with borders */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[#111111] pb-4">
        
        {/* Category text filters */}
        <div className="flex flex-wrap gap-6">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative text-xs tracking-wider uppercase font-semibold pb-1 ${
                  isActive
                    ? 'text-[#05F2F2]'
                    : 'text-slate-500 hover:text-white'
                }`}
                whileHover={{ scale: 1.02, transition: { type: "spring" as const, stiffness: 300, damping: 20 } }}
                whileTap={{ scale: 0.96, transition: { type: "spring" as const, stiffness: 400, damping: 17 } }}
              >
                {cat}
                {isActive && (
                  <motion.span 
                    layoutId="activeCategory"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#05F2F2]" 
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-transparent border-b border-[#111111] focus:border-[#03738C] text-white text-xs font-body placeholder:text-slate-600 focus:outline-none transition-colors"
          />
        </div>
      </div>


      {/* Projects Grid — Horizontal Layout */}
      {filteredProjects.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {filteredProjects.map((project) => {
            return (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard
                  project={project}
                  onSelect={onSelectProject}
                  aspectClass="aspect-[16/9]"
                />
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-lg font-bold font-heading text-white">Nenhum projeto encontrado</h3>
          <p className="text-xs text-slate-500 mt-2 font-body">
            Tente mudar o filtro ou a busca.
          </p>
          <motion.button
            onClick={() => {
              setSelectedCategory('Todos');
              setSearchQuery('');
            }}
            className="mt-4 text-xs text-[#05F2F2] hover:text-[#F2E205] font-semibold uppercase tracking-wider"
            whileHover={{ scale: 1.02, transition: { type: "spring" as const, stiffness: 300, damping: 20 } }}
            whileTap={{ scale: 0.96, transition: { type: "spring" as const, stiffness: 400, damping: 17 } }}
          >
            Limpar filtros
          </motion.button>
        </div>
      )}
    </div>
  );
};
