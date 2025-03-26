import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ColorPicker } from '@/components/ui/color-picker';
import { NewsletterItem } from '@/lib/api-service';
import { Button } from '@/components/ui/button';
import { Slider } from "@/components/ui/slider";

interface ItemEditorProps {
  item: NewsletterItem;
  onUpdate: (item: NewsletterItem) => void;
}

export function ItemEditor({ item, onUpdate }: ItemEditorProps) {
  const handleContentUpdate = (updates: Partial<NewsletterItem['content']>) => {
    onUpdate({
      ...item,
      content: { ...item.content, ...updates }
    });
  };

  const handleStyleUpdate = (updates: Partial<NewsletterItem['style']>) => {
    onUpdate({
      ...item,
      style: { ...item.style, ...updates }
    });
  };

  const renderPreview = () => {
    const getCommonStyles = () => {
      const styles: React.CSSProperties = {};
      
      // Always set a default border style
      styles.borderStyle = 'solid';
      styles.borderWidth = `${item.style?.borderWidth || 0}px`;
      styles.borderColor = item.style?.borderColor || '#000000';
      
      if (item.style?.borderRadius) {
        styles.borderRadius = `${item.style.borderRadius}px`;
      }

      if (item.style?.backgroundColor) {
        styles.backgroundColor = item.style.backgroundColor;
      }

      if (item.style?.textColor) {
        styles.color = item.style.textColor;
      }
      
      return styles;
    };

    const getButtonStyles = () => ({
      backgroundColor: item.style?.buttonColor || '#007bff',
      color: item.style?.buttonTextColor || '#ffffff',
      ...getCommonStyles()
    });

    switch (item.type) {
      case 'header':
        return (
          <div 
            className="text-center p-4" 
            style={getCommonStyles()}
          >
            {item.content.logoUrl && (
              <img 
                src={item.content.logoUrl} 
                alt="Logo" 
                className="mx-auto h-12 mb-2" 
              />
            )}
            <h2 className="text-lg font-bold">{item.content.companyName}</h2>
            <p className="text-sm">{item.content.tagline}</p>
          </div>
        );
      case 'heading':
        return (
          <div 
            className={`text-${item.content.align || 'left'}`}
            style={getCommonStyles()}
          >
            {item.content.level === 'h1' && <h1 className="text-3xl font-bold">{item.content.text}</h1>}
            {item.content.level === 'h2' && <h2 className="text-2xl font-bold">{item.content.text}</h2>}
            {item.content.level === 'h3' && <h3 className="text-xl font-bold">{item.content.text}</h3>}
          </div>
        );
      case 'paragraph':
        return (
          <p 
            className={`text-${item.content.align || 'left'} leading-relaxed`}
            style={getCommonStyles()}
          >
            {item.content.text}
          </p>
        );
      case 'image':
        return (
          <div 
            className={`text-${item.content.align || 'center'}`}
            style={getCommonStyles()}
          >
            <img 
              src={item.content.url} 
              alt={item.content.alt} 
              className="max-w-full rounded-lg inline-block"
            />
          </div>
        );
      case 'button':
        return (
          <div className={`text-${item.content.align || 'center'} p-2`}>
            <button
              className="px-6 py-2.5 font-medium transition-colors inline-block"
              style={{
                backgroundColor: item.style?.buttonColor || '#007bff',
                color: item.style?.buttonTextColor || '#ffffff',
                ...getCommonStyles()
              }}
            >
              {item.content.text || 'Click here'}
            </button>
          </div>
        );
      case 'divider':
        return (
          <hr 
            className="my-4" 
            style={getCommonStyles()}
          />
        );
      case 'spacer':
        return (
          <div 
            className="w-full bg-gray-100/50" 
            style={{ 
              height: `${item.style?.height || 20}px`,
              ...getCommonStyles()
            }}
          />
        );
      case 'featured-article':
        return (
          <div style={getCommonStyles()}>
            {item.content.featuredArticle?.image && (
              <img 
                src={item.content.featuredArticle.image} 
                alt="" 
                className="w-full h-48 object-cover" 
              />
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{item.content.featuredArticle?.title}</h3>
              <p className="mb-4">{item.content.featuredArticle?.summary}</p>
              {item.content.featuredArticle?.buttonText && (
                <button
                  className="px-4 py-2 inline-block"
                  style={{
                    backgroundColor: item.style?.buttonColor || '#007bff',
                    color: item.style?.buttonTextColor || '#ffffff',
                    borderRadius: item.style?.borderRadius ? `${item.style.borderRadius}px` : undefined
                  }}
                >
                  {item.content.featuredArticle.buttonText}
                </button>
              )}
            </div>
          </div>
        );
      case 'article-grid':
        return (
          <div 
            className="grid grid-cols-2 gap-4 p-4" 
            style={getCommonStyles()}
          >
            {item.content.articleGrid?.articles.map((article, index) => (
              <div 
                key={index} 
                className="bg-white"
                style={getCommonStyles()}
              >
                {article.image && (
                  <img src={article.image} alt="" className="w-full h-32 object-cover" />
                )}
                <div className="p-4">
                  <h3 className="font-bold mb-2">{article.title}</h3>
                  <p className="text-sm mb-3">{article.description}</p>
                  <button
                    className="text-sm px-3 py-1 inline-block"
                    style={{
                      backgroundColor: item.style?.buttonColor || '#007bff',
                      color: item.style?.buttonTextColor || '#ffffff',
                      borderRadius: item.style?.borderRadius ? `${item.style.borderRadius}px` : undefined
                    }}
                  >
                    {article.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'quiz':
        return (
          <div className="p-6 rounded-lg bg-white shadow-sm" style={getCommonStyles()}>
            {item.content.quiz?.heading && (
              <h3 className="text-xl font-bold mb-4" style={{ color: item.style?.textColor || '#000000' }}>
                {item.content.quiz.heading}
              </h3>
            )}
            <div className="mb-6">
              <p className="text-lg mb-4" style={{ color: item.style?.textColor || '#000000' }}>
                {item.content.quiz?.question}
              </p>
              <div className="space-y-3">
                {item.content.quiz?.options?.map((option, index) => (
                  <div 
                    key={option.id} 
                    className="flex items-start gap-3 p-4 rounded hover:bg-gray-50 transition-colors cursor-pointer"
                    style={{
                      borderColor: item.style?.borderColor || '#e2e8f0',
                      borderWidth: '1px',
                      borderStyle: 'solid'
                    }}
                  >
                    <div 
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        borderColor: item.style?.textColor || '#000000',
                        borderWidth: '2px',
                        color: item.style?.textColor || '#000000'
                      }}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div style={{ color: item.style?.textColor || '#000000' }}>
                      {option.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {item.content.quiz?.footerText && (
              <p className="mt-4 text-sm" style={{ color: item.style?.textColor || '#6b7280' }}>
                {item.content.quiz.footerText}
              </p>
            )}
            <div className="mt-6 text-center">
              <button
                className="px-6 py-2.5 rounded font-medium transition-colors"
                style={{
                  backgroundColor: item.style?.buttonColor || '#007bff',
                  color: item.style?.buttonTextColor || '#ffffff',
                  borderRadius: item.style?.borderRadius ? `${item.style.borderRadius}px` : undefined
                }}
              >
                {item.content.quiz?.buttonText || 'Submit Answer'}
              </button>
            </div>
          </div>
        );
      case 'events':
        return (
          <div className="p-6 rounded-lg bg-white shadow-sm" style={getCommonStyles()}>
            {item.content.eventsTitle && (
              <h3 className="text-2xl font-bold mb-6" style={{ color: item.style?.textColor || '#000000' }}>
                {item.content.eventsTitle}
              </h3>
            )}
            <div className="space-y-6">
              {item.content.events?.map((event) => (
                <div 
                  key={event.id} 
                  className="p-4 rounded-lg transition-colors"
                  style={{
                    borderColor: item.style?.borderColor || '#e2e8f0',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    backgroundColor: item.style?.backgroundColor || '#ffffff'
                  }}
                >
                  <h4 className="text-lg font-semibold mb-2" style={{ color: item.style?.textColor || '#000000' }}>
                    {event.title}
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div>
                      <span className="font-medium" style={{ color: item.style?.textColor || '#000000' }}>Date: </span>
                      <span style={{ color: item.style?.textColor || '#000000' }}>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium" style={{ color: item.style?.textColor || '#000000' }}>Time: </span>
                      <span style={{ color: item.style?.textColor || '#000000' }}>{event.time}</span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <span className="font-medium" style={{ color: item.style?.textColor || '#000000' }}>Location: </span>
                    <span style={{ color: item.style?.textColor || '#000000' }}>{event.location}</span>
                  </div>
                  <p className="text-sm" style={{ color: item.style?.textColor || '#000000' }}>
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'subscribe':
        return (
          <div className="p-6 rounded-lg bg-white shadow-sm" style={getCommonStyles()}>
            {item.content.subscribeForm?.title && (
              <h3 className="text-xl font-bold mb-4" style={{ color: item.style?.textColor || '#000000' }}>
                {item.content.subscribeForm.title}
              </h3>
            )}
            {item.content.subscribeForm?.description && (
              <p className="mb-6" style={{ color: item.style?.textColor || '#000000' }}>
                {item.content.subscribeForm.description}
              </p>
            )}
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded border border-gray-200"
                style={{
                  borderColor: item.style?.borderColor || '#e2e8f0',
                  backgroundColor: '#ffffff'
                }}
              />
              <button
                className="px-6 py-2 rounded font-medium transition-colors whitespace-nowrap"
                style={{
                  backgroundColor: item.style?.buttonColor || '#007bff',
                  color: item.style?.buttonTextColor || '#ffffff',
                  borderRadius: item.style?.borderRadius ? `${item.style.borderRadius}px` : undefined
                }}
              >
                {item.content.subscribeForm?.buttonText || 'Subscribe'}
              </button>
            </div>
          </div>
        );
      case 'footer':
        return (
          <div className="p-6 bg-gray-50" style={getCommonStyles()}>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-bold mb-4" style={{ color: item.style?.textColor || '#000000' }}>
                    {item.content.footer?.companyName || 'Company Name'}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm" style={{ color: item.style?.textColor || '#000000' }}>
                      {item.content.footer?.address}
                    </p>
                    <p className="text-sm" style={{ color: item.style?.textColor || '#000000' }}>
                      Email: {item.content.footer?.email}
                    </p>
                    <p className="text-sm" style={{ color: item.style?.textColor || '#000000' }}>
                      Phone: {item.content.footer?.phone}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm mb-2" style={{ color: item.style?.textColor || '#000000' }}>
                    {item.content.footer?.copyrightText}
                  </p>
                  <a
                    href="#"
                    className="text-sm hover:underline"
                    style={{ color: item.style?.textColor || '#000000' }}
                  >
                    {item.content.footer?.unsubscribeText || 'Unsubscribe'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6 pt-4">
          {/* Header Content */}
          {item.type === 'header' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input
                  id="logoUrl"
                  value={item.content.logoUrl || ''}
                  onChange={(e) => handleContentUpdate({ logoUrl: e.target.value })}
                  placeholder="https://example.com/logo.png"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={item.content.companyName || ''}
                  onChange={(e) => handleContentUpdate({ companyName: e.target.value })}
                  placeholder="Your Company Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={item.content.tagline || ''}
                  onChange={(e) => handleContentUpdate({ tagline: e.target.value })}
                  placeholder="Your company tagline"
                />
              </div>
            </div>
          )}

          {/* Heading Content */}
          {item.type === 'heading' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="headingText">Text</Label>
                <Input
                  id="headingText"
                  value={item.content.text || ''}
                  onChange={(e) => handleContentUpdate({ text: e.target.value })}
                  placeholder="Heading text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="headingLevel">Level</Label>
                <Select
                  value={item.content.level || 'h2'}
                  onValueChange={(value) => handleContentUpdate({ level: value as 'h1' | 'h2' | 'h3' })}
                >
                  <SelectTrigger id="headingLevel">
                    <SelectValue placeholder="Select heading level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="h1">Heading 1</SelectItem>
                    <SelectItem value="h2">Heading 2</SelectItem>
                    <SelectItem value="h3">Heading 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="headingAlign">Alignment</Label>
                <Select
                  value={item.content.align || 'left'}
                  onValueChange={(value) => handleContentUpdate({ align: value as 'left' | 'center' | 'right' })}
                >
                  <SelectTrigger id="headingAlign">
                    <SelectValue placeholder="Select alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Paragraph Content */}
          {item.type === 'paragraph' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paragraphText">Text</Label>
                <Textarea
                  id="paragraphText"
                  value={item.content.text || ''}
                  onChange={(e) => handleContentUpdate({ text: e.target.value })}
                  placeholder="Enter your text here"
                  rows={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paragraphAlign">Alignment</Label>
                <Select
                  value={item.content.align || 'left'}
                  onValueChange={(value) => handleContentUpdate({ align: value as 'left' | 'center' | 'right' })}
                >
                  <SelectTrigger id="paragraphAlign">
                    <SelectValue placeholder="Select alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Image Content */}
          {item.type === 'image' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={item.content.url || ''}
                  onChange={(e) => handleContentUpdate({ url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageAlt">Alt Text</Label>
                <Input
                  id="imageAlt"
                  value={item.content.alt || ''}
                  onChange={(e) => handleContentUpdate({ alt: e.target.value })}
                  placeholder="Image description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageAlign">Alignment</Label>
                <Select
                  value={item.content.align || 'center'}
                  onValueChange={(value) => handleContentUpdate({ align: value as 'left' | 'center' | 'right' })}
                >
                  <SelectTrigger id="imageAlign">
                    <SelectValue placeholder="Select alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Button Content */}
          {item.type === 'button' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  value={item.content.text || ''}
                  onChange={(e) => handleContentUpdate({ text: e.target.value })}
                  placeholder="Click here"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buttonUrl">URL</Label>
                <Input
                  id="buttonUrl"
                  value={item.content.url || ''}
                  onChange={(e) => handleContentUpdate({ url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buttonAlign">Alignment</Label>
                <Select
                  value={item.content.align || 'center'}
                  onValueChange={(value) => handleContentUpdate({ align: value as 'left' | 'center' | 'right' })}
                >
                  <SelectTrigger id="buttonAlign">
                    <SelectValue placeholder="Select alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Spacer Content */}
          {item.type === 'spacer' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="spacerHeight">Height (pixels)</Label>
                <Input
                  id="spacerHeight"
                  type="number"
                  value={item.style?.height || 20}
                  onChange={(e) => handleStyleUpdate({ height: parseInt(e.target.value) })}
                  min={1}
                  max={200}
                />
              </div>
            </div>
          )}

          {/* Featured Article Content */}
          {item.type === 'featured-article' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="articleImage">Image URL</Label>
                <Input
                  id="articleImage"
                  value={item.content.featuredArticle?.image || ''}
                  onChange={(e) => handleContentUpdate({ 
                    featuredArticle: {
                      ...item.content.featuredArticle,
                      image: e.target.value
                    }
                  })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="articleTitle">Title</Label>
                <Input
                  id="articleTitle"
                  value={item.content.featuredArticle?.title || ''}
                  onChange={(e) => handleContentUpdate({ 
                    featuredArticle: {
                      ...item.content.featuredArticle,
                      title: e.target.value
                    }
                  })}
                  placeholder="Article Title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="articleSummary">Summary</Label>
                <Textarea
                  id="articleSummary"
                  value={item.content.featuredArticle?.summary || ''}
                  onChange={(e) => handleContentUpdate({ 
                    featuredArticle: {
                      ...item.content.featuredArticle,
                      summary: e.target.value
                    }
                  })}
                  placeholder="Write a compelling summary..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="articleButtonText">Button Text</Label>
                <Input
                  id="articleButtonText"
                  value={item.content.featuredArticle?.buttonText || ''}
                  onChange={(e) => handleContentUpdate({ 
                    featuredArticle: {
                      ...item.content.featuredArticle,
                      buttonText: e.target.value
                    }
                  })}
                  placeholder="Read More"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="articleButtonUrl">Button URL</Label>
                <Input
                  id="articleButtonUrl"
                  value={item.content.featuredArticle?.buttonUrl || ''}
                  onChange={(e) => handleContentUpdate({ 
                    featuredArticle: {
                      ...item.content.featuredArticle,
                      buttonUrl: e.target.value
                    }
                  })}
                  placeholder="https://example.com/article"
                />
              </div>
            </div>
          )}

          {/* Article Grid Content */}
          {item.type === 'article-grid' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Articles</h3>
                <Button
                  size="sm"
                  onClick={() => {
                    const newArticle = {
                      id: `article-${Date.now()}`,
                      image: '',
                      title: 'New Article',
                      description: 'Article description',
                      buttonText: 'Read More',
                      buttonUrl: '#'
                    };
                    handleContentUpdate({
                      articleGrid: {
                        ...item.content.articleGrid,
                        articles: [...(item.content.articleGrid?.articles || []), newArticle]
                      }
                    });
                  }}
                >
                  Add Article
                </Button>
              </div>
              
              <div className="space-y-6">
                {item.content.articleGrid?.articles.map((article, index) => (
                  <Card key={article.id} className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Article {index + 1}</h4>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          handleContentUpdate({
                            articleGrid: {
                              ...item.content.articleGrid,
                              articles: item.content.articleGrid.articles.filter((_, i) => i !== index)
                            }
                          });
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Image URL</Label>
                        <Input
                          value={article.image || ''}
                          onChange={(e) => {
                            const updatedArticles = [...item.content.articleGrid.articles];
                            updatedArticles[index] = { ...article, image: e.target.value };
                            handleContentUpdate({
                              articleGrid: {
                                ...item.content.articleGrid,
                                articles: updatedArticles
                              }
                            });
                          }}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={article.title}
                          onChange={(e) => {
                            const updatedArticles = [...item.content.articleGrid.articles];
                            updatedArticles[index] = { ...article, title: e.target.value };
                            handleContentUpdate({
                              articleGrid: {
                                ...item.content.articleGrid,
                                articles: updatedArticles
                              }
                            });
                          }}
                          placeholder="Article Title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={article.description}
                          onChange={(e) => {
                            const updatedArticles = [...item.content.articleGrid.articles];
                            updatedArticles[index] = { ...article, description: e.target.value };
                            handleContentUpdate({
                              articleGrid: {
                                ...item.content.articleGrid,
                                articles: updatedArticles
                              }
                            });
                          }}
                          placeholder="Article description"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Button Text</Label>
                        <Input
                          value={article.buttonText}
                          onChange={(e) => {
                            const updatedArticles = [...item.content.articleGrid.articles];
                            updatedArticles[index] = { ...article, buttonText: e.target.value };
                            handleContentUpdate({
                              articleGrid: {
                                ...item.content.articleGrid,
                                articles: updatedArticles
                              }
                            });
                          }}
                          placeholder="Read More"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Button URL</Label>
                        <Input
                          value={article.buttonUrl}
                          onChange={(e) => {
                            const updatedArticles = [...item.content.articleGrid.articles];
                            updatedArticles[index] = { ...article, buttonUrl: e.target.value };
                            handleContentUpdate({
                              articleGrid: {
                                ...item.content.articleGrid,
                                articles: updatedArticles
                              }
                            });
                          }}
                          placeholder="https://example.com/article"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Quiz Content */}
          {item.type === 'quiz' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quizHeading">Quiz Title</Label>
                <Input
                  id="quizHeading"
                  value={item.content.quiz?.heading || ''}
                  onChange={(e) => handleContentUpdate({ 
                    quiz: {
                      ...item.content.quiz,
                      heading: e.target.value
                    }
                  })}
                  placeholder="Quiz Title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quizQuestion">Question</Label>
                <Textarea
                  id="quizQuestion"
                  value={item.content.quiz?.question || ''}
                  onChange={(e) => handleContentUpdate({ 
                    quiz: {
                      ...item.content.quiz,
                      question: e.target.value
                    }
                  })}
                  placeholder="Write your question here"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Options</Label>
                <div className="space-y-3">
                  {item.content.quiz?.options?.map((option, index) => (
                    <div key={option.id} className="flex gap-2">
                      <Input
                        value={option.text}
                        onChange={(e) => {
                          const newOptions = [...(item.content.quiz?.options || [])];
                          newOptions[index] = { ...option, text: e.target.value };
                          handleContentUpdate({ 
                            quiz: {
                              ...item.content.quiz,
                              options: newOptions
                            }
                          });
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const newOptions = [...(item.content.quiz?.options || [])];
                          newOptions.splice(index, 1);
                          handleContentUpdate({
                            quiz: {
                              ...item.content.quiz,
                              options: newOptions
                            }
                          });
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    size="sm"
                    onClick={() => {
                      const newOption = {
                        id: `option-${Date.now()}`,
                        text: ''
                      };
                      handleContentUpdate({
                        quiz: {
                          ...item.content.quiz,
                          options: [...(item.content.quiz?.options || []), newOption]
                        }
                      });
                    }}
                  >
                    Add Option
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quizFooter">Footer Text</Label>
                <Textarea
                  id="quizFooter"
                  value={item.content.quiz?.footerText || ''}
                  onChange={(e) => handleContentUpdate({ 
                    quiz: {
                      ...item.content.quiz,
                      footerText: e.target.value
                    }
                  })}
                  placeholder="Optional footer text"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quizButton">Button Text</Label>
                <Input
                  id="quizButton"
                  value={item.content.quiz?.buttonText || ''}
                  onChange={(e) => handleContentUpdate({ 
                    quiz: {
                      ...item.content.quiz,
                      buttonText: e.target.value
                    }
                  })}
                  placeholder="Submit Answer"
                />
              </div>
            </div>
          )}

          {/* Events Content */}
          {item.type === 'events' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="eventsTitle">Section Title</Label>
                <Input
                  id="eventsTitle"
                  value={item.content.eventsTitle || ''}
                  onChange={(e) => handleContentUpdate({ eventsTitle: e.target.value })}
                  placeholder="Upcoming Events"
                />
              </div>
              <div className="space-y-2">
                <Label>Events</Label>
                <div className="space-y-4">
                  {item.content.events?.map((event, index) => (
                    <Card key={event.id} className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Event {index + 1}</h4>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            const newEvents = [...(item.content.events || [])];
                            newEvents.splice(index, 1);
                            handleContentUpdate({ events: newEvents });
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>Event Title</Label>
                          <Input
                            value={event.title}
                            onChange={(e) => {
                              const newEvents = [...(item.content.events || [])];
                              newEvents[index] = { ...event, title: e.target.value };
                              handleContentUpdate({ events: newEvents });
                            }}
                            placeholder="Event Title"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label>Date</Label>
                            <Input
                              type="date"
                              value={event.date}
                              onChange={(e) => {
                                const newEvents = [...(item.content.events || [])];
                                newEvents[index] = { ...event, date: e.target.value };
                                handleContentUpdate({ events: newEvents });
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Time</Label>
                            <Input
                              type="time"
                              value={event.time}
                              onChange={(e) => {
                                const newEvents = [...(item.content.events || [])];
                                newEvents[index] = { ...event, time: e.target.value };
                                handleContentUpdate({ events: newEvents });
                              }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input
                            value={event.location}
                            onChange={(e) => {
                              const newEvents = [...(item.content.events || [])];
                              newEvents[index] = { ...event, location: e.target.value };
                              handleContentUpdate({ events: newEvents });
                            }}
                            placeholder="Event Location"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={event.description}
                            onChange={(e) => {
                              const newEvents = [...(item.content.events || [])];
                              newEvents[index] = { ...event, description: e.target.value };
                              handleContentUpdate({ events: newEvents });
                            }}
                            placeholder="Event description"
                            rows={3}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                  <Button
                    size="sm"
                    onClick={() => {
                      const newEvent = {
                        id: `event-${Date.now()}`,
                        title: '',
                        date: new Date().toISOString().split('T')[0],
                        time: '10:00',
                        location: '',
                        description: ''
                      };
                      handleContentUpdate({
                        events: [...(item.content.events || []), newEvent]
                      });
                    }}
                  >
                    Add Event
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Subscribe Form Content */}
          {item.type === 'subscribe' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subscribeTitle">Form Title</Label>
                <Input
                  id="subscribeTitle"
                  value={item.content.subscribeForm?.title || ''}
                  onChange={(e) => handleContentUpdate({ 
                    subscribeForm: {
                      ...item.content.subscribeForm,
                      title: e.target.value
                    }
                  })}
                  placeholder="Subscribe to Our Newsletter"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subscribeDescription">Description</Label>
                <Textarea
                  id="subscribeDescription"
                  value={item.content.subscribeForm?.description || ''}
                  onChange={(e) => handleContentUpdate({ 
                    subscribeForm: {
                      ...item.content.subscribeForm,
                      description: e.target.value
                    }
                  })}
                  placeholder="Stay updated with our latest news"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subscribeButton">Button Text</Label>
                <Input
                  id="subscribeButton"
                  value={item.content.subscribeForm?.buttonText || ''}
                  onChange={(e) => handleContentUpdate({ 
                    subscribeForm: {
                      ...item.content.subscribeForm,
                      buttonText: e.target.value
                    }
                  })}
                  placeholder="Subscribe Now"
                />
              </div>
            </div>
          )}

          {/* Footer Content */}
          {item.type === 'footer' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="footerCompanyName">Company Name</Label>
                <Input
                  id="footerCompanyName"
                  value={item.content.footer?.companyName || ''}
                  onChange={(e) => handleContentUpdate({ 
                    footer: {
                      ...item.content.footer,
                      companyName: e.target.value
                    }
                  })}
                  placeholder="Your Company"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="footerAddress">Address</Label>
                <Textarea
                  id="footerAddress"
                  value={item.content.footer?.address || ''}
                  onChange={(e) => handleContentUpdate({ 
                    footer: {
                      ...item.content.footer,
                      address: e.target.value
                    }
                  })}
                  placeholder="123 Street Name, City, Country"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="footerEmail">Email</Label>
                  <Input
                    id="footerEmail"
                    type="email"
                    value={item.content.footer?.email || ''}
                    onChange={(e) => handleContentUpdate({ 
                      footer: {
                        ...item.content.footer,
                        email: e.target.value
                      }
                    })}
                    placeholder="contact@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footerPhone">Phone</Label>
                  <Input
                    id="footerPhone"
                    value={item.content.footer?.phone || ''}
                    onChange={(e) => handleContentUpdate({ 
                      footer: {
                        ...item.content.footer,
                        phone: e.target.value
                      }
                    })}
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="footerCopyright">Copyright Text</Label>
                <Input
                  id="footerCopyright"
                  value={item.content.footer?.copyrightText || ''}
                  onChange={(e) => handleContentUpdate({ 
                    footer: {
                      ...item.content.footer,
                      copyrightText: e.target.value
                    }
                  })}
                  placeholder="© 2024 Your Company. All rights reserved."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="footerUnsubscribe">Unsubscribe Text</Label>
                <Input
                  id="footerUnsubscribe"
                  value={item.content.footer?.unsubscribeText || ''}
                  onChange={(e) => handleContentUpdate({ 
                    footer: {
                      ...item.content.footer,
                      unsubscribeText: e.target.value
                    }
                  })}
                  placeholder="Unsubscribe"
                />
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="style" className="space-y-6 pt-4">
          <Card className="p-4">
            <h3 className="font-medium mb-4">Appearance</h3>
            <div className="space-y-6">
              {/* Border Controls */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium mb-2">Border</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Width (px)</Label>
                    <div className="flex items-center space-x-2">
                      <Slider
                        value={[item.style?.borderWidth || 0]}
                        onValueChange={(value) => handleStyleUpdate({ borderWidth: value[0] })}
                        min={0}
                        max={10}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-xs w-8 text-right">{item.style?.borderWidth || 0}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Radius (px)</Label>
                    <div className="flex items-center space-x-2">
                      <Slider
                        value={[item.style?.borderRadius || 0]}
                        onValueChange={(value) => handleStyleUpdate({ borderRadius: value[0] })}
                        min={0}
                        max={50}
                        step={2}
                        className="flex-1"
                      />
                      <span className="text-xs w-8 text-right">{item.style?.borderRadius || 0}</span>
                    </div>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label className="text-xs">Border Color</Label>
                    <ColorPicker
                      color={item.style?.borderColor || '#000000'}
                      onChange={(color) => handleStyleUpdate({ borderColor: color })}
                    />
                  </div>
                </div>
              </div>

              {/* Colors section */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium mb-2">Colors</h4>
                {(item.type === 'header' || item.type === 'button' || item.type === 'featured-article' || item.type === 'article-grid') && (
                  <>
                    <div className="space-y-2">
                      <Label>Background Color</Label>
                      <ColorPicker
                        color={item.style?.backgroundColor || '#ffffff'}
                        onChange={(color) => handleStyleUpdate({ backgroundColor: color })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Text Color</Label>
                      <ColorPicker
                        color={item.style?.textColor || '#000000'}
                        onChange={(color) => handleStyleUpdate({ textColor: color })}
                      />
                    </div>
                    {(item.type === 'button' || item.type === 'featured-article' || item.type === 'article-grid') && (
                      <>
                        <div className="space-y-2">
                          <Label>Button Color</Label>
                          <ColorPicker
                            color={item.style?.buttonColor || '#007bff'}
                            onChange={(color) => handleStyleUpdate({ buttonColor: color })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Button Text Color</Label>
                          <ColorPicker
                            color={item.style?.buttonTextColor || '#ffffff'}
                            onChange={(color) => handleStyleUpdate({ buttonTextColor: color })}
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview Card */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Preview</h3>
          <span className="text-sm text-muted-foreground">{getItemTypeLabel(item.type)}</span>
        </div>
        <Separator className="my-2" />
        <div className="p-4 bg-white min-h-[100px] flex items-center justify-center">
          {renderPreview()}
        </div>
      </Card>
    </div>
  );
}

function getItemTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    header: "Header",
    heading: "Heading",
    paragraph: "Paragraph",
    image: "Image",
    button: "Button",
    divider: "Divider",
    spacer: "Spacer",
    "featured-article": "Featured Article",
    "article-grid": "Article Grid"
  };
  return labels[type] || type;
} 