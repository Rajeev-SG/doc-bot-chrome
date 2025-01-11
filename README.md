# doc-bot-chrome

A Chrome extension (in development) that will convert web pages to Markdown format with advanced organization features.

## Current Implementation Status

- Basic extension structure set up
- Chrome extension manifest (v3) configured
- Extension icons created
- Core functionality (in progress)

## Project Structure

```
doc-bot-chrome/
├── manifest.json           # Chrome extension manifest
├── front-end/
│   ├── icons/             # Extension icons
│   │   ├── icon16.png     # Small icon
│   │   ├── icon48.png     # Medium icon
│   │   └── icon128.png    # Large icon
│   └── index.html         # Main popup interface (pending)
└── docs/                  # Documentation and development plans
```

## Installation (Development)

1. Clone this repository:
   ```bash
   git clone [repository-url]
   cd doc-bot-chrome
   ```

2. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select the `doc-bot-chrome` directory

## Current Development Status

The extension is in its initial development phase. Currently implemented:
- Basic extension structure
- Manifest.json configuration
- Extension icons
- Development documentation

## Planned Features

- Convert active tab content to Markdown format
- Save converted entries with metadata
- View history of saved entries
- Organize entries into collections
- Download saved entries in Markdown format

## Development

To contribute to the development:

1. Make sure you have Node.js installed
2. Install dependencies:
   ```bash
   npm install
   ```
3. Make changes to the source files
4. Reload the extension in Chrome to test changes

## License

[License Information]

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.
