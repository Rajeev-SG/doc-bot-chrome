# doc-bot-chrome

A Chrome extension that converts web pages to Markdown format, with storage capabilities for managing converted content.

## Features

- Page Conversion: Convert any web page to markdown format using Jina Reader API
- Save/Edit: Save converted content and edit it later
- Preview Mode: Toggle between edit and preview modes
- History: View and manage previously converted pages
- Collections: Organize your converted content
  - Create collections of related conversions
  - Download collections as single markdown files
- Download: Download individual conversions or entire collections
- Side Panel Interface: Convenient access through Chrome's side panel

## Project Structure

```
doc-bot-chrome/
├── manifest.json        # Chrome extension manifest
├── background.js       # Background service worker
├── vite.config.ts     # Vite build configuration
├── front-end/         # React application
│   ├── src/          # Source code
│   │   ├── components/ # React components
│   │   │   ├── ConvertTab.tsx  # Page conversion UI
│   │   │   ├── HistoryTab.tsx  # History management
│   │   │   └── PreviewModal.tsx # Content preview
│   │   ├── types/    # TypeScript types
│   │   ├── App.tsx   # Main application
│   │   └── main.tsx  # Entry point
│   ├── icons/        # Extension icons
│   └── sidepanel.html # Side panel entry point
├── dist/             # Built extension
└── docs/            # Documentation
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
   - Click "Load unpacked" and select the `dist` directory

## Usage

1. Click the extension icon to open the side panel
2. Navigate to any webpage you want to convert
3. Click "Convert Page" to convert the current page to markdown
4. Edit the title or content if needed
5. Click "Save" to store the conversion
6. Use the History tab to:
   - View past conversions
   - Create collections
   - Download conversions or collections
   - Delete entries

## Permissions

The extension requires the following permissions:
- `tabs`: Access to browser tabs
- `storage`: Store converted content
- `scripting`: Execute content scripts
- `sidePanel`: Show the side panel interface
- Host permissions for:
  - `https://r.jina.ai/*`: Access Jina Reader API
  - `<all_urls>`: Access webpage content for conversion
