import { type FC, useState } from 'react';
import { FileDown, Eye, Pencil, Save } from 'lucide-react';
import { MarkdownEntry } from '../types';

interface ConvertTabProps {
  onSave: (entry: Omit<MarkdownEntry, 'id' | 'timestamp'>) => void;
}

interface ConversionResponse {
  title: string;
  content: string;
  url: string;
}

declare global {
  interface Window {
    chrome: typeof chrome;
  }
}

export const ConvertTab: FC<ConvertTabProps> = ({ onSave }) => {
  const [mode, setMode] = useState<'preview' | 'edit'>('preview');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    setIsConverting(true);
    setError(null);

    try {
      // Get the current active tab
      const [tab] = await window.chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab?.id || !tab.url) {
        throw new Error('No active tab found');
      }

      // Send message to background script
      const response = await window.chrome.runtime.sendMessage({
        type: 'convert_page',
        tabId: tab.id,
        url: tab.url
      }) as ConversionResponse;

      setTitle(response.title);
      setContent(response.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert page');
      console.error('Conversion error:', err);
    } finally {
      setIsConverting(false);
    }
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      return;
    }
    
    onSave({
      title,
      content,
      url: window.location.href,
    });
    
    // Clear the form
    setTitle('');
    setContent('');
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={handleConvert}
            disabled={isConverting}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileDown className="w-4 h-4" />
            <span>{isConverting ? 'Converting...' : 'Convert Page'}</span>
          </button>
          <button
            onClick={() => setMode(mode === 'preview' ? 'edit' : 'preview')}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            {mode === 'preview' ? (
              <>
                <Pencil className="w-4 h-4" />
                <span>Edit</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </>
            )}
          </button>
        </div>
        <button
          onClick={handleSave}
          disabled={!title.trim() || !content.trim()}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          <span>Save</span>
        </button>
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />

      {mode === 'preview' ? (
        <div className="w-full h-[400px] px-3 py-2 border border-gray-300 rounded-md overflow-auto prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap">{content}</div>
        </div>
      ) : (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Markdown content..."
          className="w-full h-[400px] px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
        />
      )}

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
    </div>
  );
};