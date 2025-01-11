// Content script for doc-bot-chrome
console.log('Content script injected');

// Get current page URL
const currentUrl = window.location.href;
console.log('Current URL:', currentUrl);

// Construct Jina Reader API URL
const jinaUrl = 'https://r.jina.ai/' + encodeURIComponent(currentUrl);
console.log('Jina URL:', jinaUrl);

// Fetch markdown from Jina Reader API
async function fetchMarkdown() {
    try {
        const response = await fetch(jinaUrl, {
            method: 'GET',
            headers: {
                'x-with-generated-alt': 'true'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const markdown = await response.text();
        console.log('Markdown fetched successfully');

        // Send markdown back to background script
        chrome.runtime.sendMessage({
            type: 'markdown',
            content: markdown,
            url: currentUrl
        });
    } catch (error) {
        console.error('Error fetching markdown:', error);
        chrome.runtime.sendMessage({
            type: 'error',
            error: error.message,
            url: currentUrl
        });
    }
}

// Execute the fetch
fetchMarkdown();
