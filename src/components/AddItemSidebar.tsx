import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  LayoutTemplate,
  Type,
  Image,
  Link,
  Minus,
  ArrowDownWideNarrow,
  Share2,
  HelpCircle,
  Calendar,
  Mail,
  Layout,
  Newspaper,
  LayoutGrid,
  Heading,
  AlignLeft,
  Square
} from 'lucide-react';

interface AddItemSidebarProps {
  onAddItem: (type: string) => void;
}

const itemGroups = [
  {
    title: 'Basic Elements',
    items: [
      { type: 'header', label: 'Header', icon: LayoutTemplate },
      { type: 'heading', label: 'Heading', icon: Type },
      { type: 'paragraph', label: 'Paragraph', icon: Type },
      { type: 'image', label: 'Image', icon: Image },
      { type: 'button', label: 'Button', icon: Link },
      { type: 'divider', label: 'Divider', icon: Minus },
      { type: 'spacer', label: 'Spacer', icon: ArrowDownWideNarrow },
    ]
  },
  {
    title: 'Article Components',
    items: [
      { type: 'featured-article', label: 'Featured Article', icon: Newspaper },
      { type: 'article-grid', label: 'Article Grid', icon: LayoutGrid },
    ]
  },
  {
    title: 'Interactive Elements',
    items: [
      { type: 'social-media', label: 'Social Media', icon: Share2 },
      { type: 'quiz', label: 'Quiz/Poll', icon: HelpCircle },
      { type: 'events', label: 'Events', icon: Calendar },
      { type: 'subscribe', label: 'Subscribe Form', icon: Mail },
    ]
  },
  {
    title: 'Footer',
    items: [
      { type: 'footer', label: 'Footer', icon: Layout },
    ]
  }
];

export function AddItemSidebar({ onAddItem }: AddItemSidebarProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">Add Items</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Basic Elements */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Basic Elements</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-2" onClick={() => onAddItem('heading')}>
                <Heading className="h-5 w-5" />
                <span className="text-sm">Heading</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-2" onClick={() => onAddItem('paragraph')}>
                <AlignLeft className="h-5 w-5" />
                <span className="text-sm">Paragraph</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-2" onClick={() => onAddItem('image')}>
                <Image className="h-5 w-5" />
                <span className="text-sm">Image</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-2" onClick={() => onAddItem('button')}>
                <Square className="h-5 w-5" />
                <span className="text-sm">Button</span>
              </Button>
            </div>
          </div>

          <Separator />

          {/* Article Components */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Article Components</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-2" onClick={() => onAddItem('featured-article')}>
                <Newspaper className="h-5 w-5" />
                <span className="text-sm">Featured Article</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-2" onClick={() => onAddItem('article-grid')}>
                <LayoutGrid className="h-5 w-5" />
                <span className="text-sm">Article Grid</span>
              </Button>
            </div>
          </div>

          <Separator />

          {/* Interactive Elements */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Interactive Elements</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-2" onClick={() => onAddItem('social-media')}>
                <Share2 className="h-5 w-5" />
                <span className="text-sm">Social Media</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-2" onClick={() => onAddItem('quiz')}>
                <HelpCircle className="h-5 w-5" />
                <span className="text-sm">Quiz/Poll</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-2" onClick={() => onAddItem('events')}>
                <Calendar className="h-5 w-5" />
                <span className="text-sm">Events</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-2" onClick={() => onAddItem('subscribe-form')}>
                <Mail className="h-5 w-5" />
                <span className="text-sm">Subscribe Form</span>
              </Button>
            </div>
          </div>

          <Separator />

          {/* Footer Items */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Footer Items</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-2" onClick={() => onAddItem('footer')}>
                <Separator className="h-5 w-5" />
                <span className="text-sm">Footer</span>
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
} 