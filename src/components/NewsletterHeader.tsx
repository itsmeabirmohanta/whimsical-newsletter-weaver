
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightCircle, Mail, Bell, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SubscribeModal from './SubscribeModal';
import { Link } from 'react-router-dom';

const NewsletterHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
          isScrolled 
            ? 'py-3 bg-white/90 backdrop-blur-md shadow-sm' 
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Mail className="h-6 w-6 mr-2 text-primary" />
            <h1 className="text-lg font-medium">Future Shift Labs</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/email-template">
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden md:flex items-center gap-2 hover:bg-secondary"
              >
                <FileText size={16} />
                <span>Email Template</span>
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden md:flex items-center gap-2 hover:bg-secondary"
              onClick={() => setIsModalOpen(true)}
            >
              <Bell size={16} />
              <span>Subscribe</span>
            </Button>
            
            <Button 
              variant="default" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <span>Join Newsletter</span>
              <ArrowRightCircle size={16} />
            </Button>
          </div>
        </div>
      </header>
      
      <SubscribeModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default NewsletterHeader;
