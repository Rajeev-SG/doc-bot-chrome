import React from 'react';
import { X } from 'lucide-react';
import { MarkdownEntry, Collection } from '../types';
import { CollectionPreview } from './CollectionPreview';

interface PreviewModalProps {
  entry: MarkdownEntry | null;
  onClose: () => void;
}

export function PreviewModal({ entry, onClose }: PreviewModalProps) {
  if (!entry) return null;

  const isCollection = entry.type === 'collection';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[500px] max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {isCollection ? `Collection: ${entry.title}` : entry.title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1">
          {isCollection ? (
            <CollectionPreview collection={entry as Collection} />
          ) : (
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {entry.content}
            </pre>
          )}
        </div>
        
        <div className="border-t p-4 text-sm text-gray-500">
          <p>Created: {new Date(entry.timestamp).toLocaleString()}</p>
          {!isCollection && <p className="truncate">Source: {entry.url}</p>}
        </div>
      </div>
    </div>
  );
}