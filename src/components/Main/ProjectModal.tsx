import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Calendar, Code2 } from 'lucide-react';
import { Button } from '../ui/button';

interface ProjectData {
  title: string;
  description: string;
  coverImage?: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
}

// Ten komponent będzie pobierał dane z przekazanego JSON-a (wszystkie projekty)
// i wyświetlał odpowiedni na podstawie URL query params (?project=slug)
interface ProjectModalProps {
  projects: Array<{
    slug: string;
    data: ProjectData;
    body?: string;
  }>;
}

export const ProjectModal = ({ projects }: ProjectModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    // Funkcja sprawdzająca URL
    const checkUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const projectSlug = params.get('project');

      if (projectSlug) {
        const foundProject = projects.find(p => p.slug === projectSlug);
        if (foundProject) {
          setCurrentProject(foundProject);
          setIsOpen(true);
          document.body.style.overflow = 'hidden'; // Blokada scrolla tła
        } else {
            // Jeśli slug nieprawidłowy, czyścimy
            closeModal();
        }
      } else {
        setIsOpen(false);
        setCurrentProject(null);
        document.body.style.overflow = '';
      }
    };

    // Sprawdź na start
    checkUrl();

    // Nasłuchuj zmian w historii (pushState/popState)
    window.addEventListener('popstate', checkUrl);
    
    // Hack na wykrywanie pushState (który domyślnie nie emituje zdarzeń)
    // W Astro nawigacja między stronami (View Transitions) może to zmieniać, 
    // ale tu jesteśmy w trybie "Single Page" dla modala.
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
        originalPushState.apply(this, args);
        checkUrl();
    };

    return () => {
        window.removeEventListener('popstate', checkUrl);
        history.pushState = originalPushState;
        document.body.style.overflow = '';
    };
  }, [projects]);

  const closeModal = () => {
    // Usuń parametr ?project z URL bez przeładowania
    const url = new URL(window.location.href);
    url.searchParams.delete('project');
    window.history.pushState({}, '', url.toString());
    
    setIsOpen(false);
    setTimeout(() => setCurrentProject(null), 300); // Wyczyść po animacji
    document.body.style.overflow = '';
  };

  return (
    <AnimatePresence>
      {isOpen && currentProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-background border border-border rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()} // Zatrzymaj propagację kliknięcia
          >
            {/* Zamknij przycisk */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Obrazek (Lewa strona / Góra) */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-muted relative overflow-hidden">
               {currentProject.data.coverImage ? (
                 <img 
                   src={currentProject.data.coverImage} 
                   alt={currentProject.data.title}
                   className="absolute inset-0 w-full h-full object-cover"
                 />
               ) : (
                 <div className="flex items-center justify-center h-full text-muted-foreground">Brak podglądu</div>
               )}
               <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent md:hidden"></div>
            </div>

            {/* Treść (Prawa strona / Dół) */}
            <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col bg-background">
                <div className="mb-6">
                    <h2 className="text-4xl md:text-5xl font-black font-display uppercase tracking-tighter mb-2 leading-none">
                        {currentProject.data.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {currentProject.data.techStack.map((tech) => (
                            <span key={tech} className="text-xs font-bold px-3 py-1 bg-muted rounded-full border border-border uppercase tracking-wide">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="prose prose-sm dark:prose-invert max-w-none flex-grow mb-8 text-muted-foreground">
                    <p>{currentProject.data.description}</p>
                    {/* Tu można by renderować body z MDX, ale na razie prosty opis */}
                    <div className="mt-4 p-4 bg-muted/30 rounded border border-border/50">
                        <h4 className="flex items-center gap-2 font-bold text-foreground mb-2">
                            <Code2 size={16} /> Detale
                        </h4>
                        <p className="text-xs">
                            To jest miejsce na szerszy opis projektu pobierany z pliku Markdown. 
                            Można tu opisać wyzwania, proces twórczy i rezultaty.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 mt-auto pt-6 border-t border-border">
                    {currentProject.data.liveUrl && (
                        <Button asChild className="flex-1 font-bold uppercase tracking-wider" size="lg">
                            <a href={currentProject.data.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink size={18} className="mr-2" /> Live Demo
                            </a>
                        </Button>
                    )}
                    {currentProject.data.repoUrl && (
                        <Button asChild variant="outline" className="flex-1 font-bold uppercase tracking-wider" size="lg">
                            <a href={currentProject.data.repoUrl} target="_blank" rel="noopener noreferrer">
                                <Github size={18} className="mr-2" /> Kod
                            </a>
                        </Button>
                    )}
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
