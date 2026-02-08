
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Layers, 
  Menu, 
  X,
  Sun,
  Moon,
  Sparkles,
  ClipboardList,
  BookOpenCheck,
  Bot,
  Eye
} from 'lucide-react';

import HomePage from "./pages/HomePage";
import ConceptsPage from "./pages/ConceptsPage";
import ProcessPage from './pages/ProcessPage';
import PracticePage from './pages/PracticePage';
import SettingsPage from './pages/SettingsPage';
import ExamplesPage from './pages/ExamplesPage';
import ExercisesPage from './pages/ExercisesPage';
import TutorPage from './pages/TutorPage';
import ToolsPage from './pages/ToolsPage';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <HashRouter>
      <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-40">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px] animate-pulse"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Sidebar */}
        <aside className={`relative ${isSidebarOpen ? 'w-64' : 'w-24'} bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-r border-white/20 dark:border-slate-800/50 flex flex-col transition-all duration-500 z-50 shadow-2xl shadow-blue-500/5`}>
          <div className="p-6 flex items-center justify-between">
            {isSidebarOpen && (
              <div className="flex items-center gap-2 group cursor-default">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:rotate-12 transition-transform">
                  <Sparkles size={18} className="text-white" />
                </div>
                <span className="font-black text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 tracking-tight">Trải Phẳng</span>
              </div>
            )}
            {!isSidebarOpen && (
               <div className="mx-auto w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles size={20} className="text-white" />
               </div>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto py-4 space-y-1 custom-scrollbar">
            <NavItem to="/" icon={<Home size={22}/>} label="Trang chủ" isOpen={isSidebarOpen} />
            <NavItem to="/concepts" icon={<BookOpen size={22}/>} label="Lý thuyết" isOpen={isSidebarOpen} color="text-emerald-500" />
            <NavItem to="/process" icon={<Layers size={22}/>} label="Quy trình" isOpen={isSidebarOpen} color="text-orange-500" />
            <NavItem to="/examples" icon={<ClipboardList size={22}/>} label="Ví dụ" isOpen={isSidebarOpen} color="text-blue-500" />
            <NavItem to="/exercises" icon={<BookOpenCheck size={22}/>} label="Vận dụng" isOpen={isSidebarOpen} color="text-purple-500" />
            <NavItem to="/tools" icon={<Eye size={22}/>} label="Công cụ trực quan" isOpen={isSidebarOpen} color="text-pink-500" />
            <NavItem to="/tutor" icon={<Bot size={22}/>} label="Gia sư AI" isOpen={isSidebarOpen} color="text-indigo-500" />
            
            <div className="mt-8 px-6 py-2">
               <div className={`h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent ${!isSidebarOpen && 'mx-auto w-10'}`}></div>
               {isSidebarOpen && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4 mb-2 ml-1">Luyện tập</p>}
            </div>

            <NavItem to="/practice" icon={<ClipboardList size={22}/>} label="Thử thách" isOpen={isSidebarOpen} color="text-amber-500" />
          </nav>
          
          <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50 space-y-2">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center justify-center gap-3 w-full p-3 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-2xl transition-all group"
            >
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:scale-110 transition-transform">
                {darkMode ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} className="text-indigo-500" />}
              </div>
              {isSidebarOpen && <span className="font-bold text-sm text-slate-600 dark:text-slate-400">{darkMode ? 'Sáng' : 'Tối'}</span>}
            </button>
            <button 
              onClick={toggleSidebar} 
              className="flex items-center justify-center w-full p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 rounded-2xl transition-all"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 relative overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/concepts" element={<ConceptsPage />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/examples" element={<ExamplesPage />} />
              <Route path="/exercises" element={<ExercisesPage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/practice" element={<PracticePage />} />
              <Route path="/tutor" element={<TutorPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  color?: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isOpen, color = "text-blue-500" }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={`relative flex items-center px-4 py-3.5 mx-3 rounded-2xl transition-all duration-300 group ${
        isActive 
          ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/25 ring-1 ring-blue-400/50' 
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
      }`}
    >
      <div className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${!isActive ? color : 'text-white'}`}>
        {icon}
      </div>
      {isOpen && <span className={`ml-4 font-bold text-sm tracking-tight ${isActive ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}>{label}</span>}
      {!isOpen && isActive && (
        <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white shadow-glow"></div>
      )}
    </Link>
  );
};

export default App;
