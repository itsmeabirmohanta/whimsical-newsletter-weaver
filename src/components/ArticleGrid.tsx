import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ColorPicker } from '@/components/ui/color-picker';
import { Plus, Trash2 } from 'lucide-react';

export interface Article {
  id: string;
  image?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
}

export interface ArticleGridData {
  articles: Article[];
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
}

interface ArticleGridProps {
  data: ArticleGridData;
  onChange: (data: ArticleGridData) => void;
}

export function ArticleGrid({ data, onChange }: ArticleGridProps) {
  const handleStyleChange = (field: keyof Omit<ArticleGridData, 'articles'>, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleArticleChange = (articleId: string, field: keyof Article, value: string) => {
    onChange({
      ...data,
      articles: data.articles.map(article =>
        article.id === articleId ? { ...article, [field]: value } : article
      )
    });
  };

  const addArticle = () => {
    onChange({
      ...data,
      articles: [
        ...data.articles,
        {
          id: `article-${Date.now()}`,
          image: 'https://placehold.co/600x400',
          title: 'New Article',
          description: 'Write your article description here.',
          buttonText: 'Read More',
          buttonUrl: '#'
        }
      ]
    });
  };

  const removeArticle = (articleId: string) => {
    onChange({
      ...data,
      articles: data.articles.filter(article => article.id !== articleId)
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Background Color</Label>
          <ColorPicker
            color={data.backgroundColor || '#ffffff'}
            onChange={(color) => handleStyleChange('backgroundColor', color)}
          />
        </div>
        <div className="space-y-2">
          <Label>Text Color</Label>
          <ColorPicker
            color={data.textColor || '#000000'}
            onChange={(color) => handleStyleChange('textColor', color)}
          />
        </div>
        <div className="space-y-2">
          <Label>Button Color</Label>
          <ColorPicker
            color={data.buttonColor || '#007bff'}
            onChange={(color) => handleStyleChange('buttonColor', color)}
          />
        </div>
        <div className="space-y-2">
          <Label>Button Text Color</Label>
          <ColorPicker
            color={data.buttonTextColor || '#ffffff'}
            onChange={(color) => handleStyleChange('buttonTextColor', color)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Articles</Label>
          <Button size="sm" onClick={addArticle} className="gap-1">
            <Plus className="h-4 w-4" />
            Add Article
          </Button>
        </div>

        {data.articles.map((article, index) => (
          <div key={article.id} className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <Label>Article {index + 1}</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeArticle(article.id)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`image-${article.id}`}>Image URL</Label>
              <Input
                id={`image-${article.id}`}
                value={article.image || ''}
                onChange={(e) => handleArticleChange(article.id, 'image', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`title-${article.id}`}>Title</Label>
              <Input
                id={`title-${article.id}`}
                value={article.title}
                onChange={(e) => handleArticleChange(article.id, 'title', e.target.value)}
                placeholder="Article Title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${article.id}`}>Description</Label>
              <Textarea
                id={`description-${article.id}`}
                value={article.description}
                onChange={(e) => handleArticleChange(article.id, 'description', e.target.value)}
                placeholder="Write your article description..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`buttonText-${article.id}`}>Button Text</Label>
              <Input
                id={`buttonText-${article.id}`}
                value={article.buttonText}
                onChange={(e) => handleArticleChange(article.id, 'buttonText', e.target.value)}
                placeholder="Read More"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`buttonUrl-${article.id}`}>Button URL</Label>
              <Input
                id={`buttonUrl-${article.id}`}
                value={article.buttonUrl}
                onChange={(e) => handleArticleChange(article.id, 'buttonUrl', e.target.value)}
                placeholder="https://example.com/article"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 