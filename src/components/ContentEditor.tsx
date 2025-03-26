import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SocialMediaSection, SocialLink } from './SocialMediaSection';
import { QuizSection, QuizQuestion } from './QuizSection';
import { EventList, Event } from './EventList';
import { NewsletterSubscribe, SubscribeFormData } from './NewsletterSubscribe';

interface Article {
  id: string;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
}

interface ArticleGrid {
  articles: Article[];
}

interface FeaturedArticle {
  image: string;
  title: string;
  summary: string;
  buttonText: string;
  buttonUrl: string;
}

interface HeaderContent {
  logoUrl: string;
  companyName: string;
  tagline: string;
}

interface HeadingContent {
  level: 'h1' | 'h2' | 'h3';
  text: string;
}

interface ParagraphContent {
  text: string;
}

interface ImageContent {
  url: string;
  alt: string;
}

interface ButtonContent {
  text: string;
  url: string;
}

type NewsletterContent = {
  articleGrid?: ArticleGrid;
  featuredArticle?: FeaturedArticle;
  header?: HeaderContent;
  heading?: HeadingContent;
  paragraph?: ParagraphContent;
  image?: ImageContent;
  button?: ButtonContent;
  socialLinks?: SocialLink[];
  quiz?: QuizQuestion;
  events?: Event[];
  eventsTitle?: string;
  subscribeForm?: SubscribeFormData;
  [key: string]: unknown;
};

interface ContentEditorProps {
  type: string;
  content: NewsletterContent;
  onChange: (content: NewsletterContent) => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({ type, content, onChange }) => {
  const updateContent = (updates: Partial<NewsletterContent>) => {
    onChange({ ...content, ...updates });
  };

  const renderHeaderEditor = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Logo URL</Label>
        <Input
          value={content.header?.logoUrl || ''}
          onChange={(e) => updateContent({ header: { ...content.header, logoUrl: e.target.value } })}
          placeholder="https://example.com/logo.png"
        />
      </div>
      <div className="space-y-2">
        <Label>Company Name</Label>
        <Input
          value={content.header?.companyName || ''}
          onChange={(e) => updateContent({ header: { ...content.header, companyName: e.target.value } })}
          placeholder="Your Company Name"
        />
      </div>
      <div className="space-y-2">
        <Label>Tagline</Label>
        <Input
          value={content.header?.tagline || ''}
          onChange={(e) => updateContent({ header: { ...content.header, tagline: e.target.value } })}
          placeholder="Your company tagline"
        />
      </div>
    </div>
  );

  const renderHeadingEditor = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Heading Level</Label>
        <Select
          value={content.heading?.level || 'h2'}
          onValueChange={(value) => updateContent({ heading: { ...content.heading, level: value as 'h1' | 'h2' | 'h3' } })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="h1">H1</SelectItem>
            <SelectItem value="h2">H2</SelectItem>
            <SelectItem value="h3">H3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Text</Label>
        <Input
          value={content.heading?.text || ''}
          onChange={(e) => updateContent({ heading: { ...content.heading, text: e.target.value } })}
          placeholder="Enter heading text"
        />
      </div>
    </div>
  );

  const renderParagraphEditor = () => (
    <div className="space-y-2">
      <Label>Text</Label>
      <Textarea
        value={content.paragraph?.text || ''}
        onChange={(e) => updateContent({ paragraph: { ...content.paragraph, text: e.target.value } })}
        placeholder="Enter paragraph text"
        rows={4}
      />
    </div>
  );

  const renderImageEditor = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Image URL</Label>
        <div className="flex gap-2">
          <Input
            value={content.image?.url || ''}
            onChange={(e) => updateContent({ image: { ...content.image, url: e.target.value } })}
            placeholder="https://example.com/image.jpg"
          />
          <Button variant="outline" size="icon">
            Upload
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Alt Text</Label>
        <Input
          value={content.image?.alt || ''}
          onChange={(e) => updateContent({ image: { ...content.image, alt: e.target.value } })}
          placeholder="Image description"
        />
      </div>
    </div>
  );

  const renderButtonEditor = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Button Text</Label>
        <Input
          value={content.button?.text || ''}
          onChange={(e) => updateContent({ button: { ...content.button, text: e.target.value } })}
          placeholder="Click here"
        />
      </div>
      <div className="space-y-2">
        <Label>URL</Label>
        <Input
          value={content.button?.url || ''}
          onChange={(e) => updateContent({ button: { ...content.button, url: e.target.value } })}
          placeholder="https://example.com"
        />
      </div>
    </div>
  );

  const renderFeaturedArticleEditor = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Featured Image</Label>
        <div className="flex gap-2">
          <Input
            value={content.featuredArticle?.image || ''}
            onChange={(e) => updateContent({
              featuredArticle: {
                ...content.featuredArticle,
                image: e.target.value
              }
            })}
            placeholder="https://example.com/image.jpg"
          />
          <Button variant="outline" size="icon">
            Upload
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={content.featuredArticle?.title || ''}
          onChange={(e) => updateContent({
            featuredArticle: {
              ...content.featuredArticle,
              title: e.target.value
            }
          })}
          placeholder="Article title"
        />
      </div>
      <div className="space-y-2">
        <Label>Summary</Label>
        <Textarea
          value={content.featuredArticle?.summary || ''}
          onChange={(e) => updateContent({
            featuredArticle: {
              ...content.featuredArticle,
              summary: e.target.value
            }
          })}
          placeholder="Article summary"
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label>Call to Action</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            value={content.featuredArticle?.buttonText || ''}
            onChange={(e) => updateContent({
              featuredArticle: {
                ...content.featuredArticle,
                buttonText: e.target.value
              }
            })}
            placeholder="Button text"
          />
          <Input
            value={content.featuredArticle?.buttonUrl || ''}
            onChange={(e) => updateContent({
              featuredArticle: {
                ...content.featuredArticle,
                buttonUrl: e.target.value
              }
            })}
            placeholder="Button URL"
          />
        </div>
      </div>
    </div>
  );

  const renderArticleGridEditor = () => {
    const updateArticle = (index: number, updates: Partial<Article>) => {
      if (!content.articleGrid) return;
      const articles = [...content.articleGrid.articles];
      articles[index] = { ...articles[index], ...updates };
      updateContent({
        articleGrid: {
          ...content.articleGrid,
          articles
        }
      });
    };

    const removeArticle = (index: number) => {
      if (!content.articleGrid) return;
      const articles = [...content.articleGrid.articles];
      articles.splice(index, 1);
      updateContent({
        articleGrid: {
          ...content.articleGrid,
          articles
        }
      });
    };

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Articles</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newArticle: Article = {
                  id: `article-${Date.now()}`,
                  image: 'https://placehold.co/600x400',
                  title: 'New Article',
                  description: 'Enter article description here.',
                  buttonText: 'Read More',
                  buttonUrl: '#'
                };
                updateContent({
                  articleGrid: {
                    ...content.articleGrid,
                    articles: [...(content.articleGrid?.articles || []), newArticle]
                  }
                });
              }}
            >
              Add Article
            </Button>
          </div>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {content.articleGrid?.articles?.map((article: Article, index: number) => (
                <Card key={article.id}>
                  <CardHeader>
                    <CardTitle className="text-base flex justify-between">
                      Article {index + 1}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArticle(index)}
                      >
                        Remove
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Image</Label>
                      <div className="flex gap-2">
                        <Input
                          value={article.image || ''}
                          onChange={(e) => updateArticle(index, { image: e.target.value })}
                          placeholder="https://example.com/image.jpg"
                        />
                        <Button variant="outline" size="icon">
                          Upload
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={article.title || ''}
                        onChange={(e) => updateArticle(index, { title: e.target.value })}
                        placeholder="Article title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={article.description || ''}
                        onChange={(e) => updateArticle(index, { description: e.target.value })}
                        placeholder="Article description"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Call to Action</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={article.buttonText || ''}
                          onChange={(e) => updateArticle(index, { buttonText: e.target.value })}
                          placeholder="Button text"
                        />
                        <Input
                          value={article.buttonUrl || ''}
                          onChange={(e) => updateArticle(index, { buttonUrl: e.target.value })}
                          placeholder="Button URL"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    );
  };

  const renderSocialMediaEditor = () => (
    <div className="space-y-4">
      <SocialMediaSection
        links={content.socialLinks || []}
        onChange={(links) => onChange({ ...content, socialLinks: links })}
      />
    </div>
  );

  const renderQuizEditor = () => (
    <div className="space-y-4">
      <QuizSection
        question={content.quiz || {
          id: `quiz-${Date.now()}`,
          question: '',
          options: [],
          footerText: '',
          buttonText: 'Submit Answer'
        }}
        onChange={(question) => onChange({ ...content, quiz: question })}
      />
    </div>
  );

  const renderEventsEditor = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Section Title</Label>
        <Input
          value={content.eventsTitle || ''}
          onChange={(e) => onChange({ ...content, eventsTitle: e.target.value })}
          placeholder="Upcoming Events"
        />
      </div>
      <EventList
        events={content.events || []}
        onChange={(events) => onChange({ ...content, events })}
      />
    </div>
  );

  const renderSubscribeEditor = () => (
    <div className="space-y-4">
      <NewsletterSubscribe
        formData={content.subscribeForm || {
          title: 'Stay Updated with Our Newsletter',
          description: 'Join our community and get the latest updates.',
          buttonText: 'Subscribe Now',
          backgroundColor: '#f8f9fa',
          textColor: '#212529',
          buttonColor: '#007bff',
          buttonTextColor: '#ffffff'
        }}
        onChange={(formData) => onChange({ ...content, subscribeForm: { ...content.subscribeForm, ...formData } })}
      />
    </div>
  );

  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="space-y-4 p-4">
        {type === 'header' && renderHeaderEditor()}
        {type === 'heading' && renderHeadingEditor()}
        {type === 'paragraph' && renderParagraphEditor()}
        {type === 'image' && renderImageEditor()}
        {type === 'button' && renderButtonEditor()}
        {type === 'featured-article' && renderFeaturedArticleEditor()}
        {type === 'article-grid' && renderArticleGridEditor()}
        {type === 'social-media' && renderSocialMediaEditor()}
        {type === 'quiz' && renderQuizEditor()}
        {type === 'events' && renderEventsEditor()}
        {type === 'subscribe' && renderSubscribeEditor()}
      </div>
    </ScrollArea>
  );
}; 