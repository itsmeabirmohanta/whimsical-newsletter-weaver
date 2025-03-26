import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import NotFound from "./pages/NotFound";
import EmailNewsletterTemplate from "./components/EmailNewsletterTemplate";
import NewsletterBuilder from "./pages/NewsletterBuilder";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <LazyMotion features={domAnimation}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <div className="min-h-screen bg-background text-foreground">
              <Router>
                <Routes>
                  <Route path="/" element={<Navigate to="/newsletter-builder" replace />} />
                  <Route path="/newsletter-builder" element={<NewsletterBuilder />} />
                  <Route path="/newsletter-preview" element={<EmailNewsletterTemplate />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
            </div>
          </TooltipProvider>
        </LazyMotion>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
