import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

export interface FooterData {
  companyName: string;
  address: string;
  email: string;
  phone: string;
  socialLinks: Array<{ platform: string; url: string }>;
  copyrightText: string;
  unsubscribeText: string;
  backgroundColor: string;
  textColor: string;
  linkColor: string;
}

interface FooterSectionProps {
  data: FooterData;
  onChange: (data: Partial<FooterData>) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ data, onChange }) => {
  const addSocialLink = () => {
    onChange({
      socialLinks: [
        ...(data.socialLinks || []),
        { platform: '', url: '' }
      ]
    });
  };

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    const newLinks = [...(data.socialLinks || [])];
    newLinks[index] = { ...newLinks[index], [field]: value };
    onChange({ socialLinks: newLinks });
  };

  const removeSocialLink = (index: number) => {
    const newLinks = [...(data.socialLinks || [])];
    newLinks.splice(index, 1);
    onChange({ socialLinks: newLinks });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Company Name</Label>
        <Input
          value={data.companyName}
          onChange={(e) => onChange({ companyName: e.target.value })}
          placeholder="Your Company Name"
        />
      </div>

      <div className="space-y-2">
        <Label>Address</Label>
        <Textarea
          value={data.address}
          onChange={(e) => onChange({ address: e.target.value })}
          placeholder="Company Address"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="contact@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label>Phone</Label>
          <Input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Social Links</Label>
        <div className="space-y-2">
          {data.socialLinks?.map((link, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={link.platform}
                onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                placeholder="Platform (e.g., Facebook)"
                className="flex-1"
              />
              <Input
                value={link.url}
                onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                placeholder="URL"
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSocialLink(index)}
                className="h-10 w-10 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addSocialLink}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Social Link
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Copyright Text</Label>
        <Input
          value={data.copyrightText}
          onChange={(e) => onChange({ copyrightText: e.target.value })}
          placeholder="© 2024 Your Company. All rights reserved."
        />
      </div>

      <div className="space-y-2">
        <Label>Unsubscribe Text</Label>
        <Input
          value={data.unsubscribeText}
          onChange={(e) => onChange({ unsubscribeText: e.target.value })}
          placeholder="Click here to unsubscribe from our newsletter"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Background Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={data.backgroundColor}
              onChange={(e) => onChange({ backgroundColor: e.target.value })}
              className="w-12 h-10 p-1"
            />
            <Input
              value={data.backgroundColor}
              onChange={(e) => onChange({ backgroundColor: e.target.value })}
              placeholder="#ffffff"
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Text Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={data.textColor}
              onChange={(e) => onChange({ textColor: e.target.value })}
              className="w-12 h-10 p-1"
            />
            <Input
              value={data.textColor}
              onChange={(e) => onChange({ textColor: e.target.value })}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Link Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={data.linkColor}
              onChange={(e) => onChange({ linkColor: e.target.value })}
              className="w-12 h-10 p-1"
            />
            <Input
              value={data.linkColor}
              onChange={(e) => onChange({ linkColor: e.target.value })}
              placeholder="#007bff"
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 