import React from 'react';
import AnimatedShapes from './components/AnimatedShapes';

// Component
import Footer from './components/Footer';
import Header from './components/Header';
import Nav from './components/Nav';
import Projects from './components/ProjectsContainer';
import Divider from './components/Divider';
import Skills from './components/Skills';
import About from './components/About';

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
      <AnimatedShapes
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          cursor: 'grab',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          background: 'transparent',
          pointerEvents: 'auto',
        }}
      >
        <div style={{ pointerEvents: 'none' }}>
          <nav style={{ pointerEvents: 'auto' }}>
            <Nav />
          </nav>
          <main>
            <div style={{ position: 'relative' }}>
              <Header />
            </div>
            <div style={{ pointerEvents: 'auto' }}>
              <Projects />
              <Divider />
              <Skills />
              <Divider />
              <About />
              <Divider />
            </div>
          </main>
          <footer style={{ pointerEvents: 'auto' }}>
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
