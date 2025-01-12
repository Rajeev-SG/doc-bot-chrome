import { render, screen, fireEvent, act } from '@testing-library/react';
import { ConvertTab } from '../front-end/src/components/ConvertTab';

// Mock chrome API
global.chrome = {
  tabs: {
    query: jest.fn(),
  },
  runtime: {
    sendMessage: jest.fn(),
  },
};

describe('ConvertTab', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  // Test 1: Check if UI elements are rendered
  test('renders all UI elements correctly', () => {
    render(<ConvertTab onSave={() => {}} />);

    expect(screen.getByText('Convert Page')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter title...')).toBeInTheDocument();
    // Content area is initially in preview mode
    expect(screen.queryByPlaceholderText('Markdown content...')).not.toBeInTheDocument();
  });

  // Test 2: Test switching between preview and edit modes
  test('switches between preview and edit modes', () => {
    render(<ConvertTab onSave={() => {}} />);
    
    // Initially in preview mode
    expect(screen.queryByPlaceholderText('Markdown content...')).not.toBeInTheDocument();
    
    // Switch to edit mode
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByPlaceholderText('Markdown content...')).toBeInTheDocument();
    
    // Switch back to preview mode
    fireEvent.click(screen.getByText('Preview'));
    expect(screen.queryByPlaceholderText('Markdown content...')).not.toBeInTheDocument();
  });

  // Test 3: Test Convert Page button click
  test('sends message to background script when Convert Page is clicked', async () => {
    const mockTab = { id: 1, url: 'https://example.com' };
    chrome.tabs.query.mockResolvedValue([mockTab]);
    chrome.runtime.sendMessage.mockResolvedValue({
      title: 'Test Title',
      content: 'Test Content',
      url: 'https://example.com'
    });

    render(<ConvertTab onSave={() => {}} />);
    
    await act(async () => {
      fireEvent.click(screen.getByText('Convert Page'));
    });

    expect(chrome.tabs.query).toHaveBeenCalledWith({ active: true, currentWindow: true });
    expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({
      type: 'convert_page',
      tabId: 1,
      url: 'https://example.com'
    });
  });

  // Test 4: Test Save button click
  test('calls onSave with correct data when Save is clicked', async () => {
    const mockOnSave = jest.fn();
    render(<ConvertTab onSave={mockOnSave} />);

    // Switch to edit mode
    fireEvent.click(screen.getByText('Edit'));

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Enter title...'), {
      target: { value: 'Test Title' }
    });
    fireEvent.change(screen.getByPlaceholderText('Markdown content...'), {
      target: { value: 'Test Content' }
    });

    // Click save button
    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
    });

    expect(mockOnSave).toHaveBeenCalledWith({
      title: 'Test Title',
      content: 'Test Content',
      url: window.location.href
    });
  });

  // Test 5: Test error handling
  test('displays error message when conversion fails', async () => {
    const error = new Error('Failed to convert page');
    chrome.tabs.query.mockRejectedValue(error);

    render(<ConvertTab onSave={() => {}} />);

    await act(async () => {
      fireEvent.click(screen.getByText('Convert Page'));
    });

    expect(screen.getByText('Failed to convert page')).toBeInTheDocument();
  });
});
