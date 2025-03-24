
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { NewsletterItem } from '@/pages/NewsletterBuilder';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grip, X, Edit, Check } from 'lucide-react';
import { useState } from 'react';

interface SortableNewsletterItemProps {
  item: NewsletterItem;
  onDelete: (id: string) => void;
  onUpdate: (item: NewsletterItem) => void;
}

export function SortableNewsletterItem({ item, onDelete, onUpdate }: SortableNewsletterItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(item.content);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEditToggle = () => {
    if (isEditing) {
      onUpdate({
        ...item,
        content: editedContent
      });
    }
    setIsEditing(!isEditing);
  };

  const renderContent = () => {
    if (!isEditing) {
      switch (item.type) {
        case 'heading':
          return (
            <div className="text-center py-2">
              {item.content.level === 'h1' && <h1 className="text-2xl font-semibold">{item.content.text}</h1>}
              {item.content.level === 'h2' && <h2 className="text-xl font-semibold">{item.content.text}</h2>}
              {item.content.level === 'h3' && <h3 className="text-lg font-semibold">{item.content.text}</h3>}
            </div>
          );
        case 'paragraph':
          return <p className={`py-2 text-${item.content.align}`}>{item.content.text}</p>;
        case 'image':
          return (
            <div className="py-2">
              <img src={item.content.url} alt={item.content.alt} className="max-w-full h-auto" />
            </div>
          );
        case 'button':
          return (
            <div className="py-2 text-center">
              <Button variant="email">{item.content.text}</Button>
            </div>
          );
        case 'divider':
          return <hr className="my-4 border-t border-gray-200" />;
        case 'spacer':
          return <div style={{ height: `${item.content.height}px` }} />;
        case 'featured-article':
          return (
            <div className="border rounded-md overflow-hidden">
              <img src={item.content.image} alt={item.content.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.content.title}</h3>
                <p className="text-sm text-gray-500">By {item.content.author} • {item.content.date}</p>
                <p className="mt-2">{item.content.excerpt}</p>
                <div className="mt-4">
                  <Button variant="email" size="sm">{item.content.cta} →</Button>
                </div>
              </div>
            </div>
          );
        case 'article-grid':
          return (
            <div className="grid grid-cols-2 gap-4">
              {item.content.articles.map((article: any) => (
                <div key={article.id} className="border rounded-md overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-32 object-cover" />
                  <div className="p-3">
                    <h4 className="font-medium text-sm">{article.title}</h4>
                    <p className="text-xs text-gray-500">By {article.author}</p>
                    <p className="text-xs mt-1 line-clamp-2">{article.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          );
        default:
          return <div>Unknown block type</div>;
      }
    } else {
      // Edit mode UI
      switch (item.type) {
        case 'heading':
          return (
            <div className="space-y-3">
              <Input 
                value={editedContent.text} 
                onChange={(e) => setEditedContent({...editedContent, text: e.target.value})}
                placeholder="Heading text" 
              />
              <Select 
                value={editedContent.level}
                onValueChange={(value) => setEditedContent({...editedContent, level: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select heading level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h1">Heading 1 (Large)</SelectItem>
                  <SelectItem value="h2">Heading 2 (Medium)</SelectItem>
                  <SelectItem value="h3">Heading 3 (Small)</SelectItem>
                </SelectContent>
              </Select>
              <Select 
                value={editedContent.align}
                onValueChange={(value) => setEditedContent({...editedContent, align: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Text alignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          );
        case 'paragraph':
          return (
            <div className="space-y-3">
              <Textarea 
                value={editedContent.text} 
                onChange={(e) => setEditedContent({...editedContent, text: e.target.value})}
                placeholder="Paragraph text" 
                rows={4}
              />
              <Select 
                value={editedContent.align}
                onValueChange={(value) => setEditedContent({...editedContent, align: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Text alignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          );
        // Add edit UIs for other content types as needed
        default:
          return <div>Editing not yet supported for this block type</div>;
      }
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative group"
    >
      <Card className="border border-dashed group-hover:border-primary group-hover:shadow-sm transition-all">
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 rounded-full bg-background shadow-sm"
            {...listeners}
          >
            <Grip className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 rounded-full bg-background shadow-sm"
            onClick={handleEditToggle}
          >
            {isEditing ? <Check className="h-3 w-3" /> : <Edit className="h-3 w-3" />}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 rounded-full bg-background text-destructive shadow-sm hover:bg-destructive hover:text-white"
            onClick={() => onDelete(item.id)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        
        <CardContent className="p-4">
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
}
