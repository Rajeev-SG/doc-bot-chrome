# doc-bot-chrome

A Chrome extension that converts web pages to Markdown format, with storage capabilities for managing converted content.

## Features

### Working Features
- Page Conversion: Convert any web page to markdown format
- Save/Edit: Save converted content and edit it later
- Preview Mode: Toggle between edit and preview modes
- History: View and manage previously converted pages
- Collections: Organize your converted content
- Delete: Remove unwanted conversions
- Side Panel Interface: Convenient access through Chrome's side panel

### Known Issues
- Jina API Integration: Currently using basic text conversion instead of Jina's markdown formatting
- Download: Download functionality is not working

## Project Structure

```
doc-bot-chrome/
├── manifest.json          # Chrome extension manifest
├── background.js         # Background service worker
├── vite.config.ts       # Vite build configuration
├── front-end/           # React application
│   ├── src/            # Source code
│   │   ├── components/ # React components
│   │   ├── types/     # TypeScript types
│   │   ├── App.tsx    # Main application
│   │   └── main.tsx   # Entry point
│   ├── icons/         # Extension icons
│   └── sidepanel.html # Side panel entry point
├── dist/               # Built extension
├── test/              # Test files
└── docs/              # Documentation
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

3. Build the extension:
   ```bash
   npm run build
   ```

4. Load in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `doc-bot-chrome` directory

## Usage

1. Click the extension icon in Chrome's toolbar to open the side panel
2. Navigate to any web page you want to convert
3. Click "Convert Page" in the side panel
4. The page will be converted to markdown format
5. You can:
   - Edit the content in markdown format
   - Preview the rendered markdown
   - Save the content
   - Organize content into collections
   - View conversion history
   - Delete unwanted conversions

## Development

- Run tests:
  ```bash
  npm test
  ```

- Build for production:
  ```bash
  npm run build
  ```

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.
