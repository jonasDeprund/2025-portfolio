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
    <div style={{ position: 'relative' }}>
      <AnimatedShapes />
      <div
        style={{
          position: 'relative',
          zIndex: 2, // Mettre le contenu au-dessus des formes
        }}
      >
        <nav>
          <Nav />
        </nav>
        <main>
          <Header />
          <Projects />
          <Divider />
          <Skills />
          <Divider />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default App;
