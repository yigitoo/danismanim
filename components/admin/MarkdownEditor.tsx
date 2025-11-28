'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import {
  FiBold,
  FiItalic,
  FiList,
  FiLink,
  FiImage,
  FiCode,
  FiEye,
  FiEdit3,
  FiColumns,
} from 'react-icons/fi';
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuTable,
  LuQuote,
  LuListOrdered,
} from 'react-icons/lu';
import { MdStrikethroughS, MdCheckBox, MdCode } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

type ViewMode = 'edit' | 'preview' | 'split';

export default function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('edit');

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea && viewMode !== 'preview') {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(500, textarea.scrollHeight)}px`;
    }
  }, [value, viewMode]);

  // Insert text with smart cursor positioning
  const insertText = useCallback(
    (before: string, after: string = '', placeholder: string = '') => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = value.substring(start, end);
      const textToInsert = selectedText || placeholder;

      const newValue =
        value.substring(0, start) +
        before +
        textToInsert +
        after +
        value.substring(end);

      onChange(newValue);

      // Set cursor position
      setTimeout(() => {
        textarea.focus();
        if (selectedText) {
          // If text was selected, place cursor after the insertion
          const newPos = start + before.length + textToInsert.length + after.length;
          textarea.setSelectionRange(newPos, newPos);
        } else {
          // If no text was selected, select the placeholder
          const selStart = start + before.length;
          const selEnd = selStart + textToInsert.length;
          textarea.setSelectionRange(selStart, selEnd);
        }
      }, 0);
    },
    [value, onChange]
  );

  // Insert at line start
  const insertAtLineStart = useCallback(
    (prefix: string) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Find the start of the current line
      const lineStart = value.lastIndexOf('\n', start - 1) + 1;

      // Check if line already has this prefix
      const line = value.substring(lineStart, value.indexOf('\n', lineStart) || value.length);
      const alreadyHasPrefix = line.trimStart().startsWith(prefix.trim());

      let newValue: string;
      let newCursorPos: number;

      if (alreadyHasPrefix) {
        // Remove prefix
        const prefixIndex = value.indexOf(prefix.trim(), lineStart);
        newValue =
          value.substring(0, prefixIndex) +
          value.substring(prefixIndex + prefix.length);
        newCursorPos = start - prefix.length;
      } else {
        // Add prefix
        newValue =
          value.substring(0, lineStart) +
          prefix +
          value.substring(lineStart);
        newCursorPos = start + prefix.length;
      }

      onChange(newValue);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(newCursorPos, newCursorPos + (end - start));
      }, 0);
    },
    [value, onChange]
  );

  // Insert table
  const insertTable = useCallback(() => {
    const tableMarkdown = `\n| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |\n\n`;
    insertText(tableMarkdown);
  }, [insertText]);

  // Insert code block
  const insertCodeBlock = useCallback(() => {
    insertText('\n```\n', '\n```\n', 'code here');
  }, [insertText]);

  // Insert horizontal rule
  const insertHorizontalRule = useCallback(() => {
    insertText('\n---\n\n');
  }, [insertText]);

  // Insert task list
  const insertTaskList = useCallback(() => {
    insertAtLineStart('- [ ] ');
  }, [insertAtLineStart]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;

      const shortcuts: Record<string, () => void> = {
        b: () => insertText('**', '**', 'bold text'),
        i: () => insertText('*', '*', 'italic text'),
        k: () => insertText('[', '](https://url)', 'link text'),
        e: () => insertText('`', '`', 'code'),
      };

      const action = shortcuts[e.key.toLowerCase()];
      if (action) {
        e.preventDefault();
        action();
      }
    };

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('keydown', handleKeyDown);
      return () => textarea.removeEventListener('keydown', handleKeyDown);
    }
  }, [insertText]);

  const toolbarButtons = [
    {
      icon: <LuHeading1 className="w-4 h-4" />,
      label: 'Heading 1',
      action: () => insertAtLineStart('# '),
    },
    {
      icon: <LuHeading2 className="w-4 h-4" />,
      label: 'Heading 2',
      action: () => insertAtLineStart('## '),
    },
    {
      icon: <LuHeading3 className="w-4 h-4" />,
      label: 'Heading 3',
      action: () => insertAtLineStart('### '),
    },
    { separator: true },
    {
      icon: <FiBold className="w-4 h-4" />,
      label: 'Bold (Ctrl+B)',
      action: () => insertText('**', '**', 'bold text'),
    },
    {
      icon: <FiItalic className="w-4 h-4" />,
      label: 'Italic (Ctrl+I)',
      action: () => insertText('*', '*', 'italic text'),
    },
    {
      icon: <MdStrikethroughS className="w-4 h-4" />,
      label: 'Strikethrough',
      action: () => insertText('~~', '~~', 'strikethrough text'),
    },
    { separator: true },
    {
      icon: <FiList className="w-4 h-4" />,
      label: 'Bullet List',
      action: () => insertAtLineStart('- '),
    },
    {
      icon: <LuListOrdered className="w-4 h-4" />,
      label: 'Numbered List',
      action: () => insertAtLineStart('1. '),
    },
    {
      icon: <MdCheckBox className="w-4 h-4" />,
      label: 'Task List',
      action: insertTaskList,
    },
    { separator: true },
    {
      icon: <LuQuote className="w-4 h-4" />,
      label: 'Blockquote',
      action: () => insertAtLineStart('> '),
    },
    {
      icon: <FiCode className="w-4 h-4" />,
      label: 'Inline Code (Ctrl+E)',
      action: () => insertText('`', '`', 'code'),
    },
    {
      icon: <MdCode className="w-4 h-4" />,
      label: 'Code Block',
      action: insertCodeBlock,
    },
    { separator: true },
    {
      icon: <FiLink className="w-4 h-4" />,
      label: 'Link (Ctrl+K)',
      action: () => insertText('[', '](https://url)', 'link text'),
    },
    {
      icon: <FiImage className="w-4 h-4" />,
      label: 'Image',
      action: () => insertText('![', '](https://image-url)', 'alt text'),
    },
    {
      icon: <LuTable className="w-4 h-4" />,
      label: 'Table',
      action: insertTable,
    },
  ];

  return (
    <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
        <div className="flex flex-wrap items-center gap-1">
          {toolbarButtons.map((button, index) =>
            button.separator ? (
              <div key={`sep-${index}`} className="w-px h-6 bg-gray-300 mx-1" />
            ) : (
              <button
                key={index}
                type="button"
                onClick={button.action}
                title={button.label}
                className="p-2.5 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 text-gray-600 hover:text-primary active:scale-95"
              >
                {button.icon}
              </button>
            )
          )}
        </div>

        {/* View Mode Controls */}
        <div className="flex-1" />
        <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
          <button
            type="button"
            onClick={() => setViewMode('edit')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              viewMode === 'edit'
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Edit Mode"
          >
            <FiEdit3 className="w-4 h-4" />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              viewMode === 'split'
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Split View"
          >
            <FiColumns className="w-4 h-4" />
            <span className="hidden sm:inline">Split</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              viewMode === 'preview'
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Preview Mode"
          >
            <FiEye className="w-4 h-4" />
            <span className="hidden sm:inline">Preview</span>
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className={`flex ${viewMode === 'split' ? 'divide-x-2 divide-gray-200' : ''}`}>
        {/* Textarea */}
        {viewMode !== 'preview' && (
          <div className={viewMode === 'split' ? 'w-1/2' : 'w-full'}>
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder || 'Write your content in markdown...'}
              className="w-full min-h-[500px] p-6 resize-none outline-none font-mono text-sm leading-relaxed text-gray-800 placeholder:text-gray-400"
              spellCheck={false}
            />
          </div>
        )}

        {/* Preview */}
        {viewMode !== 'edit' && (
          <div className={viewMode === 'split' ? 'w-1/2' : 'w-full'}>
            <div className="p-6 min-h-[500px] max-h-[700px] overflow-y-auto">
              {value ? (
                <article className="prose prose-slate max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h1:mb-4 prose-h2:text-3xl prose-h2:mb-3 prose-h3:text-2xl prose-h3:mb-2 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-bold prose-code:text-primary prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-blockquote:border-l-primary prose-blockquote:bg-gray-50 prose-blockquote:py-1 prose-blockquote:italic prose-img:rounded-lg prose-img:shadow-md prose-hr:border-gray-300 prose-table:border-collapse prose-th:bg-gray-100 prose-th:border prose-th:border-gray-300 prose-th:p-2 prose-td:border prose-td:border-gray-300 prose-td:p-2 prose-ul:list-disc prose-ol:list-decimal prose-li:text-gray-700">
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    components={{
                      // Custom rendering for task lists
                      input: ({ node, ...props }) => (
                        <input
                          {...props}
                          className="mr-2 accent-primary"
                          disabled
                        />
                      ),
                    }}
                  >
                    {value}
                  </ReactMarkdown>
                </article>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 italic">
                  <p>No content to preview...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer with hints */}
      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-200">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <span className="font-semibold">💡 Tip:</span>
            <span>Markdown formatting is supported</span>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">
            <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">Ctrl+B</kbd> Bold
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">
            <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">Ctrl+I</kbd> Italic
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">
            <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">Ctrl+K</kbd> Link
          </span>
        </div>
      </div>
    </div>
  );
}
