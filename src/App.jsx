import React from 'react'; // Make sure React is imported
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';
import { useLocation } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary'; // Assuming path is correct
// import Home from './components/Home'; // <-- No longer needed for root route, keep if used elsewhere
import RRT from './components/exercises/RRT'; // <-- This now exports CozyLogicPuzzles


import { ANIMATION_VARIANTS, TRANSITION_SPRING } from './lib/utils'; // Assuming path is correct

// --- PageTransition component remains the same ---
const pageTransitionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function PageTransition({ children }) {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransitionVariants}
      // Check if TRANSITION_SPRING is defined correctly in utils
      transition={TRANSITION_SPRING || { type: 'spring', stiffness: 100, damping: 20 }}
      className="min-h-screen w-full" // Ensure this allows content height
    >
      {children}
    </motion.div>
  );
}

// --- ComingSoon component remains the same ---
function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      {/* ... content of ComingSoon ... */}
       <motion.div /* ... */ >
         <div /* ... */ >
           <motion.div /* ... */ >
             <svg /* ... */ />
           </motion.div>
         </div>
         <h1 className="text-4xl font-bold tracking-tight">Coming Soon</h1>
         <p className="text-muted-foreground max-w-md mx-auto">
           We're working hard to bring you this exciting new feature. Stay tuned for updates!
         </p>
       </motion.div>
    </div>
  );
}


// --- Modified App component ---
function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* --- THIS IS THE MODIFIED ROOT ROUTE --- */}
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <PageTransition>
                  {/* Use RRT component (which exports CozyLogicPuzzles) */}
                  <RRT />
                </PageTransition>
              </ErrorBoundary>
            }
          />

          {/* --- Optional: Remove or keep the /rrt route --- */}
          {/* If you want `/rrt` to also work, keep this. If not, delete/comment it out. */}
          <Route
            path="/rrt"
            element={
              <ErrorBoundary>
                <PageTransition>
                  <RRT />
                </PageTransition>
              </ErrorBoundary>
            }
          />

          
          

          {/* --- THIS IS THE MODIFIED CATCH-ALL ROUTE --- */}
          {/* Redirects any unknown path back to the new root page "/" */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </AnimatePresence>

      {/* --- Toaster remains the same --- */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'toast', // Ensure this class exists in your CSS if used for styling
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </>
  );
}

export default App;