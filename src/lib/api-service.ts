import { SocialLink } from "@/components/SocialMediaSection";
import { QuizQuestion } from "@/components/QuizSection";
import { Event } from "@/components/EventList";
import { SubscribeFormData } from "@/components/NewsletterSubscribe";
import { FooterData } from "@/components/FooterSection";
import { FeaturedArticleData } from "@/components/FeaturedArticle";
import { ArticleGridData } from "@/components/ArticleGrid";

const API_BASE_URL = 'http://localhost:3001/api';

export interface Template {
  id: string;
  name: string;
  createdAt: string;
  content?: NewsletterItem[];
}

export interface QuizOption {
  id: string;
  text: string;
  selected?: boolean;
}

export interface Quiz {
  id: string;
  heading?: string;
  question: string;
  options: QuizOption[];
  buttonText?: string;
  footerText?: string;
  selectedOption?: number;
}

export interface NewsletterItem {
  id: string;
  type: 'header' | 'heading' | 'paragraph' | 'image' | 'button' | 'divider' | 'spacer' | 'quiz' | 'events' | 'subscribe' | 'footer' | 'featured-article' | 'article-grid' | 'social-media';
  content: {
    // Header content
    logoUrl?: string;
    companyName?: string;
    tagline?: string;
    
    // Text content
    text?: string;
    level?: 'h1' | 'h2' | 'h3';
    align?: 'left' | 'center' | 'right';
    
    // Image content
    url?: string;
    alt?: string;
    
    // Quiz content
    quiz?: Quiz;
    
    // Events content
    eventsTitle?: string;
    events?: Event[];
    
    // Subscribe form content
    subscribeForm?: SubscribeFormData;
    
    // Footer content
    footer?: FooterData;
    
    // Featured article content
    featuredArticle?: FeaturedArticleData;
    
    // Article grid content
    articleGrid?: ArticleGridData;
    
    // Social media content
    socialLinks?: SocialLink[];
  };
  style?: {
    backgroundColor?: string;
    textColor?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    borderWidth?: number;
    borderColor?: string;
    borderRadius?: number;
    height?: number;
  };
}

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  senderName?: string;
  from?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description?: string;
}

export const saveTemplate = async (name: string, content: NewsletterItem[]): Promise<{ success: boolean; message: string; filename?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/templates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, content }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error saving template:', error);
    return { success: false, message: 'Failed to save template' };
  }
};

export const getTemplates = async (): Promise<{ success: boolean; templates?: Template[]; message?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/templates`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching templates:', error);
    return { success: false, message: 'Failed to fetch templates' };
  }
};

export const getTemplate = async (id: string): Promise<{ success: boolean; template?: Template; message?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/templates/${id}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching template:', error);
    return { success: false, message: 'Failed to fetch template' };
  }
};

export const deleteTemplate = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/templates/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting template:', error);
    return { success: false, message: 'Failed to delete template' };
  }
};

export const sendEmail = async (params: SendEmailParams): Promise<{ success: boolean; message: string; messageId?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    return await response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email' };
  }
};

export const getStatus = async (): Promise<{ status: string; emailConfigured: boolean; time: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/status`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching server status:', error);
    return { status: 'error', emailConfigured: false, time: new Date().toISOString() };
  }
}; 