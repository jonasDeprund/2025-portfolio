import React from 'react';
import Background from './components/Background';

// Component
import Footer from './components/Footer';
import Header from './components/Header';
import Nav from './components/Nav';
import Projects from './components/ProjectsContainer';
import About from './components/About';

// Styles
import './scss/_main.scss';

function App() {
  return (
    <div>
      <nav>
        <Nav />
      </nav>
      <main>
        <Header />
        <Background />
        <Projects />
        {/* <About /> */}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
