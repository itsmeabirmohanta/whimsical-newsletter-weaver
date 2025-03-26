import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import SortableNewsletterItem from '@/components/SortableNewsletterItem';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Eye, Copy, Send, Save, PlusCircle, Layout, LucideIcon, Square, Type, Image as ImageIcon, Columns, Minus, ArrowUpDown, Box, Megaphone, MessageSquareQuote, Calendar, HelpCircle, ShoppingBag, Mail, X } from 'lucide-react';
import { toast } from 'sonner';
import EmailTemplateManager, { SavedTemplate } from '@/components/EmailTemplateManager';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import AppLayout from '@/components/layout/AppLayout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SendTestEmailDialog from '@/components/SendTestEmailDialog';
import { sendEmail } from '@/lib/email-service';
import { v4 as uuidv4 } from 'uuid';

// Add quiz-related interfaces
interface QuizOption {
  text: string;
  isCorrect: boolean;
}

interface Quiz {
  question: string;
  image?: string;
  options: QuizOption[];
}

// Define the interface for newsletter items
export interface NewsletterItem {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'button' | 'divider' | 'spacer' | 'compartment' | 'featured-article' | 'article-grid' | 'header' | 'footer' | 'cta-banner' | 'testimonial' | 'event-calendar' | 'quiz' | 'product-recommendation' | 'subscribe-now';
  content: {
    // Common fields
    text?: string;
    level?: 'h1' | 'h2' | 'h3';
    align?: 'left' | 'center' | 'right';
    url?: string;
    alt?: string;
    caption?: string;
    height?: number;
    title?: string;
    content?: string;
    
    // Article fields
    author?: string;
    date?: string;
    image?: string;
    excerpt?: string;
    linkUrl?: string;
    linkText?: string;
    cta?: string;
    articles?: Array<{
      title: string;
      author: string;
      date?: string;
      image: string;
      excerpt?: string;
      linkUrl?: string;
      linkText?: string;
    }>;
    
    // Header fields
    logoUrl?: string;
    logoAlt?: string;
    companyName?: string;
    tagline?: string;
    
    // Footer fields
    address?: string;
    contactEmail?: string;
    websiteUrl?: string;
    unsubscribeUrl?: string;
    socialLinks?: Array<{
      platform: string;
      url: string;
      icon?: string;
    }>;
    
    // Quiz fields
    quizzes?: Quiz[];
    submitUrl?: string;
    
    // Testimonial fields
    quote?: string;
    attribution?: string;
    role?: string;
    company?: string;
    testimonialImage?: string;
    
    // Event Calendar fields
    events?: Array<{
      title: string;
      date: string;
      time?: string;
      location?: string;
      description?: string;
    }>;
    
    // CTA Banner fields
    buttonText?: string;
    description?: string;
    backgroundColor?: string;
    
    // Product Recommendation fields
    products?: Array<{
      name: string;
      image: string;
      price: string;
      description?: string;
      discount?: string;
      link?: string;
    }>;
    
    // Subscribe form fields
    subscribeTitle?: string;
    subscribeMessage?: string;
    subscribeButtonText?: string;
    subscribeFormAction?: string;
    subscribeFormPlaceholder?: string;
  };
  style?: {
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundGradient?: string;
    backgroundOpacity?: number;
    textColor?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    borderColor?: string;
    borderWidth?: string;
    borderRadius?: string;
    padding?: string;
  };
}

// Content block definitions for the sidebar
interface ContentBlock {
  type: NewsletterItem['type'];
  name: string;
  icon: LucideIcon;
}

const basicBlocks: ContentBlock[] = [
  { type: 'header', name: 'Header', icon: Type },
  { type: 'heading', name: 'Heading', icon: Type },
  { type: 'paragraph', name: 'Paragraph', icon: Type },
  { type: 'image', name: 'Image', icon: ImageIcon },
  { type: 'button', name: 'Button', icon: Square },
  { type: 'divider', name: 'Divider', icon: Minus },
  { type: 'spacer', name: 'Spacer', icon: ArrowUpDown },
  { type: 'compartment', name: 'Compartment', icon: Box },
  { type: 'footer', name: 'Footer', icon: Type },
];

const complexBlocks: ContentBlock[] = [
  { type: 'featured-article', name: 'Featured Article', icon: Layout },
  { type: 'article-grid', name: 'Article Grid', icon: Columns },
  { type: 'cta-banner', name: 'CTA Banner', icon: Megaphone },
  { type: 'testimonial', name: 'Testimonial', icon: MessageSquareQuote },
  { type: 'event-calendar', name: 'Event Calendar', icon: Calendar },
  { type: 'quiz', name: 'Quiz', icon: HelpCircle },
  { type: 'product-recommendation', name: 'Product Showcase', icon: ShoppingBag },
  { type: 'subscribe-now', name: 'Subscribe Form', icon: Mail },
];

const initialItems: NewsletterItem[] = [
  {
    id: 'header-1',
    type: 'header',
    content: {
      logoUrl: 'https://placehold.co/200x60?text=Your+Logo',
      logoAlt: 'Company Logo',
      companyName: 'Your Company',
      tagline: 'Your newsletter tagline goes here',
      align: 'center'
    },
    style: {
      backgroundColor: '#f8f9fa',
      textColor: '#333333'
    }
  },
  {
    id: '1',
    type: 'heading',
    content: {
      text: 'Monthly Newsletter',
      level: 'h1',
      align: 'center'
    }
  },
  {
    id: '2',
    type: 'paragraph',
    content: {
      text: 'Welcome to our monthly newsletter. We have exciting updates to share with you!',
      align: 'center'
    }
  },
  {
    id: 'footer-1',
    type: 'footer',
    content: {
      companyName: 'Your Company',
      address: '123 Main Street, City, State 12345',
      contactEmail: 'contact@example.com',
      unsubscribeUrl: '#unsubscribe',
      websiteUrl: 'https://example.com',
      socialLinks: [
        { platform: 'Twitter', url: 'https://twitter.com' },
        { platform: 'LinkedIn', url: 'https://linkedin.com' },
        { platform: 'Facebook', url: 'https://facebook.com' }
      ]
    },
    style: {
      backgroundColor: '#f8f9fa',
      textColor: '#666666',
      borderColor: '#e9ecef',
      buttonColor: '#8b5cf6'
    }
  }
];

const NewsletterBuilder: React.FC = () => {
  const [items, setItems] = useState<NewsletterItem[]>(() => {
    // Try to load saved template from localStorage
    try {
      const savedTemplate = localStorage.getItem('newsletter-template');
      return savedTemplate ? JSON.parse(savedTemplate) : initialItems;
    } catch (error) {
      console.error('Error loading saved template:', error);
      return initialItems;
    }
  });
  
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showTemplateManager, setShowTemplateManager] = useState(false);
  const [showColorControls, setShowColorControls] = useState(false);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  
  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );
  
  // State for newsletter container background
  const [containerBackground, setContainerBackground] = useState<string>('#ffffff');
  
  // Add a state for tracking if color controls dropdown is open
  const [showGlobalColorPanel, setShowGlobalColorPanel] = useState(false);
  // Add a state for font color
  const [containerTextColor, setContainerTextColor] = useState<string>('#333333');
  // Add a state for link color
  const [globalLinkColor, setGlobalLinkColor] = useState<string>('#8b5cf6');
  
  // First, add a state to track the active tab
  const [activeTab, setActiveTab] = useState<string>("blocks");
  
  // Add state for the send test email dialog
  const [showSendTestEmailDialog, setShowSendTestEmailDialog] = useState(false);
  
  // Handle drag end event
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
  
  // Add a new item
  const handleAddItem = (type: string) => {
    const newItem: NewsletterItem = {
      id: uuidv4(),
      type: type as NewsletterItem['type'],
      content: {},
      style: {}
    };
    
    switch (type) {
      case 'header':
        newItem.content = { 
          logoUrl: 'https://placehold.co/200x80', 
          logoAlt: 'Company Logo',
          companyName: 'Your Company',
          tagline: 'Your newsletter tagline goes here',
          align: 'center'
        };
        newItem.style = {
          backgroundColor: '#f8f9fa',
          textColor: '#333333'
        };
        break;
      case 'heading':
        newItem.content = { text: 'New Heading', level: 'h2', align: 'left' };
        break;
      case 'paragraph':
        newItem.content = { text: 'New paragraph text goes here.', align: 'left' };
        break;
      case 'image':
        newItem.content = { url: 'https://placehold.co/600x400', alt: 'Placeholder image', caption: 'Image caption' };
        break;
      case 'button':
        newItem.content = { text: 'Click Me', url: '#', align: 'center' };
        break;
      case 'divider':
        // No content needed
        break;
      case 'spacer':
        newItem.content = { height: 30 };
        break;
      case 'compartment':
        newItem.content = { title: 'Section Title', content: 'Content goes here.' };
        break;
      case 'footer':
        newItem.content = {
          companyName: 'Your Company',
          address: '123 Main Street, City, State 12345',
          contactEmail: 'contact@example.com',
          unsubscribeUrl: '#unsubscribe',
          websiteUrl: 'https://example.com',
          socialLinks: [
            { platform: 'Twitter', url: 'https://twitter.com' },
            { platform: 'LinkedIn', url: 'https://linkedin.com' },
            { platform: 'Facebook', url: 'https://facebook.com' }
          ]
        };
        newItem.style = {
          backgroundColor: '#f8f9fa',
          textColor: '#666666',
          borderColor: '#e9ecef'
        };
        break;
      case 'featured-article':
        newItem.content = {
          title: 'AI and the 2024 Elections: A Policy Perspective',
          author: 'Alisha Butala',
          date: 'May 15, 2024',
          image: 'https://images.unsplash.com/photo-1635032730510-05feceacc9e5?auto=format&fit=crop&w=1200&q=80',
          excerpt: 'The 2024 elections were a turning point for global democracy, with nearly 74 countries heading to the polls. AI played a more significant role than ever before.',
          cta: 'Continue reading',
          linkUrl: '#'
        };
        break;
      case 'article-grid':
        newItem.content = {
          articles: [
            {
              title: 'Article 1',
              author: 'Author 1',
              image: 'https://placehold.co/400x300',
              excerpt: 'Brief description of article 1.'
            },
            {
              title: 'Article 2',
              author: 'Author 2',
              image: 'https://placehold.co/400x300',
              excerpt: 'Brief description of article 2.'
            }
          ]
        };
        break;
      case 'cta-banner':
        newItem.content = {
          title: 'Limited Time Offer',
          content: 'Join us today and get 20% off your first subscription!',
          buttonText: 'Sign Up Now',
          linkUrl: '#',
          backgroundColor: '#f0f9ff'
        };
        newItem.style = {
          backgroundColor: '#f0f9ff',
          textColor: '#1e3a8a',
          buttonColor: '#3b82f6',
          buttonTextColor: '#ffffff',
          borderRadius: '8px',
          padding: '24px'
        };
        break;
      case 'testimonial':
        newItem.content = {
          quote: "This newsletter has been a game-changer for our team. The content is always relevant and helps us stay ahead of industry trends.",
          attribution: "Jane Smith",
          role: "Marketing Director",
          company: "Acme Inc.",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
        };
        newItem.style = {
          backgroundColor: '#fafafa',
          textColor: '#333333',
          borderColor: '#e5e7eb',
          borderWidth: '1px',
          borderRadius: '8px',
          padding: '20px'
        };
        break;
      case 'event-calendar':
        newItem.content = {
          title: 'Upcoming Events',
          events: [{
            title: 'Tech Conference 2024',
            date: '2024-06-15',
              time: '9:00 AM - 5:00 PM',
              location: 'Virtual Event',
            description: 'Join us for a day of tech talks and networking opportunities.'
          }]
        };
        newItem.style = {
          backgroundColor: '#ffffff',
          textColor: '#212529',
          borderColor: '#dee2e6',
          borderWidth: '1px',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        };
        break;
      case 'quiz':
        newItem.content = {
          title: 'Sample Quiz',
          quizzes: [{
            question: 'What is your favorite programming language?',
          options: [
              { text: 'JavaScript', isCorrect: false },
              { text: 'Python', isCorrect: false },
              { text: 'Java', isCorrect: false },
              { text: 'All of the above', isCorrect: true }
            ]
          }],
          submitUrl: '/api/quiz-results'
        };
        newItem.style = {
          backgroundColor: '#f8f9fa',
          textColor: '#212529',
          buttonColor: '#0d6efd',
          buttonTextColor: '#ffffff',
          padding: '2rem'
        };
        break;
      case 'product-recommendation':
        newItem.content = {
          title: 'Recommended Products',
          products: [
            {
              name: 'Premium Subscription',
              image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
              price: '$49.99',
              discount: '$39.99',
              description: 'Get access to all our premium content with this subscription.',
              link: '#'
            },
            {
              name: 'Analytics Dashboard',
              image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
              price: '$29.99',
              description: 'Track your performance with our intuitive analytics dashboard.',
              link: '#'
            }
          ]
        };
        newItem.style = {
          backgroundColor: '#ffffff',
          textColor: '#333333',
          buttonColor: '#3b82f6',
          buttonTextColor: '#ffffff',
          borderColor: '#e5e7eb',
          borderWidth: '1px',
          borderRadius: '8px',
          padding: '16px'
        };
        break;
      case 'subscribe-now':
        newItem.content = {
          subscribeTitle: 'Stay Updated with Future Shift Labs',
          subscribeMessage: 'Join our community of forward-thinkers and get exclusive insights on AI policy, governance, and ethical technologies.',
          subscribeButtonText: 'Subscribe Now',
          subscribeFormPlaceholder: 'Your email address',
          subscribeFormAction: '#'
        };
        newItem.style = {
          backgroundColor: '#6366f1',
          textColor: '#ffffff',
          buttonColor: '#ffffff',
          buttonTextColor: '#6366f1',
          borderRadius: '8px',
          padding: '40px 20px'
        };
        break;
    }
    
    setItems(prev => [...prev, newItem]);
    toast.success(`Added ${type} block`);
  };
  
  // Update an item
  const handleUpdateItem = (id: string, updates: Partial<NewsletterItem>) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item };
        
        // Handle content updates
        if (updates.content) {
          updatedItem.content = {
            ...item.content,
            ...updates.content
          };
        }
        
        // Handle style updates
        if (updates.style) {
          updatedItem.style = {
            ...item.style,
            ...updates.style
          };
        }
        
        return updatedItem;
      }
      return item;
    }));
  };
  
  // Delete an item
  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast.success("Item removed");
  };
  
  // Update the Copy HTML function to ensure it uses component-specific styles
  const handleCopyHTML = () => {
    // Force style update before generating HTML
    forceStyleUpdate();
    
    // This would call your email generator function
    import('@/lib/email-generator').then(({ generateEmailHTML }) => {
      const html = generateEmailHTML(items, containerBackground, containerTextColor, globalLinkColor);
      navigator.clipboard.writeText(html)
        .then(() => toast.success('HTML copied to clipboard!'))
        .catch(err => {
          console.error('Error copying HTML:', err);
          toast.error('Failed to copy HTML');
        });
    });
  };
  
  // Save template to localStorage
  const handleSaveTemplate = () => {
    try {
      localStorage.setItem('newsletter-template', JSON.stringify(items));
      toast.success('Template saved successfully!');
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Failed to save template');
    }
  };
  
  // Update the Test Email function to ensure it uses component-specific styles
  const handleSendTestEmail = (recipientEmail: string): Promise<void> => {
    // Force style update before sending test email
    forceStyleUpdate();
    
    console.log(`💌 Starting email send process to: ${recipientEmail}`);
    
    // Get the newsletter title from the first heading or a default
    const firstHeading = items.find(item => item.type === 'heading');
    const newsletterTitle = firstHeading?.content?.text || 'Newsletter Preview';
    
    // Get company name from header or footer
    const header = items.find(item => item.type === 'header');
    const footer = items.find(item => item.type === 'footer');
    const companyName = header?.content?.companyName || footer?.content?.companyName || 'Whimsical Newsletter Weaver';
    
    return new Promise((resolve, reject) => {
      // Generate the email HTML
      import('@/lib/email-generator')
        .then(({ generateEmailHTML }) => {
          console.log('⚙️ Generating HTML content...');
      const html = generateEmailHTML(items, containerBackground, containerTextColor, globalLinkColor);
          console.log(`✅ HTML generated (length: ${html.length} chars)`);
          
          // Show sending toast
          const toastId = toast.loading(`Sending email to ${recipientEmail}...`);
          
          // Send the email using our email service
          return sendEmail({
            to: recipientEmail,
            subject: newsletterTitle,
            html: html,
            from: 'newsletter@example.com',
            senderName: companyName
          })
          .then((result) => {
            console.log('📧 Email service response:', result);
            if (result.success) {
              toast.success(`Test email sent to ${recipientEmail}!`, { id: toastId });
              resolve();
            } else {
              toast.error(`Failed to send email: ${result.message}`, { id: toastId });
              reject(new Error(result.message));
            }
          })
          .catch(error => {
            console.error('❌ Failed to send test email:', error);
            toast.error(`Failed to send email: ${error instanceof Error ? error.message : 'Server error'}`, 
              { id: toastId }
            );
            reject(error);
          });
        })
        .catch(error => {
          console.error('❌ Error generating email HTML:', error);
          toast.error(`Error generating email: ${error instanceof Error ? error.message : 'Unknown error'}`);
          reject(error);
        });
    });
  };
  
  // Handle selecting a template
  const handleSelectTemplate = (template: SavedTemplate) => {
    setItems(template.items);
    setShowTemplateManager(false);
    toast.success(`Template "${template.name}" loaded successfully!`);
  };
  
  // Create a new template
  const handleCreateNewTemplate = () => {
    setItems(initialItems);
    setShowTemplateManager(false);
    toast.success('New template created!');
  };
  
  // Function to update item content
  const handleUpdateItemContent = (id: string, field: string, value: string | number | { [key: string]: string | number }) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          content: {
            ...item.content,
            [field]: value
          }
        };
      }
      return item;
    }));
  };
  
  // Add a force update mechanism when switching between modes and when applying styles
  const forceStyleUpdate = () => {
    // Create a deep copy of the items array to force re-rendering with updated styles
    const updatedItems = items.map(item => ({
      ...item,
      style: {
        ...item.style
      },
      content: {
        ...item.content
      }
    }));
    setItems(updatedItems);
  };
  
  // Update the handleUpdateItemStyle function to trigger immediate updates
  const handleUpdateItemStyle = (id: string, field: string, value: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          style: {
            ...item.style,
            [field]: value
          }
        };
      }
      return item;
    }));
    
    // If we're in preview mode, make sure the preview updates immediately
    if (isPreviewMode) {
      setTimeout(() => {
        forceStyleUpdate();
      }, 10);
    }
  };
  
  // Helper function to update the newsletter container background
  const handleContainerBackgroundChange = (color: string) => {
    setContainerBackground(color);
  };
  
  // Helper function to update text color
  const handleContainerTextColorChange = (color: string) => {
    setContainerTextColor(color);
  };
  
  // Helper function to update link color
  const handleGlobalLinkColorChange = (color: string) => {
    setGlobalLinkColor(color);
  };
  
  // Function to handle component selection for styling
  const handleSelectComponent = (id: string) => {
    setSelectedComponentId(id);
    // Ensure the color controls are shown
    setShowColorControls(true);
    // Switch to the styles tab
    setActiveTab("styles");
  };
  
  // Render a content block button
  const renderContentBlock = (block: ContentBlock) => {
    const Icon = block.icon;
    return (
      <Button
        key={block.type}
        variant="outline"
        size="sm"
        className="justify-start h-auto py-3 px-4 bg-background hover:bg-muted"
        onClick={() => handleAddItem(block.type)}
      >
        <Icon className="h-4 w-4 mr-2" />
        <span>{block.name}</span>
      </Button>
    );
  };
  
  // Update the button click handler to open the dialog
  const handleSendTestEmailClick = () => {
    setShowSendTestEmailDialog(true);
  };
  
  return (
    <AppLayout 
      title="Newsletter Builder"
      headerRightContent={
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            size="sm"
            onClick={() => {
              // Toggle preview mode but maintain selectedComponentId
              setIsPreviewMode(!isPreviewMode);
              // If switching to preview mode, ensure the color panel is visible 
              // by staying on the styles tab if a component is selected
              if (!isPreviewMode && selectedComponentId) {
                setActiveTab("styles");
                
                // Use the more reliable forceStyleUpdate function
                forceStyleUpdate();
              } else {
                // Also update when switching back to edit mode
                forceStyleUpdate();
              }
            }}
          >
            <Eye className="h-4 w-4 mr-2" />
            {isPreviewMode ? 'Edit' : 'Preview'}
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            onClick={handleCopyHTML}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy HTML
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            onClick={handleSaveTemplate}
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          
          <Button 
            size="sm"
            variant="outline"
            className="flex items-center gap-1"
            onClick={handleSendTestEmailClick}
          >
            <Send className="h-4 w-4" /> Send Test Email
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setShowTemplateManager(!showTemplateManager)}
          >
            Templates
          </Button>
        </div>
      }
    >
      <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-3.5rem)]">
        <ResizablePanel defaultSize={75}>
          <div className="h-full overflow-y-auto p-6 bg-gray-50">
            <div 
              className="mx-auto p-6 shadow-lg min-h-[600px]" 
              style={{ backgroundColor: containerBackground, color: containerTextColor, maxWidth: '650px' }}
            >
              {!isPreviewMode ? (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                    {items.map((item) => (
                      <SortableNewsletterItem 
                        key={item.id} 
                        item={item} 
                        onUpdate={(updates) => handleUpdateItem(item.id, updates)} 
                        onDelete={() => handleDeleteItem(item.id)}
                        showColorControls={showColorControls}
                        themeColors={{
                          backgroundColor: containerBackground,
                          textColor: containerTextColor,
                          linkColor: globalLinkColor
                        }}
                        onSelect={handleSelectComponent}
                        isSelected={selectedComponentId === item.id}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              ) : (
                <div>
                  {selectedComponentId && (
                    <div className="bg-purple-100 mb-4 p-2 rounded text-center text-sm">
                      <span className="font-medium">Preview Mode:</span> Viewing customizations for selected {items.find(item => item.id === selectedComponentId)?.type.replace('-', ' ')}
                    </div>
                  )}
                  {items.map((item) => (
                    <SortableNewsletterItem 
                      key={item.id}
                      item={item}
                      onUpdate={() => {}}
                      onDelete={() => {}}
                      showColorControls={false}
                      themeColors={{
                        backgroundColor: containerBackground,
                        textColor: containerTextColor,
                        linkColor: globalLinkColor
                      }}
                      onSelect={undefined}
                      isSelected={selectedComponentId === item.id}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </ResizablePanel>
        
        <ResizableHandle />
        
              <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
          <div className="h-full flex flex-col border-l overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-medium text-lg mb-1">Newsletter Builder</h2>
              <p className="text-muted-foreground text-sm">Add, reorder, and customize content blocks.</p>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="px-4 border-b">
                <TabsList className="w-full">
                  <TabsTrigger value="blocks" className="flex-1">Blocks</TabsTrigger>
                  <TabsTrigger value="styles" className="flex-1">Styles</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="blocks" className="p-4 overflow-auto flex-1">
                <div className="space-y-6">
                  <div>
                        <h3 className="text-sm font-medium mb-3">Basic Blocks</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {basicBlocks.map(renderContentBlock)}
                        </div>
                      </div>
                      
                  <div>
                        <h3 className="text-sm font-medium mb-3">Complex Components</h3>
                        <div className="space-y-2">
                          {complexBlocks.map(renderContentBlock)}
                        </div>
                      </div>
                </div>
              </TabsContent>
              
              <TabsContent value="styles" className="p-4 overflow-auto flex-1">
                <div className="space-y-6">
                  <div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowGlobalColorPanel(!showGlobalColorPanel)}
                          className="flex items-center gap-2 w-full mt-2"
                        >
                          <div className="w-4 h-4 rounded-full" style={{ background: containerBackground }} />
                          <span>Theme Colors</span>
                        </Button>

                        {showGlobalColorPanel && (
                          <div className="mt-3 p-3 bg-white rounded-md shadow-inner border border-gray-200">
                            <h3 className="text-sm font-medium mb-3">Newsletter Theme</h3>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="container-bg" className="text-xs">Background Color:</Label>
                                <div className="flex gap-2">
                                  <Input
                                    id="container-bg"
                                    type="color"
                                    value={containerBackground}
                                    onChange={(e) => handleContainerBackgroundChange(e.target.value)}
                                    className="h-8 w-8 p-0 border-0"
                                  />
                                  <Input
                                    type="text"
                                    value={containerBackground}
                                    onChange={(e) => handleContainerBackgroundChange(e.target.value)}
                                    className="h-8 flex-1 text-xs"
                                    placeholder="#ffffff"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="container-text" className="text-xs">Default Text Color:</Label>
                                <div className="flex gap-2">
                                  <Input
                                    id="container-text"
                                    type="color"
                                    value={containerTextColor}
                                    onChange={(e) => handleContainerTextColorChange(e.target.value)}
                                    className="h-8 w-8 p-0 border-0"
                                  />
                                  <Input
                                    type="text"
                                    value={containerTextColor}
                                    onChange={(e) => handleContainerTextColorChange(e.target.value)}
                                    className="h-8 flex-1 text-xs"
                                    placeholder="#333333"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="global-link" className="text-xs">Link/Button Color:</Label>
                                <div className="flex gap-2">
                                  <Input
                                    id="global-link"
                                    type="color"
                                    value={globalLinkColor}
                                    onChange={(e) => handleGlobalLinkColorChange(e.target.value)}
                                    className="h-8 w-8 p-0 border-0"
                                  />
                                  <Input
                                    type="text"
                                    value={globalLinkColor}
                                    onChange={(e) => handleGlobalLinkColorChange(e.target.value)}
                                    className="h-8 flex-1 text-xs"
                                    placeholder="#8b5cf6"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-3 gap-2 pt-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="w-full"
                                  onClick={() => {
                                    handleContainerBackgroundChange('#ffffff');
                                    handleContainerTextColorChange('#333333');
                                    handleGlobalLinkColorChange('#8b5cf6');
                                  }}
                                >
                                  Reset
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="w-full"
                                  onClick={() => {
                                    // Corporate blue theme
                                    handleContainerBackgroundChange('#f0f4f8');
                                    handleContainerTextColorChange('#2d3748');
                                    handleGlobalLinkColorChange('#3182ce');
                                  }}
                                >
                                  Blue
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="w-full"
                                  onClick={() => {
                                    // Modern green theme
                                    handleContainerBackgroundChange('#f0fff4');
                                    handleContainerTextColorChange('#22543d');
                                    handleGlobalLinkColorChange('#38a169');
                                  }}
                                >
                                  Green
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="w-full"
                                  onClick={() => {
                                    // Warm red theme
                                    handleContainerBackgroundChange('#fff5f5');
                                    handleContainerTextColorChange('#742a2a');
                                    handleGlobalLinkColorChange('#e53e3e');
                                  }}
                                >
                                  Red
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="w-full"
                                  onClick={() => {
                                    // Purple theme
                                    handleContainerBackgroundChange('#faf5ff');
                                    handleContainerTextColorChange('#44337a');
                                    handleGlobalLinkColorChange('#805ad5');
                                  }}
                                >
                                  Purple
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="w-full"
                                  onClick={() => {
                                    // Dark theme
                                    handleContainerBackgroundChange('#1a202c');
                                    handleContainerTextColorChange('#e2e8f0');
                                    handleGlobalLinkColorChange('#90cdf4');
                                  }}
                                >
                                  Dark
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                  
                  {selectedComponentId && (
                    <div id="component-color-panel" className="mt-4 p-3 bg-white rounded-md shadow-sm border border-gray-200 sticky top-1">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-medium">Component Colors</h3>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-7 px-2"
                          onClick={() => setSelectedComponentId(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                              </div>
                      
                      {isPreviewMode && (
                        <div className="bg-purple-100 mb-3 p-2 rounded text-xs">
                          <span className="font-medium">Preview Mode</span>: Changes will be reflected in the preview.
                              </div>
                            )}
                      
                      <p className="text-xs text-muted-foreground mb-3">
                        Customizing: {items.find(item => item.id === selectedComponentId)?.type.replace('-', ' ')}
                      </p>
                      <div className="flex justify-between items-center mb-3">
                        <p className="text-xs text-muted-foreground">
                          Colors only apply to this component
                        </p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 px-2 text-xs"
                          onClick={() => {
                            // Get the selected item
                            const selectedItem = items.find(item => item.id === selectedComponentId);
                            if (selectedItem) {
                              // Update the item to reset its styles to match the global theme
                              handleUpdateItem(selectedComponentId, {
                                style: {
                                  backgroundColor: containerBackground,
                                  textColor: containerTextColor,
                                  buttonColor: globalLinkColor,
                                  buttonTextColor: '#ffffff',
                                  borderColor: '#e2e8f0'
                                }
                              });
                              
                              // Force an update for preview mode
                              if (isPreviewMode) {
                                setTimeout(() => {
                                  forceStyleUpdate();
                                }, 10);
                              }
                              
                              toast.success("Component reset to theme colors");
                            }
                          }}
                        >
                          Reset
                        </Button>
                              </div>
                      
                      {/* Background Color */}
                      <div className="space-y-2 mb-3">
                        <Label htmlFor="component-bg" className="text-xs">Background Color:</Label>
                        <div className="flex gap-2">
                          <Input
                            id="component-bg"
                            type="color"
                            value={items.find(item => item.id === selectedComponentId)?.style?.backgroundColor || '#ffffff'}
                            onChange={(e) => handleUpdateItemStyle(selectedComponentId, 'backgroundColor', e.target.value)}
                            className="h-8 w-8 p-0 border-0"
                          />
                          <Input
                            type="text"
                            value={items.find(item => item.id === selectedComponentId)?.style?.backgroundColor || '#ffffff'}
                            onChange={(e) => handleUpdateItemStyle(selectedComponentId, 'backgroundColor', e.target.value)}
                            className="h-8 flex-1 text-xs"
                            placeholder="#ffffff"
                                      />
                                    </div>
                                      </div>
                      
                      {/* Text Color */}
                      <div className="space-y-2 mb-3">
                        <Label htmlFor="component-text" className="text-xs">Text Color:</Label>
                        <div className="flex gap-2">
                          <Input
                            id="component-text"
                            type="color"
                            value={items.find(item => item.id === selectedComponentId)?.style?.textColor || '#333333'}
                            onChange={(e) => handleUpdateItemStyle(selectedComponentId, 'textColor', e.target.value)}
                            className="h-8 w-8 p-0 border-0"
                          />
                          <Input
                            type="text"
                            value={items.find(item => item.id === selectedComponentId)?.style?.textColor || '#333333'}
                            onChange={(e) => handleUpdateItemStyle(selectedComponentId, 'textColor', e.target.value)}
                            className="h-8 flex-1 text-xs"
                            placeholder="#333333"
                          />
                                          </div>
                                </div>
                                
                      {/* Button Color */}
                      <div className="space-y-2 mb-3">
                        <Label htmlFor="component-button" className="text-xs">Button Color:</Label>
                        <div className="flex gap-2">
                          <Input
                            id="component-button"
                            type="color"
                            value={items.find(item => item.id === selectedComponentId)?.style?.buttonColor || globalLinkColor}
                            onChange={(e) => handleUpdateItemStyle(selectedComponentId, 'buttonColor', e.target.value)}
                            className="h-8 w-8 p-0 border-0"
                          />
                          <Input
                            type="text"
                            value={items.find(item => item.id === selectedComponentId)?.style?.buttonColor || globalLinkColor}
                            onChange={(e) => handleUpdateItemStyle(selectedComponentId, 'buttonColor', e.target.value)}
                            className="h-8 flex-1 text-xs"
                            placeholder="#8b5cf6"
                          />
                                  </div>
                              </div>
                      
                      {/* Button Text Color */}
                      <div className="space-y-2 mb-3">
                        <Label htmlFor="component-button-text" className="text-xs">Button Text Color:</Label>
                        <div className="flex gap-2">
                          <Input
                            id="component-button-text"
                            type="color"
                            value={items.find(item => item.id === selectedComponentId)?.style?.buttonTextColor || '#ffffff'}
                            onChange={(e) => handleUpdateItemStyle(selectedComponentId, 'buttonTextColor', e.target.value)}
                            className="h-8 w-8 p-0 border-0"
                          />
                          <Input
                            type="text"
                            value={items.find(item => item.id === selectedComponentId)?.style?.buttonTextColor || '#ffffff'}
                            onChange={(e) => handleUpdateItemStyle(selectedComponentId, 'buttonTextColor', e.target.value)}
                            className="h-8 flex-1 text-xs"
                            placeholder="#ffffff"
                                              />
                                            </div>
                                            </div>
                      
                      {/* Border Color */}
                      <div className="space-y-2">
                        <Label htmlFor="component-border" className="text-xs">Border Color:</Label>
                        <div className="flex gap-2">
                          <Input
                            id="component-border"
                            type="color"
                            value={items.find(item => item.id === selectedComponentId)?.style?.borderColor || '#e2e8f0'}
                            onChange={(e) => handleUpdateItemStyle(selectedComponentId, 'borderColor', e.target.value)}
                            className="h-8 w-8 p-0 border-0"
                          />
                          <Input
                            type="text"
                            value={items.find(item => item.id === selectedComponentId)?.style?.borderColor || '#e2e8f0'}
                            onChange={(e) => handleUpdateItemStyle(selectedComponentId, 'borderColor', e.target.value)}
                            className="h-8 flex-1 text-xs"
                            placeholder="#e2e8f0"
                          />
                                </div>
                              </div>
                          </div>
                        )}
                      </div>
              </TabsContent>
            </Tabs>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
      
      {showTemplateManager && (
        <div className="p-6 flex-1 overflow-auto">
          <EmailTemplateManager 
            onSelectTemplate={handleSelectTemplate}
            onCreateNewTemplate={handleCreateNewTemplate}
            currentTemplateItems={items}
          />
          </div>
        )}
      
      {/* Add the Send Test Email Dialog */}
      <SendTestEmailDialog
        isOpen={showSendTestEmailDialog}
        onClose={() => setShowSendTestEmailDialog(false)}
        onSendEmail={handleSendTestEmail}
        items={items}
      />
    </AppLayout>
  );
};

export default NewsletterBuilder;