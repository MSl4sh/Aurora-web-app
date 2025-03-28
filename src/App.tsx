import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Features from './pages/Features';
import Commands from './pages/Commands';
import Documentation from './pages/Documentation';
import Support from './pages/Support';
import Dashboard from './pages/Dashboard';
import GuildConfig from './pages/GuildConfig';
import AuthCallback from './pages/AuthCallback';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import './App.css';

function App() {
  return (
    <Router basename="/Aurora-web-app">
      <AuthProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-gradient-to-b from-secondary-900 via-aurora-start to-aurora-end">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/commands" element={<Commands />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/support" element={<Support />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/:guildId" element={<GuildConfig />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer/>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
