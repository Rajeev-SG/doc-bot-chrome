import React from 'react';
import { Collection } from '../types';
import { FileText } from 'lucide-react';

interface CollectionPreviewProps {
  collection: Collection;
}

export function CollectionPreview({ collection }: CollectionPreviewProps) {
  return (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-700">Collection Contents:</h4>
      <div className="space-y-2">
        {collection.entries.map(entry => (
          <div key={entry.id} className="flex items-center space-x-2 text-sm text-gray-600">
            <FileText className="w-4 h-4" />
            <span>{entry.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}