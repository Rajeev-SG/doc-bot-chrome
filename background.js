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

// Handle messages from content script and sidepanel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'convert_page') {
    handlePageConversion(message.tabId, message.url)
      .then(response => sendResponse(response))
      .catch(error => sendResponse({ error: error.message }));
    return true; // Will respond asynchronously
  } else if (message.type === 'markdown') {
    console.log('Received markdown from:', message.url);
    console.log('Markdown content:', message.content);
    // Store the markdown content
    storeMarkdown(message.url, message.content);
  } else if (message.type === 'error') {
    console.error('Error from content script:', message.error);
  }
});

// Convert page to markdown using Jina Reader API
async function handlePageConversion(tabId, url) {
  try {
    // First get the page title
    const [{ result: pageInfo }] = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => ({
        title: document.title
      })
    });

    // Use Jina Reader API to convert the page
    const jinaUrl = `https://r.jina.ai/${url}`;
    const response = await fetch(jinaUrl);
    
    if (!response.ok) {
      throw new Error(`Jina API error: ${response.status} ${response.statusText}`);
    }

    const markdown = await response.text();

    // Store the conversion
    const data = {
      title: pageInfo.title,
      content: markdown,
      url,
      timestamp: Date.now()
    };

    await chrome.storage.local.set({
      [`conversion_${Date.now()}`]: data
    });

    return data;
  } catch (error) {
    console.error('Error converting page:', error);
    throw error;
  }
}

// Store markdown in extension storage
async function storeMarkdown(url, content) {
  try {
    const data = {
      timestamp: Date.now(),
      content: content
    };
    await chrome.storage.local.set({ [url]: data });
    console.log('Markdown stored successfully for:', url);
  } catch (error) {
    console.error('Failed to store markdown:', error);
  }
}

// Listen for extension action clicks
chrome.action.onClicked.addListener(async (tab) => {
  try {
    // Open the side panel in the current window
    await chrome.sidePanel.open({ windowId: tab.windowId });
    console.log('Side panel opened successfully');
  } catch (error) {
    console.error('Failed to open side panel:', error);
  }
});
