import React from 'react';

interface MessageContentProps {
  content: string;
  isAdmin?: boolean;
  linkColor?: 'white' | 'purple';
}

export default function MessageContent({
  content,
  isAdmin = false,
  linkColor
}: MessageContentProps) {
  // Function to detect and convert URLs to clickable links
  const linkify = (text: string) => {
    // URL regex pattern
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlPattern);

    // Determine link color
    let colorClass = 'text-primary';
    if (linkColor === 'white') {
      colorClass = 'text-white';
    } else if (linkColor === 'purple') {
      colorClass = 'text-primary';
    } else if (isAdmin) {
      colorClass = 'text-white';
    }

    return parts.map((part, index) => {
      if (part.match(urlPattern)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className={`underline hover:opacity-80 transition-opacity ${colorClass}`}
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return <span className="break-words">{linkify(content)}</span>;
}
