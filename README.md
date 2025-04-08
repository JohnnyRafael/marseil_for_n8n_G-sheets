# Marseil For n8n - Google Sheets Integration

![Marseil For n8n](https://box.ikemo.io/marseil/logo-circle.png)

A powerful Google Sheets Add-on that connects your spreadsheets with n8n workflows through webhooks. This integration allows you to process data and trigger automations directly from your spreadsheets.

## 🌟 Features

- 🔗 Easy webhook management
- 📊 Custom spreadsheet functions
- 🚀 Direct n8n workflow integration
- ⚡ Real-time data processing
- 🔒 Secure data handling

## 📋 Prerequisites

- A Google Workspace account
- Access to Google Sheets
- An n8n instance with accessible webhooks

## 🚀 Installation

1. Open Google Sheets
2. Go to Extensions > Add-ons > Get add-ons
3. Search for "Marseil For n8n"
4. Click Install
5. Grant the necessary permissions

## 💡 Usage

### Managing Webhooks

1. Open your Google Sheet
2. Go to Extensions > Marseil For n8n > Manage Webhooks
3. In the webhook manager:
   - Enter a name for your webhook
   - Paste your n8n webhook URL
   - Click "Add Webhook"

### Using Webhooks in Spreadsheets

Use the custom function `callWebhook()` in your spreadsheet cells:

```
=callWebhook(A1, "webhook_name")
```

Parameters:
- First parameter: The input value to send to n8n
- Second parameter: The name of your saved webhook

Example:
```
=callWebhook("tell me a joke", "n8n_agent")
```

## 🔧 Function Reference

### `callWebhook(input, functionName)`

Sends data to an n8n webhook and returns the processed result.

- `input`: The data to send to n8n (string)
- `functionName`: The name of the saved webhook to use (string)

Returns: The response from your n8n workflow

Example Response:
```json
{
  "output": "Your processed data or response from n8n"
}
```

## 🏗️ Development Setup

1. Create a new Google Apps Script project
2. Copy the following files into your project:
   - `Code.gs`
   - `WebhookManager.html`
   - `appsscript.json`

### Required OAuth Scopes

```json
{
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets.currentonly",
    "https://www.googleapis.com/auth/script.container.ui",
    "https://www.googleapis.com/auth/script.scriptapp"
  ]
}
```

## 🔄 Webhook Flow

1. User enters `=callWebhook()` function in a cell
2. Function retrieves the webhook URL for the specified name
3. Data is sent to n8n webhook
4. n8n processes the data according to your workflow
5. Response is returned and displayed in the cell

## ⚙️ Technical Details

- Timeout: 120 seconds (2 minutes)
- Response format: JSON with `output` property
- Error handling: Returns error messages in cell if something goes wrong
- User quotas: Uses user's UrlFetchApp quota for API calls

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## 🔐 Security

- All webhook calls are made using HTTPS
- Webhook URLs are stored in user properties
- No sensitive data is stored in script properties

## 🎯 Best Practices

1. Use meaningful webhook names
2. Test webhooks before using in production
3. Handle errors appropriately in n8n workflows
4. Keep webhook responses concise
5. Monitor usage to stay within quotas

---

Made with ❤️ by Marseil
