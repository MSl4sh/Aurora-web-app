export interface Ticket {
  guild_id: string;
  channel_id: string;
  user_id: string;
  ticket_number: string;
  status: 'open' | 'closed';
  reason: string;
  created_at: string;
  updated_at: string;
}

export interface TicketMessage {
  ticket_id: string;
  user_id: string;
  content: string;
  created_at: string;
} 