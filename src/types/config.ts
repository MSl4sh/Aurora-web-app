export interface GuildConfig {
  guildId: string;
  autoMod: {
    enabled: boolean;
    maxMessagesPerMinute: number;
    maxMentionsPerMessage: number;
    maxEmojisPerMessage: number;
    maxCapsPercentage: number;
    maxLinksPerMessage: number;
    maxInvitesPerMessage: number;
    maxAttachmentsPerMessage: number;
  };
  xp: {
    enabled: boolean;
    cooldown: number;
    min: number;
    max: number;
    voicePerMinute: number;
  };
  antiRaid: {
    enabled: boolean;
    maxJoinsPerMinute: number;
    minAccountAge: number;
    action: 'kick' | 'ban';
  };
  welcome: {
    channelId: string;
    message: string;
  };
} 