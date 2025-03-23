
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const NewsletterFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary pt-12 pb-8">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-8">
          <div className="md:w-1/3">
            <div className="flex items-center mb-4">
              <Mail className="h-6 w-6 mr-2 text-primary" />
              <h3 className="text-lg font-medium">Modern Digest</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              A thoughtfully curated newsletter bringing you the most interesting stories, ideas, and insights.
            </p>
          </div>
          
          <div className="md:w-1/3">
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Latest Issue
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Archives
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:w-1/3">
            <h4 className="font-medium mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-background text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-background text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-background text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-background text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-muted pt-6 mt-8">
          <p className="text-xs text-muted-foreground text-center">
            © {currentYear} Modern Digest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default NewsletterFooter;
