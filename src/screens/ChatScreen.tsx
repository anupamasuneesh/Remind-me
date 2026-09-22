import React, { useState, useRef, useEffect } from 'react';
import { ScreenId, ChatMessage } from '../types';
import { INITIAL_CHAT_MESSAGES, CHAT_PARTNER_AVATAR } from '../data/mockData';

interface ChatScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [callActive, setCallActive] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'read',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Realistic bot reply after short delay
    setTimeout(() => {
      setIsTyping(false);
      const replyMsg: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'alex',
        text: 'Thanks for the update! Let me know if you need any additional attendance statistics or route data.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read',
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-160px)] max-w-5xl mx-auto w-full px-2 md:px-6 py-2 pb-24">
      {/* Call Mock Overlay */}
      {callActive && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-white animate-in fade-in">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary shadow-2xl mb-4 animate-pulse">
            <img src={CHAT_PARTNER_AVATAR} alt="Alex Johnson" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-xl font-bold">Alex Johnson</h3>
          <p className="text-sm text-white/70 mb-8">{callActive === 'video' ? 'Video calling...' : 'Voice calling...'}</p>
          <div className="flex gap-4">
            <button
              onClick={() => setCallActive(null)}
              className="w-14 h-14 rounded-full bg-error text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-2xl">call_end</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Chat Card Container */}
      <div className="flex-1 bg-surface-container-lowest rounded-3xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="px-4 md:px-6 py-3 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="p-1 rounded-full text-primary hover:bg-surface-container-high transition-colors cursor-pointer"
              title="Back to Dashboard"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>

            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary font-bold overflow-hidden border border-white shadow-xs">
                <img
                  src={CHAT_PARTNER_AVATAR}
                  alt="Alex Johnson"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-surface-container-lowest rounded-full shadow-xs" />
            </div>

            <div>
              <h2 className="text-sm md:text-base font-bold text-on-surface leading-tight">
                Alex Johnson
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <p className="text-[11px] text-on-surface-variant font-medium">Online</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2 text-on-surface-variant">
            <button
              onClick={() => setCallActive('video')}
              className="p-2 rounded-full hover:bg-surface-container-high hover:text-primary transition-all cursor-pointer"
              title="Video Call"
            >
              <span className="material-symbols-outlined text-[20px]">videocam</span>
            </button>
            <button
              onClick={() => setCallActive('voice')}
              className="p-2 rounded-full hover:bg-surface-container-high hover:text-primary transition-all cursor-pointer"
              title="Voice Call"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
            </button>
            <button
              onClick={() => onNavigate('connections')}
              className="p-2 rounded-full hover:bg-surface-container-high hover:text-primary transition-all cursor-pointer"
              title="Contact Info"
            >
              <span className="material-symbols-outlined text-[20px]">more_vert</span>
            </button>
          </div>
        </div>

        {/* Chat History Messages */}
        <div className="grow overflow-y-auto p-4 md:p-6 flex flex-col gap-3.5 bg-surface-bright">
          {/* Date Separator */}
          <div className="flex justify-center my-2">
            <span className="px-3.5 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-[11px] font-semibold select-none">
              Today
            </span>
          </div>

          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  isUser ? 'items-end self-end' : 'items-start self-start'
                } max-w-[85%] md:max-w-[70%]`}
              >
                <div
                  className={`px-4 py-2.5 rounded-[20px] text-xs md:text-sm shadow-xs leading-relaxed ${
                    isUser
                      ? 'bg-primary-container text-on-primary-container chat-bubble-user font-normal'
                      : 'bg-surface-container-high text-on-surface chat-bubble-recipient font-normal border border-outline-variant/20'
                  }`}
                >
                  {msg.text}
                </div>
                <span
                  className={`mt-1 text-[10px] text-outline flex items-center gap-1 ${
                    isUser ? 'mr-1.5' : 'ml-1.5'
                  }`}
                >
                  {msg.time}
                  {isUser && (
                    <span
                      className="material-symbols-outlined text-[13px] text-primary icon-filled"
                    >
                      done_all
                    </span>
                  )}
                </span>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 mt-2 transition-opacity">
              <div className="flex gap-1.5 items-center px-4 py-2 bg-surface-container-high rounded-full border border-outline-variant/20 shadow-xs">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                <span
                  className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
                <span
                  className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                />
                <span className="ml-2 text-xs text-on-surface-variant font-medium">
                  Alex is typing...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 md:p-4 bg-surface border-t border-outline-variant/30 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 md:gap-3 bg-surface-container-low p-1.5 md:p-2 rounded-[24px] border border-outline-variant/40 focus-within:border-primary-container transition-all"
          >
            <button
              type="button"
              className="p-1.5 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              title="Add Emoji"
            >
              <span className="material-symbols-outlined text-[22px]">mood</span>
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none focus:ring-0 outline-none py-1.5 px-2 text-xs md:text-sm text-on-surface placeholder:text-outline"
            />

            <button
              type="button"
              className="p-1.5 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              title="Attach File"
            >
              <span className="material-symbols-outlined text-[22px]">attach_file</span>
            </button>

            <button
              type="submit"
              className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center bg-primary-container text-on-primary-container rounded-full shadow-md hover:bg-primary active:scale-90 transition-all cursor-pointer shrink-0"
              title="Send Message"
            >
              <span className="material-symbols-outlined text-[22px] transform -rotate-45 ml-0.5">
                send
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
