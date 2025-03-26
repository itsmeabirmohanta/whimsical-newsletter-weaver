import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eye, Save, PlusCircle, Trash2, ArrowUp, ArrowDown, Copy, Mail, Search, Undo, Redo, FileDown } from 'lucide-react';
import { toast } from 'sonner';
import { SaveTemplateDialog } from '@/components/SaveTemplateDialog';
import { TemplateGallery } from '@/components/TemplateGallery';
import { SocialMediaSection, type SocialLink } from '@/components/SocialMediaSection';
import { QuizSection } from '@/components/QuizSection';
import { EventList, type Event } from '@/components/EventList';
import { NewsletterSubscribe, type SubscribeFormData } from '@/components/NewsletterSubscribe';
import { FooterSection, type FooterData } from '@/components/FooterSection';
import { ItemEditor } from '@/components/ItemEditor';
import { SendEmailDialog } from '@/components/SendEmailDialog';
import { AddItemSidebar } from '@/components/AddItemSidebar';
import { FeaturedArticle, type FeaturedArticleData } from '@/components/FeaturedArticle';
import { ArticleGrid, type Article, type ArticleGridData } from '@/components/ArticleGrid';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { type NewsletterItem, type QuizOption, type Quiz } from '@/lib/api-service';
import { CalendarIcon } from '@/components/icons/CalendarIcon';

// Initial newsletter items
const initialItems: NewsletterItem[] = [
  {
    id: 'header-1',
    type: 'header',
    content: {
      logoUrl: 'https://placehold.co/200x60?text=Your+Logo',
      companyName: 'Your Company',
      tagline: 'Your newsletter tagline goes here',
      align: 'center'
    },
    style: {
      backgroundColor: '#f8f9fa',
      textColor: '#333333'
    }
  },
  {
    id: 'heading-1',
    type: 'heading',
    content: {
      text: 'Welcome to Our Newsletter',
      level: 'h1',
      align: 'center'
    }
  },
  {
    id: 'paragraph-1',
    type: 'paragraph',
    content: {
      text: 'This is a simple newsletter builder. Add, edit, and rearrange content blocks to create your perfect newsletter.',
      align: 'left'
    }
  }
];

export default function NewsletterBuilder() {
  const [items, setItems] = useState<NewsletterItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [newsletterTitle, setNewsletterTitle] = useState("Untitled Newsletter");
  const [activeTab, setActiveTab] = useState("basic");
  const [history, setHistory] = useState<NewsletterItem[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const navigate = useNavigate();

  // Initialize items from localStorage or use default
  useEffect(() => {
    const savedItems = localStorage.getItem('savedNewsletter');
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (e) {
        console.error('Failed to parse saved newsletter:', e);
        setItems(initialItems);
      }
    } else {
      setItems(initialItems);
    }
  }, []);

  // Load saved newsletter on mount
  useEffect(() => {
    const savedNewsletter = localStorage.getItem('newsletter');
    if (savedNewsletter) {
      setItems(JSON.parse(savedNewsletter));
    }
    const savedTitle = localStorage.getItem('newsletterTitle');
    if (savedTitle) {
      setNewsletterTitle(savedTitle);
    }
  }, []);

  // Update history when items change
  useEffect(() => {
    const lastHistoryState = history[historyIndex];
    if (!lastHistoryState || JSON.stringify(items) !== JSON.stringify(lastHistoryState)) {
      setHistory([...history.slice(0, historyIndex + 1), [...items]]);
      setHistoryIndex(historyIndex + 1);
    }
  }, [items]);

  // Function to generate HTML from newsletter items
  const generateHtml = () => {
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Newsletter</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 0;
            background-color: #f5f5f5;
            color: #000000;
          }
          .container { 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 16px;
            background-color: #ffffff;
          }
          .content-block {
            margin: 8px auto;
            padding: 16px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            max-width: 720px;
          }
          .text-center { text-align: center; }
          .text-left { text-align: left; }
          .text-right { text-align: right; }
          .header { 
            padding: 24px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            margin: 8px auto;
            max-width: 720px;
          }
          .divider { 
            border-top: 1px solid #ddd; 
            margin: 8px auto;
            max-width: 720px;
          }
          .spacer { 
            height: 20px;
            margin: 8px auto;
            max-width: 720px;
          }
          img { 
            max-width: 100%; 
            height: auto;
            display: block;
            margin: 0 auto;
          }
          .button { 
            display: inline-block; 
            padding: 10px 20px; 
            text-decoration: none; 
            border-radius: 4px;
            cursor: pointer;
          }
          .social-links { 
            display: flex; 
            justify-content: center; 
            gap: 16px; 
            padding: 16px;
            margin: 8px auto;
            max-width: 720px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .social-link { 
            color: inherit; 
            text-decoration: none; 
            padding: 8px 16px;
            border-radius: 4px;
          }
          .quiz-section { 
            padding: 24px;
            margin: 8px auto;
            max-width: 720px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .events-section { 
            padding: 24px;
            margin: 8px auto;
            max-width: 720px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .event-item { 
            margin-bottom: 8px; 
            padding: 16px;
            border-radius: 8px;
            background-color: #ffffff;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          }
          .subscribe-section { 
            padding: 24px;
            margin: 8px auto;
            max-width: 720px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          .footer { 
            padding: 24px;
            margin: 8px auto;
            max-width: 720px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          .footer a { text-decoration: none; }
          .footer p { margin: 8px 0; }
          @media (max-width: 600px) {
            .container {
              padding: 8px;
            }
            .content-block,
            .header,
            .quiz-section,
            .events-section,
            .subscribe-section,
            .footer {
              margin: 8px auto;
              padding: 16px;
            }
            .event-item {
              margin-bottom: 8px;
              padding: 12px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
    `;

    const getItemStyles = (item: NewsletterItem): string => {
      const styles: string[] = [];
      
      if (item.style?.backgroundColor) {
        styles.push(`background-color: ${item.style.backgroundColor}`);
      }
      if (item.style?.textColor) {
        styles.push(`color: ${item.style.textColor}`);
      }
      if (item.style?.borderWidth && item.style.borderWidth > 0) {
        styles.push(`border: ${item.style.borderWidth}px solid ${item.style.borderColor || '#000000'}`);
      }
      if (item.style?.borderRadius && item.style.borderRadius > 0) {
        styles.push(`border-radius: ${item.style.borderRadius}px`);
      }
      
      return styles.join('; ');
    };

    items.forEach(item => {
      const itemStyles = getItemStyles(item);
      let blockHtml = '';
      let hLevel: string;
      
      switch (item.type) {
        case 'header':
          blockHtml = `
            <div class="header text-${item.content.align || 'center'}" style="${itemStyles}">
              ${item.content.logoUrl ? `<img src="${item.content.logoUrl}" alt="${item.content.companyName || 'Company Logo'}" style="max-height: 60px;">` : ''}
              <h2 style="margin: 16px 0;">${item.content.companyName || ''}</h2>
              <p style="margin: 0;">${item.content.tagline || ''}</p>
            </div>
          `;
          break;
        case 'heading':
          hLevel = item.content.level || 'h2';
          blockHtml = `
            <div class="content-block">
              <${hLevel} class="text-${item.content.align || 'left'}" style="${itemStyles}">
                ${item.content.text || ''}
              </${hLevel}>
            </div>
          `;
          break;
        case 'paragraph':
          blockHtml = `
            <div class="content-block" style="${itemStyles}">
              <p class="text-${item.content.align || 'left'}" style="margin: 0; line-height: 1.6;">
                ${item.content.text || ''}
              </p>
            </div>
          `;
          break;
        case 'image':
          blockHtml = `
            <div class="content-block text-${item.content.align || 'center'}" style="${itemStyles}">
              <img src="${item.content.url || ''}" alt="${item.content.alt || ''}" style="display: block; margin: 0 auto; border-radius: 4px;">
            </div>
          `;
          break;
        case 'button':
          blockHtml = `
            <div class="content-block text-${item.content.align || 'center'}" style="${itemStyles}">
              <a href="${item.content.url || '#'}" class="button" style="background-color: ${item.style?.buttonColor || '#007bff'}; color: ${item.style?.buttonTextColor || '#ffffff'}">
                ${item.content.text || 'Click here'}
              </a>
            </div>
          `;
          break;
        case 'divider':
          blockHtml = `<div class="divider"></div>`;
          break;
        case 'spacer':
          blockHtml = `<div class="spacer" style="height: ${item.style?.height || 20}px;"></div>`;
          break;
        case 'social-media':
          if (item.content.socialLinks?.length) {
            blockHtml = `
              <div class="content-block">
                <div class="social-links">
                  ${item.content.socialLinks.map(link => `
                    <a href="${link.url}" class="social-link" target="_blank" rel="noopener noreferrer">
                      ${link.platform === 'custom' ? link.label : link.platform}
                    </a>
                  `).join('')}
                </div>
              </div>
            `;
          }
          break;
        case 'quiz':
          if (item.content.quiz) {
            const quiz = item.content.quiz;
            blockHtml = `
              <div class="content-block" style="${itemStyles}">
                <div class="quiz-section" style="
                  padding: 2rem;
                  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                  max-width: 800px;
                  margin: 0 auto;
                  background-color: ${item.style?.backgroundColor || '#ffffff'};
                  border-radius: 8px;
                ">
                  ${quiz.heading ? `
                    <h3 style="
                      font-size: 1.5rem;
                      font-weight: 700;
                      margin-bottom: 1.5rem;
                      color: ${item.style?.textColor || '#000000'};
                      text-align: center;
                      letter-spacing: -0.025em;
                    ">
                      ${quiz.heading}
                    </h3>
                  ` : ''}
                  <div style="margin-bottom: 2rem;">
                    <p style="
                      font-size: 1.25rem;
                      margin-bottom: 1.5rem;
                      color: ${item.style?.textColor || '#000000'};
                      line-height: 1.6;
                      text-align: center;
                    ">
                      ${quiz.question}
                    </p>
                    <div style="
                      display: flex;
                      flex-direction: column;
                      gap: 1rem;
                      max-width: 600px;
                      margin: 0 auto;
                    ">
                      ${quiz.options?.map((option, index) => `
                        <div style="
                          display: flex;
                          align-items: center;
                          gap: 1rem;
                          padding: 1rem 1.5rem;
                          border: 2px solid ${item.style?.borderColor || '#e2e8f0'};
                          border-radius: 0.75rem;
                          cursor: pointer;
                          background-color: ${option.selected ? `${item.style?.buttonColor}10` : '#ffffff'};
                        ">
                          <div style="
                            width: 2rem;
                            height: 2rem;
                            border: 2px solid ${option.selected ? (item.style?.buttonColor || '#007bff') : (item.style?.textColor || '#000000')};
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: ${option.selected ? (item.style?.buttonColor || '#007bff') : (item.style?.textColor || '#000000')};
                            font-weight: 600;
                            flex-shrink: 0;
                            font-size: 1rem;
                          ">
                            ${String.fromCharCode(65 + index)}
                          </div>
                          <div style="
                            color: ${item.style?.textColor || '#000000'};
                            font-size: 1.125rem;
                            flex-grow: 1;
                          ">
                            ${option.text}
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                  ${quiz.footerText ? `
                    <p style="
                      margin-top: 1.5rem;
                      font-size: 0.875rem;
                      color: ${item.style?.textColor || '#6b7280'};
                      text-align: center;
                      font-style: italic;
                    ">
                      ${quiz.footerText}
                    </p>
                  ` : ''}
                  <div style="
                    margin-top: 2rem;
                    text-align: center;
                  ">
                    <button style="
                      background-color: ${item.style?.buttonColor || '#007bff'};
                      color: ${item.style?.buttonTextColor || '#ffffff'};
                      padding: 0.875rem 2rem;
                      border-radius: ${item.style?.borderRadius ? `${item.style.borderRadius}px` : '0.5rem'};
                      font-weight: 600;
                      font-size: 1.125rem;
                      border: none;
                      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    ">
                      ${quiz.buttonText || 'Submit Answer'}
                    </button>
                  </div>
                </div>
              </div>
            `;
          }
          break;
        case 'events':
          if (item.content.events) {
            const events = item.content.events;
            blockHtml = `
              <div class="content-block" style="${itemStyles}">
                <div class="events-section" style="
                  background-color: ${item.style?.backgroundColor || '#ffffff'};
                  border-radius: 8px;
                  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                  padding: 2rem;
                ">
                  <h2 style="
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                    color: ${item.style?.textColor || '#000000'};
                  ">
                    ${item.content.eventsTitle || 'Upcoming Event'}
                  </h2>
                  ${events.map(event => `
                    <div style="
                      display: flex;
                      flex-direction: column;
                      gap: 0.5rem;
                      padding: 1rem;
                      margin-bottom: 1rem;
                      background-color: #ffffff;
                      border-radius: 8px;
                      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                    ">
                      <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          style="color: ${item.style?.textColor || '#000000'}"
                        >
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                          <line x1="16" x2="16" y1="2" y2="6" />
                          <line x1="8" x2="8" y1="2" y2="6" />
                          <line x1="3" x2="21" y1="10" y2="10" />
                        </svg>
                        <span style="
                          font-size: 1.125rem;
                          color: ${item.style?.textColor || '#000000'};
                        ">
                          ${new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}${event.time ? ` at ${event.time}` : ''}
                        </span>
                      </div>
                      <h3 style="
                        font-size: 1.25rem;
                        font-weight: 600;
                        color: ${item.style?.textColor || '#000000'};
                        margin: 0.5rem 0;
                      ">
                        ${event.title}
                      </h3>
                      ${event.description ? `
                        <p style="
                          color: ${item.style?.textColor ? item.style.textColor + '99' : '#00000099'};
                          margin: 0;
                          line-height: 1.5;
                        ">
                          ${event.description}
                        </p>
                      ` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }
          break;
        case 'subscribe':
          if (item.content.subscribeForm) {
            const form = item.content.subscribeForm;
            blockHtml = `
              <div class="content-block" style="${itemStyles}">
                <div class="subscribe-section" style="
                  background-color: ${form.backgroundColor};
                  color: ${form.textColor};
                  padding: 2rem;
                  border-radius: 8px;
                  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                ">
                  <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; text-align: center;">${form.title}</h3>
                  <p style="margin-bottom: 1.5rem; text-align: center;">${form.description}</p>
                  <div style="max-width: 400px; margin: 0 auto;">
                    <input type="email" placeholder="Your email address" style="
                      width: 100%;
                      padding: 0.75rem;
                      margin-bottom: 1rem;
                      border: 1px solid #ddd;
                      border-radius: 4px;
                      font-size: 1rem;
                    ">
                    <button style="
                      width: 100%;
                      padding: 0.75rem;
                      background-color: ${form.buttonColor};
                      color: ${form.buttonTextColor};
                      border: none;
                      border-radius: 4px;
                      font-size: 1rem;
                      font-weight: 500;
                      cursor: pointer;
                    ">
                      ${form.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            `;
          }
          break;
        case 'footer':
          if (item.content.footer) {
            const footer = item.content.footer;
            blockHtml = `
              <div class="content-block">
                <div class="footer" style="
                  background-color: ${footer.backgroundColor};
                  color: ${footer.textColor};
                  padding: 24px;
                  border-radius: 8px;
                  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                ">
                  <div style="max-width: 600px; margin: 0 auto;">
                    <div style="margin-bottom: 24px;">
                      <h3 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">${footer.companyName}</h3>
                      <p style="margin: 0 0 12px 0; font-size: 14px;">${footer.address}</p>
                      <p style="margin: 0; font-size: 14px;">
                        <a href="mailto:${footer.email}" style="color: ${footer.linkColor}; text-decoration: none;">${footer.email}</a>
                        ${footer.phone ? `<span style="margin: 0 8px;">|</span><span>${footer.phone}</span>` : ''}
                      </p>
                    </div>
                    ${footer.socialLinks?.length ? `
                      <div style="margin-bottom: 24px;">
                        ${footer.socialLinks.map(link => `
                          <a 
                            href="${link.url}" 
                            style="color: ${footer.linkColor}; text-decoration: none; margin: 0 12px; font-size: 14px;" 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            ${link.platform}
                          </a>
                        `).join('')}
                      </div>
                    ` : ''}
                    <div style="font-size: 14px;">
                      <p style="margin: 0 0 12px 0;">${footer.copyrightText}</p>
                      <a 
                        href="#unsubscribe" 
                        style="color: ${footer.linkColor}; text-decoration: none;"
                      >
                        ${footer.unsubscribeText}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }
          break;
        case 'featured-article':
          if (item.content.featuredArticle) {
            const article = item.content.featuredArticle;
            blockHtml = `
              <div class="content-block" style="${itemStyles}">
                <div style="
                  background-color: ${article.backgroundColor || '#ffffff'};
                  color: ${article.textColor || '#000000'};
                  border-radius: 8px;
                  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
                ">
                  ${article.image ? `
                    <img 
                      src="${article.image}" 
                      alt="${article.title}" 
                      style="width: 100%; max-height: 400px; object-fit: cover;"
                    >
                  ` : ''}
                  <div style="padding: 2rem;">
                    <h2 style="font-size: 1.75rem; font-weight: 600; margin-bottom: 1rem;">${article.title}</h2>
                    <p style="font-size: 1.125rem; line-height: 1.6; margin-bottom: 1.5rem;">${article.summary}</p>
                    <a 
                      href="${article.buttonUrl}" 
                      style="
                        display: inline-block;
                        padding: 0.75rem 1.5rem;
                        background-color: ${article.buttonColor || '#007bff'};
                        color: ${article.buttonTextColor || '#ffffff'};
                        text-decoration: none;
                        border-radius: 4px;
                        font-weight: 500;
                      "
                    >
                      ${article.buttonText || 'Read More'}
                    </a>
                  </div>
                </div>
              </div>
            `;
          }
          break;
        case 'article-grid':
          if (item.content.articleGrid?.articles?.length) {
            const grid = item.content.articleGrid;
            blockHtml = `
              <div class="content-block" style="${itemStyles}">
                <div style="
                  background-color: ${grid.backgroundColor || '#ffffff'};
                  color: ${grid.textColor || '#000000'};
                  padding: 2rem;
                  border-radius: 8px;
                  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                ">
                  <div style="
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 2rem;
                  ">
                    ${grid.articles.map(article => `
                      <div style="
                        background: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                        overflow: hidden;
                      ">
                        ${article.image ? `
                          <img 
                            src="${article.image}" 
                            alt="${article.title}" 
                            style="width: 100%; height: 200px; object-fit: cover;"
                          >
                        ` : ''}
                        <div style="padding: 1.5rem;">
                          <h3 style="
                            font-size: 1.25rem;
                            font-weight: 600;
                            margin-bottom: 0.75rem;
                            color: ${grid.textColor || '#000000'};
                          ">
                            ${article.title}
                          </h3>
                          <p style="
                            font-size: 1rem;
                            line-height: 1.6;
                            margin-bottom: 1rem;
                            color: ${grid.textColor ? grid.textColor + '99' : '#00000099'};
                          ">
                            ${article.description}
                          </p>
                          <a 
                            href="${article.buttonUrl}"
                            style="
                              display: inline-block;
                              padding: 0.5rem 1rem;
                              background-color: ${grid.buttonColor || '#007bff'};
                              color: ${grid.buttonTextColor || '#ffffff'};
                              text-decoration: none;
                              border-radius: 4px;
                              font-size: 0.875rem;
                              font-weight: 500;
                            "
                          >
                            ${article.buttonText}
                          </a>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            `;
          }
          break;
      }
      
      html += blockHtml;
    });

    html += `
        </div>
      </body>
      </html>
    `;

    return html;
  };

  // Function to add a new item
  const addItem = (type: string) => {
    const newItem: NewsletterItem = {
      id: `${type}-${Date.now()}`,
      type: type as NewsletterItem['type'],
      content: {}
    };

    // Initialize content based on type
    switch (type) {
      case 'quiz':
        newItem.content = {
          quiz: {
            id: `quiz-${Date.now()}`,
            heading: 'Quiz Title',
            question: 'Write your question here',
            options: [
              { id: 'option-1', text: 'Option A' },
              { id: 'option-2', text: 'Option B' },
              { id: 'option-3', text: 'Option C' },
              { id: 'option-4', text: 'Option D' }
            ],
            buttonText: 'Submit Answer',
            footerText: 'Optional footer text'
          }
        };
        newItem.style = {
          backgroundColor: '#f8f9fa',
          buttonColor: '#007bff',
          buttonTextColor: '#ffffff'
        };
        break;

      case 'subscribe':
        newItem.content = {
          subscribeForm: {
            title: 'Subscribe to Our Newsletter',
            description: 'Stay updated with our latest news and updates.',
            buttonText: 'Subscribe Now',
            backgroundColor: '#f8f9fa',
            textColor: '#000000',
            buttonColor: '#007bff',
            buttonTextColor: '#ffffff'
          }
        };
        break;

      case 'events':
        newItem.content = {
          eventsTitle: 'Upcoming Events',
          events: [
            {
              id: `event-${Date.now()}`,
              title: 'Event Title',
              date: new Date().toISOString().split('T')[0],
              time: '10:00 AM',
              location: 'Event Location',
              description: 'Event description goes here.'
            }
          ]
        };
        break;

      case 'footer':
        newItem.content = {
          footer: {
            companyName: 'Your Company',
            address: '123 Street Name, City, Country',
            email: 'contact@example.com',
            phone: '+1 234 567 890',
            copyrightText: '© 2024 Your Company. All rights reserved.',
            unsubscribeText: 'Unsubscribe',
            backgroundColor: '#f8f9fa',
            textColor: '#000000',
            linkColor: '#007bff',
            socialLinks: [
              { platform: 'Twitter', url: '#' },
              { platform: 'LinkedIn', url: '#' },
              { platform: 'Facebook', url: '#' }
            ]
          }
        };
        break;

      case 'featured-article':
        newItem.content.featuredArticle = {
          image: 'https://placehold.co/800x400',
          title: 'Featured Article Title',
          summary: 'Write a compelling summary of your featured article here.',
          buttonText: 'Read More',
          buttonUrl: '#',
          backgroundColor: '#ffffff',
          textColor: '#000000',
          buttonColor: '#007bff',
          buttonTextColor: '#ffffff'
        };
        break;

      case 'article-grid':
        newItem.content.articleGrid = {
          articles: [
            {
              id: `article-${Date.now()}`,
              image: 'https://placehold.co/600x400',
              title: 'Article Title',
              description: 'Write your article description here.',
              buttonText: 'Read More',
              buttonUrl: '#'
            }
          ],
          backgroundColor: '#ffffff',
          textColor: '#000000',
          buttonColor: '#007bff',
          buttonTextColor: '#ffffff'
        };
        break;

      case 'header':
        newItem.content = {
          logoUrl: 'https://placehold.co/200x60?text=Your+Logo',
          companyName: 'Your Company',
          tagline: 'Your newsletter tagline goes here',
          align: 'center'
        };
        newItem.style = {
          backgroundColor: '#f8f9fa',
          textColor: '#333333'
        };
        break;

      case 'heading':
        newItem.content = {
          text: 'New Heading',
          level: 'h2',
          align: 'left'
        };
        break;

      case 'paragraph':
        newItem.content = {
          text: 'Enter your text here',
          align: 'left'
        };
        break;

      case 'image':
        newItem.content = {
          url: 'https://placehold.co/600x400',
          alt: 'Image description',
          align: 'center'
        };
        break;

      case 'button':
        newItem.content = {
          text: 'Click Here',
          url: '#',
          align: 'center'
        };
        newItem.style = {
          buttonColor: '#007bff',
          buttonTextColor: '#ffffff'
        };
        break;

      case 'spacer':
        newItem.style = {
          height: 20
        };
        break;
    }

    setItems([...items, newItem]);
    setSelectedItemId(newItem.id);
  };

  // Function to update item content
  const updateItemContent = (id: string, content: Partial<typeof items[0]['content']>) => {
    setItems(items.map(item => {
      if (item.id === id) {
        // Handle special cases for nested content
        if (item.type === 'quiz' && content.quiz) {
          return {
            ...item,
            content: {
              ...item.content,
              quiz: { ...item.content.quiz, ...content.quiz }
            }
          };
        }
        
        if (item.type === 'subscribe' && content.subscribeForm) {
          return {
            ...item,
            content: {
              ...item.content,
              subscribeForm: { ...item.content.subscribeForm, ...content.subscribeForm }
            }
          };
        }
        
        if (item.type === 'events') {
          return {
            ...item,
            content: {
              ...item.content,
              ...(content.eventsTitle && { eventsTitle: content.eventsTitle }),
              ...(content.events && { events: content.events })
            }
          };
        }
        
        if (item.type === 'footer' && content.footer) {
          return {
            ...item,
            content: {
              ...item.content,
              footer: { ...item.content.footer, ...content.footer }
            }
          };
        }
        
        // Default case for simple content updates
        return { ...item, content: { ...item.content, ...content } };
      }
      return item;
    }));
  };

  // Function to update item style
  const updateItemStyle = (id: string, style: Partial<typeof items[0]['style']>) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, style: { ...item.style, ...style } } : item
    ));
  };

  // Move item up in the order
  const moveItemUp = (id: string) => {
    const index = items.findIndex(item => item.id === id);
    if (index > 0) {
      const newItems = [...items];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      setItems(newItems);
    }
  };

  // Move item down in the order
  const moveItemDown = (id: string) => {
    const index = items.findIndex(item => item.id === id);
    if (index < items.length - 1) {
      const newItems = [...items];
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      setItems(newItems);
    }
  };

  // Clone an item
  const cloneItem = (id: string) => {
    const itemToClone = items.find(item => item.id === id);
    if (itemToClone) {
      const newItem = {
        ...itemToClone,
        id: `${itemToClone.type}-${Date.now()}`
      };
      setItems([...items, newItem]);
      toast.success('Item cloned successfully');
    }
  };

  // Delete an item
  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    if (selectedItemId === id) {
      setSelectedItemId(null);
    }
    toast.success('Item deleted successfully');
  };

  // Navigation handlers
  const handleHomeClick = () => {
    navigate('/');
  };

  const handlePreviewClick = () => {
    const htmlContent = generateHtml();
    navigate('/newsletter-preview', { state: { htmlContent } });
  };

  const handleExportClick = () => {
    const htmlContent = generateHtml();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${newsletterTitle.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    toast.success('Newsletter exported successfully');
  };

  // Save newsletter
  const handleSave = () => {
    try {
      localStorage.setItem('savedNewsletter', JSON.stringify(items));
      localStorage.setItem('newsletterTitle', newsletterTitle);
      toast.success('Newsletter saved successfully');
    } catch (error) {
      toast.error('Failed to save newsletter');
      console.error('Save error:', error);
    }
  };

  // Clear all items
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all content? This cannot be undone.')) {
      setItems([]);
      setSelectedItemId(null);
      toast.success('All content cleared');
    }
  };

  const getCommonStyles = (item: NewsletterItem): React.CSSProperties => {
    const styles: React.CSSProperties = {};
    
    if (item.style?.borderWidth) {
      styles.borderStyle = 'solid';
      styles.borderWidth = `${item.style.borderWidth}px`;
      styles.borderColor = item.style?.borderColor || '#000000';
    }
    
    if (item.style?.borderRadius) {
      styles.borderRadius = `${item.style.borderRadius}px`;
    }

    if (item.style?.backgroundColor) {
      styles.backgroundColor = item.style.backgroundColor;
    }

    return styles;
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Navigation */}
      <nav className="border-b">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-semibold">
                N
              </div>
              <span className="font-medium">Newsletter Builder</span>
            </div>
            <span className="text-gray-600">{newsletterTitle}</span>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleHomeClick}
              className="gap-2"
            >
              Home
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/builder')}
              className="gap-2"
            >
              Builder
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handlePreviewClick}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </div>
        </div>
      </nav>

      {/* Sub Navigation */}
      <div className="border-b">
        <div className="flex items-center justify-between px-4 h-12">
          <Input
            value={newsletterTitle}
            onChange={(e) => {
              setNewsletterTitle(e.target.value);
              localStorage.setItem('newsletterTitle', e.target.value);
            }}
            className="w-64 h-8"
            placeholder="Enter newsletter title..."
          />
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2" 
              onClick={handlePreviewClick}
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2" 
              onClick={handleExportClick}
            >
              <FileDown className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-72 border-r flex flex-col">
          <div className="p-4">
            <h2 className="font-medium mb-4">Content Blocks</h2>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search blocks..."
                className="pl-9"
                onChange={(e) => {
                  // TODO: Implement block search functionality
                  console.log('Search:', e.target.value);
                }}
              />
            </div>
            <div className="border-b">
              <nav className="flex -mb-px space-x-4">
                <button
                  onClick={() => setActiveTab("basic")}
                  className={`py-2 border-b-2 text-sm font-medium whitespace-nowrap ${
                    activeTab === "basic"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Basic
                </button>
                <button
                  onClick={() => setActiveTab("interactive")}
                  className={`py-2 border-b-2 text-sm font-medium whitespace-nowrap ${
                    activeTab === "interactive"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Interactive
                </button>
                <button
                  onClick={() => setActiveTab("marketing")}
                  className={`py-2 border-b-2 text-sm font-medium whitespace-nowrap ${
                    activeTab === "marketing"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Marketing
                </button>
                <button
                  onClick={() => setActiveTab("layout")}
                  className={`py-2 border-b-2 text-sm font-medium whitespace-nowrap ${
                    activeTab === "layout"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Layout
                </button>
              </nav>
            </div>
          </div>
          <div className="flex-1 overflow-auto px-4 py-4">
            {/* Basic Blocks */}
            {activeTab === "basic" && (
              <div className="space-y-2">
                <BlockItem
                  icon="T"
                  title="Header"
                  description="Add a heading to your newsletter"
                  onClick={() => addItem("header")}
                />
                <BlockItem
                  icon="T"
                  title="Heading"
                  description="Add a heading to your content"
                  onClick={() => addItem("heading")}
                />
                <BlockItem
                  icon="¶"
                  title="Paragraph"
                  description="Add a paragraph of text"
                  onClick={() => addItem("paragraph")}
                />
                <BlockItem
                  icon="📷"
                  title="Image"
                  description="Insert an image with optional caption"
                  onClick={() => addItem("image")}
                />
                <BlockItem
                  icon="⚡"
                  title="Button"
                  description="Add a clickable button with link"
                  onClick={() => addItem("button")}
                />
              </div>
            )}
            {/* Interactive Blocks */}
            {activeTab === "interactive" && (
              <div className="space-y-2">
                <BlockItem
                  icon="❓"
                  title="Quiz"
                  description="Add an interactive quiz"
                  onClick={() => addItem("quiz")}
                />
                <BlockItem
                  icon="📅"
                  title="Events"
                  description="Add an events section"
                  onClick={() => addItem("events")}
                />
                <BlockItem
                  icon="🔗"
                  title="Social Media"
                  description="Add social media links"
                  onClick={() => addItem("social-media")}
                />
              </div>
            )}
            {/* Marketing Blocks */}
            {activeTab === "marketing" && (
              <div className="space-y-2">
                <BlockItem
                  icon="📧"
                  title="Subscribe Form"
                  description="Add an email subscription form"
                  onClick={() => addItem("subscribe")}
                />
                <BlockItem
                  icon="📰"
                  title="Featured Article"
                  description="Add a featured article"
                  onClick={() => addItem("featured-article")}
                />
                <BlockItem
                  icon="📚"
                  title="Article Grid"
                  description="Add a grid of articles"
                  onClick={() => addItem("article-grid")}
                />
              </div>
            )}
            {/* Layout Blocks */}
            {activeTab === "layout" && (
              <div className="space-y-2">
                <BlockItem
                  icon="⚡"
                  title="Divider"
                  description="Add a horizontal line"
                  onClick={() => addItem("divider")}
                />
                <BlockItem
                  icon="↕️"
                  title="Spacer"
                  description="Add vertical space"
                  onClick={() => addItem("spacer")}
                />
                <BlockItem
                  icon="👣"
                  title="Footer"
                  description="Add a footer section"
                  onClick={() => addItem("footer")}
                />
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-3xl mx-auto p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    if (historyIndex > 0) {
                      setHistoryIndex(historyIndex - 1);
                      setItems([...history[historyIndex - 1]]);
                    }
                  }}
                  disabled={historyIndex <= 0}
                >
                  <Undo className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    if (historyIndex < history.length - 1) {
                      setHistoryIndex(historyIndex + 1);
                      setItems([...history[historyIndex + 1]]);
                    }
                  }}
                  disabled={historyIndex >= history.length - 1}
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                  Save Draft
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500" onClick={handleClearAll}>
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {items.map((item) => (
                <NewsletterBlock
                  key={item.id}
                  item={item}
                  isSelected={selectedItemId === item.id}
                  onSelect={() => setSelectedItemId(item.id)}
                  onDelete={() => deleteItem(item.id)}
                  onMoveUp={() => moveItemUp(item.id)}
                  onMoveDown={() => moveItemDown(item.id)}
                  onUpdate={(updatedItem) => {
                    setItems(items.map(i => i.id === updatedItem.id ? updatedItem : i));
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        {selectedItemId && (
          <div className="w-96 border-l">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-medium">Edit {getItemType(selectedItemId)} Block</h2>
              <button
                onClick={() => setSelectedItemId(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(100vh-8rem)]">
              <ItemEditor
                item={items.find((item) => item.id === selectedItemId)!}
                onUpdate={(updatedItem) => {
                  setItems(items.map(item =>
                    item.id === selectedItemId ? updatedItem : item
                  ));
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper component for block items in the sidebar
function BlockItem({ icon, title, description, onClick }: {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-start gap-3 group relative"
    >
      <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center flex-shrink-0 text-base">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="font-medium text-gray-900">{title}</div>
        <div className="text-sm text-gray-500 line-clamp-2">{description}</div>
      </div>
      <PlusCircle className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-4 w-4 text-gray-400" />
    </button>
  );
}

// Helper component for newsletter blocks in the main content
function NewsletterBlock({ item, isSelected, onSelect, onDelete, onMoveUp, onMoveDown, onUpdate }: {
  item: NewsletterItem;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onUpdate: (updatedItem: NewsletterItem) => void;
}) {
  return (
    <div
      className={`relative p-4 rounded border ${
        isSelected ? "border-blue-500" : "border-gray-200 hover:border-gray-300"
      } transition-colors cursor-pointer`}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={(e) => { 
              e.stopPropagation(); 
              onMoveUp(); 
            }}
            className="h-8 w-8 p-0"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={(e) => { 
              e.stopPropagation(); 
              onMoveDown(); 
            }}
            className="h-8 w-8 p-0"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={(e) => { 
              e.stopPropagation();
              if (window.confirm('Are you sure you want to delete this block?')) {
                onDelete();
              }
            }}
            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
      {renderBlockContent(item, onSelect, onUpdate)}
    </div>
  );
}

function getItemType(id: string): string {
  return id.split('-')[0].charAt(0).toUpperCase() + id.split('-')[0].slice(1);
}

function renderBlockContent(item: NewsletterItem, onSelect: () => void, onUpdate: (updatedItem: NewsletterItem) => void): React.ReactNode {
  switch (item.type) {
    case 'header':
      return (
        <div className="text-center p-6" style={{ backgroundColor: item.style?.backgroundColor }}>
          {item.content.logoUrl && <img src={item.content.logoUrl} alt="Logo" className="mx-auto h-12 mb-3" />}
          <h2 className="text-xl font-bold mb-2">{item.content.companyName}</h2>
          <p className="text-muted-foreground">{item.content.tagline}</p>
        </div>
      );
    case 'heading':
      return (
        <div className={`text-${item.content.align || 'left'} py-2`}>
          {item.content.level === 'h1' && <h1 className="text-3xl font-bold">{item.content.text}</h1>}
          {item.content.level === 'h2' && <h2 className="text-2xl font-bold">{item.content.text}</h2>}
          {item.content.level === 'h3' && <h3 className="text-xl font-bold">{item.content.text}</h3>}
        </div>
      );
    case 'paragraph':
      return (
        <div className={`text-${item.content.align || 'left'} py-2 leading-relaxed`}>{item.content.text}</div>
      );
    case 'image':
      return (
        <div className={`text-${item.content.align || 'center'} py-4`}>
          <img src={item.content.url} alt={item.content.alt} className="max-w-full rounded-lg" />
        </div>
      );
    case 'button':
      return (
        <div className={`text-${item.content.align || 'center'} py-4`}>
          <button 
            className="px-6 py-2.5 rounded-md font-medium transition-colors"
            style={{ 
              backgroundColor: item.style?.buttonColor || '#007bff',
              color: item.style?.buttonTextColor || '#ffffff'
            }}
          >
            {item.content.text || 'Click here'}
          </button>
        </div>
      );
    case 'divider':
      return <hr className="my-4" />;
    case 'spacer':
      return <div className="bg-gray-100 opacity-50" style={{ height: `${item.style?.height || 20}px` }}></div>;
    case 'footer':
      if (item.content.footer) {
        const footer = item.content.footer;
        return (
          <div 
            className="text-center p-6 rounded"
            style={{ 
              backgroundColor: footer.backgroundColor,
              color: footer.textColor 
            }}
          >
            <h3 className="font-semibold mb-2">{footer.companyName}</h3>
            <p className="text-sm mb-2">{footer.address}</p>
            <p className="text-sm mb-4">
              <a 
                href={`mailto:${footer.email}`}
                style={{ color: footer.linkColor }}
                className="hover:underline"
              >
                {footer.email}
              </a>
              {footer.phone ? (
                <span> | {footer.phone}</span>
              ) : null}
            </p>
            {footer.socialLinks?.length > 0 && (
              <div className="flex justify-center gap-4 mb-4">
                {footer.socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: footer.linkColor }}
                    className="hover:underline"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            )}
            <p className="text-sm mb-2">{footer.copyrightText}</p>
            <a
              href="#unsubscribe"
              style={{ color: footer.linkColor }}
              className="text-sm hover:underline"
            >
              {footer.unsubscribeText}
            </a>
          </div>
        );
      }
      break;
    case 'social-media':
      if (item.content.socialLinks) {
        return (
          <div className="flex justify-center gap-4 py-4">
            {item.content.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {link.platform === 'custom' ? link.label : link.platform}
              </a>
            ))}
          </div>
        );
      }
      break;
    case 'quiz':
      if (item.content.quiz) {
        const quiz = item.content.quiz;
        const handleOptionClick = (index: number) => {
          const updatedOptions = quiz.options.map((opt, i) => ({
            ...opt,
            selected: i === index
          })) as QuizOption[];
          const updatedItem = {
            ...item,
            content: {
              ...item.content,
              quiz: {
                ...quiz,
                options: updatedOptions,
                selectedOption: index
              }
            }
          };
          onSelect();
          onUpdate(updatedItem);
        };

        const isOptionSelected = (option: QuizOption) => 
          quiz.selectedOption !== undefined && quiz.options.indexOf(option) === quiz.selectedOption;

        return (
          <div className="p-6 rounded-lg" style={{ backgroundColor: item.style?.backgroundColor || '#f8f9fa' }}>
            {quiz.heading && (
              <h3 className="text-xl font-bold mb-4" style={{ color: item.style?.textColor || '#000000' }}>
                {quiz.heading}
              </h3>
            )}
            <p className="mb-4" style={{ color: item.style?.textColor || '#000000' }}>
              {quiz.question}
            </p>
            <div className="space-y-3">
              {quiz.options.map((option, index) => (
                <div 
                  key={option.id} 
                  className="flex items-start gap-3 p-4 rounded-lg border-2 hover:bg-gray-50 transition-colors cursor-pointer"
                  style={{
                    borderColor: isOptionSelected(option) ? (item.style?.buttonColor || '#007bff') : (item.style?.borderColor || '#e2e8f0'),
                    backgroundColor: isOptionSelected(option) ? `${item.style?.buttonColor}10` : 'transparent',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOptionClick(index);
                  }}
                >
                  <div 
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      borderColor: isOptionSelected(option) ? (item.style?.buttonColor || '#007bff') : (item.style?.textColor || '#000000'),
                      borderWidth: '2px',
                      backgroundColor: isOptionSelected(option) ? (item.style?.buttonColor || '#007bff') : 'transparent',
                      color: isOptionSelected(option) ? '#ffffff' : (item.style?.textColor || '#000000')
                    }}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div style={{ color: item.style?.textColor || '#000000' }}>
                    {option.text}
                  </div>
                </div>
              ))}
            </div>
            {quiz.footerText && (
              <p className="mt-4 text-sm" style={{ color: item.style?.textColor || '#6b7280' }}>
                {quiz.footerText}
              </p>
            )}
            <div className="mt-6 text-center">
              <button
                className="px-6 py-2.5 rounded font-medium transition-colors disabled:opacity-50"
                style={{
                  backgroundColor: item.style?.buttonColor || '#007bff',
                  color: item.style?.buttonTextColor || '#ffffff'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (quiz.selectedOption !== undefined) {
                    toast.success('Answer submitted successfully!');
                  } else {
                    toast.error('Please select an answer first.');
                  }
                }}
                disabled={quiz.selectedOption === undefined}
              >
                {quiz.buttonText || 'Submit Answer'}
              </button>
            </div>
          </div>
        );
      }
      break;
    case 'events':
      if (item.content.events) {
        const events = item.content.events;
        return (
          <div className="p-6 rounded-lg bg-white">
            <h2 className="text-2xl font-bold mb-6">{item.content.eventsTitle || 'Upcoming Event'}</h2>
            {events.map((event, index) => (
              <div 
                key={index} 
                className="flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  <span className="text-lg">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    {event.time && ` at ${event.time}`}
                  </span>
                </div>
                <h3 className="text-xl font-semibold">{event.title}</h3>
                {event.description && (
                  <p className="text-gray-600">{event.description}</p>
                )}
              </div>
            ))}
          </div>
        );
      }
      break;
    case 'subscribe':
      if (item.content.subscribeForm) {
        const form = item.content.subscribeForm;
        return (
          <div 
            className="p-6 rounded-lg text-center"
            style={{ 
              backgroundColor: form.backgroundColor,
              color: form.textColor 
            }}
          >
            <h3 className="text-xl font-bold mb-3">{form.title}</h3>
            <p className="mb-6">{form.description}</p>
            <div className="max-w-md mx-auto space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded border"
              />
              <button
                className="w-full px-4 py-2 rounded"
                style={{
                  backgroundColor: form.buttonColor,
                  color: form.buttonTextColor
                }}
              >
                {form.buttonText}
              </button>
            </div>
          </div>
        );
      }
      break;
    case 'featured-article':
      if (item.content.featuredArticle) {
        const article = item.content.featuredArticle;
        return (
          <div className="p-6 rounded-lg" style={{ backgroundColor: item.style?.backgroundColor || '#ffffff' }}>
            {article.image && (
              <img src={article.image} alt={article.title} className="max-w-full mb-4" />
            )}
            <h2 className="text-xl font-bold mb-4">{article.title}</h2>
            <p className="mb-4">{article.summary}</p>
            <a
              href={article.buttonUrl}
              className="px-4 py-2 rounded"
              style={{
                backgroundColor: item.style?.buttonColor || '#007bff',
                color: item.style?.buttonTextColor || '#ffffff'
              }}
            >
              {article.buttonText || 'Read More'}
            </a>
          </div>
        );
      }
      break;
    case 'article-grid':
      if (item.content.articleGrid && item.content.articleGrid.articles) {
        const grid = item.content.articleGrid;
        return (
          <div className="p-6 rounded-lg" style={{ backgroundColor: item.style?.backgroundColor || '#ffffff' }}>
            <div className="grid grid-cols-2 gap-6">
              {grid.articles.map((article, index) => (
                <div key={index} className="flex flex-col border rounded-lg overflow-hidden">
                  {article.image && (
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                    <p className="text-sm mb-4 flex-grow">{article.description}</p>
                    <a
                      href={article.buttonUrl}
                      className="inline-block px-4 py-2 rounded text-center"
                      style={{
                        backgroundColor: grid.buttonColor || '#007bff',
                        color: grid.buttonTextColor || '#ffffff'
                      }}
                    >
                      {article.buttonText}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
      break;
    default:
      return null;
  }
} 