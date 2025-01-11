import React, { useState } from 'react';
import { FileDown, Eye, Pencil, Save } from 'lucide-react';
import { MarkdownEntry } from '../types';

interface ConvertTabProps {
  onSave: (entry: Omit<MarkdownEntry, 'id' | 'timestamp'>) => void;
}

export function ConvertTab({ onSave }: ConvertTabProps) {
  const [mode, setMode] = useState<'preview' | 'edit'>('preview');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  // Add sample data for testing
  const handleConvert = async () => {
    setTitle('Sample Page');
    setContent('# Sample Page\n\nThis is some sample markdown content.');
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      return;
    }
    
    onSave({
      title,
      content,
      url: 'https://example.com/sample',
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
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <FileDown className="w-4 h-4" />
            <span>Convert Page</span>
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

      {mode === 'edit' ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[400px] px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
          placeholder="Markdown content..."
        />
      ) : (
        <div className="w-full h-[400px] px-3 py-2 border border-gray-300 rounded-md overflow-auto prose prose-sm max-w-none">
          <pre className="whitespace-pre-wrap">{content}</pre>
        </div>
      )}
    </div>
  );
}