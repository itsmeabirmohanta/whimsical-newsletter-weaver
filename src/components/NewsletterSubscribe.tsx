import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface SubscribeFormData {
  title: string;
  description: string;
  buttonText: string;
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
}

interface NewsletterSubscribeProps {
  formData: SubscribeFormData;
  onChange: (data: Partial<SubscribeFormData>) => void;
}

export const NewsletterSubscribe: React.FC<NewsletterSubscribeProps> = ({
  formData,
  onChange
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Stay Updated with Our Newsletter"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="buttonText" className="text-sm font-medium">
            Button Text
          </Label>
          <Input
            id="buttonText"
            name="buttonText"
            value={formData.buttonText}
            onChange={handleChange}
            placeholder="Subscribe Now"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Join our community of forward-thinkers and get exclusive insights on AI, policy, governance, and digital technologies."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="backgroundColor" className="text-sm font-medium">
            Background Color
          </Label>
          <div className="flex gap-2">
            <Input
              type="color"
              id="backgroundColor"
              name="backgroundColor"
              value={formData.backgroundColor}
              onChange={handleChange}
              className="w-12 h-10 p-1"
            />
            <Input
              type="text"
              name="backgroundColor"
              value={formData.backgroundColor}
              onChange={handleChange}
              className="flex-1"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="textColor" className="text-sm font-medium">
            Text Color
          </Label>
          <div className="flex gap-2">
            <Input
              type="color"
              id="textColor"
              name="textColor"
              value={formData.textColor}
              onChange={handleChange}
              className="w-12 h-10 p-1"
            />
            <Input
              type="text"
              name="textColor"
              value={formData.textColor}
              onChange={handleChange}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="buttonColor" className="text-sm font-medium">
            Button Color
          </Label>
          <div className="flex gap-2">
            <Input
              type="color"
              id="buttonColor"
              name="buttonColor"
              value={formData.buttonColor}
              onChange={handleChange}
              className="w-12 h-10 p-1"
            />
            <Input
              type="text"
              name="buttonColor"
              value={formData.buttonColor}
              onChange={handleChange}
              className="flex-1"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="buttonTextColor" className="text-sm font-medium">
            Button Text Color
          </Label>
          <div className="flex gap-2">
            <Input
              type="color"
              id="buttonTextColor"
              name="buttonTextColor"
              value={formData.buttonTextColor}
              onChange={handleChange}
              className="w-12 h-10 p-1"
            />
            <Input
              type="text"
              name="buttonTextColor"
              value={formData.buttonTextColor}
              onChange={handleChange}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-medium mb-3">Preview</h4>
        <div
          className="border rounded-lg p-6 flex flex-col items-center text-center"
          style={{
            backgroundColor: formData.backgroundColor,
            color: formData.textColor
          }}
        >
          <h3 className="text-xl font-bold mb-3">{formData.title}</h3>
          <p className="mb-4">{formData.description}</p>
          <div className="flex items-center gap-2 w-full max-w-md">
            <Input
              className="flex-1 bg-white border-white"
              placeholder="Your email address"
              disabled
            />
            <Button
              style={{
                backgroundColor: formData.buttonColor,
                color: formData.buttonTextColor
              }}
            >
              {formData.buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 