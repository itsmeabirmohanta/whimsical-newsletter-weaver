import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UploadIcon, DownloadIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { NewsletterItem } from '@/pages/NewsletterBuilder';

export interface SavedTemplate {
  id: string;
  name: string;
  description?: string;
  items: NewsletterItem[];
  createdAt: string;
  updatedAt: string;
}

interface EmailTemplateManagerProps {
  onSelectTemplate: (template: SavedTemplate) => void;
  onCreateNewTemplate: () => void;
  currentTemplateItems?: NewsletterItem[];
}

const EmailTemplateManager: React.FC<EmailTemplateManagerProps> = ({
  onSelectTemplate,
  onCreateNewTemplate,
  currentTemplateItems
}) => {
  const [templates, setTemplates] = useState<SavedTemplate[]>([]);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [importedData, setImportedData] = useState('');
  
  // Fetch templates from localStorage on component mount
  useEffect(() => {
    const savedTemplates = localStorage.getItem('newsletter-templates');
    if (savedTemplates) {
      try {
        setTemplates(JSON.parse(savedTemplates));
      } catch (error) {
        console.error('Error parsing templates:', error);
        toast.error('There was an error loading your saved templates');
      }
    }
  }, []);
  
  // Save current template
  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      toast.error('Please provide a template name');
      return;
    }
    
    if (!currentTemplateItems || currentTemplateItems.length === 0) {
      toast.error('Cannot save an empty template');
      return;
    }
    
    const newTemplate: SavedTemplate = {
      id: crypto.randomUUID(),
      name: templateName,
      description: templateDescription,
      items: currentTemplateItems,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedTemplates = [...templates, newTemplate];
    
    try {
      localStorage.setItem('newsletter-templates', JSON.stringify(updatedTemplates));
      setTemplates(updatedTemplates);
      toast.success('Template saved successfully');
      setIsSaveDialogOpen(false);
      
      // Also save as current template
      localStorage.setItem('newsletter-template', JSON.stringify(currentTemplateItems));
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('There was an error saving your template');
    }
  };
  
  // Delete a template
  const handleDeleteTemplate = (id: string) => {
    const updatedTemplates = templates.filter(template => template.id !== id);
    
    try {
      localStorage.setItem('newsletter-templates', JSON.stringify(updatedTemplates));
      setTemplates(updatedTemplates);
      toast.success('Template deleted');
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error('There was an error deleting your template');
    }
  };
  
  // Import a template from JSON
  const handleImportTemplate = () => {
    try {
      const parsedData = JSON.parse(importedData);
      
      // Basic validation
      if (!Array.isArray(parsedData)) {
        toast.error('Invalid template format. Expected an array of items.');
        return;
      }
      
      // Apply the imported template
      onSelectTemplate({
        id: 'imported',
        name: 'Imported Template',
        items: parsedData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      setIsImportDialogOpen(false);
      setImportedData('');
      toast.success('Template imported successfully');
      
    } catch (error) {
      console.error('Error importing template:', error);
      toast.error('Invalid JSON format');
    }
  };
  
  // Export the current template as JSON
  const handleExportTemplate = () => {
    if (!currentTemplateItems || currentTemplateItems.length === 0) {
      toast.error('No template to export');
      return;
    }
    
    try {
      const json = JSON.stringify(currentTemplateItems, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `newsletter-template-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Template exported successfully');
    } catch (error) {
      console.error('Error exporting template:', error);
      toast.error('There was an error exporting your template');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Email Templates</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsImportDialogOpen(true)}>
            <UploadIcon className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportTemplate}>
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="default" size="sm" onClick={() => setIsSaveDialogOpen(true)}>
            Save As
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Create New Template Card */}
        <Card className="cursor-pointer hover:border-primary transition-colors" 
          onClick={onCreateNewTemplate}>
          <CardContent className="flex flex-col items-center justify-center h-40 p-6">
            <PlusIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Create New Template</p>
          </CardContent>
        </Card>
        
        {/* Saved Templates */}
        {templates.map(template => (
          <Card key={template.id} className="hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{template.name}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTemplate(template.id);
                  }}
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
              {template.description && (
                <CardDescription>{template.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Updated: {new Date(template.updatedAt).toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="default" 
                size="sm" 
                className="w-full"
                onClick={() => onSelectTemplate(template)}
              >
                Use This Template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Template</DialogTitle>
            <DialogDescription>
              Paste the exported JSON template code below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="import-json">Template JSON</Label>
            <textarea
              id="import-json"
              className="w-full min-h-[200px] p-2 border rounded-md font-mono text-sm"
              placeholder="Paste your template JSON here..."
              value={importedData}
              onChange={(e) => setImportedData(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleImportTemplate}>
              Import
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Save Template Dialog */}
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Template</DialogTitle>
            <DialogDescription>
              Save your current template for future use.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                placeholder="E.g., Monthly Newsletter, Product Updates..."
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="template-description">Description (Optional)</Label>
              <Input
                id="template-description"
                placeholder="A brief description of this template"
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTemplate}>
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailTemplateManager; 