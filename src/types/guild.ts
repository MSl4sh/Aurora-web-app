export interface GuildConfig {
  guild_id: string;
  auto_mod_enabled: number;
  max_messages_per_minute: number;
  max_mentions_per_message: number;
  max_emojis_per_message: number;
  max_caps_percentage: number;
  max_links_per_message: number;
  max_invites_per_message: number;
  max_attachments_per_message: number;
  ticket_category_id: string | null;
  ticket_log_channel_id: string | null;
  ticket_support_role_id: string | null;
  welcome_channel_id: string | null;
  welcome_message: string | null;
  xp_channel_id: string | null;
  xp_message: string | null;
  xp_cooldown: number;
  xp_min: number;
  xp_max: number;
  xp_voice_per_minute: number;
  anti_raid_enabled: number;
  max_joins_per_minute: number;
  min_account_age: number;
  anti_raid_action: string;
  enable_raid_mode: number;
} 