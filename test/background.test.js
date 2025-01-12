describe('Background Script', () => {
  beforeEach(async () => {
    // Clear all storage before each test
    await chrome.storage.local.clear();
    
    // Reset all chrome API mocks
    chrome.runtime.onInstalled.mockClear();
    chrome.storage.local.get.mockClear();
    chrome.storage.local.set.mockClear();
    chrome.action.onClicked.mockClear();
    chrome.sidePanel.open.mockClear();

    // Load the background script
    jest.isolateModules(() => {
      require('../background.js');
    });
  });

  it('should set isInitialized to true when extension is installed', async () => {
    // Trigger the onInstalled event and wait for all promises to resolve
    await chrome.runtime.onInstalled.callListeners();

    // Verify storage was set correctly
    const result = await chrome.storage.local.get('isInitialized');
    expect(result.isInitialized).toBe(true);
  });

  it('should maintain storage state after initialization', async () => {
    // Trigger the onInstalled event and wait for all promises to resolve
    await chrome.runtime.onInstalled.callListeners();

    // Verify initial state
    let result = await chrome.storage.local.get('isInitialized');
    expect(result.isInitialized).toBe(true);

    // Verify state persists
    result = await chrome.storage.local.get('isInitialized');
    expect(result.isInitialized).toBe(true);
  });

  describe('Error Handling', () => {
    it('should handle storage errors gracefully', async () => {
      // Mock console.error to capture error messages
      const consoleSpy = jest.spyOn(console, 'error');
      
      // Force storage.local.set to fail
      chrome.storage.local.set.mockImplementationOnce(() => 
        Promise.reject(new Error('Storage error'))
      );

      // Trigger the onInstalled event
      await chrome.runtime.onInstalled.callListeners();

      // Verify error was logged
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to initialize extension:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it('should handle side panel opening errors', async () => {
      // Mock console.error to capture error messages
      const consoleSpy = jest.spyOn(console, 'error');
      
      // Force sidePanel.open to fail
      chrome.sidePanel.open.mockImplementationOnce(() => 
        Promise.reject(new Error('Side panel error'))
      );

      // Simulate clicking the extension icon
      const tab = { id: 1, windowId: 1 };
      await chrome.action.onClicked.trigger(tab);

      // Verify error was logged
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to open side panel:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it('should handle invalid window ID gracefully', async () => {
      // Mock console.error to capture error messages
      const consoleSpy = jest.spyOn(console, 'error');
      
      // Simulate clicking the extension icon with invalid window ID
      const invalidTab = { id: 1, windowId: null };
      await chrome.action.onClicked.trigger(invalidTab);

      // Verify error was logged
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to open side panel:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  it('should successfully open side panel', async () => {
    // Mock console.log to capture success message
    const consoleSpy = jest.spyOn(console, 'log');
    
    // Simulate clicking the extension icon
    const tab = { id: 1, windowId: 1 };
    await chrome.action.onClicked.trigger(tab);

    // Verify success was logged
    expect(consoleSpy).toHaveBeenCalledWith('Side panel opened successfully');
    expect(chrome.sidePanel.open).toHaveBeenCalledWith({
      windowId: 1
    });

    consoleSpy.mockRestore();
  });

  describe('Message Handling', () => {
    it('should handle markdown messages', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const url = 'https://example.com';
      const content = '# Test Content';

      // Send a markdown message
      chrome.runtime.onMessage.callListeners(
        { type: 'markdown', url, content },
        { tab: { id: 1 } },
        () => {}
      );

      // Verify storage was updated
      const storedData = await chrome.storage.local.get(url);
      expect(storedData[url]).toEqual({
        timestamp: expect.any(Number),
        content
      });

      expect(consoleSpy).toHaveBeenCalledWith('Markdown stored successfully for:', url);
      consoleSpy.mockRestore();
    });

    it('should handle error messages', () => {
      const consoleSpy = jest.spyOn(console, 'error');
      const error = new Error('Test error');

      // Send an error message
      chrome.runtime.onMessage.callListeners(
        { type: 'error', error },
        { tab: { id: 1 } },
        () => {}
      );

      expect(consoleSpy).toHaveBeenCalledWith('Error from content script:', error);
      consoleSpy.mockRestore();
    });
  });
});
