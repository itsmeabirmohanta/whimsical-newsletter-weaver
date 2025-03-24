
import { Button } from '@/components/ui/button';
import { NewsletterItem } from '@/pages/NewsletterBuilder';
import { PlusCircle, Type, Image, SeparatorHorizontal, MoveVertical, LayoutList } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface NewsletterItemListProps {
  onAddItem: (item: NewsletterItem) => void;
}

export function NewsletterItemList({ onAddItem }: NewsletterItemListProps) {
  const handleAddHeading = () => {
    onAddItem({
      id: uuidv4(),
      type: 'heading',
      content: {
        text: 'New Heading',
        level: 'h2',
        align: 'center',
      },
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
          },
          {
            id: uuidv4(),
            title: 'Article Title 2',
            author: 'Author 2',
            image: 'https://images.unsplash.com/photo-1569396116180-210c182bedb8?auto=format&fit=crop&w=800&q=80',
            excerpt: 'Brief description of article 2',
          },
        ],
      },
    });
  };

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-muted-foreground mb-2">Drag and drop these blocks into your newsletter</div>
      
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
    </div>
  );
}
