import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  message: ToastMessage;
  onDismiss: (id: string) => void;
}

export function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(message.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message.id, onDismiss]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  const colors = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200'
  };

  return (
    <div className={`flex items-center justify-between p-4 border rounded-lg ${colors[message.type]}`}>
      <div className="flex items-center space-x-3">
        {icons[message.type]}
        <p className="text-sm font-medium">{message.message}</p>
      </div>
      <button
        onClick={() => onDismiss(message.id)}
        className="text-gray-400 hover:text-gray-500"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}