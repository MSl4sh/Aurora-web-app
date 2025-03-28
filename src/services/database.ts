import mysql, { RowDataPacket, Pool, PoolConnection } from 'mysql2/promise';
import { GuildSettings } from '../types/database';
import { GuildConfig } from '../types/config';

const dbConfig = {
  host: import.meta.env.VITE_DB_HOST || 'mysql-aurorarp.alwaysdata.net',
  user: import.meta.env.VITE_DB_USER || 's23389_AuroraDB',
  password: import.meta.env.VITE_DB_PASSWORD || 'VVpB2vkgifBV+VQ47v^1uvSn',
  database: import.meta.env.VITE_DB_NAME || 's23389_AuroraDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Création d'un pool de connexions pour une meilleure gestion des ressources
const pool: Pool = mysql.createPool(dbConfig);

// Configuration par défaut pour un nouveau serveur
const defaultGuildConfig: GuildConfig = {
  autoMod: {
    enabled: false,
    maxMessagesPerMinute: 5,
    maxMentionsPerMessage: 3,
    maxEmojisPerMessage: 5,
    maxCapsPercentage: 70,
    maxLinksPerMessage: 2,
    maxInvitesPerMessage: 1,
    maxAttachmentsPerMessage: 3
  },
  xp: {
    enabled: true,
    cooldown: 60,
    min: 15,
    max: 25,
    voicePerMinute: 5
  },
  antiRaid: {
    enabled: false,
    maxJoinsPerMinute: 10,
    minAccountAge: 7,
    action: 'kick'
  },
  welcome: {
    channelId: '',
    message: 'Bienvenue {user} sur {server} !'
  }
};

// Fonction pour convertir GuildSettings en GuildConfig
const convertToGuildConfig = (settings: GuildSettings): GuildConfig => {
  return {
    autoMod: {
      enabled: settings.automod_enabled === 1,
      maxMessagesPerMinute: settings.automod_max_messages,
      maxMentionsPerMessage: settings.automod_max_mentions,
      maxEmojisPerMessage: settings.automod_max_emojis,
      maxCapsPercentage: settings.automod_max_caps,
      maxLinksPerMessage: settings.automod_max_links,
      maxInvitesPerMessage: settings.automod_max_invites,
      maxAttachmentsPerMessage: settings.automod_max_attachments
    },
    xp: {
      enabled: settings.xp_enabled === 1,
      cooldown: settings.xp_cooldown,
      min: settings.xp_min,
      max: settings.xp_max,
      voicePerMinute: settings.xp_voice
    },
    antiRaid: {
      enabled: settings.antiraid_enabled === 1,
      maxJoinsPerMinute: settings.antiraid_max_joins,
      minAccountAge: settings.antiraid_min_age,
      action: settings.antiraid_action as 'kick' | 'ban'
    },
    welcome: {
      channelId: settings.welcome_channel || '',
      message: settings.welcome_message
    }
  };
};

export const db = {
  async getConnection(): Promise<PoolConnection> {
    return await pool.getConnection();
  },

  async saveUser(userData: { id: string; username: string; avatar: string; access_token: string }) {
    const connection = await this.getConnection();
    try {
      const [result] = await connection.query(
        'INSERT INTO users (id, username, avatar, access_token) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE username = ?, avatar = ?, access_token = ?',
        [userData.id, userData.username, userData.avatar, userData.access_token, userData.username, userData.avatar, userData.access_token]
      );
      return result;
    } finally {
      connection.release();
    }
  },

  async initGuildConfig(guildId: string): Promise<void> {
    const connection = await this.getConnection();
    try {
      const [result] = await connection.query(
        `INSERT INTO guild_settings (
          guild_id,
          automod_enabled,
          automod_max_messages,
          automod_max_mentions,
          automod_max_emojis,
          automod_max_caps,
          automod_max_links,
          automod_max_invites,
          automod_max_attachments,
          xp_enabled,
          xp_cooldown,
          xp_min,
          xp_max,
          xp_voice,
          antiraid_enabled,
          antiraid_max_joins,
          antiraid_min_age,
          antiraid_action,
          welcome_channel,
          welcome_message
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          guildId,
          defaultGuildConfig.autoMod.enabled ? 1 : 0,
          defaultGuildConfig.autoMod.maxMessagesPerMinute,
          defaultGuildConfig.autoMod.maxMentionsPerMessage,
          defaultGuildConfig.autoMod.maxEmojisPerMessage,
          defaultGuildConfig.autoMod.maxCapsPercentage,
          defaultGuildConfig.autoMod.maxLinksPerMessage,
          defaultGuildConfig.autoMod.maxInvitesPerMessage,
          defaultGuildConfig.autoMod.maxAttachmentsPerMessage,
          defaultGuildConfig.xp.enabled ? 1 : 0,
          defaultGuildConfig.xp.cooldown,
          defaultGuildConfig.xp.min,
          defaultGuildConfig.xp.max,
          defaultGuildConfig.xp.voicePerMinute,
          defaultGuildConfig.antiRaid.enabled ? 1 : 0,
          defaultGuildConfig.antiRaid.maxJoinsPerMinute,
          defaultGuildConfig.antiRaid.minAccountAge,
          defaultGuildConfig.antiRaid.action,
          defaultGuildConfig.welcome.channelId,
          defaultGuildConfig.welcome.message
        ]
      );
      return result;
    } finally {
      connection.release();
    }
  },

  async getGuildConfig(guildId: string): Promise<GuildConfig | null> {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        'SELECT * FROM guild_settings WHERE guild_id = ?',
        [guildId]
      );
      
      if (!rows[0]) {
        // Si aucune configuration n'existe, on en crée une nouvelle avec les valeurs par défaut
        await this.initGuildConfig(guildId);
        return defaultGuildConfig;
      }
      
      return convertToGuildConfig(rows[0] as GuildSettings);
    } finally {
      connection.release();
    }
  },

  async updateGuildConfig(guildId: string, config: GuildConfig): Promise<void> {
    const connection = await this.getConnection();
    try {
      const [result] = await connection.query(
        `UPDATE guild_settings SET 
          automod_enabled = ?,
          automod_max_messages = ?,
          automod_max_mentions = ?,
          automod_max_emojis = ?,
          automod_max_caps = ?,
          automod_max_links = ?,
          automod_max_invites = ?,
          automod_max_attachments = ?,
          xp_enabled = ?,
          xp_cooldown = ?,
          xp_min = ?,
          xp_max = ?,
          xp_voice = ?,
          antiraid_enabled = ?,
          antiraid_max_joins = ?,
          antiraid_min_age = ?,
          antiraid_action = ?,
          welcome_channel = ?,
          welcome_message = ?
        WHERE guild_id = ?`,
        [
          config.autoMod.enabled ? 1 : 0,
          config.autoMod.maxMessagesPerMinute,
          config.autoMod.maxMentionsPerMessage,
          config.autoMod.maxEmojisPerMessage,
          config.autoMod.maxCapsPercentage,
          config.autoMod.maxLinksPerMessage,
          config.autoMod.maxInvitesPerMessage,
          config.autoMod.maxAttachmentsPerMessage,
          config.xp.enabled ? 1 : 0,
          config.xp.cooldown,
          config.xp.min,
          config.xp.max,
          config.xp.voicePerMinute,
          config.antiRaid.enabled ? 1 : 0,
          config.antiRaid.maxJoinsPerMinute,
          config.antiRaid.minAccountAge,
          config.antiRaid.action,
          config.welcome.channelId,
          config.welcome.message,
          guildId
        ]
      );
      return result;
    } finally {
      connection.release();
    }
  }
};

export const getGuildConfig = async (guildId: string): Promise<GuildSettings | null> => {
  try {
    const [rows] = await pool.query<mysql.RowDataPacket[]>(
      'SELECT * FROM guild_settings WHERE guild_id = ?',
      [guildId]
    );
    return (rows[0] as GuildSettings) || null;
  } catch (error) {
    console.error('Error fetching guild config:', error);
    throw error;
  }
};

export const updateGuildConfig = async (guildId: string, config: GuildConfig): Promise<boolean> => {
  try {
    await pool.query(
      `UPDATE guild_settings SET 
        automod_enabled = ?,
        automod_max_messages = ?,
        automod_max_mentions = ?,
        automod_max_emojis = ?,
        automod_max_caps = ?,
        automod_max_links = ?,
        automod_max_invites = ?,
        automod_max_attachments = ?,
        xp_enabled = ?,
        xp_cooldown = ?,
        xp_min = ?,
        xp_max = ?,
        xp_voice = ?,
        antiraid_enabled = ?,
        antiraid_max_joins = ?,
        antiraid_min_age = ?,
        antiraid_action = ?,
        welcome_channel = ?,
        welcome_message = ?
      WHERE guild_id = ?`,
      [
        config.autoMod.enabled ? 1 : 0,
        config.autoMod.maxMessagesPerMinute,
        config.autoMod.maxMentionsPerMessage,
        config.autoMod.maxEmojisPerMessage,
        config.autoMod.maxCapsPercentage,
        config.autoMod.maxLinksPerMessage,
        config.autoMod.maxInvitesPerMessage,
        config.autoMod.maxAttachmentsPerMessage,
        config.xp.enabled ? 1 : 0,
        config.xp.cooldown,
        config.xp.min,
        config.xp.max,
        config.xp.voicePerMinute,
        config.antiRaid.enabled ? 1 : 0,
        config.antiRaid.maxJoinsPerMinute,
        config.antiRaid.minAccountAge,
        config.antiRaid.action,
        config.welcome.channelId,
        config.welcome.message,
        guildId
      ]
    );
    return true;
  } catch (error) {
    console.error('Error updating guild config:', error);
    throw error;
  }
}; 