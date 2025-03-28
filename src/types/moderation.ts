export interface ModLog {
  guild_id: string;
  user_id: string;
  moderator_id: string;
  action: 'ban' | 'kick' | 'mute' | 'warn' | 'clear';
  reason: string;
  created_at: string;
  duration?: string; // Pour les actions temporaires comme le mute
}

export interface Warning {
  guild_id: string;
  user_id: string;
  moderator_id: string;
  reason: string;
  created_at: string;
  active: boolean;
} 