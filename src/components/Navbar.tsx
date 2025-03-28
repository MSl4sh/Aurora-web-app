import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import auroraLogo from '/aurora-logo.png';

const getDiscordAvatar = (user: any) => {
  console.log('User object complet:', JSON.stringify(user, null, 2));

  if (!user || !user.id) {
    return 'https://cdn.discordapp.com/embed/avatars/0.png';
  }

  // Si l'avatar est déjà une URL complète, l'utiliser directement
  if (user.avatar && user.avatar.startsWith('http')) {
    return user.avatar;
  }

  // Sinon, construire l'URL (cas où on reçoit juste l'ID de l'avatar)
  if (!user.avatar) {
    const defaultAvatarNumber = user.discriminator ? (parseInt(user.discriminator) % 5) : 0;
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
  }

  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`;
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, login, logout, user } = useAuth();

  console.log('Auth state:', { isAuthenticated, user }); // Pour déboguer

  const isActive = (path: string) => location.pathname === path;

  // Fermer le menu du profil quand on clique en dehors
  const handleClickOutside = () => {
    setIsProfileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link to="/" className="flex items-center">
              <img src={auroraLogo} alt="Aurora Logo" className="h-12 w-auto" />
            </Link>
            <h2 className="text-xl font-bold bg-gradient-to-r from-aurora-accent to-aurora-accent/70 bg-clip-text text-transparent">
                Aurora
              </h2>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/')
                    ? 'text-aurora-accent'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Accueil
              </Link>
              <Link
                to="/features"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/features')
                    ? 'text-aurora-accent'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Fonctionnalités
              </Link>
              <Link
                to="/commands"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/commands')
                    ? 'text-aurora-accent'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Commandes
              </Link>
              <Link
                to="/documentation"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/documentation')
                    ? 'text-aurora-accent'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Documentation
              </Link>
              <Link
                to="/support"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/support')
                    ? 'text-aurora-accent'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Support
              </Link>
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'text-aurora-accent'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
              ) : null}
            </div>
          </div>

          {/* Bouton Connexion / Avatar */}
          <div className="hidden md:flex items-center">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 px-1 py-1.5 rounded-md bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-gray-600 transition-all focus:outline-none"
                >
                  <img
                    src={getDiscordAvatar(user)}
                    alt="Avatar"
                    className="w-8 h-8 rounded-md"
                  />
                  <svg 
                    className="w-4 h-4 text-gray-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </button>

                {/* Menu déroulant du profil */}
                {isProfileMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0"
                      onClick={handleClickOutside}
                    />
                    <div className="absolute right-0 mt-2 w-56 py-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
                      <div className="px-4 py-3 border-b border-gray-700">
                        <div className="flex items-center space-x-3">
                          <img
                            src={getDiscordAvatar(user)}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium text-white">{user.username}</p>
                            <p className="text-xs text-gray-400">Connecté avec Discord</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-2 py-2">
                        <Link
                          to="/dashboard"
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <svg 
                            className="w-4 h-4 mr-2" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                            />
                          </svg>
                          Dashboard
                        </Link>
                        <button
                          onClick={logout}
                          className="flex items-center w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-700/50 rounded-md transition-colors mt-1"
                        >
                          <svg 
                            className="w-4 h-4 mr-2" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                            />
                          </svg>
                          Déconnexion
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={login}
                className="px-4 py-2 text-sm font-medium text-white bg-[#5865F2] hover:bg-[#4752C4] rounded-md transition-colors"
              >
                Connexion avec Discord
              </button>
            )}
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Ouvrir le menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/features"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/features')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Fonctionnalités
            </Link>
            <Link
              to="/commands"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/commands')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Commandes
            </Link>
            <Link
              to="/documentation"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/documentation')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Documentation
            </Link>
            <Link
              to="/support"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/support')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Support
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/dashboard')
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
                <div className="px-3 py-2 flex items-center space-x-3">
                  {user && (
                    <img
                      src={getDiscordAvatar(user)}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full ring-2 ring-gray-700"
                    />
                  )}
                  <button
                    onClick={logout}
                    className="text-base font-medium text-red-400 hover:text-red-300"
                  >
                    Déconnexion
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={login}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#5865F2] hover:text-[#4752C4]"
              >
                Connexion avec Discord
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 