import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from './ThemeProvider';

const exerciseItems = [
  {
    name: 'RRT',
    path: '/rrt',
    description: 'RRT',
    icon: (
      <svg xmlns="" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="" />
      </svg>
    )
  },
  
];

const navItems = [
  
];

export function Layout({ children }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">

            <span className="font-bold text-xl">Testung von RRT</span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "relative px-4 py-2 rounded-md transition-colors flex items-center space-x-2",
                  "hover:bg-accent hover:text-accent-foreground",
                  exerciseItems.some(item => location.pathname === item.path)
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                )}
              >

                <span>Exercises</span>
                <svg
                  xmlns="https://github.com/dolev765/wasd/blob/main/picture-1200.png?raw=true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className={cn("w-4 h-4 transition-transform", isOpen ? "rotate-180" : "")}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-popover rounded-md shadow-lg border"
                  >
                    <div className="py-1">
                      {exerciseItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "block px-4 py-2 text-sm transition-colors",
                            "hover:bg-accent hover:text-accent-foreground",
                            location.pathname === item.path
                              ? "bg-accent text-accent-foreground"
                              : "text-foreground"
                          )}
                        >
                          <span className="flex items-center space-x-2">
                            {item.icon}
                            <span>{item.name}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative px-4 py-2 rounded-md transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  location.pathname === item.path
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                )}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  {item.icon}
                  <span>{item.name}</span>
                </span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-accent rounded-md z-0"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30
                    }}
                  />
                )}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <ThemeSwitcher />
    </div>
  );
}