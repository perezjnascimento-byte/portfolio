import React, { useState, useEffect, useRef } from 'react';
import type { Project } from '../types/portfolio';
import { ArrowUpRight, Play, Pause } from 'lucide-react';


interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  // Size can dictate grid spans if needed, but aspect ratio is strictly controlled now
  size?: 'normal' | 'tall' | 'large';
  // Allow passing an explicit aspect ratio class for featured projects (e.g. aspect-[16/9] or aspect-[4/5])
  aspectClass?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  aspectClass = 'aspect-[4/5]' // Default to a tall poster layout for consistency
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Ensure coverImage is always the first slide
  const slides = project.images && project.images.length > 0
    ? [project.coverImage, ...project.images.filter(img => img !== project.coverImage)]
    : [project.coverImage];
  const hasMultipleSlides = slides.length > 1;

  useEffect(() => {
    // Only run slideshow when hovered
    if (!hasMultipleSlides || !isHovered || project.videoUrl) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hasMultipleSlides, isHovered, slides.length, project.videoUrl]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    // Optional: setCurrentSlideIndex(0); // If we want to reset on mouse leave
  };

  return (
    <a
      href={`#projeto-${project.id}`}
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        onSelect(project);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer w-full transition-all duration-500 h-full flex flex-col block"
    >
      {/* Media Container — strict aspect ratio for masonry grid alignment */}
      <div 
        className={`relative w-full overflow-hidden bg-[#050505] rounded-sm ${aspectClass} flex-grow`}
        style={{ transform: 'translateZ(0)' }}
      >

        {/* Video or Image Slides */}
        {project.videoUrl ? (
          <div className="relative w-full h-full">
            <video
              src={project.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute top-4 left-4 z-30 text-[10px] uppercase tracking-wider text-white bg-black/40 px-2 py-1 rounded font-body backdrop-blur-md flex items-center gap-1.5">
              <Play className="w-3 h-3 fill-current" />
              <span>Motion</span>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img
              src={slides[0]}
              alt={`${project.title} - Cover`}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
            
            {project.embedUrl && (
              <div className="absolute top-4 left-4 z-30 text-[10px] uppercase tracking-wider text-white bg-black/40 px-2 py-1 rounded font-body backdrop-blur-md flex items-center gap-1.5">
                <Play className="w-3 h-3 fill-current" />
                <span>Motion</span>
              </div>
            )}
            
            {/* Additional slides fade in on top */}
            {hasMultipleSlides && slides.slice(1).map((imgUrl, idx) => {
              const actualIdx = idx + 1;
              return (
                <div
                  key={actualIdx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    actualIdx === currentSlideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${project.title} - Slide ${actualIdx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Hover play indicator */}
        {hasMultipleSlides && !project.videoUrl && (
          <div className={`absolute top-4 left-4 z-30 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white bg-black/40 px-2 py-1 rounded font-body backdrop-blur-md">
              <Play className="w-3 h-3" />
              <span>{currentSlideIndex + 1}/{slides.length}</span>
            </span>
          </div>
        )}

        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />

        {/* Text content over the image — Cinematic Hover Reveal */}
        <div className="absolute inset-0 z-30 p-5 sm:p-6 flex flex-col justify-end opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out pointer-events-none">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold font-heading text-white tracking-tight leading-tight line-clamp-3">
                {project.title}
              </h3>
              <div className="text-[9px] sm:text-[10px] text-slate-300 font-body uppercase tracking-[0.2em] mt-2 flex flex-wrap items-center gap-2">
                {project.tags?.slice(0, 2).map((tag, idx) => (
                  <React.Fragment key={tag}>
                    {idx > 0 && <span className="w-1 h-1 rounded-full bg-[#05F2F2] flex-shrink-0 shadow-[0_0_8px_#05F2F2]" />}
                    <span className="truncate">{tag}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="w-8 h-8 flex-shrink-0 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white mt-1">
              <ArrowUpRight className="w-4 h-4 stroke-[2]" />
            </div>
          </div>

          {/* Slide progress dots */}
          {hasMultipleSlides && !project.videoUrl && (
            <div className="flex items-center gap-1.5 pt-4">
              {slides.map((_, dotIdx) => (
                <div
                  key={dotIdx}
                  className={`h-[1px] transition-all duration-500 ${
                    dotIdx === currentSlideIndex
                      ? 'w-6 bg-white'
                      : 'w-3 bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </a>
  );
};
