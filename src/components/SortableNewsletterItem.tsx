import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit, Trash2, ChevronDown, ChevronUp, Pencil, Settings, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { NewsletterItem } from '@/pages/NewsletterBuilder';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface SortableNewsletterItemProps {
  item: NewsletterItem;
  onUpdate: (updates: Partial<NewsletterItem>) => void;
  onDelete: () => void;
  showColorControls?: boolean;
  themeColors?: {
    backgroundColor: string;
    textColor: string;
    linkColor: string;
  };
  onSelect?: (id: string) => void;
  isSelected?: boolean;
}

// Define quiz-related interfaces
interface QuizOption {
  text: string;
  isCorrect: boolean;
}

interface Quiz {
  question: string;
  image?: string;
  options: QuizOption[];
}

// Define types for our content values
type ContentValue = 
  | string 
  | number 
  | { [key: string]: any } // Allow any object structure for complex components
  | Array<{ platform: string; url: string; [key: string]: any }>
  | Array<{ 
      title: string; 
      author: string; 
      date?: string; 
      image: string; 
      excerpt?: string; 
      linkUrl?: string; 
      linkText?: string; 
      [key: string]: any;
    }>
  | Array<{
      title: string;
      date: string;
      time?: string;
      location?: string;
      description?: string;
      [key: string]: any;
    }>
  | Quiz[]
  | Array<{
      name: string;
      image: string;
      price: string;
      description?: string;
      discount?: string;
      link?: string;
      [key: string]: any;
    }>;

const SortableNewsletterItem: React.FC<SortableNewsletterItemProps> = ({
  item,
  onUpdate,
  onDelete,
  showColorControls = false,
  themeColors,
  onSelect,
  isSelected = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("content");
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: item.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  
  // Update content of the item with proper typing
  const handleContentChange = (key: string, value: ContentValue) => {
    onUpdate({
      content: {
        ...item.content,
        [key]: value
      }
    });
  };
  
  // Specialized function to handle social links array
  const handleSocialLinksChange = (newLinks: Array<{platform: string, url: string}>) => {
    onUpdate({
      content: {
        ...item.content,
        socialLinks: newLinks
      }
    });
  };
  
  // Update style of the item
  const handleStyleChange = (key: string, value: string) => {
    onUpdate({
      style: {
        ...item.style,
        [key]: value
      }
    });
  };
  
  // Gets the appropriate style for content preview based on the item's style properties
  const getPreviewStyle = () => {
    const style: React.CSSProperties = {};
    
    // First apply theme colors from props
    if (themeColors) {
      if (!item.style?.backgroundColor) {
        style.backgroundColor = themeColors.backgroundColor;
      }
      if (!item.style?.textColor) {
        style.color = themeColors.textColor;
      }
    }
    
    // Then apply component-specific styles (which take precedence)
    if (item.style) {
      // Handle background options in priority order
      if (item.style.backgroundImage) {
        style.backgroundImage = `url(${item.style.backgroundImage})`;
        style.backgroundSize = 'cover';
        style.backgroundPosition = 'center';
      } else if (item.style.backgroundGradient && item.style.backgroundGradient !== 'none') {
        style.backgroundImage = item.style.backgroundGradient;
      } else if (item.style.backgroundColor) {
        // If we have opacity and not 1, convert to rgba
        if (item.style.backgroundOpacity !== undefined && item.style.backgroundOpacity < 1) {
          // Parse the hex color to rgba
          if (item.style.backgroundColor.startsWith('#')) {
            const hex = item.style.backgroundColor.slice(1);
            const r = parseInt(hex.slice(0, 2), 16);
            const g = parseInt(hex.slice(2, 4), 16);
            const b = parseInt(hex.slice(4, 6), 16);
            style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${item.style.backgroundOpacity})`;
          } else {
            style.backgroundColor = item.style.backgroundColor;
          }
        } else {
          style.backgroundColor = item.style.backgroundColor;
        }
      }
      
      // Apply text color if specified
      if (item.style.textColor) {
        style.color = item.style.textColor;
      }
      
      // Add any other style properties
      if (item.style.borderColor) {
        style.borderColor = item.style.borderColor;
      }
      
      if (item.style.borderWidth) {
        style.borderWidth = item.style.borderWidth;
      }
      
      if (item.style.borderRadius) {
        style.borderRadius = item.style.borderRadius;
      }
      
      if (item.style.padding) {
        style.padding = item.style.padding;
      }
    }
    
    return style;
  };
  
  // Gets the appropriate style for button preview based on the item's style properties
  const getButtonStyle = () => {
    const style: React.CSSProperties = {
      display: 'inline-block',
      textDecoration: 'none',
      textAlign: 'center',
      padding: '8px 16px',
      borderRadius: '4px',
      fontWeight: 500,
      fontSize: '14px',
      cursor: 'pointer',
    };
    
    // Component-specific button styles take priority over theme styles
    if (item.style?.buttonColor) {
      style.backgroundColor = item.style.buttonColor;
    } else if (themeColors?.linkColor) {
      style.backgroundColor = themeColors.linkColor;
    } else {
      style.backgroundColor = '#8b5cf6'; // Default fallback
    }
    
    if (item.style?.buttonTextColor) {
      style.color = item.style.buttonTextColor;
    } else {
      style.color = '#ffffff'; // Default fallback
    }
    
    if (item.style?.borderRadius) {
      style.borderRadius = item.style.borderRadius;
    }
    
    return style;
  };
  
  // Render the item preview based on its type
  const renderItemPreview = () => {
    const contentStyle = getPreviewStyle();
    const buttonStyle = getButtonStyle();
    
    switch (item.type) {
      case 'header':
        return (
          <div className="py-4 mb-2 rounded" style={contentStyle}>
            <div className="flex flex-col items-center justify-center">
              {item.content.logoUrl && (
                <img 
                  src={item.content.logoUrl} 
                  alt={item.content.logoAlt || item.content.companyName || 'Logo'} 
                  className="max-h-16 mb-2" 
                />
              )}
              {item.content.companyName && (
                <h2 className="text-xl font-bold" style={{ color: item.style?.textColor || themeColors?.textColor }}>
                  {item.content.companyName}
                </h2>
              )}
              {item.content.tagline && (
                <p className="text-sm mt-1" style={{ color: item.style?.textColor || themeColors?.textColor }}>
                  {item.content.tagline}
                </p>
              )}
            </div>
          </div>
        );
      
      case 'footer':
        return (
          <div className="mt-4 pt-3 border-t rounded" style={{
            ...contentStyle,
            borderColor: item.style?.borderColor || '#e9ecef'
          }}>
            <div className="mb-2 text-center">
              {item.content.companyName && (
                <div className="font-bold mb-1" style={{ color: item.style?.textColor || themeColors?.textColor }}>
                  {item.content.companyName}
                </div>
              )}
              {item.content.address && (
                <div className="text-xs mb-1" style={{ color: item.style?.textColor || themeColors?.textColor }}>
                  {item.content.address}
                </div>
              )}
            </div>
            
            {item.content.socialLinks && item.content.socialLinks.length > 0 && (
              <div className="flex justify-center space-x-4 mb-3">
                {item.content.socialLinks.map((link, idx) => (
                  <a 
                    key={idx} 
                    href={link.url} 
                    className="text-xs"
                    style={{ color: item.style?.buttonColor || themeColors?.linkColor || '#8b5cf6' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            )}
            
            <div className="text-xs text-center space-y-1">
              {item.content.contactEmail && (
                <div>
                  <a 
                    href={`mailto:${item.content.contactEmail}`}
                    style={{ color: item.style?.buttonColor || themeColors?.linkColor || '#8b5cf6' }}
                  >
                    {item.content.contactEmail}
                  </a>
                </div>
              )}
              
              <div className="space-x-3">
                {item.content.websiteUrl && (
                  <a 
                    href={item.content.websiteUrl} 
                    className="text-xs"
                    style={{ color: item.style?.buttonColor || themeColors?.linkColor || '#8b5cf6' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a>
                )}
                
                {item.content.unsubscribeUrl && (
                  <a 
                    href={item.content.unsubscribeUrl} 
                    className="text-xs"
                    style={{ color: item.style?.buttonColor || themeColors?.linkColor || '#8b5cf6' }}
                  >
                    Unsubscribe
                  </a>
                )}
              </div>
              
              <div className="mt-2 text-xs opacity-75" style={{ color: item.style?.textColor || themeColors?.textColor }}>
                © {new Date().getFullYear()} {item.content.companyName || 'Your Company'}. All rights reserved.
              </div>
            </div>
          </div>
        );
      
      case 'heading':
        return (
          <div className={`text-${item.content.align || 'left'}`} style={contentStyle}>
            {item.content.level === 'h1' && <h1 className="text-2xl font-bold">{item.content.text}</h1>}
            {item.content.level === 'h2' && <h2 className="text-xl font-bold">{item.content.text}</h2>}
            {item.content.level === 'h3' && <h3 className="text-lg font-bold">{item.content.text}</h3>}
          </div>
        );
      
      case 'paragraph':
        return <p className={`text-${item.content.align || 'left'}`} style={contentStyle}>{item.content.text}</p>;
      
      case 'image':
        return (
          <div className="my-2" style={contentStyle}>
            <img 
              src={item.content.url} 
              alt={item.content.alt || ''} 
              className="max-w-full h-auto mx-auto rounded"
            />
            {item.content.caption && (
              <p className="text-center text-sm text-gray-500 mt-1">{item.content.caption}</p>
            )}
          </div>
        );
      
      case 'button':
        return (
          <div className={`text-${item.content.align || 'left'} my-2`}>
            <a 
              href={item.content.url || '#'}
              className="inline-block px-4 py-2 rounded"
              style={buttonStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.content.text}
            </a>
          </div>
        );
      
      case 'divider':
        return <hr className="my-4 border-t border-gray-200" />;
      
      case 'spacer':
        return (
          <div 
            className="border border-dashed border-gray-200 bg-gray-50 rounded" 
            style={{ height: `${item.content.height || 20}px` }}
          />
        );
      
      case 'compartment':
        return (
          <div className="p-4 rounded border border-gray-200" style={contentStyle}>
            <h3 className="font-medium text-lg" style={{ color: item.style?.textColor || themeColors?.textColor }}>
              {item.content.title || 'Compartment'}
            </h3>
            <div dangerouslySetInnerHTML={{ __html: item.content.content || 'Content goes here' }} />
          </div>
        );
      
      case 'featured-article':
        return (
          <div className="border border-gray-200 rounded overflow-hidden" style={contentStyle}>
            {item.content.image && (
              <img 
                src={item.content.image} 
                alt={item.content.title || 'Featured Article'} 
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-bold text-lg">{item.content.title || 'Article Title'}</h3>
              <p className="text-sm text-gray-500">
                By {item.content.author || 'Author'} • {item.content.date || 'Date'}
              </p>
              <p className="my-2">{item.content.excerpt || 'Article excerpt goes here'}</p>
              <a 
                href={item.content.linkUrl || '#'} 
                className="inline-flex items-center px-4 py-1 rounded text-sm" 
                style={buttonStyle}
              >
                {item.content.cta || 'Read More'}
              </a>
            </div>
          </div>
        );
      
      case 'article-grid':
        return (
          <div className="grid grid-cols-2 gap-4" style={contentStyle}>
            {item.content.articles && item.content.articles.map((article, idx) => (
              <div key={idx} className="border border-gray-200 rounded overflow-hidden transition-all duration-200 hover:shadow-md hover:border-opacity-50 cursor-pointer group flex flex-col h-full">
                <a 
                  href={article.linkUrl || '#'} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block flex-1 flex flex-col"
                >
                  {article.image && (
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title || 'Article Title'}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      By {article.author || 'Author'}
                    </p>
                    <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3">{article.excerpt || 'Article excerpt goes here'}</p>
                    <div className="mt-auto">
                      <span 
                        className="inline-flex items-center px-4 py-2 rounded text-sm" 
                        style={buttonStyle}
                      >
                        {article.linkText || 'Read More'} 
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        );
      
      case 'cta-banner':
        return (
          <>
            <div>
              <Label htmlFor={`cta-title-${item.id}`}>Title</Label>
              <Input
                id={`cta-title-${item.id}`}
                value={item.content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor={`cta-content-${item.id}`}>Content</Label>
              <Textarea
                id={`cta-content-${item.id}`}
                value={item.content.content || ''}
                onChange={(e) => handleContentChange('content', e.target.value)}
                className="min-h-[80px] mt-1"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`cta-button-text-${item.id}`}>Button Text</Label>
                <Input
                  id={`cta-button-text-${item.id}`}
                  value={item.content.buttonText || 'Click Here'}
                  onChange={(e) => handleContentChange('buttonText', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor={`cta-link-${item.id}`}>Button URL</Label>
                <Input
                  id={`cta-link-${item.id}`}
                  value={item.content.linkUrl || '#'}
                  onChange={(e) => handleContentChange('linkUrl', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </>
        );
        
      case 'testimonial':
        return (
          <>
            <div>
              <Label htmlFor={`testimonial-quote-${item.id}`}>Quote</Label>
              <Textarea
                id={`testimonial-quote-${item.id}`}
                value={item.content.quote || ''}
                onChange={(e) => handleContentChange('quote', e.target.value)}
                className="min-h-[100px] mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor={`testimonial-image-${item.id}`}>Image URL</Label>
              <Input
                id={`testimonial-image-${item.id}`}
                value={item.content.image || ''}
                onChange={(e) => handleContentChange('image', e.target.value)}
                placeholder="https://example.com/person.jpg"
                className="mt-1"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`testimonial-attribution-${item.id}`}>Person Name</Label>
                <Input
                  id={`testimonial-attribution-${item.id}`}
                  value={item.content.attribution || ''}
                  onChange={(e) => handleContentChange('attribution', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor={`testimonial-role-${item.id}`}>Role/Title</Label>
                <Input
                  id={`testimonial-role-${item.id}`}
                  value={item.content.role || ''}
                  onChange={(e) => handleContentChange('role', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor={`testimonial-company-${item.id}`}>Company</Label>
              <Input
                id={`testimonial-company-${item.id}`}
                value={item.content.company || ''}
                onChange={(e) => handleContentChange('company', e.target.value)}
                className="mt-1"
              />
            </div>
          </>
        );
        
      case 'event-calendar':
        return (
          <div className="border rounded p-4 my-2" style={contentStyle}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-2">{item.content.title || 'Upcoming Events'}</h3>
              
              {!item.content.events || item.content.events.length === 0 ? (
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => {
                    handleContentChange('events', [
                      {
                        title: 'Sample Event',
                        date: new Date().toISOString().split('T')[0],
                        time: '10:00 AM - 12:00 PM',
                        location: 'Event Location',
                        description: 'Event description goes here.'
                      }
                    ]);
                  }}
                >
                  Add Sample Event
                </Button>
              ) : (
                <div className="space-y-4">
                  {item.content.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="border rounded-lg p-4 relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          const newEvents = [...(item.content.events || [])];
                          newEvents.splice(eventIndex, 1);
                          handleContentChange('events', newEvents);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="space-y-2">
            <div>
                          <Label>Event Title</Label>
              <Input
                            value={event.title}
                            onChange={(e) => {
                              const newEvents = [...(item.content.events || [])];
                              newEvents[eventIndex] = { ...newEvents[eventIndex], title: e.target.value };
                              handleContentChange('events', newEvents);
                            }}
                className="mt-1"
              />
            </div>
            
              <div>
                          <Label>Date</Label>
              <Input
                            type="date"
                            value={event.date}
                            onChange={(e) => {
                              const newEvents = [...(item.content.events || [])];
                              newEvents[eventIndex] = { ...newEvents[eventIndex], date: e.target.value };
                              handleContentChange('events', newEvents);
                            }}
                className="mt-1"
              />
            </div>
            
            <div>
                          <Label>Time</Label>
              <Input
                            value={event.time || ''}
                            onChange={(e) => {
                              const newEvents = [...(item.content.events || [])];
                              newEvents[eventIndex] = { ...newEvents[eventIndex], time: e.target.value };
                              handleContentChange('events', newEvents);
                            }}
                            placeholder="e.g., 10:00 AM - 12:00 PM"
                className="mt-1"
              />
            </div>
            
            <div>
                          <Label>Location</Label>
              <Input
                            value={event.location || ''}
                            onChange={(e) => {
                              const newEvents = [...(item.content.events || [])];
                              newEvents[eventIndex] = { ...newEvents[eventIndex], location: e.target.value };
                              handleContentChange('events', newEvents);
                            }}
                            placeholder="Event Location"
                className="mt-1"
              />
            </div>
      
            <div>
                          <Label>Description</Label>
                          <Textarea
                            value={event.description || ''}
                            onChange={(e) => {
                              const newEvents = [...(item.content.events || [])];
                              newEvents[eventIndex] = { ...newEvents[eventIndex], description: e.target.value };
                              handleContentChange('events', newEvents);
                            }}
                            className="min-h-[60px] mt-1"
              />
            </div>
            </div>
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      const newEvents = [...(item.content.events || [])];
                      newEvents.push({
                        title: `Event ${newEvents.length + 1}`,
                        date: new Date().toISOString().split('T')[0],
                        time: '10:00 AM - 12:00 PM',
                        location: 'Event Location',
                        description: 'Event description goes here.'
                      });
                      handleContentChange('events', newEvents);
                    }}
                  >
                    Add Another Event
                  </Button>
            </div>
              )}
            </div>
          </div>
        );
      
      case 'subscribe-now':
        return (
          <>
            <div>
              <Label htmlFor={`subscribe-title-${item.id}`}>Title</Label>
              <Input
                id={`subscribe-title-${item.id}`}
                value={item.content.subscribeTitle || ''}
                onChange={(e) => handleContentChange('subscribeTitle', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor={`subscribe-message-${item.id}`}>Message</Label>
              <Textarea
                id={`subscribe-message-${item.id}`}
                value={item.content.subscribeMessage || ''}
                onChange={(e) => handleContentChange('subscribeMessage', e.target.value)}
                className="min-h-[80px] mt-1"
              />
            </div>
      
            <div>
              <Label htmlFor={`subscribe-placeholder-${item.id}`}>Input Placeholder</Label>
              <Input
                id={`subscribe-placeholder-${item.id}`}
                value={item.content.subscribeFormPlaceholder || ''}
                onChange={(e) => handleContentChange('subscribeFormPlaceholder', e.target.value)}
                placeholder="Your email address"
                className="mt-1"
              />
            </div>
            
              <div>
              <Label htmlFor={`subscribe-button-${item.id}`}>Button Text</Label>
                <Input
                id={`subscribe-button-${item.id}`}
                value={item.content.subscribeButtonText || ''}
                onChange={(e) => handleContentChange('subscribeButtonText', e.target.value)}
                placeholder="Subscribe Now"
                  className="mt-1"
                />
              </div>
              
              <div>
              <Label htmlFor={`subscribe-action-${item.id}`}>Form Action URL</Label>
                <Input
                id={`subscribe-action-${item.id}`}
                value={item.content.subscribeFormAction || ''}
                onChange={(e) => handleContentChange('subscribeFormAction', e.target.value)}
                placeholder="https://example.com/subscribe"
                  className="mt-1"
                />
              </div>
          </>
        );
            
      case 'quiz':
        if (isEditing) {
          return (
            <div className="space-y-4">
            <div>
                <Label>Title</Label>
              <Input
                  value={item.content.title || 'Quiz'}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                className="mt-1"
              />
            </div>
            
              {!item.content.quizzes || item.content.quizzes.length === 0 ? (
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => {
                    handleContentChange('quizzes', [{
                      question: 'Sample Question',
                      image: '',
                      options: [
                        { text: 'Option 1', isCorrect: false },
                        { text: 'Option 2', isCorrect: false },
                        { text: 'Option 3', isCorrect: false },
                        { text: 'Option 4', isCorrect: true }
                      ]
                    }]);
                  }}
                >
                  Add Sample Quiz
                  </Button>
                ) : (
                <div className="space-y-4">
                  {item.content.quizzes.map((quiz, quizIndex) => (
                    <div key={quizIndex} className="border rounded-lg p-4 relative">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                        className="absolute top-2 right-2"
                            onClick={() => {
                          const newQuizzes = [...(item.content.quizzes || [])] as Quiz[];
                          newQuizzes.splice(quizIndex, 1);
                          handleContentChange('quizzes', newQuizzes);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        
                      <div className="space-y-2">
                          <div>
                          <Label>Question</Label>
                          <Textarea
                            value={quiz.question}
                              onChange={(e) => {
                              const newQuizzes = [...(item.content.quizzes || [])] as Quiz[];
                              newQuizzes[quizIndex] = { ...newQuizzes[quizIndex], question: e.target.value };
                              handleContentChange('quizzes', newQuizzes);
                              }}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                          <Label>Image URL (Optional)</Label>
                            <Input
                            value={quiz.image || ''}
                              onChange={(e) => {
                              const newQuizzes = [...(item.content.quizzes || [])] as Quiz[];
                              newQuizzes[quizIndex] = { ...newQuizzes[quizIndex], image: e.target.value };
                              handleContentChange('quizzes', newQuizzes);
                            }}
                            placeholder="https://example.com/image.jpg"
                              className="mt-1"
                            />
                          </div>
                          
                        <div className="space-y-2">
                          <Label>Options</Label>
                          {quiz.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center gap-2">
                            <Input
                                value={option.text}
                              onChange={(e) => {
                                  const newQuizzes = [...(item.content.quizzes || [])] as Quiz[];
                                  newQuizzes[quizIndex].options[optionIndex].text = e.target.value;
                                  handleContentChange('quizzes', newQuizzes);
                                }}
                                className="flex-1"
                              />
                              <div className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={`correct-${quizIndex}`}
                                  checked={option.isCorrect}
                                  onChange={() => {
                                    const newQuizzes = [...(item.content.quizzes || [])] as Quiz[];
                                    newQuizzes[quizIndex].options = newQuizzes[quizIndex].options.map((opt, idx) => ({
                                      ...opt,
                                      isCorrect: idx === optionIndex
                                    }));
                                    handleContentChange('quizzes', newQuizzes);
                                  }}
                                />
                                <Label className="text-xs">Correct</Label>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    const newQuizzes = [...(item.content.quizzes || [])] as Quiz[];
                                    newQuizzes[quizIndex].options.splice(optionIndex, 1);
                                    handleContentChange('quizzes', newQuizzes);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                          </div>
                            </div>
                          ))}
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-2"
                            onClick={() => {
                              const newQuizzes = [...(item.content.quizzes || [])] as Quiz[];
                              newQuizzes[quizIndex].options.push({
                                text: `Option ${newQuizzes[quizIndex].options.length + 1}`,
                                isCorrect: false
                              });
                              handleContentChange('quizzes', newQuizzes);
                            }}
                          >
                            Add Option
                          </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                      const newQuizzes = [...(item.content.quizzes || [])] as Quiz[];
                      newQuizzes.push({
                        question: `Question ${newQuizzes.length + 1}`,
                        image: '',
                        options: [
                          { text: 'Option 1', isCorrect: false },
                          { text: 'Option 2', isCorrect: false },
                          { text: 'Option 3', isCorrect: false },
                          { text: 'Option 4', isCorrect: true }
                        ]
                      });
                      handleContentChange('quizzes', newQuizzes);
                    }}
                  >
                    Add Another Quiz
                    </Button>
                  </div>
                )}
              </div>
        );
        }
      
        return (
          <div className="border rounded p-4 my-2" style={contentStyle}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-2">{item.content.title || 'Quiz'}</h3>
              
              {!item.content.quizzes || item.content.quizzes.length === 0 ? (
                <p className="text-muted-foreground text-sm">No quiz questions added yet.</p>
              ) : (
                <div className="space-y-4">
                  {item.content.quizzes.map((quiz, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">{quiz.question}</h4>
                      {quiz.image && (
                        <img src={quiz.image} alt="Quiz question" className="mb-2 max-w-full h-auto rounded" />
                      )}
                      <div className="space-y-2">
                        {quiz.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name={`quiz-${index}`} 
                              disabled 
                              checked={option.isCorrect}
                            />
                            <span className={cn(
                              "text-sm",
                              option.isCorrect ? "font-medium text-green-600" : ""
                            )}>
                              {option.text}
                            </span>
            </div>
                        ))}
            </div>
            </div>
                  ))}
            </div>
              )}
            </div>
          </div>
        );
      
      default:
        return (
          <p className="text-muted-foreground text-sm p-4 bg-gray-50/50 rounded">
            Basic editor not available for this component type. Use the template manager to modify complex components.
          </p>
        );
    }
  };
  
  const renderColorControls = () => {
    if (!showColorControls) return null;
    
    // Don't show color controls for divider or spacer
    if (item.type === 'divider' || item.type === 'spacer') return null;

    // Define some preset gradient options
    const gradientPresets = [
      { name: 'None', value: 'none' },
      { name: 'Blue Purple', value: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' },
      { name: 'Green Blue', value: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)' },
      { name: 'Orange Red', value: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)' },
      { name: 'Sky Blue', value: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)' },
      { name: 'Pink Red', value: 'linear-gradient(135deg, #ec4899 0%, #b91c1c 100%)' },
    ];

    return (
      <div className="space-y-3 mt-3 border-t pt-3">
        <h4 className="text-sm font-medium mb-2">Styling Options</h4>

        <Tabs defaultValue="background" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="background">Background</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="border">Border</TabsTrigger>
          </TabsList>
          
          <div className="pt-2">
            {/* Background Tab */}
            <TabsContent value="background" className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="bg-color" className="text-xs">Background Color:</Label>
                  <div className="flex">
                    <div 
                      className="w-6 h-6 rounded-md mr-1 border"
                      style={{ 
                        backgroundColor: item.style?.backgroundColor || '#ffffff',
                        opacity: item.style?.backgroundOpacity || 1
                      }}
                    />
                    <Input
                      id="bg-color"
                      type="color"
                      value={item.style?.backgroundColor || '#ffffff'}
                      onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                      className="h-6 w-6 p-0 border-0"
                    />
                    <Input
                      type="text"
                      value={item.style?.backgroundColor || '#ffffff'}
                      onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                      className="h-6 w-20 text-xs ml-1"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="bg-gradient" className="text-xs">Background Gradient:</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-6 h-20 rounded-md border"
                      style={{ 
                        backgroundImage: item.style?.backgroundGradient || 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                    <select
                      id="bg-gradient"
                      value={item.style?.backgroundGradient || 'none'}
                      onChange={(e) => handleStyleChange('backgroundGradient', e.target.value)}
                      className="w-full h-7 text-xs rounded-md border border-input"
                    >
                      {gradientPresets.map(preset => (
                        <option key={preset.name} value={preset.value}>{preset.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="bg-image" className="text-xs">Background Image URL:</Label>
                  <Input
                    id="bg-image"
                    type="text"
                    value={item.style?.backgroundImage || ''}
                    onChange={(e) => handleStyleChange('backgroundImage', e.target.value)}
                    className="h-7 text-xs"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <Label htmlFor="bg-opacity" className="text-xs">Opacity:</Label>
                    <span className="text-xs">{item.style?.backgroundOpacity || 1}</span>
                  </div>
                  <Input
                    id="bg-opacity"
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={item.style?.backgroundOpacity || 1}
                    onChange={(e) => handleStyleChange('backgroundOpacity', e.target.value)}
                    className="h-7"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="padding" className="text-xs">Padding:</Label>
                  <Input
                    id="padding"
                    type="text"
                    value={item.style?.padding || ''}
                    onChange={(e) => handleStyleChange('padding', e.target.value)}
                    className="h-7 text-xs"
                    placeholder="16px or 10px 20px"
                  />
                </div>
              </div>
            </TabsContent>
            
            {/* Text Tab */}
            <TabsContent value="text" className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="text-color" className="text-xs">Text Color:</Label>
                  <div className="flex">
                    <div 
                      className="w-6 h-6 rounded-md mr-1 border flex items-center justify-center"
                      style={{ backgroundColor: '#f8f9fa' }}
                    >
                      <span style={{ color: item.style?.textColor || '#333333', fontSize: '10px', fontWeight: 'bold' }}>T</span>
                    </div>
                    <Input
                      id="text-color"
                      type="color"
                      value={item.style?.textColor || '#333333'}
                      onChange={(e) => handleStyleChange('textColor', e.target.value)}
                      className="h-6 w-6 p-0 border-0"
                    />
                    <Input
                      type="text"
                      value={item.style?.textColor || '#333333'}
                      onChange={(e) => handleStyleChange('textColor', e.target.value)}
                      className="h-6 w-20 text-xs ml-1"
                      placeholder="#333333"
                    />
                  </div>
                </div>
                
                {/* Only show button color options for certain component types */}
                {(item.type === 'button' || item.type === 'featured-article' || item.type === 'article-grid' || item.type === 'footer') && (
                  <>
                    <div className="flex justify-between items-center">
                      <Label htmlFor="button-color" className="text-xs">Button/Link Color:</Label>
                      <div className="flex">
                        <div 
                          className="w-6 h-6 rounded-md mr-1 border"
                          style={{ backgroundColor: item.style?.buttonColor || '#8b5cf6' }}
                        />
                        <Input
                          id="button-color"
                          type="color"
                          value={item.style?.buttonColor || '#8b5cf6'}
                          onChange={(e) => handleStyleChange('buttonColor', e.target.value)}
                          className="h-6 w-6 p-0 border-0"
                        />
                        <Input
                          type="text"
                          value={item.style?.buttonColor || '#8b5cf6'}
                          onChange={(e) => handleStyleChange('buttonColor', e.target.value)}
                          className="h-6 w-20 text-xs ml-1"
                          placeholder="#8b5cf6"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Label htmlFor="button-text-color" className="text-xs">Button Text Color:</Label>
                      <div className="flex">
                        <div 
                          className="w-6 h-6 rounded-md mr-1 border flex items-center justify-center"
                          style={{ backgroundColor: item.style?.buttonColor || '#8b5cf6' }}
                        >
                          <span style={{ color: item.style?.buttonTextColor || '#ffffff', fontSize: '10px', fontWeight: 'bold' }}>T</span>
                        </div>
                        <Input
                          id="button-text-color"
                          type="color"
                          value={item.style?.buttonTextColor || '#ffffff'}
                          onChange={(e) => handleStyleChange('buttonTextColor', e.target.value)}
                          className="h-6 w-6 p-0 border-0"
                        />
                        <Input
                          type="text"
                          value={item.style?.buttonTextColor || '#ffffff'}
                          onChange={(e) => handleStyleChange('buttonTextColor', e.target.value)}
                          className="h-6 w-20 text-xs ml-1"
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
            
            {/* Border Tab */}
            <TabsContent value="border" className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="border-color" className="text-xs">Border Color:</Label>
                  <div className="flex">
                    <div 
                      className="w-6 h-6 rounded-md mr-1"
                      style={{ 
                        border: `2px solid ${item.style?.borderColor || '#e5e7eb'}`,
                        backgroundColor: 'transparent'
                      }}
                    />
                    <Input
                      id="border-color"
                      type="color"
                      value={item.style?.borderColor || '#e5e7eb'}
                      onChange={(e) => handleStyleChange('borderColor', e.target.value)}
                      className="h-6 w-6 p-0 border-0"
                    />
                    <Input
                      type="text"
                      value={item.style?.borderColor || '#e5e7eb'}
                      onChange={(e) => handleStyleChange('borderColor', e.target.value)}
                      className="h-6 w-20 text-xs ml-1"
                      placeholder="#e5e7eb"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="border-width" className="text-xs">Border Width:</Label>
                  <Input
                    id="border-width"
                    type="text"
                    value={item.style?.borderWidth || ''}
                    onChange={(e) => handleStyleChange('borderWidth', e.target.value)}
                    className="h-7 text-xs"
                    placeholder="1px"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="border-radius" className="text-xs">Border Radius:</Label>
                  <Input
                    id="border-radius"
                    type="text"
                    value={item.style?.borderRadius || ''}
                    onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                    className="h-7 text-xs"
                    placeholder="4px"
                  />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    );
  };
  
  // Get the icon and title based on the item type
  const getItemTypeDetails = () => {
    const icons: Record<string, JSX.Element> = {
      header: <span className="h-4 w-4 flex items-center justify-center">🔝</span>,
      heading: <span className="text-lg font-bold">T</span>,
      paragraph: <span className="text-base">¶</span>,
      image: <span className="h-4 w-4 flex items-center justify-center">🖼️</span>,
      button: <span className="h-4 w-4 flex items-center justify-center">🔘</span>,
      divider: <span className="h-4 w-4 flex items-center justify-center">⎯</span>,
      spacer: <span className="h-4 w-4 flex items-center justify-center">↕️</span>,
      compartment: <span className="h-4 w-4 flex items-center justify-center">📦</span>,
      'featured-article': <span className="h-4 w-4 flex items-center justify-center">📰</span>,
      'article-grid': <span className="h-4 w-4 flex items-center justify-center">📑</span>,
      'cta-banner': <span className="h-4 w-4 flex items-center justify-center">📢</span>,
      'testimonial': <span className="h-4 w-4 flex items-center justify-center">💬</span>,
      'event-calendar': <span className="h-4 w-4 flex items-center justify-center">📅</span>,
      'quiz': <span className="h-4 w-4 flex items-center justify-center">❓</span>,
      'product-recommendation': <span className="h-4 w-4 flex items-center justify-center">🛍️</span>,
      'subscribe-now': <span className="h-4 w-4 flex items-center justify-center">✉️</span>,
      footer: <span className="h-4 w-4 flex items-center justify-center">🔄</span>,
    };
    
    const titles: Record<string, string> = {
      header: 'Header',
      heading: 'Heading',
      paragraph: 'Paragraph',
      image: 'Image',
      button: 'Button',
      divider: 'Divider',
      spacer: 'Spacer',
      compartment: 'Compartment',
      'featured-article': 'Featured Article',
      'article-grid': 'Article Grid',
      'cta-banner': 'Call to Action Banner',
      'testimonial': 'Testimonial',
      'event-calendar': 'Event Calendar',
      'quiz': 'Quiz',
      'product-recommendation': 'Product Showcase',
      'subscribe-now': 'Subscribe Form',
      footer: 'Footer',
    };
    
    return {
      icon: icons[item.type] || <span className="h-4 w-4 flex items-center justify-center">📄</span>,
      title: titles[item.type] || 'Unknown',
    };
  };
  
  const { icon, title } = getItemTypeDetails();
  
  // Render the content form based on item type
  const renderContentForm = () => {
    switch (item.type) {
      case 'featured-article':
        return (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={item.content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Author</Label>
              <Input
                value={item.content.author || ''}
                onChange={(e) => handleContentChange('author', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input
                value={item.content.date || ''}
                onChange={(e) => handleContentChange('date', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                value={item.content.image || ''}
                onChange={(e) => handleContentChange('image', e.target.value)}
                className="mt-1"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label>Excerpt</Label>
              <Textarea
                value={item.content.excerpt || ''}
                onChange={(e) => handleContentChange('excerpt', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Link URL</Label>
              <Input
                value={item.content.linkUrl || ''}
                onChange={(e) => handleContentChange('linkUrl', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>CTA Text</Label>
              <Input
                value={item.content.cta || 'Read More'}
                onChange={(e) => handleContentChange('cta', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 'article-grid':
        return (
          <div className="space-y-4">
            {!item.content.articles || item.content.articles.length === 0 ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleContentChange('articles', [
                  {
                    title: 'Article Title',
                    author: 'Author Name',
                    image: 'https://placehold.co/400x300',
                    excerpt: 'Article excerpt goes here.',
                    linkUrl: '#',
                    linkText: 'Read More'
                  }
                ])}
              >
                Add Article
              </Button>
            ) : (
              <>
                {(item.content.articles as Array<any>).map((article, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-medium">Article {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newArticles = [...(item.content.articles || [])];
                          newArticles.splice(index, 1);
                          handleContentChange('articles', newArticles);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={article.title || ''}
                          onChange={(e) => {
                            const newArticles = [...(item.content.articles || [])];
                            newArticles[index] = { ...newArticles[index], title: e.target.value };
                            handleContentChange('articles', newArticles);
                          }}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Author</Label>
                        <Input
                          value={article.author || ''}
                          onChange={(e) => {
                            const newArticles = [...(item.content.articles || [])];
                            newArticles[index] = { ...newArticles[index], author: e.target.value };
                            handleContentChange('articles', newArticles);
                          }}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Image URL</Label>
                        <Input
                          value={article.image || ''}
                          onChange={(e) => {
                            const newArticles = [...(item.content.articles || [])];
                            newArticles[index] = { ...newArticles[index], image: e.target.value };
                            handleContentChange('articles', newArticles);
                          }}
                          className="mt-1"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <div>
                        <Label>Excerpt</Label>
                        <Textarea
                          value={article.excerpt || ''}
                          onChange={(e) => {
                            const newArticles = [...(item.content.articles || [])];
                            newArticles[index] = { ...newArticles[index], excerpt: e.target.value };
                            handleContentChange('articles', newArticles);
                          }}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Link URL</Label>
                        <Input
                          value={article.linkUrl || ''}
                          onChange={(e) => {
                            const newArticles = [...(item.content.articles || [])];
                            newArticles[index] = { ...newArticles[index], linkUrl: e.target.value };
                            handleContentChange('articles', newArticles);
                          }}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Link Text</Label>
                        <Input
                          value={article.linkText || 'Read More'}
                          onChange={(e) => {
                            const newArticles = [...(item.content.articles || [])];
                            newArticles[index] = { ...newArticles[index], linkText: e.target.value };
                            handleContentChange('articles', newArticles);
                          }}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    const newArticles = [...(item.content.articles || [])];
                    newArticles.push({
                      title: 'New Article',
                      author: 'Author Name',
                      image: 'https://placehold.co/400x300',
                      excerpt: 'Article excerpt goes here.',
                      linkUrl: '#',
                      linkText: 'Read More'
                    });
                    handleContentChange('articles', newArticles);
                  }}
                >
                  Add Another Article
                </Button>
              </>
            )}
          </div>
        );
      
      default:
        return (
          <p className="text-muted-foreground text-sm p-4 bg-gray-50/50 rounded">
            Basic editor not available for this component type. Use the template manager to modify complex components.
          </p>
      );
    }
  };
  
  // Add border to show selection state
  const getItemContainerStyle = () => {
    return {
      border: isSelected ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
      borderRadius: '0.375rem',
      transition: 'border-color 0.2s ease',
    };
  };
  
  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...getItemContainerStyle() }}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow mb-4 overflow-hidden",
        isDragging ? "opacity-50" : "",
        isEditing ? "ring-2 ring-primary" : "",
        isSelected ? "ring-2 ring-blue-500" : ""
      )}
      onClick={(e) => {
        // Only handle click if not dragging and not in editing mode
        if (!isDragging && !isEditing && onSelect) {
          e.stopPropagation();
          onSelect(item.id);
          
          // Add a slight delay to ensure the styles panel is mounted
          setTimeout(() => {
            // Try to focus on the color panel
            const colorPanel = document.getElementById('component-color-panel');
            if (colorPanel) {
              colorPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }
      }}
    >
      <div
        className="bg-muted px-3 py-2 flex items-center justify-between border-b"
      >
        <div className="flex items-center space-x-2" {...attributes} {...listeners}>
          <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
          <span className="text-sm font-medium capitalize">
            {item.type.replace('-', ' ')}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(!isEditing)}
            className="h-7 w-7"
          >
            <Pencil className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="h-7 w-7"
          >
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
              >
                {isExpanded ? 
                  <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                }
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </div>

      {/* Content preview */}
      <div className={`px-4 py-3 ${isEditing ? 'bg-gray-50/50' : ''}`}>
        {renderItemPreview()}
      </div>
      
      {/* Collapsed content */}
      <Collapsible open={isExpanded && !isEditing}>
        <CollapsibleContent>
          <div className="border-t px-4 py-3 bg-gray-50">
            {renderItemPreview()}
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Editor */}
      {isEditing && (
        <div className="border-t">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full bg-gray-100 rounded-none px-4 h-10">
              <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
              {showColorControls && (
                <TabsTrigger value="style" className="text-xs">Style</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="content" className="p-4 space-y-4">
              {renderContentForm()}
            </TabsContent>
            
            {showColorControls && (
              <TabsContent value="style" className="p-4">
                {renderColorControls()}
              </TabsContent>
            )}
          </Tabs>
          
          <div className="flex justify-end p-3 bg-gray-50 border-t">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setIsEditing(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={() => setIsEditing(false)}
            >
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortableNewsletterItem;
