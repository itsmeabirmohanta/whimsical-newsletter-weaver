
import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { Button } from '@/components/ui/button';
import NewsletterHeader from '@/components/NewsletterHeader';
import NewsletterFooter from '@/components/NewsletterFooter';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { SortableNewsletterItem } from '@/components/SortableNewsletterItem';
import { NewsletterItemList } from '@/components/NewsletterItemList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Code, Eye, CopyCheck, Send } from 'lucide-react';
import { toast } from 'sonner';
import { generateEmailHTML } from '@/lib/email-generator';

// Define the interface for newsletter items
export interface NewsletterItem {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'button' | 'divider' | 'spacer' | 'featured-article' | 'article-grid';
  content: any;
}

const initialItems: NewsletterItem[] = [
  {
    id: 'heading-1',
    type: 'heading',
    content: {
      text: 'Future Shift Labs Monthly Digest',
      level: 'h1',
      align: 'center',
    },
  },
  {
    id: 'paragraph-1',
    type: 'paragraph',
    content: {
      text: 'We have a surprise! ENVISIONING THE FUTURE.',
      align: 'center',
    },
  },
  {
    id: 'featured-1',
    type: 'featured-article',
    content: {
      title: 'AI and the 2024 Elections: A Policy Perspective',
      author: 'Alisha Butala',
      date: 'May 15, 2024',
      image: 'https://images.unsplash.com/photo-1635032730510-05feceacc9e5?auto=format&fit=crop&w=1200&q=80',
      excerpt: 'The 2024 elections were a turning point for global democracy, with nearly 74 countries heading to the polls. AI played a more significant role than ever before.',
      cta: 'Continue reading',
    },
  },
  {
    id: 'article-grid-1',
    type: 'article-grid',
    content: {
      articles: [
        {
          id: 'op-ed-1',
          title: "India's AI Boom: A Moment of Opportunity and Challenge",
          author: 'Alisha Butala',
          image: 'https://images.unsplash.com/photo-1598965402089-897e8f3f1c70?auto=format&fit=crop&w=800&q=80',
          excerpt: 'As India advances in artificial intelligence, the country faces a dual challenge...',
        },
        {
          id: 'op-ed-2',
          title: "AI's Double-Edged Sword: The EU's Bold Regulatory Stand",
          author: 'Parishrut Jassal',
          image: 'https://images.unsplash.com/photo-1569396116180-210c182bedb8?auto=format&fit=crop&w=800&q=80',
          excerpt: 'In an era when artificial intelligence is rewriting the rules of business, governance, and daily life...',
        }
      ]
    },
  },
];

const NewsletterBuilder = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState<NewsletterItem[]>(initialItems);
  const [previewMode, setPreviewMode] = useState<'edit' | 'preview'>('edit');
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: { active: { id: string } }) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    
    setActiveId(null);
  };

  const handleAddItem = (item: NewsletterItem) => {
    setItems([...items, item]);
    toast.success(`Added ${item.type} to newsletter`);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast.success("Item removed");
  };

  const handleUpdateItem = (updatedItem: NewsletterItem) => {
    setItems(items.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const handleSaveTemplate = () => {
    // In a real app, this would save to backend
    localStorage.setItem('newsletter-template', JSON.stringify(items));
    toast.success("Newsletter template saved");
  };

  const handleExportHTML = () => {
    const html = generateEmailHTML(items);
    navigator.clipboard.writeText(html);
    toast.success("HTML copied to clipboard");
  };

  const handleSendTestEmail = () => {
    // This would connect to an email service in a real implementation
    toast.success("Test email sent! Check your inbox");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <NewsletterHeader />
      
      <main className="pt-24 pb-12">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-medium">Newsletter Builder</h1>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setPreviewMode(previewMode === 'edit' ? 'preview' : 'edit')}>
                {previewMode === 'edit' ? <Eye size={16} className="mr-2" /> : <Code size={16} className="mr-2" />}
                {previewMode === 'edit' ? 'Preview' : 'Edit'}
              </Button>
              <Button size="sm" variant="outline" onClick={handleExportHTML}>
                <CopyCheck size={16} className="mr-2" />
                Copy HTML
              </Button>
              <Button size="sm" variant="outline" onClick={handleSendTestEmail}>
                <Send size={16} className="mr-2" />
                Send Test
              </Button>
              <Button size="sm" onClick={handleSaveTemplate}>
                <Save size={16} className="mr-2" />
                Save Template
              </Button>
            </div>
          </div>
          
          {previewMode === 'edit' ? (
            <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
              <ResizablePanel defaultSize={25} minSize={20}>
                <div className="p-4 h-full overflow-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle>Content Blocks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <NewsletterItemList onAddItem={handleAddItem} />
                    </CardContent>
                  </Card>
                </div>
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              <ResizablePanel defaultSize={75}>
                <div className="p-6 bg-gray-50 h-full overflow-auto">
                  <div className="max-w-2xl mx-auto bg-white p-8 shadow-sm rounded-lg">
                    <DndContext 
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      modifiers={[restrictToParentElement]}
                    >
                      <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-4">
                          {items.map((item) => (
                            <SortableNewsletterItem 
                              key={item.id} 
                              item={item} 
                              onDelete={handleDeleteItem} 
                              onUpdate={handleUpdateItem}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg border min-h-[600px] overflow-auto">
              <div className="max-w-2xl mx-auto bg-white p-8 shadow rounded-lg">
                {/* Preview mode - render the actual email content */}
                <div dangerouslySetInnerHTML={{ __html: generateEmailHTML(items) }} />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <NewsletterFooter />
    </div>
  );
};

export default NewsletterBuilder;
