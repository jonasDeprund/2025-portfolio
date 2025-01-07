import React from 'react';
import AnimatedShapes from './components/AnimatedShapes';

// Component
import Footer from './components/Footer';
import Header from './components/Header';
import Nav from './components/Nav';
import Projects from './components/ProjectsContainer';
import Divider from './components/Divider';
import Skills from './components/Skills';

// Styles
import './scss/_main.scss';

function App() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          backgroundColor: 'var(--color-background)',
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          pointerEvents: 'none', // Permet aux clics de passer à travers
        }}
      >
        <nav style={{ pointerEvents: 'auto' }}>
          <Nav />
        </nav>
        <main>
          <div
            style={{ position: 'relative', zIndex: 999, pointerEvents: 'auto' }}
          >
            <Header />
          </div>
          <div style={{ pointerEvents: 'auto' }}>
            <Projects />
            <Divider />
            <Skills />
            <Divider />
          </div>
        </main>
        <footer style={{ pointerEvents: 'auto' }}>
          <Footer />
        </footer>
      </div>
      <AnimatedShapes
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          pointerEvents: 'auto', // S'assure que les formes sont interactives
        }}
      />
    </div>
  );
}

export default App;
