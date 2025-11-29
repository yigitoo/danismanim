'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import type { Conversation, Message } from '@/types';
import MessageContent from './MessageContent';

export default function ChatWidget() {
  const pathname = usePathname();

  // Hide chat widget on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate unique visitor ID for each new chat session
  const generateVisitorId = () => {
    return `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Save chat state to localStorage
  const saveChatState = (conv: Conversation, userName: string, userEmail: string) => {
    const chatState = {
      conversation: conv,
      name: userName,
      email: userEmail,
      timestamp: Date.now(),
    };
    localStorage.setItem('activeChatSession', JSON.stringify(chatState));
  };

  // Load chat state from localStorage
  const loadChatState = () => {
    const savedState = localStorage.getItem('activeChatSession');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        // Check if session is less than 24 hours old
        const hoursSinceLastChat = (Date.now() - parsed.timestamp) / (1000 * 60 * 60);
        if (hoursSinceLastChat < 24) {
          return parsed;
        } else {
          // Clear old session
          localStorage.removeItem('activeChatSession');
        }
      } catch (error) {
        console.error('Error loading chat state:', error);
      }
    }
    return null;
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load existing chat session on mount
  useEffect(() => {
    const savedSession = loadChatState();
    if (savedSession) {
      setConversation(savedSession.conversation);
      setName(savedSession.name);
      setEmail(savedSession.email || '');
      setIsStarted(true);

      // Load messages
      loadMessagesForSession(savedSession.conversation._id);
    }
  }, []);

  const loadMessagesForSession = async (conversationId: string) => {
    try {
      const res = await fetch(`/api/chat/conversations/${conversationId}`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  // Poll for new messages and check if conversation still exists
  useEffect(() => {
    if (!conversation) return;

    const pollInterval = setInterval(async () => {
      try {
        // Check if conversation still exists
        const convRes = await fetch(`/api/chat/conversations/${conversation._id}`);

        if (convRes.status === 404) {
          // Conversation was deleted by admin
          setChatEnded(true);
          return;
        }

        // Poll for new messages
        const lastMessageTime = messages.length > 0
          ? messages[messages.length - 1].createdAt
          : null;

        const query = new URLSearchParams({
          conversationId: conversation._id!,
          ...(lastMessageTime && { since: new Date(lastMessageTime).toISOString() })
        });

        const res = await fetch(`/api/chat/messages?${query}`);
        const data = await res.json();

        if (data.messages && data.messages.length > 0) {
          setMessages(prev => [...prev, ...data.messages]);
        }
      } catch (error) {
        console.error('Error polling messages:', error);
      }
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(pollInterval);
  }, [conversation, messages]);

  // Start conversation
  const handleStartChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);

    try {
      // Generate a NEW unique visitor ID for this chat session
      const visitorId = generateVisitorId();

      // Create new conversation
      const res = await fetch('/api/chat/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId, visitorName: name, visitorEmail: email }),
      });

      if (res.status === 429) {
        const data = await res.json();
        const resetMinutes = Math.ceil((data.resetIn || 300) / 60);
        alert(`Çok fazla sohbet başlattınız. Lütfen ${resetMinutes} dakika sonra tekrar deneyin.`);
        setIsLoading(false);
        return;
      }

      if (!res.ok) {
        throw new Error('Failed to create conversation');
      }

      const data = await res.json();
      setConversation(data.conversation);

      // Save chat state to localStorage
      saveChatState(data.conversation, name, email);

      // Load existing messages if any
      const messagesRes = await fetch(`/api/chat/conversations/${data.conversation._id}`);
      const messagesData = await messagesRes.json();
      setMessages(messagesData.messages || []);

      setIsStarted(true);
    } catch (error) {
      console.error('Error starting chat:', error);
      alert('Sohbet başlatılamadı. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  // End chat and delete conversation
  const handleEndChat = async () => {
    if (!conversation) return;

    if (!confirm('Sohbeti sonlandırmak istediğinize emin misiniz? Tüm mesajlar silinecektir.')) {
      return;
    }

    try {
      const res = await fetch(`/api/chat/conversations/${conversation._id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        handleResetChat();
      } else {
        alert('Sohbet sonlandırılamadı. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Error ending chat:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  // Reset chat to initial state
  const handleResetChat = () => {
    localStorage.removeItem('activeChatSession');
    setIsStarted(false);
    setConversation(null);
    setMessages([]);
    setName('');
    setEmail('');
    setChatEnded(false);
  };

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !conversation) return;

    const messageText = message;
    setMessage('');

    try {
      const res = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: conversation._id,
          sender: 'visitor',
          senderName: name,
          message: messageText,
        }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, data.message]);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
      setMessage(messageText);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-primary-dark to-primary rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow z-50"
            aria-label="Open chat"
          >
            <FiMessageCircle size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-dark to-primary text-white p-4 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg">Canlı Destek</h3>
                {isStarted ? (
                  <p className="text-sm text-white/90">{name}</p>
                ) : (
                  <p className="text-sm text-white/90">Size nasıl yardımcı olabiliriz?</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {isStarted && (
                  <button
                    onClick={handleEndChat}
                    className="text-white/80 hover:text-white text-xs px-3 py-1 hover:bg-white/20 rounded-full transition-colors"
                    title="Sohbeti Sonlandır"
                  >
                    Sonlandır
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {!isStarted ? (
              /* Start Form */
              <div className="flex-1 p-6 flex flex-col justify-center">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiMessageCircle size={32} className="text-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    Sohbeti Başlat
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Size daha iyi yardımcı olabilmemiz için bilgilerinizi paylaşın
                  </p>
                </div>

                <form onSubmit={handleStartChat} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Adınız *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input"
                      placeholder="Adınız ve soyadınız"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      E-posta (İsteğe bağlı)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input"
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-full"
                    style={{borderRadius: '10px', padding: '10px'}}
                  >
                    <span className='text-primary'>
                    {isLoading ? 'Başlatılıyor...' : 'Sohbeti Başlat'}
                    </span>
                  </button>
                </form>
              </div>
            ) : chatEnded ? (
              /* Chat Ended Screen */
              <div className="flex-1 flex flex-col items-center justify-center p-6 bg-muted">
                <div className="text-center max-w-sm">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiX size={32} className="text-red-500" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    Sohbet Sonlandırıldı
                  </h4>
                  <p className="text-muted-foreground text-sm mb-6">
                    Danışmanım ekibi bu sohbeti sonlandırdı. Yeni bir sohbet başlatmak için aşağıdaki butona tıklayın.
                  </p>
                  <button
                    onClick={handleResetChat}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
                  >
                    Yeni Sohbet Başlat
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted">
                  {messages.length === 0 && (
                    <div className="text-center text-muted-foreground text-sm py-8">
                      Sohbete başlamak için bir mesaj gönderin
                    </div>
                  )}
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`flex ${
                        msg.sender === 'visitor' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                          msg.sender === 'visitor'
                            ? 'bg-primary text-white rounded-br-sm'
                            : 'bg-white text-foreground rounded-bl-sm shadow-sm'
                        }`}
                      >
                        {msg.sender === 'admin' && (
                          <p className="text-xs font-medium text-primary mb-1">
                            {msg.senderName}
                          </p>
                        )}
                        <p className="text-sm">
                          <MessageContent
                            content={msg.message}
                            linkColor={msg.sender === 'visitor' ? 'white' : 'purple'}
                          />
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender === 'visitor'
                              ? 'text-white/70'
                              : 'text-foreground/50'
                          }`}
                        >
                          {new Date(msg.createdAt!).toLocaleTimeString('tr-TR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 px-4 py-2 border border-border rounded-full focus:outline-none focus:border-primary transition-colors"
                      placeholder="Mesajınızı yazın..."
                    />
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiSend size={18} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
