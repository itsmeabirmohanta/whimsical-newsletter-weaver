
import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { motion, useAnimation, useInView } from 'framer-motion';

const NewsletterHero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
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
        staggerChildren: 0.2,
        delayChildren: 0.3
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
    <section ref={ref} className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 to-background z-0" />
      
      <motion.div
        className="relative z-10 container max-w-6xl px-4 sm:px-6 mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div 
          variants={itemVariants}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-balance">
            Stay informed with our curated insights
          </h1>
          
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Discover thought-provoking stories, emerging trends, and exclusive interviews—delivered straight to your inbox.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="relative overflow-hidden group">
              <span className="relative z-10">Read Latest Issue</span>
              <span className="absolute inset-0 bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Button>
            
            <Button size="lg" variant="outline" className="relative overflow-hidden group">
              <span className="relative z-10">Browse Archives</span>
              <span className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default NewsletterHero;
