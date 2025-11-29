'use client';

import { useState, useEffect, useRef } from 'react';
import { FiMessageCircle, FiSend, FiCheck, FiCheckCircle, FiX, FiFileText } from 'react-icons/fi';
import type { Conversation, Message } from '@/types';
import MessageContent from '@/components/MessageContent';

// Message templates
const MESSAGE_TEMPLATES = [
  {
    id: 1,
    label: 'Hoş Geldin Mesajı',
    content: 'Merhaba {name}, Danışmanım ekibine hoş geldiniz! Size nasıl yardımcı olabiliriz?',
  },
  {
    id: 2,
    label: 'Hemen Yardımcı',
    content: 'Merhaba {name}, hemen yardımcı oluyorum. Sorunuzu detaylı bir şekilde açıklayabilir misiniz?',
  },
  {
    id: 3,
    label: 'Randevu Bilgilendirme',
    content: 'Merhaba {name}, ücretsiz danışmanlık randevusu almak için bize +90 545 279 7664 numarasından ulaşabilir veya info@danismanim.co adresine mail atabilirsiniz.',
  },
  {
    id: 4,
    label: 'Ülke Bilgisi',
    content: 'Merhaba {name}, Yeni Zelanda, İngiltere, Dubai, Malta, ABD, Almanya ve Singapur için eğitim danışmanlığı hizmeti veriyoruz. Hangi ülke ile ilgileniyorsunuz?',
  },
  {
    id: 5,
    label: 'Web Sitesi Yönlendirme',
    content: 'Detaylı bilgi için web sitemizi ziyaret edebilirsiniz: https://danismanim.co',
  },
  {
    id: 6,
    label: 'Teşekkür & Kapanış',
    content: 'Teşekkür ederiz {name}, başka sorunuz olursa her zaman buradayız. İyi günler dileriz!',
  },
];

export default function AdminChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [chatEndedBy, setChatEndedBy] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load conversations
  const loadConversations = async () => {
    try {
      const res = await fetch('/api/chat/conversations');
      const data = await res.json();
      setConversations(data.conversations || []);
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  useEffect(() => {
    loadConversations();

    // Poll for new conversations
    const interval = setInterval(loadConversations, 5000);
    return () => clearInterval(interval);
  }, []);

  // Load messages for selected conversation
  const loadMessages = async (conversationId: string) => {
    try {
      const res = await fetch(`/api/chat/conversations/${conversationId}`);
      const data = await res.json();
      setMessages(data.messages || []);

      // Mark messages as read
      await fetch('/api/chat/messages/read', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, sender: 'admin' }),
      });

      // Refresh conversations to update unread count
      loadConversations();
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  // Poll for new messages in selected conversation and check if it still exists
  useEffect(() => {
    if (!selectedConversation) return;

    const pollInterval = setInterval(async () => {
      try {
        // Check if conversation still exists
        const convRes = await fetch(`/api/chat/conversations/${selectedConversation._id}`);

        if (convRes.status === 404) {
          // Conversation was deleted by visitor
          setChatEndedBy(selectedConversation.visitorName);
          return;
        }

        // Poll for new messages
        const lastMessageTime = messages.length > 0
          ? messages[messages.length - 1].createdAt
          : null;

        const query = new URLSearchParams({
          conversationId: selectedConversation._id!,
          ...(lastMessageTime && { since: new Date(lastMessageTime).toISOString() })
        });

        const res = await fetch(`/api/chat/messages?${query}`);
        const data = await res.json();

        if (data.messages && data.messages.length > 0) {
          setMessages(prev => [...prev, ...data.messages]);

          // Mark new messages as read
          await fetch('/api/chat/messages/read', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ conversationId: selectedConversation._id, sender: 'admin' }),
          });

          loadConversations();
        }
      } catch (error) {
        console.error('Error polling messages:', error);
      }
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [selectedConversation, messages]);

  // Select conversation
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setChatEndedBy(null);
    loadMessages(conversation._id!);
  };

  // Close ended chat notification
  const handleCloseEndedChat = () => {
    setChatEndedBy(null);
    setSelectedConversation(null);
    setMessages([]);
    loadConversations();
  };

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedConversation) return;

    const messageText = message;
    setMessage('');

    try {
      const res = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: selectedConversation._id,
          sender: 'admin',
          senderName: 'Danışmanım Ekibi',
          message: messageText,
        }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, data.message]);
      loadConversations();
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
      setMessage(messageText);
    }
  };

  // Delete conversation
  const handleDeleteConversation = async (conversationId: string) => {
    if (!confirm('Bu konuşmayı ve tüm mesajlarını kalıcı olarak silmek istediğinize emin misiniz?')) {
      return;
    }

    try {
      const res = await fetch(`/api/chat/conversations/${conversationId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        loadConversations();
        if (selectedConversation?._id === conversationId) {
          setSelectedConversation(null);
          setMessages([]);
        }
      } else {
        alert('Konuşma silinemedi. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  // Use template message
  const handleUseTemplate = (template: typeof MESSAGE_TEMPLATES[0]) => {
    if (!selectedConversation) return;

    // Replace {name} placeholder with actual visitor name
    const messageText = template.content.replace('{name}', selectedConversation.visitorName);
    setMessage(messageText);
    setShowTemplates(false);

    // Focus input
    messageInputRef.current?.focus();
  };

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Canlı Destek</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Ziyaretçilerle anlık mesajlaşma - {totalUnread} okunmamış mesaj
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 180px)' }}>
        <div className="flex h-full relative">
          {/* Conversations List */}
          <div className="w-full md:w-1/3 border-r border-border overflow-y-auto">
              <div className="p-4 bg-muted border-b border-border">
                <h2 className="font-semibold text-foreground">Konuşmalar</h2>
                <p className="text-sm text-muted-foreground">
                  {conversations.length} aktif konuşma
                </p>
              </div>

              {conversations.length === 0 ? (
                <div className="p-8 text-center">
                  <FiMessageCircle size={48} className="text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm">
                    Henüz konuşma yok
                  </p>
                </div>
              ) : (
                <div>
                  {conversations.map((conv) => (
                    <button
                      key={conv._id}
                      onClick={() => handleSelectConversation(conv)}
                      className={`w-full p-4 border-b border-border hover:bg-muted/50 transition-colors text-left ${
                        selectedConversation?._id === conv._id ? 'bg-muted' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground truncate">
                              {conv.visitorName}
                            </h3>
                            {conv.unreadCount > 0 && (
                              <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {conv.unreadCount}
                              </span>
                            )}
                          </div>
                          {conv.visitorEmail && (
                            <p className="text-xs text-muted-foreground truncate">
                              {conv.visitorEmail}
                            </p>
                          )}
                        </div>
                        {conv.status === 'closed' && (
                          <span className="text-xs bg-muted-dark text-foreground px-2 py-1 rounded">
                            Kapalı
                          </span>
                        )}
                      </div>
                      {conv.lastMessage && (
                        <p className="text-sm text-muted-foreground truncate mb-1">
                          {conv.lastMessage}
                        </p>
                      )}
                      {conv.lastMessageAt && (
                        <p className="text-xs text-muted-foreground">
                          {new Date(conv.lastMessageAt).toLocaleString('tr-TR', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Messages Panel */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Header */}
                  <div className="p-4 bg-muted border-b border-border flex items-center justify-between">
                    <div>
                      <h2 className="font-semibold text-foreground">
                        {selectedConversation.visitorName}
                      </h2>
                      {selectedConversation.visitorEmail && (
                        <p className="text-sm text-muted-foreground">
                          {selectedConversation.visitorEmail}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteConversation(selectedConversation._id!)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm flex items-center gap-2"
                    >
                      <FiX size={16} />
                      Konuşmayı Sonlandır
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
                    {chatEndedBy ? (
                      /* Chat Ended Notification */
                      <div className="flex items-center justify-center h-full">
                        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md text-center">
                          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiX size={32} className="text-red-500" />
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-2">
                            Sohbet Sonlandırıldı
                          </h3>
                          <p className="text-muted-foreground mb-6">
                            <span className="font-semibold text-foreground">{chatEndedBy}</span> bu sohbeti sonlandırdı.
                          </p>
                          <button
                            onClick={handleCloseEndedChat}
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                          >
                            Tamam
                          </button>
                        </div>
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="text-center text-muted-foreground text-sm py-8">
                        Henüz mesaj yok
                      </div>
                    ) : (
                      messages.map((msg) => (
                      <div
                        key={msg._id}
                        className={`flex ${
                          msg.sender === 'admin' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            msg.sender === 'admin'
                              ? 'bg-primary text-white rounded-br-sm'
                              : 'bg-white text-foreground rounded-bl-sm shadow-sm border border-border'
                          }`}
                        >
                          {msg.sender === 'visitor' && (
                            <p className="text-xs font-medium text-primary mb-1">
                              {msg.senderName}
                            </p>
                          )}
                          <p className="text-sm">
                            <MessageContent
                              content={msg.message}
                              isAdmin={msg.sender === 'admin'}
                            />
                          </p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <p
                              className={`text-xs ${
                                msg.sender === 'admin'
                                  ? 'text-white/70'
                                  : 'text-foreground/50'
                              }`}
                            >
                              {new Date(msg.createdAt!).toLocaleTimeString('tr-TR', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                            {msg.sender === 'admin' && (
                              <span className="text-white/70">
                                {msg.read ? <FiCheckCircle size={12} /> : <FiCheck size={12} />}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="border-t border-border bg-white">
                    {/* Templates */}
                    {showTemplates && (
                      <div className="p-3 border-b border-border bg-muted/30 max-h-48 overflow-y-auto">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-foreground">Hazır Mesajlar</h4>
                          <button
                            onClick={() => setShowTemplates(false)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <FiX size={16} />
                          </button>
                        </div>
                        <div className="space-y-1">
                          {MESSAGE_TEMPLATES.map((template) => (
                            <button
                              key={template.id}
                              onClick={() => handleUseTemplate(template)}
                              className="w-full text-left px-3 py-2 rounded-lg hover:bg-white transition-colors text-sm"
                            >
                              <p className="font-medium text-foreground text-xs mb-1">
                                {template.label}
                              </p>
                              <p className="text-muted-foreground text-xs line-clamp-1">
                                {template.content.replace('{name}', selectedConversation?.visitorName || '')}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSendMessage} className="p-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setShowTemplates(!showTemplates)}
                          className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                          title="Hazır Mesajlar"
                        >
                          <FiFileText size={18} />
                        </button>
                        <input
                          ref={messageInputRef}
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="flex-1 px-4 py-3 border border-border rounded-full focus:outline-none focus:border-primary transition-colors"
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
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-muted/30">
                  <div className="text-center">
                    <FiMessageCircle size={64} className="text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg font-medium">
                      Bir konuşma seçin
                    </p>
                    <p className="text-muted-foreground text-sm mt-2">
                      Mesajlaşmaya başlamak için soldaki listeden bir konuşma seçin
                    </p>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
