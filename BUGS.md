# Known Issues and Future Improvements

## Current Issues

### Markdown Conversion
- [x] Jina API integration implemented
- [ ] No progress indicator during conversion
- [ ] Some formatting may be lost during conversion

### UI/UX Issues
- [x] Download functionality working for both individual entries and collections
- [ ] No loading states for async operations
- [ ] No error recovery UI for failed operations
- [ ] Limited feedback for successful operations
- [ ] Empty whitespace to the right of the application UI

### Storage and State Management
- [ ] History doesn't persist when closing and reopening the side panel
- [ ] No data export functionality (besides downloads)
- [ ] No backup/restore functionality
- [ ] No data migration strategy

## Workarounds

### Tab Access Issues
- If the extension can't access a tab, try:
  1. Refreshing the page
  2. Closing and reopening the side panel
  3. Reloading the extension

### Storage Issues
- To prevent data loss, download important conversions before closing the browser
- Create collections for related content to make downloads more organized

## Future Improvements

### High Priority
1. Fix history persistence across side panel sessions
2. Add loading states and better error handling
3. Make UI fully responsive to panel size

### Medium Priority
1. Add batch operations for collections
2. Improve error messages and recovery
3. Add progress indicators for conversions

### Low Priority
1. Add data export/import functionality
2. Add keyboard shortcuts
3. Add conversion settings/options
