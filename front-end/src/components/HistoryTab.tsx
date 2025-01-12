import React, { useState } from 'react';
import { Download, FolderPlus, Trash2, Eye } from 'lucide-react';
import { MarkdownEntry, Collection } from '../types';
import { PreviewModal } from './PreviewModal';

interface HistoryTabProps {
  entries: MarkdownEntry[];
  onToggleSelect: (id: string) => void;
  onAddToCollection: (entries: MarkdownEntry[], name: string) => void;
  onDelete: (id: string) => void;
}

export function HistoryTab({ entries, onToggleSelect, onAddToCollection, onDelete }: HistoryTabProps) {
  const [collectionName, setCollectionName] = useState('');
  const [previewEntry, setPreviewEntry] = useState<MarkdownEntry | null>(null);
  const selectedEntries = entries.filter(entry => entry.selected);

  const handleAddToCollection = () => {
    if (selectedEntries.length === 0 || !collectionName.trim()) return;
    onAddToCollection(selectedEntries, collectionName.trim());
    setCollectionName('');
  };

  const createEntryContent = (entry: MarkdownEntry) => {
    return `---
title: ${entry.title}
url: ${entry.url}
date: ${new Date(entry.timestamp).toISOString()}
---

${entry.content}

`;
  };

  const handleDownload = (entry: MarkdownEntry | Collection) => {
    let content = '';
    let filename = '';

    if ('type' in entry && entry.type === 'collection') {
      // For collections, concatenate all entries with clear separation
      content = `# Collection: ${entry.title}\n\n`;
      content += (entry as Collection).entries.map((e: MarkdownEntry, index: number) => {
        return `## File ${index + 1}: ${e.title}\n\n${createEntryContent(e)}`;
      }).join('\n---\n\n');
      filename = `${entry.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_collection.md`;
    } else {
      // For single entries
      content = createEntryContent(entry as MarkdownEntry);
      filename = `${entry.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    }
    
    // Create blob and download link
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          placeholder="Collection name..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          onClick={handleAddToCollection}
          disabled={selectedEntries.length === 0 || !collectionName.trim()}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FolderPlus className="w-4 h-4" />
          <span>Add to Collection ({selectedEntries.length} selected)</span>
        </button>
      </div>

      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                {!entry.type && (
                  <input
                    type="checkbox"
                    checked={entry.selected}
                    onChange={() => onToggleSelect(entry.id)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                )}
                <h3 className="text-lg font-medium text-gray-900">
                  {entry.type === 'collection' ? `📁 ${entry.title}` : entry.title}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPreviewEntry(entry)}
                  className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDownload(entry)}
                  className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(entry.id)}
                  className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {entry.type === 'collection' 
                ? `${(entry as Collection).entries.length} items` 
                : `Converted on ${new Date(entry.timestamp).toLocaleString()}`}
            </p>
            {!entry.type && (
              <p className="text-sm text-gray-500 truncate">
                {entry.url}
              </p>
            )}
          </div>
        ))}
      </div>

      {previewEntry && (
        <PreviewModal entry={previewEntry} onClose={() => setPreviewEntry(null)} />
      )}
    </div>
  );
}