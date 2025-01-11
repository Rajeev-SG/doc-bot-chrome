# doc-bot-chrome

A Chrome extension that converts web pages to Markdown format using the Jina Reader API, with storage capabilities for managing converted content.

## Current Implementation Status

- Basic extension structure set up
- Chrome extension manifest (v3) configured
- Extension icons created
- Content script injection with error handling
- Background script with storage initialization
- Jina Reader API integration for Markdown conversion
- Comprehensive test suite for core functionality

## Project Structure

```
doc-bot-chrome/
├── manifest.json           # Chrome extension manifest
├── background.js          # Background service worker
├── content.js            # Content script for Jina API integration
├── test/                 # Test files
│   ├── setup.js         # Test environment setup
│   ├── background.test.js # Background script tests
│   └── manifest.test.js  # Manifest validation tests
├── front-end/
│   └── icons/           # Extension icons
│       ├── icon16.png   # Small icon
│       ├── icon48.png   # Medium icon
│       └── icon128.png  # Large icon
└── docs/                # Documentation and development plans
```

## Installation (Development)

1. Clone this repository:
   ```bash
   git clone [repository-url]
   cd doc-bot-chrome
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run tests:
   ```bash
   npm test
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select the `doc-bot-chrome` directory

## Usage

1. Click the extension icon in your Chrome toolbar to convert the current page
2. The extension will:
   - Inject the content script
   - Send the current URL to Jina Reader API
   - Convert the page to Markdown format
   - Store the converted content locally

3. View the results:
   - Open the background script console (see below) to view the converted markdown
   - Converted content is automatically saved in extension storage

### Viewing Debug Output

To see the conversion results and debug information:

1. Content Script Console (webpage console):
   - Right-click page → Inspect → Console
   - Shows content script injection and API request status

2. Background Script Console (extension console):
   - Go to chrome://extensions
   - Find "Markdown Converter"
   - Click "service worker" under "Inspect views"
   - Shows conversion results and storage status

## Features

- Webpage to Markdown conversion using Jina Reader API
- Automatic content script injection
- Local storage of converted content
- Error handling for API requests
- Debug logging in both content and background contexts

## Testing

The project includes a comprehensive test suite:
- Background script tests (initialization, error handling)
- Content script injection tests
- Chrome API mock implementation
- Storage operation tests

Run tests with:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

[License Information]
