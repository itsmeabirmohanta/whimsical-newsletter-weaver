
import React from 'react';

interface EmailNewsletterTemplateProps {
  previewText?: string;
}

const EmailNewsletterTemplate: React.FC<EmailNewsletterTemplateProps> = ({
  previewText = "Modern Digest Newsletter - Weekly updates and insights",
}) => {
  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-medium mb-6">Email Newsletter Preview</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Below is how your newsletter will appear in email clients. The actual email will use inline styles instead of Tailwind classes for maximum compatibility.
      </p>
      
      <div className="border border-border rounded-md p-4 overflow-auto max-h-[600px]">
        {/* This is the email preview that shows what will be sent */}
        <div dangerouslySetInnerHTML={{ __html: generateEmailHTML(previewText) }} />
      </div>
      
      <div className="mt-6 flex justify-end">
        <button 
          className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90 transition-opacity"
          onClick={() => {
            // This would connect to your email service in a real implementation
            alert("In a real application, this would send the newsletter via your email service provider API");
          }}
        >
          Send Test Email
        </button>
      </div>
    </div>
  );
};

// This function generates the actual HTML email content with inline styles
const generateEmailHTML = (previewText: string) => {
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
      <title>Modern Digest</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background-color: #f8f9fa; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
      <!-- Preheader text that appears in email clients -->
      <div style="${preheaderStyle}">
        ${previewText}
      </div>
      
      <!-- Email container -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <tr>
          <td style="padding: 20px 0; text-align: center; background-color: #f0f0f5;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto;">
              <tr>
                <td style="padding: 0 20px;">
                  <!-- Header with logo -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="text-align: center; padding: 10px 0;">
                        <div style="font-size: 24px; font-weight: 600; color: #333;">
                          <span style="color: #6366f1; margin-right: 5px;">✉️</span> Modern Digest
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; text-align: center; color: #666;">
                        <span>Weekly Newsletter | May 2023</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        
        <!-- Main content area -->
        <tr>
          <td style="padding: 20px;">
            <!-- Hero section -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding: 20px 0; text-align: center;">
                  <h1 style="color: #333; font-size: 28px; margin: 0 0 15px 0; font-weight: 600;">The Intersection of Technology and Everyday Life</h1>
                  <p style="color: #666; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                    In an increasingly connected world, we explore how technology is reshaping our daily experiences.
                  </p>
                </td>
              </tr>
            </table>
            
            <!-- Featured article -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; border-collapse: separate; border-spacing: 0; border-radius: 4px; overflow: hidden; border: 1px solid #eaeaea;">
              <tr>
                <td>
                  <a href="#" style="text-decoration: none; color: inherit;">
                    <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80" alt="Featured Article" width="100%" style="display: block; border: 0;" />
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td>
                        <h2 style="color: #333; font-size: 22px; margin: 0 0 10px 0; font-weight: 600;">
                          <a href="#" style="text-decoration: none; color: inherit;">The Future of Remote Work</a>
                        </h2>
                        <p style="color: #666; font-size: 14px; margin: 0 0 15px 0;">May 15, 2023 • 8 min read</p>
                        <p style="color: #444; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                          How companies are adapting to distributed teams and the tools making remote collaboration possible in the post-pandemic workplace.
                        </p>
                        <a href="#" style="display: inline-block; color: #6366f1; font-weight: 500; text-decoration: none;">
                          Continue reading →
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            
            <!-- Article grid - two column layout -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
              <tr>
                <td style="padding-bottom: 15px;">
                  <h2 style="color: #333; font-size: 22px; margin: 0; font-weight: 600;">Latest Articles</h2>
                </td>
              </tr>
              <!-- First row of articles -->
              <tr>
                <td>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr valign="top">
                      <!-- First article -->
                      <td width="48%" style="padding: 0 2% 20px 0;">
                        <a href="#" style="text-decoration: none; color: inherit;">
                          <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" alt="Article" width="100%" style="display: block; border: 0; border-radius: 4px; margin-bottom: 10px;" />
                        </a>
                        <h3 style="color: #333; font-size: 18px; margin: 10px 0 5px 0; font-weight: 500;">
                          <a href="#" style="text-decoration: none; color: inherit;">Sustainable Living in Modern Cities</a>
                        </h3>
                        <p style="color: #666; font-size: 14px; margin: 0 0 5px 0;">Lifestyle • 4 min read</p>
                        <p style="color: #444; font-size: 15px; line-height: 22px; margin: 0 0 10px 0;">
                          Urban innovations that are making our cities greener and more livable.
                        </p>
                      </td>
                      
                      <!-- Second article -->
                      <td width="48%" style="padding: 0 0 20px 2%;">
                        <a href="#" style="text-decoration: none; color: inherit;">
                          <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80" alt="Article" width="100%" style="display: block; border: 0; border-radius: 4px; margin-bottom: 10px;" />
                        </a>
                        <h3 style="color: #333; font-size: 18px; margin: 10px 0 5px 0; font-weight: 500;">
                          <a href="#" style="text-decoration: none; color: inherit;">AI and the Creative Process</a>
                        </h3>
                        <p style="color: #666; font-size: 14px; margin: 0 0 5px 0;">Technology • 6 min read</p>
                        <p style="color: #444; font-size: 15px; line-height: 22px; margin: 0 0 10px 0;">
                          How artificial intelligence is transforming art, music, and literature.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Second row of articles -->
              <tr>
                <td>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr valign="top">
                      <!-- Third article -->
                      <td width="48%" style="padding: 0 2% 20px 0;">
                        <a href="#" style="text-decoration: none; color: inherit;">
                          <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80" alt="Article" width="100%" style="display: block; border: 0; border-radius: 4px; margin-bottom: 10px;" />
                        </a>
                        <h3 style="color: #333; font-size: 18px; margin: 10px 0 5px 0; font-weight: 500;">
                          <a href="#" style="text-decoration: none; color: inherit;">The Science of Productivity</a>
                        </h3>
                        <p style="color: #666; font-size: 14px; margin: 0 0 5px 0;">Health • 3 min read</p>
                        <p style="color: #444; font-size: 15px; line-height: 22px; margin: 0 0 10px 0;">
                          Research-backed strategies to get more done with less stress.
                        </p>
                      </td>
                      
                      <!-- Fourth article -->
                      <td width="48%" style="padding: 0 0 20px 2%;">
                        <a href="#" style="text-decoration: none; color: inherit;">
                          <img src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80" alt="Article" width="100%" style="display: block; border: 0; border-radius: 4px; margin-bottom: 10px;" />
                        </a>
                        <h3 style="color: #333; font-size: 18px; margin: 10px 0 5px 0; font-weight: 500;">
                          <a href="#" style="text-decoration: none; color: inherit;">Emerging Food Trends</a>
                        </h3>
                        <p style="color: #666; font-size: 14px; margin: 0 0 5px 0;">Food • 4 min read</p>
                        <p style="color: #444; font-size: 15px; line-height: 22px; margin: 0 0 10px 0;">
                          The flavors, ingredients, and cooking methods gaining popularity.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            
            <!-- Newsletter signup -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 30px 0; background-color: #f8f9fa; border-radius: 4px;">
              <tr>
                <td style="padding: 25px; text-align: center;">
                  <h3 style="color: #333; font-size: 20px; margin: 0 0 15px 0; font-weight: 500;">Stay Updated</h3>
                  <p style="color: #666; font-size: 15px; line-height: 22px; margin: 0 0 20px 0;">
                    Join our community of readers and get exclusive content delivered straight to your inbox.
                  </p>
                  <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                    <tr>
                      <td style="border-radius: 4px; background-color: #6366f1;">
                        <a href="#" style="border: 0; display: inline-block; padding: 12px 24px; font-size: 16px; color: white; text-decoration: none; border-radius: 4px; font-weight: 500;">
                          Subscribe Now
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        
        <!-- Footer -->
        <tr>
          <td style="padding: 20px; background-color: #f0f0f5; text-align: center;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding: 10px 0;">
                  <!-- Social links -->
                  <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                    <tr>
                      <td style="padding: 0 8px;">
                        <a href="#" style="text-decoration: none; color: #666;">
                          <img src="https://cdn-icons-png.flaticon.com/128/733/733547.png" alt="Facebook" width="24" height="24" style="display: block; border: 0;" />
                        </a>
                      </td>
                      <td style="padding: 0 8px;">
                        <a href="#" style="text-decoration: none; color: #666;">
                          <img src="https://cdn-icons-png.flaticon.com/128/3256/3256013.png" alt="Twitter" width="24" height="24" style="display: block; border: 0;" />
                        </a>
                      </td>
                      <td style="padding: 0 8px;">
                        <a href="#" style="text-decoration: none; color: #666;">
                          <img src="https://cdn-icons-png.flaticon.com/128/1384/1384063.png" alt="Instagram" width="24" height="24" style="display: block; border: 0;" />
                        </a>
                      </td>
                      <td style="padding: 0 8px;">
                        <a href="#" style="text-decoration: none; color: #666;">
                          <img src="https://cdn-icons-png.flaticon.com/128/3536/3536505.png" alt="LinkedIn" width="24" height="24" style="display: block; border: 0;" />
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px 0; color: #666; font-size: 14px; line-height: 21px;">
                  <p style="margin: 0 0 10px 0;">© 2023 Modern Digest. All rights reserved.</p>
                  <p style="margin: 0;">
                    You received this email because you subscribed to Modern Digest Newsletter.<br />
                    <a href="#" style="color: #6366f1; text-decoration: none;">Unsubscribe</a> or 
                    <a href="#" style="color: #6366f1; text-decoration: none;">manage your preferences</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      
      <!-- Email client support message -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto;">
        <tr>
          <td style="padding: 10px; text-align: center; color: #999; font-size: 12px;">
            If you can't see this email properly, <a href="#" style="color: #6366f1; text-decoration: none;">view it in your browser</a>.
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

export default EmailNewsletterTemplate;
