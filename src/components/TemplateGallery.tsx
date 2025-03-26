import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import { getTemplates, getTemplate, deleteTemplate, Template, NewsletterItem } from "@/lib/api-service";
import { toast } from "sonner";
import { LayoutTemplate, Trash, Loader2 } from "lucide-react";

interface TemplateGalleryProps {
  onSelectTemplate: (items: NewsletterItem[]) => void;
}

export function TemplateGallery({ onSelectTemplate }: TemplateGalleryProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      const result = await getTemplates();
      if (result.success && result.templates) {
        setTemplates(result.templates);
      } else {
        toast.error(result.message || "Failed to load templates");
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      toast.error("An error occurred while loading templates");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTemplate = async (id: string) => {
    try {
      const result = await getTemplate(id);
      if (result.success && result.template?.content) {
        onSelectTemplate(result.template.content);
        setIsOpen(false);
        toast.success("Template loaded successfully");
      } else {
        toast.error(result.message || "Failed to load template");
      }
    } catch (error) {
      console.error("Error loading template:", error);
      toast.error("An error occurred while loading the template");
    }
  };

  const handleDeleteTemplate = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this template?")) {
      setIsDeleting(id);
      try {
        const result = await deleteTemplate(id);
        if (result.success) {
          setTemplates(templates.filter(t => t.id !== id));
          toast.success("Template deleted successfully");
        } else {
          toast.error(result.message || "Failed to delete template");
        }
      } catch (error) {
        console.error("Error deleting template:", error);
        toast.error("An error occurred while deleting the template");
      } finally {
        setIsDeleting(null);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTemplates();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <LayoutTemplate className="h-4 w-4" />
          Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Template Gallery</DialogTitle>
          <DialogDescription>
            Choose a template to start with or load a saved design.
          </DialogDescription>
        </DialogHeader>
        <div className="h-[300px] overflow-y-auto py-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : templates.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-muted-foreground">No saved templates found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Save your designs as templates to reuse them later
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleSelectTemplate(template.id)}
                  className="border rounded-md p-4 hover:border-primary cursor-pointer relative group"
                >
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Created: {formatDate(template.createdAt)}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 h-8 w-8 p-0"
                    onClick={(e) => handleDeleteTemplate(template.id, e)}
                    disabled={isDeleting === template.id}
                  >
                    {isDeleting === template.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash className="h-4 w-4 text-destructive" />
                    )}
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 