// Email service for handling test email functionality
// This can use an actual email service provider like Gmail for sending real emails

// Import types for TypeScript
interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
  senderName?: string; // Name to display as the sender
  useRealService?: boolean; // Flag to use real email service vs simulation
}

// Configuration for email service
export const EMAIL_CONFIG = {
  // Set this to true to enable real email sending
  USE_REAL_EMAIL: true,
  // API endpoint for sending emails
  API_ENDPOINT: 'http://localhost:3001/api/send-email',
  // Status endpoint to check server health
  STATUS_ENDPOINT: 'http://localhost:3001/api/status',
  // Default sender information
  DEFAULT_SENDER: {
    name: 'Whimsical Newsletter Weaver',
    subject: 'Your Custom Newsletter'
  },
  // Debug settings
  DEBUG: {
    MAX_REQUESTS: 3, // Maximum number of requests allowed before force-stopping
    requestCount: 0, // Track request count to prevent infinite loops
    lastRequestTime: 0 // Track when the last request was made
  }
};

/**
 * Checks if the email server is running and properly configured
 */
export const checkEmailService = async (): Promise<{ 
  available: boolean; 
  configured: boolean; 
  message: string;
}> => {
  try {
    console.log('🔍 Checking email service status...');
    const response = await fetch(EMAIL_CONFIG.STATUS_ENDPOINT, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      return {
        available: false,
        configured: false,
        message: `Server error: ${response.status}`
      };
    }
    
    const data = await response.json();
    console.log('✅ Email service status:', data);
    
    return {
      available: true,
      configured: data.emailConfigured || false,
      message: data.emailConfigured 
        ? 'Email service is running and configured'
        : 'Email service is running but Gmail credentials are missing'
    };
  } catch (error) {
    console.error('❌ Email service status check failed:', error);
    return {
      available: false,
      configured: false,
      message: `Cannot connect to email server: ${error instanceof Error ? error.message : 'Connection error'}`
    };
  }
};

/**
 * Sends an email using Gmail or simulates sending if in development mode.
 */
export const sendEmail = async (options: SendEmailOptions): Promise<{ success: boolean; message: string }> => {
  // Debug - prevent infinite loops
  const now = Date.now();
  if (now - EMAIL_CONFIG.DEBUG.lastRequestTime < 1000) {
    EMAIL_CONFIG.DEBUG.requestCount++;
    console.warn(`⚠️ Multiple requests detected! Count: ${EMAIL_CONFIG.DEBUG.requestCount}`);
    
    if (EMAIL_CONFIG.DEBUG.requestCount > EMAIL_CONFIG.DEBUG.MAX_REQUESTS) {
      console.error('🛑 Stopping potential infinite loop - too many requests in short time');
      return {
        success: false,
        message: 'Rate limit exceeded - too many requests in short time'
      };
    }
  } else {
    // Reset counter if requests are spaced out
    EMAIL_CONFIG.DEBUG.requestCount = 0;
  }
  
  // Update last request time
  EMAIL_CONFIG.DEBUG.lastRequestTime = now;
  
  // Apply default values
  const senderName = options.senderName || EMAIL_CONFIG.DEFAULT_SENDER.name;
  const subject = options.subject || EMAIL_CONFIG.DEFAULT_SENDER.subject;
  
  // Check if we should use the real email service
  const useRealService = options.useRealService || EMAIL_CONFIG.USE_REAL_EMAIL;
  
  if (useRealService) {
    try {
      console.log('💌 Sending email via API...', {
        to: options.to,
        subject: subject,
        senderName: senderName,
        htmlLength: options.html?.length || 0,
        endpoint: EMAIL_CONFIG.API_ENDPOINT
      });
      
      const response = await fetch(EMAIL_CONFIG.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: options.to,
          subject: subject,
          html: options.html,
          from: options.from || 'newsletter@example.com',
          senderName: senderName
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Server returned error:', response.status, errorText);
        throw new Error(errorText || `Server error: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('✅ Email sent successfully:', result);
      return {
        success: true,
        message: `Email sent to ${options.to}`
      };
    } catch (error) {
      console.error('❌ Error sending email:', error);
      return {
        success: false,
        message: `Failed to send email: ${error instanceof Error ? error.message : 'Server error'}`
      };
    }
  } else {
    // Simulate email sending for development mode
    console.log('📧 SIMULATION MODE: Real email sending is disabled');
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Log the email details for demonstration
      console.log('Email would be sent with the following details:');
      console.log(`To: ${options.to}`);
      console.log(`From: ${senderName} <${options.from || 'noreply@example.com'}>`);
      console.log(`Subject: ${subject}`);
      console.log(`Content length: ${options.html.length} characters`);
      
      return {
        success: true,
        message: `Email simulated to ${options.to}`
      };
    } catch (error) {
      console.error('Error in email simulation:', error);
      return {
        success: false,
        message: `Failed to simulate email: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
};

/**
 * Validates an email address format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}; 