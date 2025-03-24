
import { NewsletterItem } from '@/pages/NewsletterBuilder';

export const generateEmailHTML = (items: NewsletterItem[]): string => {
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

  // Create email header
  const header = `
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
        Future Shift Labs Monthly Digest - Envisioning the Future
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
  `;

  // Create email footer
  const footer = `
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

  // Generate HTML content for each newsletter item
  let content = '';
  
  items.forEach(item => {
    switch (item.type) {
      case 'heading':
        if (item.content.level === 'h1') {
          content += `
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding: 20px 0; text-align: ${item.content.align || 'center'};">
                  <h1 style="color: #333; font-size: 28px; margin: 0; font-weight: 600;">${item.content.text}</h1>
                </td>
              </tr>
            </table>
          `;
        } else if (item.content.level === 'h2') {
          content += `
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding: 15px 0; text-align: ${item.content.align || 'center'};">
                  <h2 style="color: #333; font-size: 22px; margin: 0; font-weight: 600;">${item.content.text}</h2>
                </td>
              </tr>
            </table>
          `;
        } else {
          content += `
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding: 10px 0; text-align: ${item.content.align || 'center'};">
                  <h3 style="color: #333; font-size: 18px; margin: 0; font-weight: 600;">${item.content.text}</h3>
                </td>
              </tr>
            </table>
          `;
        }
        break;
        
      case 'paragraph':
        content += `
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding: 10px 0; text-align: ${item.content.align || 'left'};">
                <p style="color: #444; font-size: 16px; line-height: 24px; margin: 0;">${item.content.text}</p>
              </td>
            </tr>
          </table>
        `;
        break;
        
      case 'image':
        content += `
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding: 10px 0;">
                <img src="${item.content.url}" alt="${item.content.alt}" width="100%" style="display: block; border: 0;" />
              </td>
            </tr>
          </table>
        `;
        break;
        
      case 'button':
        content += `
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td align="center" style="padding: 15px 0;">
                <table border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="border-radius: 4px; background-color: #6366f1; padding: 12px 24px;">
                      <a href="${item.content.url}" style="font-size: 16px; color: #ffffff; text-decoration: none; display: inline-block;">
                        ${item.content.text}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        `;
        break;
        
      case 'divider':
        content += `
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding: 15px 0;">
                <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 0;" />
              </td>
            </tr>
          </table>
        `;
        break;
        
      case 'spacer':
        content += `
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="height: ${item.content.height}px;"></td>
            </tr>
          </table>
        `;
        break;
        
      case 'featured-article':
        content += `
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; border-collapse: separate; border-spacing: 0; border-radius: 4px; overflow: hidden; border: 1px solid #eaeaea;">
            <tr>
              <td>
                <a href="#" style="text-decoration: none; color: inherit;">
                  <img src="${item.content.image}" alt="${item.content.title}" width="100%" style="display: block; border: 0;" />
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td>
                      <h2 style="color: #333; font-size: 22px; margin: 0 0 10px 0; font-weight: 600;">
                        <a href="#" style="text-decoration: none; color: inherit;">${item.content.title}</a>
                      </h2>
                      <p style="color: #666; font-size: 14px; margin: 0 0 15px 0;">By ${item.content.author} • ${item.content.date}</p>
                      <p style="color: #444; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                        ${item.content.excerpt}
                      </p>
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center">
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="border-radius: 4px; background-color: #6366f1; padding: 8px 16px;">
                                  <a href="#" style="font-size: 14px; color: #ffffff; text-decoration: none; display: inline-block;">
                                    ${item.content.cta} →
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
        `;
        break;
        
      case 'article-grid':
        content += `
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr valign="top">
        `;
        
        item.content.articles.forEach((article: any, index: number) => {
          content += `
            <td width="48%" style="padding: ${index === 0 ? '0 2% 20px 0' : '0 0 20px 2%'};">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #eaeaea; border-radius: 6px; overflow: hidden;">
                <tr>
                  <td>
                    <a href="#" style="text-decoration: none; color: inherit;">
                      <img src="${article.image}" alt="${article.title}" width="100%" style="display: block; border: 0; border-radius: 4px 4px 0 0;" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px;">
                    <h3 style="color: #333; font-size: 18px; margin: 0 0 8px 0; font-weight: 600;">
                      <a href="#" style="text-decoration: none; color: inherit;">${article.title}</a>
                    </h3>
                    <p style="color: #666; font-size: 14px; margin: 0 0 10px 0; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">By ${article.author}</p>
                    <p style="color: #444; font-size: 15px; line-height: 22px; margin: 0 0 15px 0;">
                      ${article.excerpt}
                    </p>
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
          `;
        });
        
        content += `
            </tr>
          </table>
        `;
        break;
        
      default:
        content += `<!-- Unknown block type: ${item.type} -->`;
    }
  });

  // Combine all HTML parts
  return `${header}${content}${footer}`;
};
