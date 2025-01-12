import '@testing-library/jest-dom';

// Mock storage
const store = {};

// Mock chrome API
global.chrome = {
  runtime: {
    onInstalled: {
      addListener: jest.fn(),
      callListeners: async () => {
        for (const listener of global.chrome.runtime.onInstalled.addListener.mock.calls) {
          await listener[0]();
        }
      },
      mockClear: () => {
        global.chrome.runtime.onInstalled.addListener.mockClear();
      }
    },
    onMessage: {
      addListener: jest.fn(),
      callListeners: (message, sender, sendResponse) => {
        for (const listener of global.chrome.runtime.onMessage.addListener.mock.calls) {
          listener[0](message, sender, sendResponse);
        }
      }
    },
    sendMessage: jest.fn()
  },
  storage: {
    local: {
      get: jest.fn().mockImplementation(key => {
        if (typeof key === 'string') {
          return Promise.resolve({ [key]: store[key] });
        }
        if (Array.isArray(key)) {
          const result = {};
          key.forEach(k => {
            result[k] = store[k];
          });
          return Promise.resolve(result);
        }
        return Promise.resolve({ ...store });
      }),
      set: jest.fn().mockImplementation(items => {
        Object.assign(store, items);
        return Promise.resolve();
      }),
      clear: jest.fn().mockImplementation(() => {
        Object.keys(store).forEach(key => delete store[key]);
        return Promise.resolve();
      }),
      mockClear: () => {
        global.chrome.storage.local.get.mockClear();
        global.chrome.storage.local.set.mockClear();
        global.chrome.storage.local.clear.mockClear();
      }
    }
  },
  action: {
    onClicked: {
      addListener: jest.fn(),
      trigger: async (tab) => {
        for (const listener of global.chrome.action.onClicked.addListener.mock.calls) {
          await listener[0](tab);
        }
      },
      mockClear: () => {
        global.chrome.action.onClicked.addListener.mockClear();
      }
    }
  },
  sidePanel: {
    open: jest.fn().mockImplementation(({ windowId }) => {
      if (!windowId) {
        return Promise.reject(new Error('Invalid window ID'));
      }
      return Promise.resolve();
    }),
    mockClear: () => {
      global.chrome.sidePanel.open.mockClear();
    }
  }
};
