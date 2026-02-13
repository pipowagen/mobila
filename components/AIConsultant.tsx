
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(input, messages);
      const modelMessage: ChatMessage = { 
        role: 'model', 
        text: response.text,
        sources: response.sources.map((s: any) => ({
          web: s.web ? { uri: s.web.uri, title: s.web.title } : undefined
        }))
      };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "Îmi pare rău, am întâmpinat o dificultate tehnică. Te rugăm să încerci din nou mai târziu." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
      <div className="bg-slate-900 p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-bold">MaliMob Assistant</h3>
            <p className="text-slate-400 text-xs">Expert în design și materiale</p>
          </div>
        </div>
        <div className="flex gap-2">
           <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
           <span className="text-green-500 text-xs font-medium uppercase tracking-widest">Live Search</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="h-[450px] overflow-y-auto p-6 space-y-4 bg-slate-50"
      >
        {messages.length === 0 && (
          <div className="text-center py-10">
            <p className="text-slate-400 italic mb-4">Salut! Sunt asistentul tău MaliMob Oanea. Cu ce te pot ajuta astăzi?</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                "Ce trenduri de bucătării sunt în 2025?",
                "Ce lemn e mai rezistent?",
                "Sfaturi pentru mobilă mică",
                "Cum aleg culorile pentru living?"
              ].map(q => (
                <button 
                  key={q}
                  onClick={() => setInput(q)}
                  className="bg-white hover:bg-amber-50 text-slate-600 text-sm px-4 py-2 rounded-full border border-slate-200 transition-all shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-5 py-3 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-amber-600 text-white rounded-br-none' 
                : 'bg-white text-slate-800 rounded-bl-none border border-slate-100'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-2">Surse Consultate:</p>
                  <div className="flex flex-wrap gap-2">
                    {msg.sources.map((src, idx) => (
                      src.web && (
                        <a 
                          key={idx} 
                          href={src.web.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] bg-slate-100 hover:bg-amber-100 text-amber-800 px-2 py-1 rounded transition-colors truncate max-w-[200px]"
                        >
                          {src.web.title}
                        </a>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-2xl px-5 py-3 rounded-bl-none shadow-sm flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-75"></span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-100 flex gap-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Întreabă despre mobilă, design sau trenduri..."
          className="flex-grow bg-slate-50 border-none rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all"
        />
        <button 
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white p-3 rounded-xl transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default AIConsultant;
