
import { NewsletterItem } from '@/pages/NewsletterBuilder';

export const generateEmailHTML = (items: NewsletterItem[]): string => {
  const styles = `
    body {
      font-family: Arial, Helvetica, sans-serif;
      margin: 0;
      padding: 0;
      color: #333333;
      line-height: 1.5;
    }
    .newsletter-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
    }
    h1 {
      font-size: 24px;
      margin-top: 0;
      margin-bottom: 10px;
      color: #333333;
    }
    h2 {
      font-size: 20px;
      margin-top: 0;
      margin-bottom: 10px;
      color: #333333;
    }
    h3 {
      font-size: 18px;
      margin-top: 0;
      margin-bottom: 10px;
      color: #333333;
    }
    p {
      margin-top: 0;
      margin-bottom: 16px;
    }
    img {
      max-width: 100%;
      height: auto;
      display: block;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #8b5cf6;
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      text-align: center;
    }
    .divider {
      border-top: 1px solid #e5e7eb;
      margin: 20px 0;
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
      padding: 16px;
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
      display: table;
      width: 100%;
      border-collapse: separate;
      border-spacing: 10px;
      margin-bottom: 20px;
    }
    .article-grid-item {
      display: table-cell;
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
      padding: 12px;
    }
    .article-grid-title {
      font-size: 14px;
      font-weight: bold;
      margin-top: 0;
      margin-bottom: 6px;
    }
    .article-grid-meta {
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 6px;
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
  `;

  const renderItem = (item: NewsletterItem): string => {
    switch (item.type) {
      case 'heading':
        return `
          <div class="text-${item.content.align || 'center'}">
            ${item.content.level === 'h1' ? `<h1>${item.content.text}</h1>` : ''}
            ${item.content.level === 'h2' ? `<h2>${item.content.text}</h2>` : ''}
            ${item.content.level === 'h3' ? `<h3>${item.content.text}</h3>` : ''}
          </div>
        `;
      case 'paragraph':
        return `<p class="text-${item.content.align || 'left'}">${item.content.text}</p>`;
      case 'image':
        return `
          <div style="margin: 16px 0;">
            <img src="${item.content.url}" alt="${item.content.alt || ''}" style="width: 100%; height: auto; display: block;">
            ${item.content.caption ? `<p style="text-align: center; color: #6b7280; font-size: 14px; margin-top: 8px;">${item.content.caption}</p>` : ''}
          </div>
        `;
      case 'button':
        return `
          <div class="text-${item.content.align || 'center'}" style="margin: 16px 0;">
            <a href="${item.content.url || '#'}" class="button">${item.content.text}</a>
          </div>
        `;
      case 'divider':
        return `<div class="divider"></div>`;
      case 'spacer':
        return `<div style="height: ${item.content.height}px;"></div>`;
      case 'featured-article':
        return `
          <div class="featured-article">
            <img src="${item.content.image}" alt="${item.content.title}" style="height: 200px; object-fit: cover;">
            <div class="featured-article-content">
              <h3 class="featured-article-title">${item.content.title}</h3>
              <p class="featured-article-meta">By ${item.content.author} • ${item.content.date}</p>
              <p>${item.content.excerpt}</p>
              <a href="#" class="button">${item.content.cta || 'Read More'} →</a>
            </div>
          </div>
        `;
      case 'article-grid':
        // Handle case when articles array is missing or empty
        if (!item.content.articles || item.content.articles.length === 0) {
          return '<p>No articles available</p>';
        }
        
        // Handle case when there's only one article
        if (item.content.articles.length === 1) {
          const article = item.content.articles[0];
          return `
            <div class="featured-article" style="margin-bottom: 20px;">
              <img src="${article.image}" alt="${article.title}" style="height: 120px; object-fit: cover;">
              <div class="featured-article-content">
                <h3 class="featured-article-title">${article.title}</h3>
                <p class="featured-article-meta">By ${article.author}</p>
                <p>${article.excerpt}</p>
              </div>
            </div>
          `;
        }
        
        // Normal case with multiple articles
        return `
          <div class="article-grid">
            ${item.content.articles.map((article: any) => `
              <div class="article-grid-item">
                <img src="${article.image}" alt="${article.title}">
                <div class="article-grid-content">
                  <h4 class="article-grid-title">${article.title}</h4>
                  <p class="article-grid-meta">By ${article.author}</p>
                  <p style="font-size: 12px; margin: 0;">${article.excerpt}</p>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      default:
        return '';
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
      <body>
        <div class="newsletter-container">
          ${items.map(item => renderItem(item)).join('')}
        </div>
      </body>
    </html>
  `;

  return htmlContent;
};
