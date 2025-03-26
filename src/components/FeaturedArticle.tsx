import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ColorPicker } from '@/components/ui/color-picker';

export interface FeaturedArticleData {
  image?: string;
  title: string;
  summary: string;
  buttonText?: string;
  buttonUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
}

interface FeaturedArticleProps {
  data: FeaturedArticleData;
  onChange: (data: FeaturedArticleData) => void;
}

export function FeaturedArticle({ data, onChange }: FeaturedArticleProps) {
  const handleChange = (field: keyof FeaturedArticleData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={data.image || ''}
          onChange={(e) => handleChange('image', e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Article Title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          value={data.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Write a compelling summary..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="buttonText">Button Text</Label>
        <Input
          id="buttonText"
          value={data.buttonText || ''}
          onChange={(e) => handleChange('buttonText', e.target.value)}
          placeholder="Read More"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="buttonUrl">Button URL</Label>
        <Input
          id="buttonUrl"
          value={data.buttonUrl || ''}
          onChange={(e) => handleChange('buttonUrl', e.target.value)}
          placeholder="https://example.com/article"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Background Color</Label>
          <ColorPicker
            color={data.backgroundColor || '#ffffff'}
            onChange={(color) => handleChange('backgroundColor', color)}
          />
        </div>
        <div className="space-y-2">
          <Label>Text Color</Label>
          <ColorPicker
            color={data.textColor || '#000000'}
            onChange={(color) => handleChange('textColor', color)}
          />
        </div>
        <div className="space-y-2">
          <Label>Button Color</Label>
          <ColorPicker
            color={data.buttonColor || '#007bff'}
            onChange={(color) => handleChange('buttonColor', color)}
          />
        </div>
        <div className="space-y-2">
          <Label>Button Text Color</Label>
          <ColorPicker
            color={data.buttonTextColor || '#ffffff'}
            onChange={(color) => handleChange('buttonTextColor', color)}
          />
        </div>
      </div>
    </div>
  );
} 