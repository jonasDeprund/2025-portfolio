import React from 'react';
import AnimatedShapes from './components/AnimatedShapes';

// Component
import Footer from './components/Footer';
import Header from './components/Header';
import Nav from './components/Nav';
import Projects from './components/ProjectsContainer';

// Styles
import './scss/_main.scss';

function App() {
  return (
    <div>
      <nav>
        <Nav />
      </nav>
      <main>
        <AnimatedShapes />
        <Header />
        <Projects />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
