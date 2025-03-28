import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getGuildConfig, createDefaultGuildConfig } from '../services/api';

interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
  hasConfig?: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  guildName: string;
}

const ConfirmationModal = ({ isOpen, onClose, onConfirm, guildName }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold text-white mb-4">Créer une configuration</h3>
        <p className="text-gray-300 mb-6">
          Voulez-vous créer une configuration par défaut pour le serveur <span className="font-semibold text-purple-400">{guildName}</span> ?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [guilds, setGuilds] = useState<DiscordGuild[]>([]);
  const [loadingGuilds, setLoadingGuilds] = useState(true);
  const [selectedGuild, setSelectedGuild] = useState<DiscordGuild | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creatingConfig, setCreatingConfig] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/');
    }
  }, [loading, isAuthenticated, navigate]);

  useEffect(() => {
    async function fetchGuilds() {
      if (!user) return;

      try {
        const response = await fetch('https://discord.com/api/users/@me/guilds', {
          headers: {
            Authorization: `Bearer ${user.access_token}`
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des serveurs');
        }

        const data = await response.json();
        const filteredGuilds = data.filter((guild: DiscordGuild) => guild.owner);
        
        // Vérifier la configuration pour chaque serveur
        const guildsWithConfig = await Promise.all(
          filteredGuilds.map(async (guild: DiscordGuild) => {
            try {
              await getGuildConfig(guild.id);
              return { ...guild, hasConfig: true };
            } catch (error) {
              return { ...guild, hasConfig: false };
            }
          })
        );

        setGuilds(guildsWithConfig);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoadingGuilds(false);
      }
    }

    fetchGuilds();
  }, [user]);

  const handleCreateConfig = async (guild: DiscordGuild) => {
    setSelectedGuild(guild);
    setIsModalOpen(true);
  };

  const handleConfirmCreate = async () => {
    if (!selectedGuild) return;

    setCreatingConfig(true);
    try {
      await createDefaultGuildConfig(selectedGuild.id);
      setIsModalOpen(false);
      navigate(`/dashboard/${selectedGuild.id}`);
    } catch (error) {
      console.error('Erreur lors de la création de la configuration:', error);
    } finally {
      setCreatingConfig(false);
    }
  };

  if (loading || loadingGuilds) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Tableau de bord</h1>
          <p className="text-gray-400 text-lg">
            Gérez vos serveurs Discord et leurs configurations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guilds.map(guild => (
            <div
              key={guild.id}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-700/50 transition-all duration-300 transform hover:-translate-y-1 border border-gray-700/50 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="flex items-center space-x-4">
                {guild.icon ? (
                  <img
                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                    alt={guild.name}
                    className="w-16 h-16 rounded-full ring-2 ring-purple-500/50 group-hover:ring-purple-500"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center ring-2 ring-purple-500/50 group-hover:ring-purple-500">
                    <span className="text-2xl font-bold text-purple-300">
                      {guild.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">{guild.name}</h2>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/20">
                      Propriétaire
                    </span>
                    {guild.hasConfig ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/20">
                        Configuré
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/20">
                        Non configuré
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700/50">
                {guild.hasConfig ? (
                  <button
                    onClick={() => navigate(`/dashboard/${guild.id}`)}
                    className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Gérer la configuration
                  </button>
                ) : (
                  <button
                    onClick={() => handleCreateConfig(guild)}
                    className="w-full py-2 bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/20 hover:bg-purple-500/30 transition-colors"
                  >
                    Créer une configuration
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {guilds.length === 0 && (
          <div className="text-center py-16 bg-gray-800/30 rounded-xl backdrop-blur-sm border border-gray-700/50">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h3 className="mt-2 text-xl font-medium text-white">Aucun serveur trouvé</h3>
            <p className="mt-1 text-gray-400">
              Vous n'êtes propriétaire d'aucun serveur Discord.
            </p>
            <button 
              className="mt-4 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/20 hover:bg-purple-500/30 transition-colors"
              onClick={() => window.open('https://discord.com/api/oauth2/authorize?client_id=1304850168981749780&permissions=8&scope=bot%20applications.commands', '_blank')}
            >
              Inviter le bot sur votre serveur
            </button>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmCreate}
        guildName={selectedGuild?.name || ''}
      />
    </div>
  );
} 