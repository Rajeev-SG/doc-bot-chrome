# Known Issues and Future Improvements

## Current Issues

### Markdown Conversion
- [x] Jina API integration implemented
- [ ] No progress indicator during conversion
- [ ] Some formatting may be lost during conversion

### UI/UX Issues
- [x] Download functionality working for both individual entries and collections
- [x] Fixed UI responsiveness for different panel widths
- [x] Fixed empty whitespace issues
- [ ] No loading states for async operations
- [ ] No error recovery UI for failed operations
- [ ] Limited feedback for successful operations

### Storage and State Management
- [x] Basic Chrome storage integration implemented
- [x] Collection management functionality added
- [ ] No data export functionality (besides downloads)
- [ ] No backup/restore functionality
- [ ] No data migration strategy
- [ ] No storage limit warnings
- [ ] No automatic cleanup of old entries
- [ ] No compression for large collections

### Data Persistence
- [x] Individual markdown entries persist in Chrome storage
- [x] Collections persist in Chrome storage
- [ ] No automatic backup of stored data
- [ ] No sync between different devices
- [ ] No cloud storage integration

## Workarounds

### Tab Access Issues
- If the extension can't access a tab, try:
  1. Refreshing the page
  2. Closing and reopening the side panel
  3. Reloading the extension

### Storage Issues
- To prevent data loss:
  1. Create collections for related content
  2. Regularly check and clean up old conversions
  3. Keep collection sizes manageable
  4. Use the download feature as a backup mechanism

## Future Improvements

### High Priority
1. Add loading states and better error handling
2. Implement storage limit warnings
3. Add automatic data cleanup options
4. Add compression for large collections

### Medium Priority
1. Add batch operations for collections
2. Improve error messages and recovery
3. Add progress indicators for conversions
4. Implement data sync between devices
5. Add storage usage analytics

### Low Priority
1. Add data export/import functionality
2. Add keyboard shortcuts
3. Add conversion settings/options
4. Implement cloud backup integration
5. Add custom storage providers
