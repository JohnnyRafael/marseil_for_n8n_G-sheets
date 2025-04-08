const USER_PROPERTIES = PropertiesService.getUserProperties();
const WEBHOOK_TIMEOUT = 120000; // 2 minutes in milliseconds (adjust the timeout if you have more complex agents)

/**
 // Creates a menu item when the spreadsheet opens.
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Marseil for n8n')
    .addItem('Manage Webhooks', 'showWebhookManager')
    .addToUi();
}



function showWebhookManager() {
  const html = HtmlService.createHtmlOutputFromFile('WebhookManager')
    .setWidth(800)
    .setHeight(600)
    .setTitle('Marseil For n8n - Manage Webhooks');
  SpreadsheetApp.getUi().showModalDialog(html, 'Marseil For n8n - Manage Webhooks');
}


function getWebhooks() {
  const webhooksJson = USER_PROPERTIES.getProperty('webhooks') || '{}';
  Logger.log('Retrieved webhooks: ' + webhooksJson);
  return JSON.parse(webhooksJson);
}


function saveWebhook(name, url) {
  const webhooks = getWebhooks();
  Logger.log('Saving webhook - Name: ' + name + ', URL: ' + url);
  
  webhooks[name] = url;
  USER_PROPERTIES.setProperty('webhooks', JSON.stringify(webhooks));
  Logger.log('Webhook saved successfully');
}


function deleteWebhook(name) {
  Logger.log('Deleting webhook: ' + name);
  const webhooks = getWebhooks();
  delete webhooks[name];
  USER_PROPERTIES.setProperty('webhooks', JSON.stringify(webhooks));
  Logger.log('Webhook deleted successfully');
}

/**
 * Function to call n8n webhook and process response, Example; =n8nWebhook(B4,"n8n_agent")
 * 
 * @param {string} input The input value to send to the webhook
 * @param {string} functionName The name of the webhook to use
 * @customfunction
 */
function n8nWebhook(input, functionName) {
  // Logger.log('callWebhook called with input: ' + input + ', functionName: ' + functionName);
  
  if (!functionName) {
   // Logger.log('No function name provided');
    return "Error: Webhook name is required";
  }
  
  const webhooks = getWebhooks();
  const webhookUrl = webhooks[functionName];
  
 // Logger.log('Retrieved webhook URL: ' + webhookUrl);
  
  if (!webhookUrl) {
    //Logger.log('Webhook not found for function name: ' + functionName);
    return "Error: Webhook not found";
  }
  
  try {
    const makeRequest = function(url, input) {
      const options = {
        'method': 'post',
        'contentType': 'application/json',
        'payload': JSON.stringify({ input: input }),
        'muteHttpExceptions': true,
        'timeout': WEBHOOK_TIMEOUT
      };
     // Logger.log('Making webhook request with options: ' + JSON.stringify(options));
      return UrlFetchApp.fetch(url, options);
    };
    
  
    const response = makeRequest(webhookUrl, input);
    const responseCode = response.getResponseCode();
    
  //  Logger.log('Webhook response code: ' + responseCode);
    
    if (responseCode === 200) {
      const responseText = response.getContentText();
      Logger.log('Webhook response: ' + responseText);
      const responseData = JSON.parse(responseText);
      
      // Return just the output text from the response
      return responseData.output || responseData;
    } else {
      // Logger.log('Webhook error: HTTP ' + responseCode);
      return `Error: HTTP ${responseCode}`;
    }
  } catch (error) {
    // Logger.log('Webhook error: ' + error.toString());
    return `Error: ${error.toString()}`;
  }
}
