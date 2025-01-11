// Mock Chrome API
const store = {};

// Helper to simulate random failures for testing error handling
const simulateError = (probability = 0) => {
  if (Math.random() < probability) {
    throw new Error('Simulated Chrome API error');
  }
};

global.chrome = {
  runtime: {
    onInstalled: {
      listeners: [],
      addListener: jest.fn(callback => {
        if (typeof callback !== 'function') {
          throw new Error('Listener must be a function');
        }
        global.chrome.runtime.onInstalled.listeners.push(callback);
      }),
      callListeners: async function() {
        console.log('Calling listeners:', this.listeners.length);
        try {
          for (const listener of this.listeners) {
            await listener();
          }
        } catch (error) {
          console.error('Error in listener:', error);
          throw error;
        }
      },
      mockClear: function() {
        this.listeners = [];
        this.addListener.mockClear();
      }
    }
  },
  storage: {
    local: {
      get: jest.fn(async key => {
        try {
          simulateError(0);
          console.log('Getting key:', key, 'Current store:', store);
          if (typeof key === 'string') {
            return { [key]: store[key] };
          }
          return store;
        } catch (error) {
          console.error('Error in storage.local.get:', error);
          throw error;
        }
      }),
      set: jest.fn(async items => {
        try {
          simulateError(0);
          console.log('Setting items:', items);
          Object.assign(store, items);
          console.log('Store after set:', store);
        } catch (error) {
          console.error('Error in storage.local.set:', error);
          throw error;
        }
      }),
      clear: jest.fn(async () => {
        try {
          simulateError(0);
          console.log('Clearing store');
          Object.keys(store).forEach(key => delete store[key]);
          console.log('Store after clear:', store);
        } catch (error) {
          console.error('Error in storage.local.clear:', error);
          throw error;
        }
      }),
      mockClear: function() {
        this.get.mockClear();
        this.set.mockClear();
        this.clear.mockClear();
        Object.keys(store).forEach(key => delete store[key]);
      }
    }
  },
  tabs: {
    query: jest.fn().mockImplementation(() => Promise.resolve([])),
  },
  scripting: {
    executeScript: jest.fn().mockImplementation(() => Promise.resolve([{ result: true }])),
  },
  action: {
    onClicked: {
      listeners: [],
      addListener: jest.fn(callback => {
        if (typeof callback !== 'function') {
          throw new Error('Listener must be a function');
        }
        global.chrome.action.onClicked.listeners.push(callback);
      }),
      async trigger(tab) {
        console.log('Triggering action.onClicked');
        try {
          for (const listener of this.listeners) {
            await listener(tab);
          }
        } catch (error) {
          console.error('Error in action.onClicked listener:', error);
          throw error;
        }
      },
      mockClear() {
        this.listeners = [];
        this.addListener.mockClear();
      }
    }
  }
};
