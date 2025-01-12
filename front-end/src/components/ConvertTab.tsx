import { type FC, useState, useEffect } from 'react';
import { FileDown, Eye, Pencil, Save } from 'lucide-react';
import { MarkdownEntry } from '../types';

interface ConvertTabProps {
  onSave: (entry: Omit<MarkdownEntry, 'id' | 'timestamp'>) => void;
  initialContent: { title: string; content: string; url: string; } | null;
  onContentChange: (content: { title: string; content: string; url: string; } | null) => void;
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

export const ConvertTab: FC<ConvertTabProps> = ({ onSave, initialContent, onContentChange }) => {
  const [mode, setMode] = useState<'preview' | 'edit'>('preview');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load initial content if available
  useEffect(() => {
    if (initialContent) {
      setTitle(initialContent.title);
      setContent(initialContent.content);
    }
  }, [initialContent]);

  // Update parent state when content changes
  useEffect(() => {
    if (content || title) {
      onContentChange({
        title,
        content,
        url: window.location.href,
      });
    } else {
      onContentChange(null);
    }
  }, [content, title, onContentChange]);

  const handleConvert = async () => {
    setIsConverting(true);
    setError(null);

    try {
      // Get the current active tab across all windows
      const [tab] = await window.chrome.tabs.query({ active: true, lastFocusedWindow: true });
      
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
    
    // Clear the form and parent state
    setTitle('');
    setContent('');
    onContentChange(null);
  };

  return (
    <div className="py-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Page title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setMode(mode === 'preview' ? 'edit' : 'preview')}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {mode === 'preview' ? (
              <>
                <Pencil className="w-4 h-4 mr-1" />
                <span className="hidden xs:inline">Edit</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-1" />
                <span className="hidden xs:inline">Preview</span>
              </>
            )}
          </button>
          <button
            onClick={handleConvert}
            disabled={isConverting}
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileDown className="w-4 h-4 mr-1" />
            <span className="hidden xs:inline">{isConverting ? 'Converting...' : 'Convert'}</span>
          </button>
          <button
            onClick={handleSave}
            disabled={!content}
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 mr-1" />
            <span className="hidden xs:inline">Save</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex-1 flex flex-col min-h-[calc(100vh-200px)]">
        {mode === 'preview' ? (
          <div className="flex-1 overflow-y-auto bg-white border border-gray-200 rounded-md p-4">
            {content ? (
              <pre className="font-mono text-sm whitespace-pre-wrap h-full">{content}</pre>
            ) : (
              <div className="text-gray-500 text-sm h-full">
                Click "Convert" to fetch the page content
              </div>
            )}
          </div>
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm resize-none"
            placeholder="Markdown content..."
          />
        )}
      </div>
    </div>
  );
};