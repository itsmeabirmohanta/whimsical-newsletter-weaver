
import { Button } from '@/components/ui/button';
import { NewsletterItem } from '@/pages/NewsletterBuilder';
import { PlusCircle, Type, Image, SeparatorHorizontal, MoveVertical, LayoutList, Box, Palette } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface NewsletterItemListProps {
  onAddItem: (item: NewsletterItem) => void;
}

export function NewsletterItemList({ onAddItem }: NewsletterItemListProps) {
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [blockColors, setBlockColors] = useState({
    backgroundColor: '#ffffff',
    textColor: '#333333',
    buttonColor: '#8b5cf6',
    buttonTextColor: '#ffffff'
  });

  const handleColorChange = (property: string, value: string) => {
    setBlockColors({
      ...blockColors,
      [property]: value
    });
  };

  const handleAddHeading = () => {
    onAddItem({
      id: uuidv4(),
      type: 'heading',
      content: {
        text: 'New Heading',
        level: 'h2',
        align: 'center',
      },
      style: showColorOptions ? {
        backgroundColor: blockColors.backgroundColor !== '#ffffff' ? blockColors.backgroundColor : '',
        textColor: blockColors.textColor !== '#333333' ? blockColors.textColor : '',
      } : undefined,
    });
  };

  const handleAddParagraph = () => {
    onAddItem({
      id: uuidv4(),
      type: 'paragraph',
      content: {
        text: 'This is a new paragraph. Edit this text to add your content.',
        align: 'left',
      },
      style: showColorOptions ? {
        backgroundColor: blockColors.backgroundColor !== '#ffffff' ? blockColors.backgroundColor : '',
        textColor: blockColors.textColor !== '#333333' ? blockColors.textColor : '',
      } : undefined,
    });
  };

  const handleAddImage = () => {
    onAddItem({
      id: uuidv4(),
      type: 'image',
      content: {
        url: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80',
        alt: 'Image description',
      },
      style: showColorOptions ? {
        backgroundColor: blockColors.backgroundColor !== '#ffffff' ? blockColors.backgroundColor : '',
      } : undefined,
    });
  };

  const handleAddButton = () => {
    onAddItem({
      id: uuidv4(),
      type: 'button',
      content: {
        text: 'Click Here',
        url: '#',
        align: 'center',
        variant: 'email',
      },
      style: showColorOptions ? {
        backgroundColor: blockColors.backgroundColor !== '#ffffff' ? blockColors.backgroundColor : '',
        textColor: blockColors.textColor !== '#333333' ? blockColors.textColor : '',
        buttonColor: blockColors.buttonColor,
        buttonTextColor: blockColors.buttonTextColor,
      } : undefined,
    });
  };

  const handleAddDivider = () => {
    onAddItem({
      id: uuidv4(),
      type: 'divider',
      content: {},
    });
  };

  const handleAddSpacer = () => {
    onAddItem({
      id: uuidv4(),
      type: 'spacer',
      content: {
        height: 30,
      },
    });
  };

  const handleAddCompartment = () => {
    onAddItem({
      id: uuidv4(),
      type: 'compartment',
      content: {
        title: 'Compartment Section',
        content: 'Add your content here. This can be used for callouts, quotes, or important information.',
      },
      style: showColorOptions ? {
        backgroundColor: blockColors.backgroundColor !== '#ffffff' ? blockColors.backgroundColor : '#f3f4f6',
        textColor: blockColors.textColor !== '#333333' ? blockColors.textColor : '#111827',
      } : {
        backgroundColor: '#f3f4f6',
        textColor: '#111827',
      },
    });
  };

  const handleAddFeaturedArticle = () => {
    onAddItem({
      id: uuidv4(),
      type: 'featured-article',
      content: {
        title: 'Featured Article Title',
        author: 'Author Name',
        date: 'May 20, 2024',
        image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80',
        excerpt: 'This is a brief description of the featured article. Edit this text to add your content.',
        cta: 'Read More',
        linkUrl: '#',
      },
      style: showColorOptions ? {
        backgroundColor: blockColors.backgroundColor !== '#ffffff' ? blockColors.backgroundColor : '',
        textColor: blockColors.textColor !== '#333333' ? blockColors.textColor : '',
        buttonColor: blockColors.buttonColor,
        buttonTextColor: blockColors.buttonTextColor,
      } : {
        backgroundColor: '',
        textColor: '',
        buttonColor: '#8b5cf6',
        buttonTextColor: '#ffffff',
      },
    });
  };

  const handleAddArticleGrid = () => {
    onAddItem({
      id: uuidv4(),
      type: 'article-grid',
      content: {
        articles: [
          {
            id: uuidv4(),
            title: 'Article Title 1',
            author: 'Author 1',
            image: 'https://images.unsplash.com/photo-1598965402089-897e8f3f1c70?auto=format&fit=crop&w=800&q=80',
            excerpt: 'Brief description of article 1',
            linkUrl: '#',
            linkText: 'Read More',
          },
          {
            id: uuidv4(),
            title: 'Article Title 2',
            author: 'Author 2',
            image: 'https://images.unsplash.com/photo-1569396116180-210c182bedb8?auto=format&fit=crop&w=800&q=80',
            excerpt: 'Brief description of article 2',
            linkUrl: '#',
            linkText: 'Read More',
          },
        ],
      },
      style: showColorOptions ? {
        backgroundColor: blockColors.backgroundColor !== '#ffffff' ? blockColors.backgroundColor : '',
        textColor: blockColors.textColor !== '#333333' ? blockColors.textColor : '',
        buttonColor: blockColors.buttonColor,
        buttonTextColor: blockColors.buttonTextColor,
      } : {
        backgroundColor: '',
        textColor: '',
        buttonColor: '#8b5cf6',
        buttonTextColor: '#ffffff',
      },
    });
  };

  const toggleColorOptions = () => {
    setShowColorOptions(!showColorOptions);
    if (!showColorOptions) {
      toast.info("Color customization enabled. New blocks will use these colors.");
    } else {
      toast.info("Color customization disabled. New blocks will use default colors.");
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-muted-foreground mb-2">Drag and drop these blocks into your newsletter</div>
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Basic Blocks</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant={showColorOptions ? "default" : "outline"} 
              size="sm" 
              onClick={toggleColorOptions} 
              className="flex items-center gap-1"
            >
              <Palette className="h-4 w-4" />
              {showColorOptions ? "Colors On" : "Colors Off"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">Block Color Options</h4>
              <p className="text-sm text-muted-foreground">These colors will be applied to new blocks you add.</p>
              
              <div className="space-y-3">
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label htmlFor="bg-color" className="text-xs">Background:</Label>
                  <Input 
                    id="bg-color-picker"
                    type="color" 
                    value={blockColors.backgroundColor}
                    onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                    className="h-8 w-12 col-span-1 p-1"
                  />
                  <Input 
                    id="bg-color"
                    type="text" 
                    value={blockColors.backgroundColor}
                    onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                    className="h-8 col-span-1 text-xs"
                  />
                </div>
                
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label htmlFor="text-color" className="text-xs">Text Color:</Label>
                  <Input 
                    id="text-color-picker"
                    type="color" 
                    value={blockColors.textColor}
                    onChange={(e) => handleColorChange('textColor', e.target.value)}
                    className="h-8 w-12 col-span-1 p-1"
                  />
                  <Input 
                    id="text-color"
                    type="text" 
                    value={blockColors.textColor}
                    onChange={(e) => handleColorChange('textColor', e.target.value)}
                    className="h-8 col-span-1 text-xs"
                  />
                </div>
                
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label htmlFor="button-color" className="text-xs">Button Color:</Label>
                  <Input 
                    id="button-color-picker"
                    type="color" 
                    value={blockColors.buttonColor}
                    onChange={(e) => handleColorChange('buttonColor', e.target.value)}
                    className="h-8 w-12 col-span-1 p-1"
                  />
                  <Input 
                    id="button-color"
                    type="text" 
                    value={blockColors.buttonColor}
                    onChange={(e) => handleColorChange('buttonColor', e.target.value)}
                    className="h-8 col-span-1 text-xs"
                  />
                </div>
                
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label htmlFor="button-text-color" className="text-xs">Button Text:</Label>
                  <Input 
                    id="button-text-color-picker"
                    type="color" 
                    value={blockColors.buttonTextColor}
                    onChange={(e) => handleColorChange('buttonTextColor', e.target.value)}
                    className="h-8 w-12 col-span-1 p-1"
                  />
                  <Input 
                    id="button-text-color"
                    type="text" 
                    value={blockColors.buttonTextColor}
                    onChange={(e) => handleColorChange('buttonTextColor', e.target.value)}
                    className="h-8 col-span-1 text-xs"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setBlockColors({
                    backgroundColor: '#ffffff',
                    textColor: '#333333',
                    buttonColor: '#8b5cf6',
                    buttonTextColor: '#ffffff'
                  })}
                >
                  Reset
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="justify-start" onClick={handleAddHeading}>
          <Type className="mr-2 h-4 w-4" />
          Heading
        </Button>
        
        <Button variant="outline" className="justify-start" onClick={handleAddParagraph}>
          <Type className="mr-2 h-4 w-4" />
          Paragraph
        </Button>
        
        <Button variant="outline" className="justify-start" onClick={handleAddImage}>
          <Image className="mr-2 h-4 w-4" />
          Image
        </Button>
        
        <Button variant="outline" className="justify-start" onClick={handleAddButton}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Button
        </Button>
        
        <Button variant="outline" className="justify-start" onClick={handleAddDivider}>
          <SeparatorHorizontal className="mr-2 h-4 w-4" />
          Divider
        </Button>
        
        <Button variant="outline" className="justify-start" onClick={handleAddSpacer}>
          <MoveVertical className="mr-2 h-4 w-4" />
          Spacer
        </Button>
        
        <Button variant="outline" className="justify-start" onClick={handleAddCompartment}>
          <Box className="mr-2 h-4 w-4" />
          Compartment
        </Button>
      </div>
      
      <div className="pt-2 border-t">
        <div className="text-sm font-medium text-muted-foreground mb-2">Complex Components</div>
        
        <div className="grid grid-cols-1 gap-2">
          <Button variant="outline" className="justify-start" onClick={handleAddFeaturedArticle}>
            <LayoutList className="mr-2 h-4 w-4" />
            Featured Article
          </Button>
          
          <Button variant="outline" className="justify-start" onClick={handleAddArticleGrid}>
            <LayoutList className="mr-2 h-4 w-4" />
            Article Grid
          </Button>
        </div>
      </div>
      
      {showColorOptions && (
        <div className="mt-4 p-3 border rounded-md bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full" style={{ backgroundColor: blockColors.backgroundColor }}></div>
            <div className="text-xs">Background</div>
            
            <div className="h-4 w-4 rounded-full ml-2" style={{ backgroundColor: blockColors.textColor }}></div>
            <div className="text-xs">Text</div>
            
            <div className="h-4 w-4 rounded-full ml-2" style={{ backgroundColor: blockColors.buttonColor }}></div>
            <div className="text-xs">Button</div>
            
            <div className="h-4 w-4 rounded-full ml-2" style={{ backgroundColor: blockColors.buttonTextColor }}></div>
            <div className="text-xs">Button Text</div>
          </div>
        </div>
      )}
    </div>
  );
}
