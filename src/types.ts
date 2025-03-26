import { SocialLink } from '@/components/SocialMediaSection';
import { QuizQuestion } from '@/components/QuizSection';
import { Event } from '@/components/EventList';
import { SubscribeFormData } from '@/components/NewsletterSubscribe';
import { FooterData } from '@/components/FooterSection';
import { FeaturedArticleData } from '@/components/FeaturedArticle';
import { ArticleGridData } from '@/components/ArticleGrid';

export interface NewsletterItem {
  id: string;
  type: 'header' | 'heading' | 'paragraph' | 'image' | 'button' | 'divider' | 'spacer' | 'social-media' | 'quiz' | 'events' | 'subscribe' | 'footer' | 'featured-article' | 'article-grid';
  content: {
    text?: string;
    level?: 'h1' | 'h2' | 'h3';
    align?: 'left' | 'center' | 'right';
    url?: string;
    alt?: string;
    logoUrl?: string;
    companyName?: string;
    tagline?: string;
    socialLinks?: SocialLink[];
    quiz?: QuizQuestion;
    events?: Event[];
    eventsTitle?: string;
    subscribeForm?: SubscribeFormData;
    footer?: FooterData;
    featuredArticle?: FeaturedArticleData;
    articleGrid?: ArticleGridData;
  };
  style?: {
    backgroundColor?: string;
    textColor?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    height?: number;
    borderWidth?: number;
    borderColor?: string;
    borderRadius?: number;
  };
} 