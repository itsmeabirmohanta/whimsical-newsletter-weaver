import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Copy, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';

interface EmailNewsletterTemplateProps {
  previewText?: string;
}

// Get template from localStorage if available
const getTemplateFromStorage = () => {
  try {
    const storedTemplate = localStorage.getItem('newsletter-template');
    return storedTemplate ? JSON.parse(storedTemplate) : null;
  } catch (error) {
    console.error('Error retrieving template from localStorage:', error);
    return null;
  }
};

const EmailNewsletterTemplate: React.FC<EmailNewsletterTemplateProps> = ({
  previewText = "Future Shift Labs Monthly Digest - Envisioning the Future",
}) => {
  const [emailHTML, setEmailHTML] = useState<string>('');
  
  useEffect(() => {
    // Try to get template from storage
    const template = getTemplateFromStorage();
    
    // If we have a template, generate HTML from it
    if (template) {
      import('@/lib/email-generator').then(({ generateEmailHTML }) => {
        const html = generateEmailHTML(template);
        setEmailHTML(html);
      });
    } else {
      // If no template, use a basic one
      setEmailHTML(generateBasicEmailHTML(previewText));
    }
  }, [previewText]);
  
  const handleCopyHTML = () => {
    navigator.clipboard.writeText(emailHTML)
      .then(() => toast.success("HTML copied to clipboard!"))
      .catch(err => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy HTML");
      });
  };
  
  const handleSendTestEmail = () => {
    // This would connect to an email service in a real implementation
    toast.success("In a real application, this would send the newsletter via your email service provider API");
  };
  
  return (
    <AppLayout 
      title="Email Newsletter Preview"
      headerRightContent={
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={handleCopyHTML}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy HTML
          </Button>
          <Button 
            variant="default"
            onClick={handleSendTestEmail}
          >
            <Send className="h-4 w-4 mr-2" />
            Send Test Email
          </Button>
        </div>
      }
    >
      <div className="container py-8">
        <p className="text-sm text-muted-foreground mb-4">
          Below is how your newsletter will appear in email clients. The actual email uses inline styles instead of Tailwind classes for maximum compatibility.
        </p>
        
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="html">HTML Code</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="border border-border rounded-md p-4 overflow-auto max-h-[600px]">
            {/* This is the email preview that shows what will be sent */}
            <div dangerouslySetInnerHTML={{ __html: emailHTML }} />
          </TabsContent>
          
          <TabsContent value="html">
            <Card>
              <CardContent className="p-4">
                <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[400px] text-xs">
                  {emailHTML}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

// This is a fallback HTML generator if there's no template in localStorage
const generateBasicEmailHTML = (previewText: string) => {
  // Email clients hide this text but it shows up in email previews
  const preheaderStyle = `
    display: none;
    font-size: 1px;
    line-height: 1px;
    max-height: 0;
    max-width: 0;
    opacity: 0;
    overflow: hidden;
    mso-hide: all;
    font-family: sans-serif;
  `;

  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Newsletter Template</title>
      <style type="text/css">
        /* Base styles */
        body, table, td, p, a, li, blockquote {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        /* Prevent WebKit and Windows mobile from changing default text sizes */
        table, td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        /* Remove spacing between tables */
        img {
          -ms-interpolation-mode: bicubic;
          border: 0;
        }
        /* Allow smoother rendering of resized images */
        body {
          margin: 0;
          padding: 0;
        }
        /* Reset margins and padding */
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background-color: #f8f9fa; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
      <!-- Preheader text that appears in email clients -->
      <div style="${preheaderStyle}">
        ${previewText}
      </div>
      
      <!-- Email container -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <tr>
          <td style="padding: 20px 0; text-align: center; background-color: #6366f1;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto;">
              <tr>
                <td style="padding: 0 20px;">
                  <!-- Header with logo -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="text-align: center; padding: 10px 0;">
                        <div style="font-size: 24px; font-weight: 600; color: #ffffff;">
                          <span style="margin-right: 5px;">✉️</span> Newsletter Template
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; text-align: center; color: #ffffff;">
                        <span>No template found in storage. Please create one in the Newsletter Builder.</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

export default EmailNewsletterTemplate;
