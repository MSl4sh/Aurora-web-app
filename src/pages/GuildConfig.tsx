import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GuildConfig } from '../types/guild';
import { getGuildConfig, updateGuildConfig } from '../services/api';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-300">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`${
          checked ? 'bg-purple-600' : 'bg-gray-700'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
      >
        <span className="sr-only">{label}</span>
        <span
          className={`${
            checked ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </button>
    </div>
  );
}

export default function GuildConfigPage() {
  const { guildId } = useParams<{ guildId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [config, setConfig] = useState<GuildConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/');
      return;
    }

    async function fetchConfig() {
      if (!guildId) {
        setError('ID du serveur manquant');
        setLoading(false);
        return;
      }

      try {
        setError(null);
        const data = await getGuildConfig(guildId);
        console.log('Configuration reçue:', {
          welcome_message: data.welcome_message,
          welcome_channel_id: data.welcome_channel_id,
          xp_message: data.xp_message,
          xp_channel_id: data.xp_channel_id,
          ticket_category_id: data.ticket_category_id,
          ticket_log_channel_id: data.ticket_log_channel_id,
          ticket_support_role_id: data.ticket_support_role_id,
          auto_mod_enabled: data.auto_mod_enabled,
          anti_raid_enabled: data.anti_raid_enabled
        });
        setConfig(data);
      } catch (error) {
        console.error('Erreur lors de la récupération de la configuration:', error);
        setError(error instanceof Error ? error.message : 'Impossible de charger la configuration du serveur');
      } finally {
        setLoading(false);
      }
    }

    if (isAuthenticated && guildId) {
      fetchConfig();
    }
  }, [guildId, isAuthenticated, authLoading, navigate]);

  const handleConfigChange = async (key: keyof GuildConfig, value: any) => {
    if (!config || !guildId) return;

    try {
      // Mettre à jour l'état local
      const newConfig = {
        ...config,
        [key]: value
      };
      setConfig(newConfig);

      // Préparer l'objet de mise à jour en filtrant les valeurs null/undefined
      const updateData = {
        guild_id: newConfig.guild_id,
        [key]: value
      };

      // Envoyer uniquement la propriété modifiée
      await updateGuildConfig(guildId, updateData);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setError(error instanceof Error ? error.message : 'Erreur lors de la sauvegarde de la configuration');
      // Restaurer l'ancienne valeur en cas d'erreur
      setConfig(config);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-4">Erreur</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Configuration non trouvée</h2>
          <p>Impossible de charger la configuration du serveur.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-8 pt-32">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Configuration du serveur</h1>

        {/* Section Auto-Modération */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Auto-Modération</h2>
          <div className="space-y-4">
            <Switch
              checked={config.auto_mod_enabled === 1}
              onChange={(checked) => handleConfigChange('auto_mod_enabled', checked ? 1 : 0)}
              label="Activer l'auto-modération"
            />
            {config.auto_mod_enabled === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Messages max par minute
                  </label>
                  <input
                    type="number"
                    value={config.max_messages_per_minute}
                    onChange={(e) => handleConfigChange('max_messages_per_minute', parseInt(e.target.value))}
                    className="w-full bg-gray-700 text-white rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Mentions max par message
                  </label>
                  <input
                    type="number"
                    value={config.max_mentions_per_message}
                    onChange={(e) => handleConfigChange('max_mentions_per_message', parseInt(e.target.value))}
                    className="w-full bg-gray-700 text-white rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Emojis max par message
                  </label>
                  <input
                    type="number"
                    value={config.max_emojis_per_message}
                    onChange={(e) => handleConfigChange('max_emojis_per_message', parseInt(e.target.value))}
                    className="w-full bg-gray-700 text-white rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    % de majuscules max
                  </label>
                  <input
                    type="number"
                    value={config.max_caps_percentage}
                    onChange={(e) => handleConfigChange('max_caps_percentage', parseInt(e.target.value))}
                    className="w-full bg-gray-700 text-white rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Liens max par message
                  </label>
                  <input
                    type="number"
                    value={config.max_links_per_message}
                    onChange={(e) => handleConfigChange('max_links_per_message', parseInt(e.target.value))}
                    className="w-full bg-gray-700 text-white rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Invitations max par message
                  </label>
                  <input
                    type="number"
                    value={config.max_invites_per_message}
                    onChange={(e) => handleConfigChange('max_invites_per_message', parseInt(e.target.value))}
                    className="w-full bg-gray-700 text-white rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Pièces jointes max par message
                  </label>
                  <input
                    type="number"
                    value={config.max_attachments_per_message}
                    onChange={(e) => handleConfigChange('max_attachments_per_message', parseInt(e.target.value))}
                    className="w-full bg-gray-700 text-white rounded px-3 py-2"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section Tickets */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Configuration des Tickets</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Catégorie des tickets
              </label>
              <input
                type="text"
                value={config.ticket_category_id || ''}
                onChange={(e) => handleConfigChange('ticket_category_id', e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2"
                placeholder="ID de la catégorie"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Canal de logs des tickets
              </label>
              <input
                type="text"
                value={config.ticket_log_channel_id || ''}
                onChange={(e) => handleConfigChange('ticket_log_channel_id', e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2"
                placeholder="ID du canal de logs"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Rôle support
              </label>
              <input
                type="text"
                value={config.ticket_support_role_id || ''}
                onChange={(e) => handleConfigChange('ticket_support_role_id', e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2"
                placeholder="ID du rôle support"
              />
            </div>
          </div>
        </div>

        {/* Section Messages de bienvenue */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Messages de bienvenue</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Canal de bienvenue
              </label>
              <input
                type="text"
                value={config.welcome_channel_id || ''}
                onChange={(e) => handleConfigChange('welcome_channel_id', e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2"
                placeholder="ID du canal de bienvenue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Message de bienvenue
              </label>
              <textarea
                value={config.welcome_message || ''}
                onChange={(e) => handleConfigChange('welcome_message', e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 h-32"
                placeholder="Message de bienvenue (utilisez {user} pour mentionner l'utilisateur)"
              />
            </div>
          </div>
        </div>

        {/* Section Système XP */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Système d'XP</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Canal d'XP
              </label>
              <input
                type="text"
                value={config.xp_channel_id || ''}
                onChange={(e) => handleConfigChange('xp_channel_id', e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2"
                placeholder="ID du canal d'XP"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Message d'XP
              </label>
              <textarea
                value={config.xp_message || ''}
                onChange={(e) => handleConfigChange('xp_message', e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 h-32"
                placeholder="Message d'XP (utilisez {user} et {level} pour les variables)"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Cooldown (en secondes)
                </label>
                <input
                  type="number"
                  value={config.xp_cooldown}
                  onChange={(e) => handleConfigChange('xp_cooldown', parseInt(e.target.value))}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  XP minimum
                </label>
                <input
                  type="number"
                  value={config.xp_min}
                  onChange={(e) => handleConfigChange('xp_min', parseInt(e.target.value))}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  XP maximum
                </label>
                <input
                  type="number"
                  value={config.xp_max}
                  onChange={(e) => handleConfigChange('xp_max', parseInt(e.target.value))}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  XP vocal par minute
                </label>
                <input
                  type="number"
                  value={config.xp_voice_per_minute}
                  onChange={(e) => handleConfigChange('xp_voice_per_minute', parseInt(e.target.value))}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section Anti-Raid */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Protection Anti-Raid</h2>
          <div className="space-y-4">
            <Switch
              checked={config.anti_raid_enabled === 1}
              onChange={(checked) => handleConfigChange('anti_raid_enabled', checked ? 1 : 0)}
              label="Activer la protection anti-raid"
            />
            {config.anti_raid_enabled === 1 && (
              <>
                <Switch
                  checked={config.enable_raid_mode === 1}
                  onChange={(checked) => handleConfigChange('enable_raid_mode', checked ? 1 : 0)}
                  label="Activer le mode raid"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Rejoins max par minute
                    </label>
                    <input
                      type="number"
                      value={config.max_joins_per_minute}
                      onChange={(e) => handleConfigChange('max_joins_per_minute', parseInt(e.target.value))}
                      className="w-full bg-gray-700 text-white rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Âge minimum du compte (en jours)
                    </label>
                    <input
                      type="number"
                      value={config.min_account_age}
                      onChange={(e) => handleConfigChange('min_account_age', parseInt(e.target.value))}
                      className="w-full bg-gray-700 text-white rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Action anti-raid
                    </label>
                    <select
                      value={config.anti_raid_action}
                      onChange={(e) => handleConfigChange('anti_raid_action', e.target.value)}
                      className="w-full bg-gray-700 text-white rounded px-3 py-2"
                    >
                      <option value="kick">Expulser</option>
                      <option value="ban">Bannir</option>
                      <option value="timeout">Timeout</option>
                    </select>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 