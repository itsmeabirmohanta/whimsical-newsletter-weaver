
import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  imageUrl: string;
}

interface ArticleGridProps {
  articles: Article[];
}

const ArticleGrid = ({ articles }: ArticleGridProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  return (
    <section ref={ref} className="py-12 md:py-20">
      <div className="container px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-medium mb-8 md:mb-12">Latest Articles</h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {articles.map((article) => (
            <motion.div key={article.id} variants={itemVariants}>
              <Card className="h-full flex flex-col border-0 elegant-shadow hover:shadow-md transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-full object-cover content-image"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="font-normal">
                      {article.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="flex-grow p-5">
                  <h3 className="text-xl font-medium mb-2">{article.title}</h3>
                  <p className="text-muted-foreground text-sm">{article.excerpt}</p>
                </CardContent>
                
                <CardFooter className="px-5 pb-5 pt-0 flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock size={14} className="mr-1" />
                    <span>{article.readTime}</span>
                  </div>
                  
                  <button className="text-primary flex items-center text-sm group">
                    <span>Read</span>
                    <ArrowRight size={14} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ArticleGrid;
