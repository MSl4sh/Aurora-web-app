export interface GuildSettings {
  guild_id: string;
  automod_enabled: number;
  automod_max_messages: number;
  automod_max_mentions: number;
  automod_max_emojis: number;
  automod_max_caps: number;
  automod_max_links: number;
  automod_max_invites: number;
  automod_max_attachments: number;
  xp_enabled: number;
  xp_cooldown: number;
  xp_min: number;
  xp_max: number;
  xp_voice: number;
  antiraid_enabled: number;
  antiraid_max_joins: number;
  antiraid_min_age: number;
  antiraid_action: string;
  welcome_channel: string | null;
  welcome_message: string;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  access_token: string;
  created_at?: Date;
  updated_at?: Date;
} 