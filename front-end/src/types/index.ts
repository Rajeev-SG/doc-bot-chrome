export interface MarkdownEntry {
  id: string;
  title: string;
  content: string;
  url: string;
  timestamp: string;
  selected?: boolean;
  type?: 'entry' | 'collection';
}

export interface Collection extends MarkdownEntry {
  type: 'collection';
  entries: MarkdownEntry[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}