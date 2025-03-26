import React from 'react';
import { Mail, Github, Twitter, LinkedinIcon } from 'lucide-react';

interface FooterProps {
  showAll?: boolean;
}

const Footer: React.FC<FooterProps> = ({ showAll = true }) => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col md:h-16 items-center md:flex-row md:justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-5 w-5 text-primary" />
          <span className="font-medium">Newsletter Weaver</span>
          <span className="text-muted-foreground">© {year} All rights reserved</span>
        </div>
        
        {showAll && (
          <div className="flex items-center justify-center md:justify-end space-x-4 mt-4 md:mt-0">
            <nav className="flex items-center gap-4 text-sm">
              <a href="#" className="font-medium underline-offset-4 hover:underline">Privacy</a>
              <a href="#" className="font-medium underline-offset-4 hover:underline">Terms</a>
              <a href="#" className="font-medium underline-offset-4 hover:underline">Support</a>
            </nav>
            
            <div className="flex items-center space-x-3">
              <a href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://twitter.com" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://linkedin.com" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer; 