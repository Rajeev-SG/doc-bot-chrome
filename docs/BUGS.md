# Known Issues and Future Improvements

## Current Issues

### UI/UX
1. Responsive Design
   - ✅ Fixed: Button text now properly hides below 400px width
   - ✅ Fixed: Sidepanel content now properly fills available space
   - ✅ Fixed: Horizontal scrollbar no longer appears when reducing width

### Storage
1. Chrome Storage Limits
   - Large collections may approach Chrome's storage limits
   - No current warning system for storage limits
   - Workaround: Regularly download and clear old conversions

### Performance
1. Large Page Conversions
   - Very large pages may take longer to convert
   - No progress indicator during conversion besides button state
   - Workaround: Wait for conversion to complete, indicated by button state

## Future Improvements

### High Priority
1. Storage Management
   - Add storage usage indicator
   - Implement automatic cleanup of old entries
   - Add compression for large collections

2. UI Enhancements
   - Add search functionality for history
   - Add sorting options for collections
   - Add bulk operations for entries

### Medium Priority
1. Conversion Options
   - Add customizable conversion settings
   - Support for different markdown flavors
   - Add batch conversion capability

2. Export/Import
   - Add JSON export/import for backup
   - Support for different export formats
   - Add cloud backup options

### Low Priority
1. UI Customization
   - Add theme support
   - Customizable keyboard shortcuts
   - Adjustable font sizes

## Contributing

If you find a bug or have a feature request, please:
1. Check if it's already listed in this document
2. If not, create an issue in the repository
3. Include steps to reproduce for bugs
4. For feature requests, explain the use case
