# Email Server for Whimsical Newsletter Weaver

This is a simple Express server that handles email sending functionality for the Whimsical Newsletter Weaver application.

## Setup Instructions

1. Make sure you have [Node.js](https://nodejs.org/) installed (version 14 or later)
2. Configure your Gmail credentials in `config.json`:

```json
{
  "emailService": {
    "gmail": {
      "user": "your-gmail@gmail.com",
      "pass": "your-app-password"
    }
  }
}
```

> **Important**: For Gmail, you need to use an "App Password" and not your regular Gmail password. 
> To generate an App Password:
> 1. Enable 2-Step Verification in your Google Account
> 2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
> 3. Select "Mail" as the app and give it a name like "Newsletter Weaver"
> 4. Use the generated password in your config.json

## Running the Server

Run the server with:

```bash
npm run server
```

The server will start on port 3001 by default. You can change this in the `.env` file.

## API Endpoints

- `POST /api/send-email` - Sends an email with the provided content
  - Request body: `{ to, from, subject, html, senderName }`
  
- `GET /api/status` - Check if the email server is running and properly configured

## Troubleshooting

- **Error: Invalid login**: Make sure you're using an App Password and not your regular Gmail password
- **Connection issues**: Check firewall settings, and ensure port 3001 is accessible

## Security Notice

The config.json file contains sensitive information (your Gmail password). Make sure to:
- Never commit this file to version control
- Restrict access to this file
- Consider using environment variables for production

## License

This project is part of the Whimsical Newsletter Weaver application. 