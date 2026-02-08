
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, RefreshCcw, BookOpen, Calculator, HelpCircle, Menu, ClipboardCheck, Paperclip, X, FileText, Image as ImageIcon } from 'lucide-react';
import { geminiTutor } from '../services/geminiService';
import { MathText } from '../components/MathContent';

interface Message {
  role: 'user' | 'bot';
  text: string;
  filePreview?: {
    name: string;
    type: string;
    url: string;
  };
}

const TutorPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      text: `Chào mừng bạn đến với hệ thống Gia sư Trải Phẳng AI! 🤖

Tôi có thể giúp bạn:
1. Giải bài toán qua hình ảnh hoặc PDF.
2. Hướng dẫn lý thuyết chuẩn kỹ thuật.
3. Cung cấp bài tập vận dụng nâng cao.

Bạn muốn bắt đầu với chủ đề nào hay cần tôi giải đáp đề bài cụ thể?` 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ file: File; base64: string; mimeType: string } | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Tệp quá lớn! Vui lòng chọn tệp dưới 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      setSelectedFile({
        file,
        base64,
        mimeType: file.type
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSend = async (customMsg?: string) => {
    const msgText = customMsg || input.trim();
    if (!msgText && !selectedFile && !isLoading) return;

    const userMsg: Message = {
      role: 'user',
      text: customMsg ? `Yêu cầu: ${customMsg.toUpperCase()}` : msgText,
    };

    if (selectedFile) {
      userMsg.filePreview = {
        name: selectedFile.file.name,
        type: selectedFile.file.type,
        url: URL.createObjectURL(selectedFile.file)
      };
    }

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const fileToUpload = selectedFile ? { mimeType: selectedFile.mimeType, data: selectedFile.base64 } : undefined;
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    try {
      let response = '';
      if (customMsg === 'reset') {
        response = await geminiTutor.resetChat();
      } else {
        response = await geminiTutor.sendMessage(msgText, fileToUpload);
      }
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Xin lỗi, tôi gặp sự cố kết nối. Hãy thử nhấn nút Làm mới.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col px-2 sm:px-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-700 text-white rounded-2xl flex items-center justify-center shadow-lg">
            <Bot size={28} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight leading-none">Gia sư Trải Phẳng AI</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Hỗ trợ kỹ thuật đa phương thức</p>
          </div>
        </div>
        <button 
          onClick={() => handleSend('reset')}
          className="p-2 bg-white dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl transition-all shadow-sm"
          title="Làm mới hội thoại"
        >
          <RefreshCcw size={18} className="text-slate-500" />
        </button>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8 custom-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`relative max-w-[95%] sm:max-w-[85%] space-y-3`}>
                {m.filePreview && (
                  <div className={`flex flex-col gap-2 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                    {m.filePreview.type.startsWith('image/') ? (
                      <img src={m.filePreview.url} alt="Uploaded" className="max-h-64 rounded-xl object-contain border border-white/20" />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl">
                        <FileText size={24} className="text-red-500" />
                        <span className="text-xs font-bold truncate max-w-[150px]">{m.filePreview.name}</span>
                      </div>
                    )}
                  </div>
                )}
                <div className={`p-6 rounded-[2rem] shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700'
                }`}>
                  <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap font-medium prose dark:prose-invert max-w-none prose-p:my-2 prose-headings:mb-4 prose-headings:mt-2">
                    <MathText text={m.text} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 dark:bg-slate-800 px-6 py-4 rounded-3xl rounded-tl-none flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Gia sư đang phân tích...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Action Bar */}
        <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex gap-2 overflow-x-auto bg-slate-50/50 scrollbar-hide">
           <QuickBtn icon={<Menu size={14}/>} label="menu" onClick={() => handleSend("menu")} />
           <QuickBtn icon={<ClipboardCheck size={14}/>} label="quiz" onClick={() => handleSend("quiz")} />
           <QuickBtn icon={<BookOpen size={14}/>} label="lý thuyết" onClick={() => handleSend("lý thuyết")} />
           <QuickBtn icon={<Calculator size={14}/>} label="giải đề" onClick={() => handleSend("giải đề")} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 space-y-3">
          {selectedFile && (
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 animate-in slide-in-from-bottom-2">
              <div className="flex items-center gap-3">
                {selectedFile.mimeType.startsWith('image/') ? <ImageIcon size={20} className="text-blue-500" /> : <FileText size={20} className="text-blue-500" />}
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300 truncate max-w-[200px]">{selectedFile.file.name}</span>
              </div>
              <button onClick={removeFile} className="p-1 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full transition-colors">
                <X size={16} className="text-blue-600 dark:text-blue-400" />
              </button>
            </div>
          )}
          <div className="flex gap-3">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-blue-600 rounded-2xl transition-all active:scale-95"
              title="Đính kèm ảnh/PDF"
            >
              <Paperclip size={24} />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*,application/pdf" 
              className="hidden" 
            />
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Hỏi về Pytago, Cosin hoặc trải phẳng..."
              className="flex-1 bg-slate-50 dark:bg-slate-800 px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
            />
            <button 
              onClick={() => handleSend()}
              disabled={isLoading || (!input.trim() && !selectedFile)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center min-w-[64px]"
            >
              {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickBtn: React.FC<{ icon: React.ReactNode, label: string, onClick: () => void }> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 whitespace-nowrap px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95"
  >
    {icon} {label}
  </button>
);

export default TutorPage;
