// Background script for doc-bot-chrome

// Initialize storage with default value
chrome.runtime.onInstalled.addListener(async () => {
  try {
    await chrome.storage.local.set({ isInitialized: true });
    console.log('Extension initialized successfully');
  } catch (error) {
    console.error('Failed to initialize extension:', error);
  }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'markdown') {
    console.log('Received markdown from:', message.url);
    console.log('Markdown content:', message.content);
    // Store the markdown content
    storeMarkdown(message.url, message.content);
  } else if (message.type === 'error') {
    console.error('Error from content script:', message.error);
    console.error('URL with error:', message.url);
  }
});

// Store markdown in extension storage
async function storeMarkdown(url, content) {
  try {
    const key = `markdown_${Date.now()}`;
    await chrome.storage.local.set({
      [key]: {
        url,
        content,
        timestamp: new Date().toISOString()
      }
    });
    console.log('Markdown stored successfully with key:', key);
  } catch (error) {
    console.error('Failed to store markdown:', error);
  }
}

chrome.action.onClicked.addListener(async (tab) => {
  try {
    // Check if we have a valid tab
    if (!tab || !tab.id) {
      throw new Error('No valid tab found');
    }

    // Execute content script in the active tab
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });

    // Verify the script was injected
    if (!results || results.length === 0) {
      throw new Error('Content script injection failed');
    }

    console.log('Content script injected successfully');
  } catch (error) {
    console.error('Failed to inject content script:', error);
  }
});
