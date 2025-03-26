export interface NewsletterItem {
  id: string;
  type: string;
  content: Record<string, unknown>;
  style?: Record<string, string>;
} 