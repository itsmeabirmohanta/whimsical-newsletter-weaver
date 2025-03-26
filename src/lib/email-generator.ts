import { NewsletterItem } from '@/pages/NewsletterBuilder';

// Add types for quiz data
interface QuizOption {
  text: string;
  isCorrect: boolean;
}

interface Quiz {
  question: string;
  image?: string;
  options: QuizOption[];
}

export const generateEmailHTML = (
  items: NewsletterItem[], 
  containerBackground: string = '#ffffff',
  containerTextColor: string = '#333333', 
  globalLinkColor: string = '#8b5cf6'
): string => {
  const styles = `
    /* Base styles */
    body {
      font-family: Arial, Helvetica, sans-serif;
      margin: 0;
      padding: 0;
      color: ${containerTextColor};
      line-height: 1.6;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    .newsletter-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: ${containerBackground};
      color: ${containerTextColor};
    }
    h1, h2, h3, h4, h5, h6 {
      margin-top: 0;
      margin-bottom: 10px;
      color: ${containerTextColor};
      line-height: 1.4;
    }
    h1 {
      font-size: 24px;
    }
    h2 {
      font-size: 20px;
    }
    h3 {
      font-size: 18px;
    }
    h4 {
      font-size: 16px;
    }
    p {
      margin-top: 0;
      margin-bottom: 16px;
    }
    img {
      max-width: 100%;
      height: auto;
      display: block;
      border: 0;
      -ms-interpolation-mode: bicubic;
    }
    a {
      color: ${globalLinkColor};
      text-decoration: none;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: ${globalLinkColor};
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      text-align: center;
      mso-padding-alt: 0;
      mso-text-raise: 15pt;
    }
    .divider {
      border-top: 1px solid #e5e7eb;
      margin: 20px 0;
      height: 1px;
      width: 100%;
    }
    .featured-article {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 20px;
    }
    .featured-article img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
    .featured-article-content {
      padding: 20px;
    }
    .featured-article-title {
      font-size: 18px;
      font-weight: bold;
      margin-top: 0;
      margin-bottom: 8px;
    }
    .featured-article-meta {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 12px;
    }
    .article-grid {
      width: 100%;
      border-collapse: separate;
      border-spacing: 10px;
      margin: 0 0 20px 0;
      padding: 0;
    }
    .article-grid-item {
      width: 50%;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
      vertical-align: top;
    }
    .article-grid-item img {
      width: 100%;
      height: 120px;
      object-fit: cover;
    }
    .article-grid-content {
      padding: 16px;
    }
    .article-grid-title {
      font-size: 16px;
      font-weight: bold;
      margin-top: 0;
      margin-bottom: 6px;
    }
    .article-grid-meta {
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 6px;
    }
    .compartment-block {
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .text-center {
      text-align: center;
    }
    .text-left {
      text-align: left;
    }
    .text-right {
      text-align: right;
    }
    .custom-bg {
      background-color: var(--bg-color, transparent);
    }
    .custom-text {
      color: var(--text-color, inherit);
    }
    .custom-button {
      background-color: var(--button-color, #8b5cf6) !important;
      color: var(--button-text-color, #ffffff) !important;
    }
    .custom-border {
      border-color: var(--border-color, #e5e7eb) !important;
    }
    .newsletter-header {
      padding: 20px;
      margin-bottom: 20px;
      text-align: center;
    }
    .newsletter-footer {
      padding: 20px;
      text-align: center;
      margin-top: 30px;
      border-top: 1px solid var(--border-color, #e9ecef);
    }
    .custom-background-image {
      background-size: cover !important;
      background-position: center !important;
      background-repeat: no-repeat !important;
    }
    .custom-padding {
      padding: var(--padding, 16px) !important;
    }
    .custom-border-radius {
      border-radius: var(--border-radius, 0) !important;
    }
    .custom-border-width {
      border-width: var(--border-width, 1px) !important;
      border-style: solid !important;
    }
    
    /* MSO/Outlook-specific fixes */
    table {
      border-collapse: separate;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    table td {
      border-collapse: collapse;
    }
    
    /* Component-specific styles */
    .event-container {
      padding: 16px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .event-container:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .quiz-option {
      margin-bottom: 10px;
      display: flex;
    }
    .option-dot {
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 1px solid;
      vertical-align: middle;
      margin-right: 8px;
    }
    .subscribe-container {
      max-width: 400px;
      margin: 0 auto;
    }
    .subscribe-input {
      width: 100%;
      padding: 10px;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
      margin-bottom: 10px;
    }
    .testimonial-quote {
      font-size: 24px;
      margin-bottom: 16px;
    }
    .testimonial-text {
      font-style: italic;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .testimonial-image {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin: 0 auto 10px;
      display: block;
      object-fit: cover;
    }
    .products-grid {
      width: 100%;
      border-collapse: separate;
      border-spacing: 10px;
    }
    .product-item {
      width: 50%;
      vertical-align: top;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
    }
    .product-image-container {
      height: 140px;
      overflow: hidden;
    }
    .product-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .product-content {
      padding: 16px;
    }
  `;

  const renderItem = (item: NewsletterItem): string => {
    // Create inline styles for the component
    let inlineStyles = '';
    
    if (item.style) {
      // Handle background properties in priority order
      if (item.style.backgroundImage) {
        inlineStyles += `background-image: url('${item.style.backgroundImage}'); background-size: cover; background-position: center;`;
      } else if (item.style.backgroundGradient) {
        inlineStyles += `background-image: ${item.style.backgroundGradient};`;
      } else if (item.style.backgroundColor) {
        // If we have opacity, convert to rgba
        if (item.style.backgroundOpacity !== undefined && item.style.backgroundOpacity < 1) {
          if (item.style.backgroundColor.startsWith('#')) {
            const hex = item.style.backgroundColor.slice(1);
            const r = parseInt(hex.slice(0, 2), 16);
            const g = parseInt(hex.slice(2, 4), 16);
            const b = parseInt(hex.slice(4, 6), 16);
            inlineStyles += `background-color: rgba(${r}, ${g}, ${b}, ${item.style.backgroundOpacity});`;
          } else if (item.style.backgroundColor.startsWith('rgb(')) {
            // Convert rgb to rgba
            const rgb = item.style.backgroundColor.slice(4, -1).split(',').map(n => n.trim());
            inlineStyles += `background-color: rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${item.style.backgroundOpacity});`;
          } else {
            inlineStyles += `background-color: ${item.style.backgroundColor};`;
          }
        } else {
          inlineStyles += `background-color: ${item.style.backgroundColor};`;
        }
      }
      
      // Text color
      if (item.style.textColor) {
        inlineStyles += `color: ${item.style.textColor};`;
      }
      
      // Border styles
      if (item.style.borderColor) {
        inlineStyles += `border-color: ${item.style.borderColor};`;
      }
      
      if (item.style.borderWidth && item.style.borderWidth !== '0') {
        inlineStyles += `border-width: ${item.style.borderWidth}; border-style: solid;`;
      }
      
      if (item.style.borderRadius) {
        inlineStyles += `border-radius: ${item.style.borderRadius};`;
      }
      
      if (item.style.padding) {
        inlineStyles += `padding: ${item.style.padding};`;
      }
    }
    
    const customStyles = item.style ? 
      `style="
        ${item.style.backgroundColor ? `--bg-color: ${item.style.backgroundColor};` : ''}
        ${item.style.textColor ? `--text-color: ${item.style.textColor};` : ''}
        ${item.style.buttonColor ? `--button-color: ${item.style.buttonColor};` : ''}
        ${item.style.buttonTextColor ? `--button-text-color: ${item.style.buttonTextColor};` : ''}
        ${item.style.borderColor ? `--border-color: ${item.style.borderColor};` : ''}
        ${item.style.borderRadius ? `--border-radius: ${item.style.borderRadius};` : ''}
        ${item.style.borderWidth ? `--border-width: ${item.style.borderWidth};` : ''}
        ${item.style.padding ? `--padding: ${item.style.padding};` : ''}
        ${inlineStyles}
      "` : '';
    
    const customClasses = `
      ${item.style?.backgroundColor ? 'custom-bg' : ''} 
      ${item.style?.textColor ? 'custom-text' : ''}
      ${item.style?.backgroundImage ? 'custom-background-image' : ''}
      ${item.style?.borderRadius ? 'custom-border-radius' : ''}
      ${item.style?.borderWidth && item.style.borderWidth !== '0' ? 'custom-border-width' : ''}
      ${item.style?.padding ? 'custom-padding' : ''}
    `.trim();

    // Define interface for socialLinks to avoid 'any' type
    interface SocialLink {
      platform: string;
      url: string;
    }

    switch (item.type) {
      case 'header':
        return `
          <div class="newsletter-header ${customClasses} text-${item.content.align || 'center'}" ${customStyles}>
            ${item.content.logoUrl ? `<img src="${item.content.logoUrl}" alt="${item.content.logoAlt || item.content.companyName || 'Logo'}" style="max-height: 60px; margin: 0 auto 10px; display: block;">` : ''}
            ${item.content.companyName ? `<h1 style="font-size: 24px; font-weight: bold; margin: 0;">${item.content.companyName}</h1>` : ''}
            ${item.content.tagline ? `<p style="font-size: 14px; margin: 5px 0 0;">${item.content.tagline}</p>` : ''}
          </div>
        `;
      
      case 'footer':
        return `
          <div class="newsletter-footer ${customClasses} ${item.style?.borderColor ? 'custom-border' : ''}" ${customStyles}>
            ${item.content.companyName ? `<div style="font-weight: bold; margin-bottom: 5px;">${item.content.companyName}</div>` : ''}
            ${item.content.address ? `<div style="font-size: 12px; margin-bottom: 5px;">${item.content.address}</div>` : ''}
            
            ${item.content.socialLinks && item.content.socialLinks.length > 0 ? `
              <div style="margin: 15px 0;">
                ${(item.content.socialLinks as SocialLink[]).map((link: SocialLink) => `
                  <a href="${link.url}" style="color: ${item.style?.buttonColor || '#8b5cf6'}; text-decoration: none; margin: 0 5px; font-size: 12px;">${link.platform}</a>
                `).join('')}
              </div>
            ` : ''}
            
            <div style="font-size: 12px; margin-top: 10px;">
              ${item.content.contactEmail ? `<div><a href="mailto:${item.content.contactEmail}" style="color: ${item.style?.buttonColor || '#8b5cf6'}; text-decoration: none;">${item.content.contactEmail}</a></div>` : ''}
              
              <div style="margin-top: 10px;">
                ${item.content.websiteUrl ? `<a href="${item.content.websiteUrl}" style="color: ${item.style?.buttonColor || '#8b5cf6'}; text-decoration: none; margin: 0 5px; font-size: 12px;">Visit Website</a>` : ''}
                ${item.content.unsubscribeUrl ? `<a href="${item.content.unsubscribeUrl}" style="color: ${item.style?.buttonColor || '#8b5cf6'}; text-decoration: none; margin: 0 5px; font-size: 12px;">Unsubscribe</a>` : ''}
              </div>
              
              <div style="margin-top: 15px; font-size: 12px; opacity: 0.75;">
                © ${new Date().getFullYear()} ${item.content.companyName || 'Your Company'}. All rights reserved.
              </div>
            </div>
          </div>
        `;
        
      case 'heading': {
        return `
          <div class="text-${item.content.align || 'center'} ${customClasses}" ${customStyles}>
            ${item.content.level === 'h1' ? `<h1>${item.content.text}</h1>` : ''}
            ${item.content.level === 'h2' ? `<h2>${item.content.text}</h2>` : ''}
            ${item.content.level === 'h3' ? `<h3>${item.content.text}</h3>` : ''}
          </div>
        `;
      }
      case 'paragraph': {
        return `<p class="text-${item.content.align || 'left'} ${customClasses}" ${customStyles}>${item.content.text}</p>`;
      }
      case 'image': {
        return `
          <div style="margin: 16px 0;" class="${customClasses}" ${customStyles}>
            <img src="${item.content.url}" alt="${item.content.alt || ''}" style="width: 100%; height: auto; display: block;">
            ${item.content.caption ? `<p style="text-align: center; color: #6b7280; font-size: 14px; margin-top: 8px;">${item.content.caption}</p>` : ''}
          </div>
        `;
      }
      case 'button': {
        const buttonClass = item.style?.buttonColor ? 'custom-button' : '';
        return `
          <div class="text-${item.content.align || 'center'}" style="margin: 16px 0;" ${customStyles}>
            <a href="${item.content.url || '#'}" class="button ${buttonClass}" style="${item.style?.buttonColor ? `background-color: ${item.style.buttonColor};` : ''} ${item.style?.buttonTextColor ? `color: ${item.style.buttonTextColor};` : ''}">${item.content.text}</a>
          </div>
        `;
      }
      case 'divider': {
        return `<div class="divider" style="${item.style?.borderColor ? `border-color: ${item.style.borderColor};` : ''} ${item.style?.borderWidth ? `border-width: ${item.style.borderWidth};` : ''}"></div>`;
      }
      case 'spacer': {
        return `<div style="height: ${item.content.height}px;"></div>`;
      }
      case 'compartment': {
        return `
          <div class="compartment-block ${customClasses}" ${customStyles}>
            <h3 style="margin-top: 0;">${item.content.title || 'Compartment'}</h3>
            <div>${item.content.content || ''}</div>
          </div>
        `;
      }
      case 'featured-article': {
        return `
          <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 30px; border: 1px solid ${item.style?.borderColor || '#e5e7eb'}; border-radius: ${item.style?.borderRadius || '8px'}; overflow: hidden; ${inlineStyles}">
            <tr>
              <td style="padding: 0;">
                <img src="${item.content.image}" alt="${item.content.title}" style="width: 100%; height: 150px; object-fit: cover; display: block;">
              </td>
            </tr>
            <tr>
              <td style="padding: 16px;">
                <h3 style="font-size: 16px; font-weight: bold; margin-top: 0; margin-bottom: 8px; color: ${item.style?.textColor || containerTextColor};">${item.content.title}</h3>
                <p style="font-size: 12px; color: #6b7280; margin-bottom: 8px; margin-top: 0;">By ${item.content.author} • ${item.content.date}</p>
                <p style="margin-top: 0; margin-bottom: 12px; color: ${item.style?.textColor || containerTextColor}; font-size: 14px;">${item.content.excerpt}</p>
                <a href="${item.content.linkUrl || '#'}" style="${item.style?.buttonColor ? `background-color: ${item.style.buttonColor};` : `background-color: ${globalLinkColor};`} ${item.style?.buttonTextColor ? `color: ${item.style.buttonTextColor};` : 'color: #ffffff;'} display: inline-block; padding: 6px 12px; font-size: 12px; text-decoration: none; border-radius: 4px; font-weight: bold;">${item.content.cta || 'Read More'} →</a>
              </td>
            </tr>
          </table>
        `;
      }
      case 'article-grid': {
        // Handle case when articles array is missing or empty
        if (!item.content.articles || item.content.articles.length === 0) {
          return '<p>No articles available</p>';
        }
        
        // Start with a container table
        let html = `
          <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 30px; ${inlineStyles}">
            <tr>
              <td style="padding: 0;">
                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
        `;
        
        // Create columns for articles
        item.content.articles.forEach((article, index) => {
          // Add cell padding between articles
          if (index > 0) {
            html += '<td width="20" style="padding: 0;"></td>';
          }
          
          html += `
            <td width="${100 / item.content.articles.length}%" style="padding: 0; vertical-align: top;">
              <table width="100%" cellspacing="0" cellpadding="0" border="0" style="border: 1px solid ${item.style?.borderColor || '#e5e7eb'}; border-radius: ${item.style?.borderRadius || '8px'}; overflow: hidden;">
                <tr>
                  <td style="padding: 0;">
                    <img src="${article.image}" alt="${article.title}" style="width: 100%; height: 200px; object-fit: cover; display: block;">
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px;">
                    <h3 style="font-size: 18px; font-weight: bold; margin-top: 0; margin-bottom: 8px; color: ${item.style?.textColor || containerTextColor}; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${article.title}</h3>
                    <p style="font-size: 14px; color: #6b7280; margin-bottom: 12px; margin-top: 0;">By ${article.author}</p>
                    <p style="margin-top: 0; margin-bottom: 16px; color: ${item.style?.textColor || containerTextColor}; font-size: 14px; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">${article.excerpt}</p>
                    ${article.linkUrl ? `<a href="${article.linkUrl}" style="${item.style?.buttonColor ? `background-color: ${item.style.buttonColor};` : `background-color: ${globalLinkColor};`} ${item.style?.buttonTextColor ? `color: ${item.style.buttonTextColor};` : 'color: #ffffff;'} display: inline-block; padding: 8px 16px; font-size: 14px; text-decoration: none; border-radius: 4px;">${article.linkText || 'Read More'}</a>` : ''}
                  </td>
                </tr>
              </table>
            </td>
          `;
        });
        
        // Close all tables
        html += `
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        `;
        
        return html;
      }
      case 'event-calendar': {
        // Handle case when events array is missing or empty
        if (!item.content.events || item.content.events.length === 0) {
          return '<p>No events available</p>';
        }
        
        // Define an interface for event items
        interface EventItem {
          title: string;
          date: string;
          time?: string;
          location?: string;
          description?: string;
        }
        
        return `
          <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 20px; border: 1px solid ${item.style?.borderColor || '#e5e7eb'}; border-radius: ${item.style?.borderRadius || '8px'}; overflow: hidden; ${inlineStyles}">
            <tr>
              <td style="padding: 20px;">
                <h3 style="margin-top: 0; margin-bottom: 16px; font-size: 20px; color: ${item.style?.textColor || containerTextColor};">${item.content.title || 'Upcoming Events'}</h3>
                
                ${(item.content.events as EventItem[]).map((event: EventItem, index: number) => `
                  <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: ${index < (item.content.events?.length || 0) - 1 ? '16px' : '0'}; ${index < (item.content.events?.length || 0) - 1 ? `border-bottom: 1px solid ${item.style?.borderColor || '#e5e7eb'};` : ''} padding-bottom: ${index < (item.content.events?.length || 0) - 1 ? '16px' : '0'};">
                    <tr>
                      <td>
                        <h4 style="margin-top: 0; margin-bottom: 8px; font-size: 16px; font-weight: bold; color: ${item.style?.textColor || containerTextColor};">${event.title}</h4>
                        
                        <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 8px;">
                          <tr>
                            <td width="65" valign="top" style="padding-bottom: 4px;"><strong>Date:</strong></td>
                            <td style="padding-bottom: 4px;">${event.date}</td>
                          </tr>
                          ${event.time ? `
                          <tr>
                            <td width="65" valign="top" style="padding-bottom: 4px;"><strong>Time:</strong></td>
                            <td style="padding-bottom: 4px;">${event.time}</td>
                          </tr>
                          ` : ''}
                          ${event.location ? `
                          <tr>
                            <td width="65" valign="top" style="padding-bottom: 4px;"><strong>Location:</strong></td>
                            <td style="padding-bottom: 4px;">${event.location}</td>
                          </tr>
                          ` : ''}
                        </table>
                        
                        ${event.description ? `<p style="margin: 0; font-size: 14px; color: ${item.style?.textColor || containerTextColor};">${event.description}</p>` : ''}
                      </td>
                    </tr>
                  </table>
                `).join('')}
                
                ${item.content.events.length > 3 ? `
                  <div style="text-align: center; margin-top: 16px;">
                    <a href="#" style="color: ${item.style?.buttonColor || globalLinkColor}; text-decoration: none; font-size: 14px;">+ ${item.content.events.length - 3} more events</a>
                  </div>
                ` : ''}
              </td>
            </tr>
          </table>
        `;
      }
      case 'quiz': {
        if (!item.content.quizzes || item.content.quizzes.length === 0) {
          return '<p style="text-align: center; color: #666;">No quiz questions available.</p>';
        }

        // Update the generateQuizHtml function with proper types
        const generateQuizHtml = (quiz: Quiz, quizIndex: number) => {
          const options = quiz.options.map((option: QuizOption, index: number) => `
            <tr>
              <td style="padding: 8px 0;">
                <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                  <tr>
                    <td style="width: 24px; vertical-align: top;">
                      <input type="radio" name="quiz-${quizIndex}" value="${index}" style="margin: 0; vertical-align: middle;">
                    </td>
                    <td style="padding-left: 8px;">
                      <span style="font-family: Arial, sans-serif; font-size: 14px; color: #333333;">
                        ${option.text}
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          `).join('');

          return `
            <div style="margin-bottom: 24px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
              <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <h3 style="font-family: Arial, sans-serif; font-size: 18px; font-weight: 600; color: #111827; margin: 0;">
                      ${quiz.question}
                    </h3>
                  </td>
                </tr>
                ${quiz.image ? `
                <tr>
                  <td style="padding-bottom: 16px;">
                    <img src="${quiz.image}" alt="Quiz question image" style="max-width: 100%; height: auto; border-radius: 4px;">
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                      ${options}
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          `;
        };

        const quizHtml = item.content.quizzes.map((quiz: Quiz, index: number) => generateQuizHtml(quiz, index)).join('');
        
        return `
          <div style="margin: 24px 0;">
            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
              <tr>
                <td>
                  <h2 style="font-family: Arial, sans-serif; font-size: 24px; font-weight: 600; color: #111827; margin: 0 0 16px 0;">
                    ${item.content.title || 'Quiz'}
                  </h2>
                </td>
              </tr>
              <tr>
                <td>
                  <form id="quiz-form" onsubmit="return handleQuizSubmit(event)">
                    ${quizHtml}
                    <div style="text-align: center;">
                      <button type="submit" style="background-color: #3b82f6; color: #ffffff; font-family: Arial, sans-serif; font-size: 14px; font-weight: 500; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">
                        Submit Answers
                      </button>
                    </div>
                  </form>
                </td>
              </tr>
            </table>
          </div>
          <script>
            function handleQuizSubmit(event) {
              event.preventDefault();
              const form = event.target;
              const quizzes = ${JSON.stringify(item.content.quizzes)};
              let score = 0;
              let total = quizzes.length;
              
              quizzes.forEach((quiz, index) => {
                const selected = form.querySelector(\`input[name="quiz-\${index}"]:checked\`);
                if (selected && quiz.options[selected.value].isCorrect) {
                  score++;
                }
              });
              
              alert(\`You scored \${score} out of \${total}!\`);
              return false;
            }
          </script>
        `;
      }
      case 'subscribe-now': {
        return `
          <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 30px; border-radius: ${item.style?.borderRadius || '8px'}; overflow: hidden; ${inlineStyles}">
            <tr>
              <td style="padding: 24px; text-align: center; background-color: ${item.style?.backgroundColor || '#6366f1'};">
                <h3 style="margin-top: 0; margin-bottom: 10px; font-size: 20px; color: ${item.style?.textColor || '#ffffff'};">${item.content.subscribeTitle || 'Stay Updated'}</h3>
                <p style="margin-bottom: 20px; color: ${item.style?.textColor || '#ffffff'};">${item.content.subscribeMessage || 'Join our newsletter to get the latest updates.'}</p>
                
                <div style="max-width: 400px; margin: 0 auto;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="padding-bottom: 10px;">
                        <input type="email" placeholder="${item.content.subscribeFormPlaceholder || 'Your email address'}" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid ${item.style?.borderColor || '#e5e7eb'}; border-radius: 4px; font-size: 14px;">
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="${item.content.subscribeFormAction || '#'}" style="${item.style?.buttonColor ? `background-color: ${item.style.buttonColor};` : '#ffffff'} ${item.style?.buttonTextColor ? `color: ${item.style.buttonTextColor};` : `color: ${item.style?.backgroundColor || '#6366f1'};`} display: block; width: 100%; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; box-sizing: border-box; text-align: center;">${item.content.subscribeButtonText || 'Subscribe Now'}</a>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </table>
        `;
      }
      case 'testimonial': {
        return `
          <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 20px; border: 1px solid ${item.style?.borderColor || '#e5e7eb'}; border-radius: ${item.style?.borderRadius || '8px'}; overflow: hidden; ${inlineStyles}">
            <tr>
              <td style="padding: 24px; text-align: center;">
                <div style="font-size: 24px; color: ${item.style?.buttonColor || globalLinkColor}; margin-bottom: 16px;">"</div>
                <p style="font-style: italic; font-size: 16px; margin: 0 0 20px; color: ${item.style?.textColor || containerTextColor};">${item.content.quote || 'This is a testimonial quote.'}</p>
                
                ${item.content.image ? `<img src="${item.content.image}" alt="${item.content.attribution || 'Testimonial'}" style="width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 10px; display: block; object-fit: cover;">` : ''}
                <div style="font-weight: bold; color: ${item.style?.textColor || containerTextColor};">${item.content.attribution || ''}</div>
                ${item.content.role ? `<div style="font-size: 14px; opacity: 0.8; color: ${item.style?.textColor || containerTextColor};">${item.content.role}${item.content.company ? `, ${item.content.company}` : ''}</div>` : ''}
              </td>
            </tr>
          </table>
        `;
      }
      case 'cta-banner': {
        return `
          <div class="${customClasses}" ${customStyles} style="border-radius: ${item.style?.borderRadius || '8px'}; padding: 24px; margin-bottom: 20px; text-align: center;">
            <h3 style="margin-top: 0; margin-bottom: 10px; font-size: 20px; color: ${item.style?.textColor || containerTextColor};">${item.content.title || 'Call to Action'}</h3>
            <p style="margin-bottom: 20px; color: ${item.style?.textColor || containerTextColor};">${item.content.content || 'Take action now!'}</p>
            
            ${item.content.buttonText ? `
              <a href="${item.content.linkUrl || '#'}" class="button ${item.style?.buttonColor ? 'custom-button' : ''}" style="${item.style?.buttonColor ? `background-color: ${item.style.buttonColor};` : ''} ${item.style?.buttonTextColor ? `color: ${item.style.buttonTextColor};` : ''} display: inline-block; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">${item.content.buttonText}</a>
            ` : ''}
          </div>
        `;
      }
      case 'product-recommendation': {
        // Handle case when products array is missing or empty
        if (!item.content.products || item.content.products.length === 0) {
          return '<p>No products available</p>';
        }
        
        // Define an interface for product items
        interface ProductItem {
          name: string;
          image: string;
          price: string;
          description?: string;
          discount?: string;
          link?: string;
        }
        
        return `
          <div class="${customClasses}" ${customStyles} style="margin-bottom: 20px;">
            <h3 style="margin-top: 0; margin-bottom: 16px; font-size: 20px; color: ${item.style?.textColor || containerTextColor};">${item.content.title || 'Recommended Products'}</h3>
            
            <table class="products-grid" cellspacing="10" cellpadding="0" border="0">
              <tr>
                ${(item.content.products as ProductItem[]).map((product: ProductItem, index: number) => {
                  // Only show the first two products in a row
                  if (index < 2) {
                    return `
                      <td class="product-item" style="border: 1px solid ${item.style?.borderColor || '#e5e7eb'}; border-radius: 8px; overflow: hidden;">
                        <div class="product-image-container">
                          <img src="${product.image}" alt="${product.name}" class="product-image">
                        </div>
                        
                        <div class="product-content">
                          <h4 style="margin: 0 0 8px; font-size: 16px; color: ${item.style?.textColor || containerTextColor};">${product.name}</h4>
                          
                          <div style="margin-bottom: 8px;">
                            <span style="${product.discount ? 'text-decoration: line-through; opacity: 0.7; margin-right: 8px;' : 'font-weight: bold;'} color: ${item.style?.textColor || containerTextColor};">${product.price}</span>
                            ${product.discount ? `<span style="font-weight: bold; color: #10b981;">${product.discount}</span>` : ''}
                </div>
                          
                          ${product.description ? `<p style="font-size: 13px; margin: 0 0 10px; color: ${item.style?.textColor || containerTextColor};">${product.description}</p>` : ''}
                          
                          ${product.link ? `
                            <a href="${product.link}" class="button ${item.style?.buttonColor ? 'custom-button' : ''}" style="${item.style?.buttonColor ? `background-color: ${item.style.buttonColor};` : ''} ${item.style?.buttonTextColor ? `color: ${item.style.buttonTextColor};` : ''} display: inline-block; padding: 6px 12px; font-size: 12px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Product</a>
                          ` : ''}
              </div>
                      </td>
                    `;
                  }
                  return '';
                }).join('')}
              </tr>
            </table>
          </div>
        `;
      }
      default: {
        return '';
      }
    }
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Newsletter</title>
        <style>
          ${styles}
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f9fafb;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <table class="newsletter-container" width="600" cellpadding="0" cellspacing="0" border="0" role="presentation" style="background-color: ${containerBackground}; color: ${containerTextColor}; border-radius: 8px;">
                <tr>
                  <td style="padding: 20px;">
          ${items.map(item => renderItem(item)).join('')}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return htmlContent;
};