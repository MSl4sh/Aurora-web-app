import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Commands from './pages/Commands';
import Documentation from './pages/Documentation';
import Support from './pages/Support';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-secondary-900 text-white flex flex-col">
        <Header />
        <main className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/commands" element={<Commands />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/support" element={<Support />} />
            {/* Autres routes seront ajoutées ici */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
