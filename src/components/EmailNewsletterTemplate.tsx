
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';

interface EmailNewsletterTemplateProps {
  previewText?: string;
}

const EmailNewsletterTemplate: React.FC<EmailNewsletterTemplateProps> = ({
  previewText = "Future Shift Labs Monthly Digest - Envisioning the Future",
}) => {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-medium mb-6">Email Newsletter Preview</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Below is how your newsletter will appear in email clients. The actual email will use inline styles instead of Tailwind classes for maximum compatibility.
      </p>
      
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="html">HTML Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="border border-border rounded-md p-4 overflow-auto max-h-[600px]">
          {/* This is the email preview that shows what will be sent */}
          <div dangerouslySetInnerHTML={{ __html: generateEmailHTML(previewText) }} />
        </TabsContent>
        
        <TabsContent value="html">
          <Card>
            <CardContent className="p-4">
              <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[400px] text-xs">
                {generateEmailHTML(previewText)}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 flex justify-end gap-2">
        <Button 
          variant="outline"
          onClick={() => {
            // Copy to clipboard functionality
            const emailHTML = generateEmailHTML(previewText);
            navigator.clipboard.writeText(emailHTML)
              .then(() => alert("HTML copied to clipboard!"))
              .catch(err => console.error("Could not copy text: ", err));
          }}
        >
          Copy HTML
        </Button>
        <Button 
          variant="default"
          onClick={() => {
            // This would connect to your email service in a real implementation
            alert("In a real application, this would send the newsletter via your email service provider API");
          }}
        >
          Send Test Email
        </Button>
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
      <title>Future Shift Labs Monthly Digest</title>
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
                          <span style="margin-right: 5px;">✉️</span> Future Shift Labs
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; text-align: center; color: #ffffff;">
                        <span>Monthly Digest | May 2024</span>
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
                  <h1 style="color: #333; font-size: 28px; margin: 0 0 15px 0; font-weight: 600;">We have a surprise!</h1>
                  <p style="color: #6366f1; font-size: 18px; line-height: 24px; margin: 0 0 20px 0; font-weight: 500;">
                    ENVISIONING THE FUTURE.
                  </p>
                </td>
              </tr>
            </table>
            
            <!-- Featured article: AI and the 2024 Elections -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; border-collapse: separate; border-spacing: 0; border-radius: 4px; overflow: hidden; border: 1px solid #eaeaea;">
              <tr>
                <td>
                  <a href="#" style="text-decoration: none; color: inherit;">
                    <img src="https://images.unsplash.com/photo-1635032730510-05feceacc9e5?auto=format&fit=crop&w=1200&q=80" alt="AI and Elections" width="100%" style="display: block; border: 0;" />
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td>
                        <h2 style="color: #333; font-size: 22px; margin: 0 0 10px 0; font-weight: 600;">
                          <a href="#" style="text-decoration: none; color: inherit;">AI and the 2024 Elections: A Policy Perspective</a>
                        </h2>
                        <p style="color: #666; font-size: 14px; margin: 0 0 15px 0;">By Alisha Butala • May 15, 2024</p>
                        <p style="color: #444; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                          Based on insights from the policy paper THE PERVASIVE INFLUENCE OF A.I ON GLOBAL POLITICAL CAMPAIGNS IN 2024, published by Future Shift Labs.
                        </p>
                        <p style="color: #444; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                          The 2024 elections were a turning point for global democracy, with nearly 74 countries heading to the polls. AI played a more significant role than ever before, influencing everything from political campaigns to public perception. While its use is still in the early stages, AI is already making waves—both positively and negatively—through targeted campaigning, deepfake content, and misinformation.
                        </p>
                        <h3 style="color: #333; font-size: 18px; margin: 20px 0 10px 0; font-weight: 600;">Key Takeaways</h3>
                        <ul style="color: #444; font-size: 16px; line-height: 24px; margin: 0 0 20px 0; padding-left: 20px;">
                          <li style="margin-bottom: 5px;">AI transformed political campaigns, changing how candidates reached voters.</li>
                          <li style="margin-bottom: 5px;">Different countries adopted AI in diverse ways to suit their electoral needs.</li>
                          <li style="margin-bottom: 5px;">Generative AI was both a useful campaign tool and a source of misinformation.</li>
                          <li style="margin-bottom: 5px;">Russia leveraged AI for foreign influence and disinformation efforts.</li>
                          <li style="margin-bottom: 5px;">Legal frameworks struggled to keep pace with AI's rapid advancements.</li>
                        </ul>
                        
                        <!-- AI Transparency section integrated with main article -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 4px;">
                          <tr>
                            <td>
                              <h3 style="color: #333; font-size: 18px; margin: 0 0 10px 0; font-weight: 600;">Why AI Transparency Matters</h3>
                              <p style="color: #444; font-size: 15px; line-height: 22px; margin: 0;">
                                One of the biggest concerns surrounding AI in elections is the lack of transparency. AI-driven campaigns can personalize messages and target specific demographics, but without clear oversight, these tools risk being used to manipulate voters. Establishing transparency standards can ensure AI is used responsibly and does not erode trust in democratic processes.
                              </p>
                            </td>
                          </tr>
                        </table>
                        
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 20px 0; padding: 15px; background-color: #f0f0f5; border-radius: 4px;">
                          <tr>
                            <td>
                              <h3 style="color: #333; font-size: 18px; margin: 0 0 10px 0; font-weight: 600;">The Need for Global AI Regulations</h3>
                              <p style="color: #444; font-size: 15px; line-height: 22px; margin: 0;">
                                As AI increasingly influences elections worldwide, international cooperation is essential. Countries must work together to set guidelines on ethical AI use in politics, curb election interference, and develop safeguards against AI-driven disinformation campaigns. A unified global effort can help maintain fair and transparent elections in the digital age.
                              </p>
                            </td>
                          </tr>
                        </table>
                        
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td align="center">
                              <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="border-radius: 4px; background-color: #6366f1; padding: 8px 16px;">
                                    <a href="#" style="font-size: 14px; color: #ffffff; text-decoration: none; display: inline-block;">
                                      Continue reading →
                                    </a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            
            <!-- Global Elections & AI Tracker Section -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; background-color: #f0f5ff; border-radius: 8px; overflow: hidden;">
              <tr>
                <td style="padding: 0;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td valign="middle" width="50%" style="padding: 20px;">
                        <img src="/lovable-uploads/255a2735-5d6f-412d-b5f1-a95b69886e73.png" alt="Global Elections & AI Tracker" style="max-width: 100%; height: auto; display: block; border-radius: 8px;" />
                      </td>
                      <td valign="middle" width="50%" style="padding: 20px;">
                        <h2 style="color: #111827; font-size: 28px; font-weight: 700; margin: 0 0 15px 0; line-height: 1.2;">Checkout Our Global Elections & AI Tracker</h2>
                        <p style="color: #4B5563; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">
                          Monitor election trends and AI's impact on political campaigns in real-time with our interactive dashboard.
                        </p>
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="background-color: #0066ff; border-radius: 50px; padding: 0;">
                              <a href="#" style="color: #FFFFFF; display: block; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 500; line-height: 1.2; padding: 12px 24px; text-decoration: none; text-align: center;">
                                <table border="0" cellpadding="0" cellspacing="0" style="display: inline-block; vertical-align: middle;">
                                  <tr>
                                    <td style="padding-right: 8px;">Visit Website</td>
                                    <td>
                                      <img src="https://cdn-icons-png.flaticon.com/512/9131/9131526.png" alt="Arrow" width="16" height="16" style="display: block;" />
                                    </td>
                                  </tr>
                                </table>
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            
            <!-- Op-Ed section title -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
              <tr>
                <td style="padding-bottom: 15px; border-bottom: 3px solid #6366f1;">
                  <h2 style="color: #333; font-size: 22px; margin: 0; font-weight: 600;">Latest Op-Eds</h2>
                </td>
              </tr>
            </table>
            
            <!-- Op-Ed articles - improved layout -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr valign="top">
                <!-- First article - India's AI Boom -->
                <td width="48%" style="padding: 0 2% 20px 0;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #eaeaea; border-radius: 6px; overflow: hidden;">
                    <tr>
                      <td>
                        <a href="#" style="text-decoration: none; color: inherit;">
                          <img src="https://images.unsplash.com/photo-1598965402089-897e8f3f1c70?auto=format&fit=crop&w=800&q=80" alt="India's AI Boom" width="100%" style="display: block; border: 0; border-radius: 4px 4px 0 0;" />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 16px;">
                        <h3 style="color: #333; font-size: 18px; margin: 0 0 8px 0; font-weight: 600;">
                          <a href="#" style="text-decoration: none; color: inherit;">India's AI Boom: A Moment of Opportunity and Challenge</a>
                        </h3>
                        <p style="color: #666; font-size: 14px; margin: 0 0 10px 0; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">By Alisha Butala • 6 min read</p>
                        <p style="color: #444; font-size: 15px; line-height: 22px; margin: 0 0 15px 0;">
                          As India advances in artificial intelligence, the country faces a dual challenge: harnessing AI for economic growth while protecting its workforce from exploitation. Government initiatives like Digital India are driving technological innovation, but global tech giants are extracting vast amounts of data and leveraging India's low-cost labor without fair compensation.
                        </p>
                        
                        <!-- Combating AI-Generated Misinformation integrated with first op-ed -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 10px 0 15px 0; padding: 12px; background-color: #f0f0f5; border-radius: 4px;">
                          <tr>
                            <td>
                              <h4 style="color: #333; font-size: 15px; margin: 0 0 8px 0; font-weight: 600;">Combating AI-Generated Misinformation</h4>
                              <p style="color: #444; font-size: 14px; line-height: 20px; margin: 0;">
                                The rise of AI-powered disinformation highlights the need for stronger media literacy, especially in rapidly developing markets like India. Misinformation spreads fast, and many voters may struggle to differentiate between real and AI-generated content.
                              </p>
                            </td>
                          </tr>
                        </table>
                        
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 10px;">
                          <tr>
                            <td align="center">
                              <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="border-radius: 4px; background-color: #6366f1; padding: 8px 16px;">
                                    <a href="#" style="font-size: 14px; color: #ffffff; text-decoration: none; display: inline-block;">
                                      Continue reading →
                                    </a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
                
                <!-- Second article - EU's Bold Regulatory Stand -->
                <td width="48%" style="padding: 0 0 20px 2%;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #eaeaea; border-radius: 6px; overflow: hidden;">
                    <tr>
                      <td>
                        <a href="#" style="text-decoration: none; color: inherit;">
                          <img src="https://images.unsplash.com/photo-1569396116180-210c182bedb8?auto=format&fit=crop&w=800&q=80" alt="EU's Bold Regulatory Stand" width="100%" style="display: block; border: 0; border-radius: 4px 4px 0 0;" />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 16px;">
                        <h3 style="color: #333; font-size: 18px; margin: 0 0 8px 0; font-weight: 600;">
                          <a href="#" style="text-decoration: none; color: inherit;">AI's Double-Edged Sword: The EU's Bold Regulatory Stand</a>
                        </h3>
                        <p style="color: #666; font-size: 14px; margin: 0 0 10px 0; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">By Parishrut Jassal • 5 min read</p>
                        <p style="color: #444; font-size: 15px; line-height: 22px; margin: 0 0 15px 0;">
                          In an era when artificial intelligence is rewriting the rules of business, governance, and daily life, the European Union is boldly stepping in to ensure that technological innovation does not come at the expense of our fundamental rights. As AI systems revolutionize industries from healthcare to finance, they also raise serious concerns.
                        </p>
                        
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 10px 0 15px 0; padding: 12px; background-color: #f8f9fa; border-radius: 4px;">
                          <tr>
                            <td>
                              <h4 style="color: #333; font-size: 15px; margin: 0 0 8px 0; font-weight: 600;">The Global Kaleidoscope</h4>
                              <p style="color: #444; font-size: 14px; line-height: 20px; margin: 0;">
                                According to a Reuters report, the new guidelines also cover the misuse of AI by employers, websites, and law enforcement. For instance, employers are now banned from using AI to monitor employees' emotions via webcams or voice recognition systems.
                              </p>
                            </td>
                          </tr>
                        </table>
                        
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 10px;">
                          <tr>
                            <td align="center">
                              <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="border-radius: 4px; background-color: #6366f1; padding: 8px 16px;">
                                    <a href="#" style="font-size: 14px; color: #ffffff; text-decoration: none; display: inline-block;">
                                      Continue reading →
                                    </a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            
            <!-- Newsletter signup -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 30px 0; background-color: #6366f1; border-radius: 8px;">
              <tr>
                <td style="padding: 25px; text-align: center;">
                  <h3 style="color: white; font-size: 20px; margin: 0 0 15px 0; font-weight: 500;">Stay Updated with Future Shift Labs</h3>
                  <p style="color: white; font-size: 15px; line-height: 22px; margin: 0 0 20px 0;">
                    Join our community of forward-thinkers and get exclusive insights on AI policy, governance, and ethical technologies.
                  </p>
                  <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                    <tr>
                      <td style="border-radius: 4px; background-color: white;">
                        <a href="#" style="border: 0; display: inline-block; padding: 12px 24px; font-size: 16px; color: #6366f1; text-decoration: none; border-radius: 4px; font-weight: 500;">
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
          <td style="padding: 20px; background-color: #1a1f2c; text-align: center;">
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
                <td style="padding: 15px 0; color: #9b87f5; font-size: 14px; line-height: 21px;">
                  <p style="margin: 0 0 10px 0;">© 2024 Future Shift Labs. All rights reserved.</p>
                  <p style="margin: 0; color: #8E9196;">
                    You received this email because you subscribed to Future Shift Labs Newsletter.<br />
                    <a href="#" style="color: #9b87f5; text-decoration: none;">Unsubscribe</a> or 
                    <a href="#" style="color: #9b87f5; text-decoration: none;">manage your preferences</a>
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
