export interface WebsiteUser {
  id: string;
  username: string;
  avatar: string | null;
  access_token: string;
  created_at: string;
  updated_at: string;
}

export interface UserLevel {
  guild_id: string;
  user_id: string;
  xp: number;
  level: number;
  voice_time_minutes: number;
  messages_count: number;
} 