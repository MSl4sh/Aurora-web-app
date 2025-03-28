import { WebsiteUser, UserLevel } from '../types/user';
import { GuildConfig } from '../types/guild';
import { Ticket, TicketMessage } from '../types/ticket';
import { ModLog, Warning } from '../types/moderation';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000') + '/api';
const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI || 'http://localhost:5173/Aurora-web-app/auth/callback';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Fonction utilitaire pour les requêtes
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    credentials: 'include',
    mode: 'cors'
  });

  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.error || `Erreur HTTP: ${response.status}`);
    } catch {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
  }

  return response.json();
}

// Gestion des utilisateurs du site web
export async function getWebsiteUser(id: string): Promise<WebsiteUser> {
  return apiRequest<WebsiteUser>(`/website-users/${id}`);
}

export async function updateWebsiteUser(id: string, data: Partial<WebsiteUser>): Promise<WebsiteUser> {
  return apiRequest<WebsiteUser>(`/website-users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export async function deleteWebsiteUser(id: string): Promise<void> {
  await apiRequest(`/website-users/${id}`, {
    method: 'DELETE'
  });
}

// Gestion des serveurs
export async function getGuildConfig(guildId: string): Promise<GuildConfig> {
  try {
    const response = await fetch(`${API_BASE_URL}/guilds/${guildId}`, {
      credentials: 'include',
      mode: 'cors'
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Trop de requêtes vers l\'API Discord. Veuillez réessayer dans quelques instants.');
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log('Réponse API:', data); // Debug log
    
    // Si la réponse est directement la configuration
    if (data && typeof data === 'object' && 'guild_id' in data) {
      return data as GuildConfig;
    }
    
    // Si la réponse suit le format ApiResponse
    if (data.success && data.data) {
      return data.data;
    }

    throw new Error('Format de réponse invalide');
  } catch (error) {
    console.error('Erreur lors de la récupération de la configuration:', error);
    throw error;
  }
}

export async function updateGuildConfig(guildId: string, config: Partial<GuildConfig>): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/guilds/${guildId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
      credentials: 'include',
      mode: 'cors'
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Trop de requêtes vers l\'API Discord. Veuillez réessayer dans quelques instants.');
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log('Réponse de mise à jour:', data); // Debug log
    
    // Si nous avons un message de succès ou success: true, c'est bon
    if (data.message?.includes('succès') || data.success) {
      return;
    }

    throw new Error(data.error || 'Impossible de mettre à jour la configuration');
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la configuration:', error);
    throw error;
  }
}

// Gestion des utilisateurs
export async function getUserLevel(guildId: string, userId: string): Promise<UserLevel> {
  return apiRequest<UserLevel>(`/users/${guildId}/${userId}`);
}

export async function updateUserXP(guildId: string, userId: string, xp: number, level: number): Promise<void> {
  await apiRequest(`/users/${guildId}/${userId}/xp`, {
    method: 'PUT',
    body: JSON.stringify({ xp, level })
  });
}

export async function updateUserVoiceTime(guildId: string, userId: string, voiceTimeMinutes: number): Promise<void> {
  await apiRequest(`/users/${guildId}/${userId}/voice`, {
    method: 'PUT',
    body: JSON.stringify({ voice_time_minutes: voiceTimeMinutes })
  });
}

// Gestion des tickets
export async function getGuildTickets(guildId: string): Promise<Ticket[]> {
  return apiRequest<Ticket[]>(`/tickets/${guildId}`);
}

export async function createTicket(guildId: string, channelId: string, userId: string, reason: string): Promise<Ticket> {
  return apiRequest<Ticket>(`/tickets/${guildId}`, {
    method: 'POST',
    body: JSON.stringify({ channel_id: channelId, user_id: userId, reason })
  });
}

export async function updateTicketStatus(guildId: string, ticketNumber: string, status: 'open' | 'closed'): Promise<void> {
  await apiRequest(`/tickets/${guildId}/${ticketNumber}`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  });
}

// Gestion des logs de modération
export async function getGuildModLogs(guildId: string): Promise<ModLog[]> {
  return apiRequest<ModLog[]>(`/mod-logs/${guildId}`);
}

export async function addModLog(guildId: string, userId: string, moderatorId: string, action: ModLog['action'], reason: string): Promise<void> {
  await apiRequest(`/mod-logs/${guildId}`, {
    method: 'POST',
    body: JSON.stringify({ user_id: userId, moderator_id: moderatorId, action, reason })
  });
}

export async function getUserModLogs(guildId: string, userId: string): Promise<ModLog[]> {
  return apiRequest<ModLog[]>(`/mod-logs/${guildId}/user/${userId}`);
}

export async function loginWithDiscord(): Promise<void> {
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: DISCORD_REDIRECT_URI,
    response_type: 'code',
    scope: 'identify guilds email',
    prompt: 'consent'
  });

  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?${params}`;
  console.log('URL de redirection Discord:', discordAuthUrl); // Debug log
  window.location.href = discordAuthUrl;
}

export async function authenticateWithCode(code: string): Promise<WebsiteUser> {
  try {
    console.log('Tentative d\'authentification avec le code:', code); // Debug log

    const response = await fetch(`${API_BASE_URL}/auth/discord`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, redirect_uri: DISCORD_REDIRECT_URI }),
      credentials: 'include',
      mode: 'cors'
    });

    console.log('Statut de la réponse:', response.status); // Debug log

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur de réponse:', errorData); // Debug log
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<WebsiteUser> = await response.json();
    console.log('Données reçues:', data); // Debug log
    
    if (!data.success || !data.data) {
      throw new Error(data.error || 'Échec de l\'authentification');
    }

    return data.data;
  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error);
    throw error;
  }
}

export async function getCurrentUser(): Promise<WebsiteUser | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      credentials: 'include',
      mode: 'cors'
    });

    if (!response.ok) {
      if (response.status === 401) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<WebsiteUser> = await response.json();
    
    if (!data.success) {
      return null;
    }

    return data.data || null;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return null;
  }
}

export async function logout(): Promise<void> {
  try {
    // Déconnexion via l'API
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la déconnexion');
    }

    // Nettoyage local
    localStorage.clear();
    sessionStorage.clear();

    // Redirection vers la page d'accueil
    window.location.replace('/Aurora-web-app/');
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    // En cas d'erreur, forcer quand même la redirection
    window.location.replace('/Aurora-web-app/');
  }
}

export async function createDefaultGuildConfig(guildId: string): Promise<GuildConfig> {
  try {
    const response = await fetch(`${API_BASE_URL}/guilds/${guildId}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors'
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Trop de requêtes vers l\'API Discord. Veuillez réessayer dans quelques instants.');
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log('Réponse création config:', data);

    if (data.success && data.data) {
      return data.data;
    }

    throw new Error('Format de réponse invalide');
  } catch (error) {
    console.error('Erreur lors de la création de la configuration:', error);
    throw error;
  }
}

// Types pour les commandes
export interface Command {
  id: number;
  name: string;
  category: 'moderation' | 'config' | 'roles' | 'tickets' | 'youtube' | 'xp' | 'info' | 'utils';
  description: string;
  usage_example: string;
  required_permissions: string;
  parent_command: string | null;
  base_usage: string;
}

// Récupérer toutes les commandes
export const getAllCommands = async (): Promise<Command[]> => {
  const response = await fetch(`${API_BASE_URL}/commands`, {
    credentials: 'include',
    mode: 'cors'
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des commandes');
  }
  return response.json();
};

// Récupérer une commande spécifique
export const getCommand = async (name: string): Promise<Command> => {
  const response = await fetch(`${API_BASE_URL}/commands/${name}`, {
    credentials: 'include',
    mode: 'cors'
  });
  if (!response.ok) {
    throw new Error('Commande non trouvée');
  }
  return response.json();
};

// Récupérer les commandes par catégorie
export const getCommandsByCategory = async (category: Command['category']): Promise<Command[]> => {
  const response = await fetch(`${API_BASE_URL}/commands/category/${category}`, {
    credentials: 'include',
    mode: 'cors'
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des commandes de la catégorie');
  }
  return response.json();
}; 