# Known Issues and Future Improvements

## Known Issues

### Content Script Injection
- [ ] Content script injection may fail on certain Chrome URLs (expected behavior due to Chrome security)
- [ ] No visual feedback when content script is injected successfully
- [ ] Content script injection state is not persisted across page reloads

### Jina API Integration
- [ ] Some websites may block the Jina Reader API request due to CORS
- [ ] No progress indicator during markdown conversion
- [ ] API errors may not be user-friendly
- [ ] No retry mechanism for failed API requests

### Storage
- [ ] Storage initialization only sets a basic flag
- [ ] No error recovery mechanism if storage initialization fails
- [ ] No cleanup mechanism for storage data
- [ ] No way to view stored markdown without console

## Workarounds

### Content Script Injection Issues
1. For restricted URLs:
   - Check the browser console for injection status
   - Retry injection by clicking the extension icon again
   - Use the extension on permitted URLs only

2. For verification:
   - Currently, check browser console for injection status
   - Use background script console to verify conversion

### Jina API Issues
1. For CORS errors:
   - Ensure the website allows external requests
   - Try using the extension on public websites
   - Check background script console for detailed error messages

2. For conversion issues:
   - Verify the page is fully loaded before converting
   - Check both consoles for error messages
   - Try refreshing the page and converting again

### Storage Issues
1. If initialization fails:
   - Check browser console for error messages
   - Clear extension storage and reload
   - Reinstall extension if issues persist

## Planned Improvements

### Short-term (Next Release)
- [ ] Add visual feedback for content script injection
- [ ] Add progress indicator for conversion process
- [ ] Implement storage cleanup mechanism
- [ ] Add basic UI for viewing stored markdown
- [ ] Improve error messages for API failures

### Medium-term
- [ ] Add popup UI for conversion status
- [ ] Implement persistent content script state
- [ ] Add storage data versioning
- [ ] Add markdown preview functionality
- [ ] Implement retry mechanism for API failures

### Long-term
- [ ] Add offline mode with cached conversions
- [ ] Implement batch conversion feature
- [ ] Add export functionality for stored markdown
- [ ] Create comprehensive error logging system

## Testing Status

### Current Test Coverage
- ✓ Background script initialization
- ✓ Content script injection
- ✓ Storage operations
- ✓ Error handling scenarios
- ✓ Basic API integration

### Known Test Limitations
- Limited Chrome API mock coverage
- No end-to-end testing
- Manual testing required for actual API calls
- No performance testing for large pages

## Contributing

Before submitting issues:
1. Check both consoles for error messages
2. Verify Chrome version compatibility
3. Check if issue occurs in incognito mode
4. Provide steps to reproduce the issue
5. Include console output from both contexts
