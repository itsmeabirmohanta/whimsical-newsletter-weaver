import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Send, Copy, Download } from "lucide-react";
import { toast } from "sonner";

const NewsletterPreview = () => {
  const location = useLocation();
  const [htmlContent, setHtmlContent] = useState<string>(
    location.state?.htmlContent || "<p>No content to preview</p>"
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlContent);
    toast.success("HTML copied to clipboard");
  };

  const downloadHtml = () => {
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("HTML downloaded");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex justify-between w-full items-center">
            <Button variant="ghost" size="sm" asChild className="gap-1">
              <Link to="/newsletter-builder">
                <ArrowLeft className="h-4 w-4" />
                Back to Editor
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-1">
                <Copy className="h-4 w-4" />
                Copy HTML
              </Button>
              <Button variant="outline" size="sm" onClick={downloadHtml} className="gap-1">
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button size="sm" className="gap-1">
                <Send className="h-4 w-4" />
                Send Email
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container py-4">
        <div className="rounded-md border overflow-hidden bg-white">
          <iframe
            srcDoc={htmlContent}
            className="w-full h-[calc(100vh-10rem)]"
            title="Newsletter Preview"
          />
        </div>
      </main>
    </div>
  );
};

export default NewsletterPreview; 