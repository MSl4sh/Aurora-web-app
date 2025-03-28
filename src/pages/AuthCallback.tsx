import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authenticateWithCode } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');
  const { setUser } = useAuth();

  useEffect(() => {
    async function handleCallback() {
      if (!code) {
        console.error('Code d\'authentification manquant');
        navigate('/');
        return;
      }

      try {
        const userData = await authenticateWithCode(code);
        // Mettre à jour l'état d'authentification avec les données de l'utilisateur
        setUser(userData);
        navigate('/dashboard');
      } catch (error) {
        console.error('Erreur lors de l\'authentification:', error);
        navigate('/');
      }
    }

    handleCallback();
  }, [code, navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Authentification en cours...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    </div>
  );
} 