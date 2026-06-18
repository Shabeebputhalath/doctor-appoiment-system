import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, MessageCircle, X, Maximize2, Minimize2 } from 'lucide-react';
import { getSocket } from '../../services/socketService';
import { toast } from 'sonner';
import { syncChatRealtime, sendChatMessageRealtime } from '../../services/firebase';

interface Message {
  from: string;
  fromName: string;
  message: string;
  timestamp: string;
}

interface ChatWindowProps {
  currentUser: { email: string; name: string };
  recipient: { email: string; name: string } | null;
  onClose?: () => void;
  isFloating?: boolean;
}

export const ChatWindow = ({ currentUser, recipient, onClose, isFloating = false }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Firestore real-time message stream
  useEffect(() => {
    if (!recipient) {
      setMessages([]);
      return;
    }

    // Load original database cache
    fetch(`/api/messages?user1=${encodeURIComponent(currentUser.email)}&user2=${encodeURIComponent(recipient.email)}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMessages(data);
        }
      })
      .catch(err => {
        console.error('Failed to load message history:', err);
      });

    // Subscribe to Firestore for continuous, instant real-time sync
    const unsubscribe = syncChatRealtime(currentUser.email, recipient.email, (liveMsgs) => {
      if (liveMsgs && liveMsgs.length > 0) {
        setMessages(liveMsgs);
      }
    });

    return () => unsubscribe();
  }, [currentUser.email, recipient?.email]);

  useEffect(() => {
    const socket = getSocket(currentUser.email);

    const handleMessage = (msg: Message) => {
      // Socket used for real-time lightweight notifications if recipient doesn't have focus
      if (recipient && (msg.from === recipient.email || msg.from === currentUser.email)) {
        setMessages(prev => {
          const exists = prev.some(m => m.timestamp === msg.timestamp && m.from === msg.from && m.message === msg.message);
          if (exists) return prev;
          return [...prev, msg];
        });
      }
    };

    socket.on('chat:receive', handleMessage);

    return () => {
      socket.off('chat:receive', handleMessage);
    };
  }, [currentUser.email, recipient]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !recipient) return;

    const textToSend = input.trim();
    setInput('');

    const timestamp = new Date().toISOString();
    const payload = {
      to: recipient.email,
      from: currentUser.email,
      fromName: currentUser.name,
      message: textToSend,
      timestamp
    };

    // 1. Emit via socket for instant browser push
    const socket = getSocket();
    socket.emit('chat:send', payload);

    // 2. Persists to real-time Firestore database
    try {
      await sendChatMessageRealtime(payload);
    } catch (err) {
      console.error('Firestore chat persist failed:', err);
    }
  };

  if (isFloating && isMinimized) {
    return (
      <button 
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  const containerClasses = isFloating 
    ? "fixed bottom-8 right-8 w-96 h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col border border-slate-100 z-50 overflow-hidden"
    : "w-full h-[600px] bg-white rounded-3xl shadow-lg flex flex-col border border-slate-100 overflow-hidden";

  return (
    <motion.div 
      initial={isFloating ? { opacity: 0, y: 20, scale: 0.95 } : {}}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={containerClasses}
    >
      {/* Header */}
      <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
            <User size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm tracking-tight">
              {recipient ? recipient.name : 'Select a contact'}
            </h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isFloating && (
            <button onClick={() => setIsMinimized(true)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Minimize2 size={16} />
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-red-400">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 p-6 overflow-y-auto bg-slate-50 space-y-4"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
             <MessageCircle size={48} className="text-slate-300" />
             <p className="text-sm font-bold text-slate-400">Start a secure conversation...</p>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.from === currentUser.email;
            return (
              <div 
                key={idx} 
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium ${
                  isMe 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white text-slate-900 rounded-tl-none shadow-sm'
                }`}>
                  {msg.message}
                </div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 px-1">
                  {isMe ? 'Sent' : msg.fromName} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-4 bg-white border-t border-slate-100 flex items-center gap-3">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none"
        />
        <button 
          type="submit"
          disabled={!input.trim() || !recipient}
          className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:grayscale"
        >
          <Send size={18} />
        </button>
      </form>
    </motion.div>
  );
};
