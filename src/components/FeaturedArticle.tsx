
import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FeaturedArticleProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  readTime: string;
  articleUrl: string;
}

const FeaturedArticle = ({
  title,
  excerpt,
  imageUrl,
  date,
  readTime,
  articleUrl,
}: FeaturedArticleProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className="my-12 md:my-20"
    >
      <Card className="overflow-hidden elegant-shadow hover:shadow-lg transition-shadow duration-300 border-0">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-7/12 overflow-hidden">
            <div 
              className="h-64 md:h-80 lg:h-full w-full bg-cover bg-center content-image"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          </div>
          
          <CardContent className="w-full lg:w-5/12 p-6 md:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Calendar size={14} className="mr-1" />
                <span>{date}</span>
                <span className="mx-2">•</span>
                <span>{readTime} read</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-medium mb-4 text-balance">
                {title}
              </h2>
              
              <p className="text-muted-foreground">
                {excerpt}
              </p>
            </div>
            
            <div className="mt-6">
              <a
                href={articleUrl}
                className="inline-flex items-center group text-primary font-medium"
              >
                Continue reading
                <ExternalLink size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};

export default FeaturedArticle;
