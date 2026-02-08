export interface LoveCard {
  id: string;
  partner_name: string;
  message: string;
  theme: 'romantic' | 'modern' | 'classic' | 'playful';
  photo_url?: string;
  created_at: string;
  share_code: string;
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  photo_url?: string;
  memory_date: string;
  created_at: string;
}

export interface ValentineDay {
  day: string;
  date: string;
  icon: string;
  title: string;
  suggestion: string;
  color: string;
}
