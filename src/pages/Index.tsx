
import { useEffect } from 'react';
import NewsletterHeader from '@/components/NewsletterHeader';
import NewsletterHero from '@/components/NewsletterHero';
import FeaturedArticle from '@/components/FeaturedArticle';
import ArticleGrid from '@/components/ArticleGrid';
import NewsletterSignup from '@/components/NewsletterSignup';
import NewsletterFooter from '@/components/NewsletterFooter';

const articles = [
  {
    id: 1,
    title: "The Future of Remote Work",
    excerpt: "How companies are adapting to distributed teams and the tools making it possible.",
    category: "Business",
    readTime: "5 min",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Sustainable Living in Modern Cities",
    excerpt: "Urban innovations that are making our cities greener and more livable.",
    category: "Lifestyle",
    readTime: "4 min",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "AI and the Creative Process",
    excerpt: "How artificial intelligence is transforming art, music, and literature.",
    category: "Technology",
    readTime: "6 min",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "The Science of Productivity",
    excerpt: "Research-backed strategies to get more done with less stress.",
    category: "Health",
    readTime: "3 min",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Emerging Food Trends",
    excerpt: "The flavors, ingredients, and cooking methods gaining popularity.",
    category: "Food",
    readTime: "4 min",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Digital Minimalism",
    excerpt: "Finding balance in an age of technological abundance.",
    category: "Lifestyle",
    readTime: "5 min",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
  }
];

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NewsletterHeader />
      
      <main>
        <NewsletterHero />
        
        <div className="container px-4 sm:px-6">
          <FeaturedArticle 
            title="The Intersection of Technology and Everyday Life"
            excerpt="In an increasingly connected world, we explore how technology is reshaping our daily experiences, from the way we work to how we interact with our environments."
            imageUrl="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80"
            date="May 15, 2023"
            readTime="8 min"
            articleUrl="#"
          />
          
          <ArticleGrid articles={articles} />
        </div>
        
        <NewsletterSignup />
      </main>
      
      <NewsletterFooter />
    </div>
  );
};

export default Index;
