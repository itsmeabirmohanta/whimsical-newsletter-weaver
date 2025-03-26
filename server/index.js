// Express server for handling email sending
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Get current file and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create config.json if it doesn't exist
const configPath = join(__dirname, 'config.json');
if (!fs.existsSync(configPath)) {
  fs.writeFileSync(configPath, JSON.stringify({
    emailService: {
      gmail: {
        user: 'www.mohontoabir@gmail.com',
        pass: 'cxxg uclu rkmw vflz'
      }
    }
  }, null, 2));
  console.log('Created config.json file. Please update with your Gmail credentials.');
}

// Load config
let config;
try {
  const configData = fs.readFileSync(configPath, 'utf8');
  config = JSON.parse(configData);
  console.log('✅ Config loaded successfully.');
  
  // Print config status (without exposing the actual password)
  if (config.emailService?.gmail?.user) {
    console.log(`📧 Gmail configured for: ${config.emailService.gmail.user}`);
    console.log(`🔑 Password configured: ${config.emailService.gmail.pass ? 'Yes' : 'No'}`);
  } else {
    console.warn('⚠️ Gmail not fully configured - user email is missing');
  }
} catch (error) {
  console.error('❌ Error loading config:', error);
  config = {
    emailService: {
      gmail: {
        user: 'www.mohontoabir@gmail.com',
        pass: 'cxxg uclu rkmw vflz'
      }
    }
  };
}

// Debug rate limiting
const rateLimiter = {
  requests: new Map(), // Maps IP addresses to request counts
  windowMs: 60000, // 1 minute window
  maxRequests: 5, // Max requests per window
  
  check: (ip) => {
    const now = Date.now();
    const windowStart = now - rateLimiter.windowMs;
    
    // Clean up old requests
    for (const [key, timestamp] of rateLimiter.requests.entries()) {
      if (timestamp < windowStart) {
        rateLimiter.requests.delete(key);
      }
    }
    
    // Count requests for this IP
    const count = [...rateLimiter.requests.entries()]
      .filter(([key, timestamp]) => key.startsWith(ip) && timestamp > windowStart)
      .length;
      
    // Add this request
    const requestKey = `${ip}-${now}`;
    rateLimiter.requests.set(requestKey, now);
    
    return count < rateLimiter.maxRequests;
  }
};

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for HTML content

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`📝 ${new Date().toISOString()} - ${req.method} ${req.url} from ${req.ip}`);
  next();
});

// Email configuration
const createTransporter = () => {
  // Check if Gmail credentials exist
  if (!config.emailService.gmail.user || !config.emailService.gmail.pass) {
    console.error('❌ Gmail credentials not found. Please update config.json');
    return null;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.emailService.gmail.user,
        pass: config.emailService.gmail.pass
      }
    });
    
    console.log('✅ Email transporter created successfully');
    return transporter;
  } catch (error) {
    console.error('❌ Failed to create email transporter:', error);
    return null;
  }
};

// API Routes
app.post('/api/send-email', async (req, res) => {
  // Check rate limiting
  if (!rateLimiter.check(req.ip)) {
    console.warn(`⚠️ Rate limit exceeded for ${req.ip}`);
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.'
    });
  }
  
  try {
    console.log('📨 Received email request:', {
      to: req.body.to,
      subject: req.body.subject,
      senderName: req.body.senderName,
      fromSpecified: !!req.body.from,
      htmlLength: req.body.html?.length || 0
    });
    
    const { to, from, subject, html, senderName } = req.body;

    // Validate required fields
    if (!to || !html) {
      console.error('❌ Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Email recipient and HTML content are required'
      });
    }

    const transporter = createTransporter();
    if (!transporter) {
      console.error('❌ Email service not configured');
      return res.status(500).json({
        success: false,
        message: 'Email service not configured. Please update Gmail credentials in config.json'
      });
    }

    console.log(`🚀 Sending email to ${to}...`);
    
    // Format the sender with a display name to mask the actual email address
    const formattedFrom = senderName 
      ? `"${senderName}" <${config.emailService.gmail.user}>`
      : from || `"Newsletter" <${config.emailService.gmail.user}>`;
      
    console.log(`📧 From: ${formattedFrom}`);
    console.log(`📝 Subject: ${subject || 'Your Newsletter'}`);
    
    // Send email
    const info = await transporter.sendMail({
      from: formattedFrom,
      to,
      subject: subject || 'Your Newsletter',
      html
    });

    console.log('✅ Email sent successfully');
    console.log('📋 Message ID:', info.messageId);

    res.json({
      success: true,
      message: `Email sent to ${to}`,
      messageId: info.messageId
    });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send email'
    });
  }
});

// Template storage
const templatesPath = join(__dirname, 'templates');
if (!fs.existsSync(templatesPath)) {
  fs.mkdirSync(templatesPath);
  console.log('Created templates directory');
}

// Save template endpoint
app.post('/api/templates', (req, res) => {
  try {
    const { name, content } = req.body;
    
    if (!name || !content) {
      return res.status(400).json({
        success: false,
        message: 'Template name and content are required'
      });
    }
    
    const filename = `${name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    const templatePath = join(templatesPath, filename);
    
    fs.writeFileSync(templatePath, JSON.stringify({
      name,
      content,
      createdAt: new Date().toISOString()
    }, null, 2));
    
    res.json({
      success: true,
      message: 'Template saved successfully',
      filename
    });
  } catch (error) {
    console.error('Error saving template:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save template'
    });
  }
});

// Get all templates
app.get('/api/templates', (req, res) => {
  try {
    const templates = [];
    
    if (fs.existsSync(templatesPath)) {
      const files = fs.readdirSync(templatesPath);
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const templatePath = join(templatesPath, file);
          const data = fs.readFileSync(templatePath, 'utf8');
          const template = JSON.parse(data);
          
          templates.push({
            id: file.replace('.json', ''),
            name: template.name,
            createdAt: template.createdAt
          });
        }
      }
    }
    
    res.json({
      success: true,
      templates
    });
  } catch (error) {
    console.error('Error getting templates:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get templates'
    });
  }
});

// Get template by ID
app.get('/api/templates/:id', (req, res) => {
  try {
    const { id } = req.params;
    const templatePath = join(templatesPath, `${id}.json`);
    
    if (!fs.existsSync(templatePath)) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }
    
    const data = fs.readFileSync(templatePath, 'utf8');
    const template = JSON.parse(data);
    
    res.json({
      success: true,
      template
    });
  } catch (error) {
    console.error('Error getting template:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get template'
    });
  }
});

// Delete template
app.delete('/api/templates/:id', (req, res) => {
  try {
    const { id } = req.params;
    const templatePath = join(templatesPath, `${id}.json`);
    
    if (!fs.existsSync(templatePath)) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }
    
    fs.unlinkSync(templatePath);
    
    res.json({
      success: true,
      message: 'Template deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting template:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete template'
    });
  }
});

// Status endpoint
app.get('/api/status', (req, res) => {
  const isConfigured = !!(config.emailService?.gmail?.user && config.emailService?.gmail?.pass);
  
  res.json({
    status: 'ok',
    emailConfigured: isConfigured,
    time: new Date().toISOString()
  });
});

// Serve the Vite app in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the dist directory
  app.use(express.static(join(__dirname, '../dist')));
  
  // Serve the index.html for any requests that don't match an API route
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 Server running on port ${PORT}
📧 Email API available at http://localhost:${PORT}/api/send-email
📊 Status endpoint at http://localhost:${PORT}/api/status
📁 Templates API at http://localhost:${PORT}/api/templates
  `);
}); 