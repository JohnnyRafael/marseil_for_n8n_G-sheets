# Marseil For n8n – Google Sheets Integration

A lightweight Google Apps Script tool that connects Google Sheets to your **n8n** instance using webhooks. 

**This version is not published on the Google Workspace Marketplace and must be installed manually by copying the code.

---

## 🌟 Features

- 🔗 Manage webhook endpoints inside Sheets
- 📊 Use spreadsheet functions to call webhooks
- 🚀 Trigger n8n workflows from any cell
- 🔐 Webhooks stored securely per user

---

## 📋 Requirements

- A Google Workspace or Gmail account
- Access to Google Sheets
- An n8n instance with active webhook URLs

---

## 🚀 Installation (Manual Setup)

1. Open any Google Sheet
2. Click `Extensions > Apps Script`
3. In the Apps Script editor:
   - Replace any existing code with contents of `Code.gs`
   - Click `+` and create a new HTML file named `WebhookManager.html`, paste the contents
   - Open the `Project Settings` (gear icon) and paste the provided `appsscript.json` content into the manifest
4. Save and authorize the script when prompted
5. Reload the Sheet — a new menu called **Marseil for n8n** will appear

---

## 💡 Usage

### Manage Webhooks

1. In your sheet, go to `Marseil for n8n > Manage Webhooks`
2. In the dialog:
   - Enter a name and webhook URL
   - Click **Add Webhook**
   - You can view or delete saved webhooks

### Use Webhooks in Sheets

Use the custom function `=n8nWebhook()` directly in a cell:

```excel
=n8nWebhook(A1, "n8n_agent")
```

- First argument: input value
- Second argument: name of the saved webhook

---

## 🔧 Function Reference

### `n8nWebhook(input, functionName)`

- Sends data to the webhook assigned to `functionName`
- Returns processed result or an error

#### Parameters:
- `input`: string value to send
- `functionName`: name of stored webhook

#### Returns:
- The `output` field from the webhook response, or error message

---

## 🏗️ Developer Setup

Create the following files in Apps Script:

- **Code.gs**: JavaScript logic
- **WebhookManager.html**: HTML dialog UI
- **appsscript.json**: Project manifest (configure menu, permissions)

### Required OAuth Scopes:

```json
"oauthScopes": [
  "https://www.googleapis.com/auth/spreadsheets.currentonly",
  "https://www.googleapis.com/auth/script.container.ui",
  "https://www.googleapis.com/auth/script.scriptapp",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/script.external_request"
]
```

---

## 🔄 Webhook Flow

1. User triggers `=n8nWebhook(...)` from a cell
2. Script loads the named webhook URL from storage
3. Sends request to the webhook with user input
4. Receives JSON response with `output`
5. Returns `output` in the cell

---

## ⚙️ Technical Notes

- Timeout: 120 seconds
- Response format: JSON
- All requests sent via `UrlFetchApp`
- Each user's webhooks are stored in UserProperties

---

## 🔐 Security

- HTTPS enforced
- Each user's webhook list is private
- No centralized storage of webhook data

---

## ✅ Best Practices

- Keep webhook responses simple
- Limit webhook names to lowercase, no spaces
- Monitor your n8n logs for errors
- Avoid overly long input/output values
- Secure your n8n instance properly

---

<p align="center">
  <img src="https://box.ikemo.io/marseil/logo-circle.png" alt="Marseil AI Logo" width="20" height="20" style="vertical-align: middle; margin-right: 8px;">
  <a href="https://marseil.ai" style="vertical-align: middle;">Made with ❤️ by Marseil AI</a>
</p>


