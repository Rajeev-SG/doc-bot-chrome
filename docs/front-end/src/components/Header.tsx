import React from 'react';
import { FileDown, History, Layout, Settings } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Layout className="w-6 h-6 text-indigo-600" />
          <h1 className="text-xl font-semibold text-gray-900">MD Convert</h1>
        </div>
        <nav className="flex space-x-4">
          <button
            onClick={() => onTabChange('convert')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
              ${activeTab === 'convert' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <FileDown className="w-4 h-4" />
            <span>Convert</span>
          </button>
          <button
            onClick={() => onTabChange('history')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
              ${activeTab === 'history' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <History className="w-4 h-4" />
            <span>History</span>
          </button>
          <button
            onClick={() => onTabChange('settings')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
              ${activeTab === 'settings' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </nav>
      </div>
    </header>
  );
}