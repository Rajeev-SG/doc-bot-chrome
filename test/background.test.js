describe('Background Script', () => {
  beforeEach(async () => {
    // Clear all storage before each test
    await chrome.storage.local.clear();
    
    // Reset all chrome API mocks
    chrome.runtime.onInstalled.mockClear();
    chrome.storage.local.get.mockClear();
    chrome.storage.local.set.mockClear();
    chrome.action.onClicked.mockClear();
    chrome.scripting.executeScript.mockClear();

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

    it('should handle content script injection errors', async () => {
      // Mock console.error to capture error messages
      const consoleSpy = jest.spyOn(console, 'error');
      
      // Force executeScript to fail
      chrome.scripting.executeScript.mockImplementationOnce(() => 
        Promise.reject(new Error('Injection error'))
      );

      // Simulate clicking the extension icon
      const tab = { id: 1 };
      await chrome.action.onClicked.trigger(tab);

      // Verify error was logged
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to inject content script:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it('should handle invalid tab gracefully', async () => {
      // Mock console.error to capture error messages
      const consoleSpy = jest.spyOn(console, 'error');
      
      // Simulate clicking the extension icon with invalid tab
      const invalidTab = { id: null };
      await chrome.action.onClicked.trigger(invalidTab);

      // Verify error was logged
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to inject content script:',
        expect.objectContaining({
          message: 'No valid tab found'
        })
      );

      consoleSpy.mockRestore();
    });

    it('should handle empty injection results gracefully', async () => {
      // Mock console.error to capture error messages
      const consoleSpy = jest.spyOn(console, 'error');
      
      // Mock executeScript to return empty results
      chrome.scripting.executeScript.mockImplementationOnce(() => 
        Promise.resolve([])
      );

      // Simulate clicking the extension icon
      const tab = { id: 1 };
      await chrome.action.onClicked.trigger(tab);

      // Verify error was logged
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to inject content script:',
        expect.objectContaining({
          message: 'Content script injection failed'
        })
      );

      consoleSpy.mockRestore();
    });
  });

  it('should successfully inject content script', async () => {
    // Mock console.log to capture success message
    const consoleSpy = jest.spyOn(console, 'log');
    
    // Mock successful script injection
    chrome.scripting.executeScript.mockImplementationOnce(() => 
      Promise.resolve([{ result: true }])
    );

    // Simulate clicking the extension icon
    const tab = { id: 1 };
    await chrome.action.onClicked.trigger(tab);

    // Verify success was logged
    expect(consoleSpy).toHaveBeenCalledWith('Content script injected successfully');
    expect(chrome.scripting.executeScript).toHaveBeenCalledWith({
      target: { tabId: 1 },
      files: ['content.js']
    });

    consoleSpy.mockRestore();
  });
});
