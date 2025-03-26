import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Mail, LayoutDashboard, Settings, User } from 'lucide-react';

interface HeaderProps {
  title?: string;
  rightContent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "Newsletter Weaver", 
  rightContent 
}) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 mr-4">
          <Mail className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">{title}</span>
        </div>
        
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Button 
            variant={isActive("/newsletter-builder") ? "default" : "ghost"} 
            size="sm"
            asChild
          >
            <Link to="/newsletter-builder" className="flex items-center">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Builder
            </Link>
          </Button>
          
          <Button 
            variant={isActive("/newsletter-preview") ? "default" : "ghost"} 
            size="sm"
            asChild
          >
            <Link to="/newsletter-preview" className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Preview
            </Link>
          </Button>
        </nav>
        
        <div className="ml-auto flex items-center space-x-4">
          {rightContent}
          <ModeToggle />
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header; 