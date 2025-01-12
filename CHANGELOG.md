# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2025-01-12

### Added
- Side panel interface for better user experience
- Basic page to markdown conversion (without Jina API)
- Edit/Preview toggle functionality
- History view for past conversions
- Collections feature for organizing content
- Delete functionality for removing entries
- Save functionality for storing conversions

### Changed
- Switched to side panel from popup UI
- Updated build configuration for better asset handling
- Improved React component organization
- Enhanced error handling in background script

### Removed
- Jina API integration (temporarily)
- Content script injection (replaced with direct scripting)

### Known Issues
- Download functionality not working
- Basic text conversion instead of proper markdown formatting
- Missing Jina API integration

## [0.3.0] - 2025-01-11

### Added
- Jina Reader API integration for markdown conversion
- Fetch functionality in content script
- Message passing between content and background scripts
- Storage mechanism for converted markdown
- Extended error handling for API requests
- Host permissions for Jina API domain

### Changed
- Content script now makes API requests
- Background script stores conversion results
- Updated documentation for debugging network requests

### Security
- Added host permissions specifically for Jina API
- Implemented proper CORS headers for API requests
- Added error handling for network requests

## [0.2.0] - 2025-01-11

### Added
- Content script injection functionality
- Background script with storage initialization
- Jest test suite with Chrome API mocks
- Error handling for storage operations
- Error handling for content script injection
- Comprehensive test coverage for core functionality

### Changed
- Removed default popup in favor of action click handler
- Updated manifest.json to include web_accessible_resources
- Improved project structure with separate test directory

### Security
- Added content script injection verification
- Implemented proper error handling for Chrome APIs
- Limited content script exposure through web_accessible_resources

## [0.1.0] - 2025-01-11

### Added
- Initial project setup
- Chrome extension manifest v3 configuration
- Extension icons (16px, 48px, 128px)
- Basic project documentation
- Development environment setup with Node.js

### Security
- Configured minimal required Chrome extension permissions (activeTab, storage)

## [Unreleased]

### In Development
- Webpage to Markdown conversion functionality
- Storage system for saving converted entries
- History view for saved entries
- Collections feature for organizing entries
- Download functionality for saved Markdown files
- Extension popup interface

### Changed
- None

### Deprecated
- None

### Removed
- None

### Fixed
- None

### Security
- None

## Version History

### Version Format
- Major version: Significant feature additions or breaking changes
- Minor version: New features and functionality improvements
- Patch version: Bug fixes and minor improvements

### Version Notes
- 0.4.0: Added side panel interface and basic conversion functionality
- 0.3.0: Added Jina Reader API integration
- 0.2.0: Added core functionality (content script, storage, tests)
- 0.1.0: Initial project setup and configuration
