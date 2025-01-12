# Known Issues and Future Improvements

## Current Issues

### Markdown Conversion
- [ ] Basic text conversion instead of proper markdown formatting
- [ ] No Jina API integration implemented yet
- [ ] No progress indicator during conversion
- [ ] Some formatting may be lost during conversion

### UI/UX Issues
- [ ] Download functionality not working
- [ ] No loading states for async operations
- [ ] No error recovery UI for failed operations
- [ ] Limited feedback for successful operations

### Storage and State Management
- [ ] No data persistence across browser sessions
- [ ] No data export functionality
- [ ] No backup/restore functionality
- [ ] No data migration strategy

## Workarounds

### Markdown Conversion Issues
1. For basic conversion:
   - Currently using simple text extraction
   - Manual formatting may be required
   - Consider copying content before conversion for backup

2. For missing Jina integration:
   - Use manual markdown editing for better formatting
   - Preview mode helps verify formatting
   - Save frequently to avoid losing changes

### UI/UX Issues
1. For download functionality:
   - Copy and paste content to a local file
   - Use browser's save functionality where possible
   - Consider using collections for organization

2. For async operations:
   - Wait a few seconds for operations to complete
   - Check the preview mode to verify changes
   - Refresh the side panel if needed

### Storage Issues
1. For data persistence:
   - Save important conversions to local files
   - Use collections to organize content
   - Export important content manually

## Future Improvements

### High Priority
1. Integrate Jina API for proper markdown conversion
2. Implement download functionality
3. Add loading states and better error handling
4. Improve data persistence across sessions

### Medium Priority
1. Add data export/import functionality
2. Implement backup/restore features
3. Add batch operations for collections
4. Improve preview rendering

### Low Priority
1. Add keyboard shortcuts
2. Implement search functionality
3. Add custom themes
4. Support for different markdown flavors

## Development Notes

### Testing Gaps
- Need integration tests for Chrome extension environment
- Need end-to-end tests for user workflows
- Need better error simulation in tests
- Need tests for edge cases in storage operations

### Documentation Needs
- Add API documentation
- Improve setup instructions
- Add troubleshooting guide
- Document test coverage
