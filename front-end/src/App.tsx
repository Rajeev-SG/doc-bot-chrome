import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ConvertTab } from './components/ConvertTab';
import { HistoryTab } from './components/HistoryTab';
import { Toast } from './components/Toast';
import { MarkdownEntry, Collection, ToastMessage } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('convert');
  const [entries, setEntries] = useState<MarkdownEntry[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [unsavedConversion, setUnsavedConversion] = useState<{
    title: string;
    content: string;
    url: string;
  } | null>(null);

  const showToast = useCallback((message: string, type: ToastMessage['type'] = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const handleSave = useCallback((entry: Omit<MarkdownEntry, 'id' | 'timestamp'>) => {
    const newEntry: MarkdownEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      selected: false,
    };
    setEntries(prev => [newEntry, ...prev]);
    showToast('Markdown saved successfully!', 'success');
  }, [showToast]);

  const handleToggleSelect = useCallback((id: string) => {
    setEntries(prev => prev.map(entry =>
      entry.id === id ? { ...entry, selected: !entry.selected } : entry
    ));
  }, []);

  const handleAddToCollection = useCallback((selectedEntries: MarkdownEntry[], name: string) => {
    const newCollection: Collection = {
      id: Date.now().toString(),
      type: 'collection',
      title: name,
      content: '',
      url: '',
      timestamp: new Date().toISOString(),
      entries: selectedEntries.map(entry => ({ ...entry, selected: false })),
    };
    
    setEntries(prev => [
      newCollection,
      ...prev.map(entry => ({ ...entry, selected: false }))
    ]);
    
    showToast(`Collection "${name}" created with ${selectedEntries.length} items`, 'success');
  }, [showToast]);

  const handleDelete = useCallback((id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    showToast('Entry deleted successfully!', 'success');
  }, [showToast]);

  const handleDismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Load entries from chrome.storage.local on component mount
  useEffect(() => {
    const loadEntries = async () => {
      try {
        const result = await chrome.storage.local.get('entries');
        if (result.entries) {
          setEntries(result.entries);
        }
      } catch (error) {
        console.error('Failed to load entries:', error);
        showToast('Failed to load entries', 'error');
      }
    };
    loadEntries();
  }, []);

  // Save entries to chrome.storage.local whenever they change
  useEffect(() => {
    const saveEntries = async () => {
      try {
        await chrome.storage.local.set({ entries });
      } catch (error) {
        console.error('Failed to save entries:', error);
        showToast('Failed to save entries', 'error');
      }
    };
    saveEntries();
  }, [entries]);

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden">
        <div className="container mx-auto max-w-3xl px-4">
          {activeTab === 'convert' && (
            <ConvertTab 
              onSave={handleSave} 
              initialContent={unsavedConversion}
              onContentChange={setUnsavedConversion}
            />
          )}
          
          {activeTab === 'history' && (
            <HistoryTab
              entries={entries}
              onToggleSelect={handleToggleSelect}
              onAddToCollection={handleAddToCollection}
              onDelete={handleDelete}
            />
          )}
        </div>

        <div className="fixed bottom-4 right-4 space-y-2 w-64 sm:w-72 z-50">
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              message={toast}
              onDismiss={handleDismissToast}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;