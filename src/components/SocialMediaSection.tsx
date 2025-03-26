import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Plus, Trash2, Twitter, Facebook, Instagram, Linkedin, Globe } from "lucide-react";
import { TwitterIcon } from "@/components/icons/TwitterIcon";

export interface SocialLink {
  id: string;
  platform: "twitter" | "facebook" | "instagram" | "linkedin" | "website" | "custom";
  url: string;
  label?: string;
  icon?: string;
}

interface SocialMediaSectionProps {
  links: SocialLink[];
  onChange: (links: SocialLink[]) => void;
}

export const SocialMediaSection = ({ links, onChange }: SocialMediaSectionProps) => {
  const [newPlatform, setNewPlatform] = useState<SocialLink["platform"]>("twitter");

  const addLink = () => {
    const newLink: SocialLink = {
      id: `social-${Date.now()}`,
      platform: newPlatform,
      url: "",
      label: getPlatformLabel(newPlatform)
    };
    onChange([...links, newLink]);
  };

  const updateLink = (id: string, updates: Partial<SocialLink>) => {
    onChange(
      links.map(link => 
        link.id === id ? { ...link, ...updates } : link
      )
    );
  };

  const removeLink = (id: string) => {
    onChange(links.filter(link => link.id !== id));
  };

  const getPlatformLabel = (platform: SocialLink["platform"]): string => {
    switch (platform) {
      case "twitter": return "Twitter";
      case "facebook": return "Facebook";
      case "instagram": return "Instagram";
      case "linkedin": return "LinkedIn";
      case "website": return "Website";
      case "custom": return "Custom";
    }
  };

  const getPlatformIcon = (platform: SocialLink["platform"]) => {
    switch (platform) {
      case "twitter": return <Twitter size={16} />;
      case "facebook": return <Facebook size={16} />;
      case "instagram": return <Instagram size={16} />;
      case "linkedin": return <Linkedin size={16} />;
      case "website": return <Globe size={16} />;
      case "custom": return <Globe size={16} />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Social Media Links</h3>
        <div className="flex items-center gap-2">
          <select 
            className="text-xs p-1 border rounded"
            value={newPlatform}
            onChange={(e) => setNewPlatform(e.target.value as SocialLink["platform"])}
          >
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="website">Website</option>
            <option value="custom">Custom</option>
          </select>
          <Button 
            type="button" 
            size="sm" 
            variant="outline" 
            className="h-7 px-2 text-xs"
            onClick={addLink}
          >
            <Plus size={12} className="mr-1" /> Add
          </Button>
        </div>
      </div>

      {links.length === 0 ? (
        <div className="text-sm text-muted-foreground text-center py-3 border rounded-md bg-muted/20">
          No social links added yet
        </div>
      ) : (
        <div className="space-y-3">
          {links.map(link => (
            <div key={link.id} className="flex items-start gap-2 p-2 border rounded-md bg-card">
              <div className="mt-2">
                {getPlatformIcon(link.platform)}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium">{getPlatformLabel(link.platform)}</span>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => removeLink(link.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor={`${link.id}-url`} className="text-xs">URL</Label>
                    <Input
                      id={`${link.id}-url`}
                      value={link.url}
                      onChange={(e) => updateLink(link.id, { url: e.target.value })}
                      className="h-7 text-xs"
                      placeholder={`Enter ${link.platform} URL`}
                    />
                  </div>
                  {link.platform === "custom" && (
                    <div>
                      <Label htmlFor={`${link.id}-label`} className="text-xs">Label</Label>
                      <Input
                        id={`${link.id}-label`}
                        value={link.label || ""}
                        onChange={(e) => updateLink(link.id, { label: e.target.value })}
                        className="h-7 text-xs"
                        placeholder="Link label"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pt-2">
        <h4 className="text-xs font-medium mb-2">Preview</h4>
        <div className="flex justify-center gap-3 p-3 border rounded-md bg-muted/20">
          {links.map(link => (
            <a 
              key={link.id}
              href={link.url || "#"} 
              className="text-primary hover:text-primary/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              {getPlatformIcon(link.platform)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}; 