
import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Zap, ChevronRight, BookOpen, ClipboardList, Target } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white shadow-2xl shadow-blue-500/20">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-[80px]"></div>
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-widest">
            <Zap size={14} className="fill-current" /> Next-Gen Technical Support
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1]">
            Làm Chủ <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-indigo-200 to-white">Kỹ Thuật Trải Phẳng</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100/80 font-medium leading-relaxed max-w-2xl">
            Hệ thống chuyên sâu giúp tối ưu hóa việc tìm đường đi ngắn nhất trên bề mặt 3D với quy trình chuẩn kỹ thuật.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/process" className="px-8 py-4 bg-white text-blue-900 rounded-2xl font-black shadow-xl hover:scale-105 transition-all flex items-center gap-2">
              Bắt đầu ngay <ChevronRight size={20} />
            </Link>
            <Link to="/practice" className="px-8 py-4 bg-blue-600/30 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold hover:bg-blue-600/40 transition-all">
              Luyện tập ngay
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard 
          icon={<BookOpen size={28} />}
          title="Lý thuyết"
          description="Nền tảng nguyên lý bảo toàn kích thước và duỗi phẳng bề mặt."
          link="/concepts"
          gradient="from-emerald-500 to-teal-600"
          shadow="shadow-emerald-500/20"
        />
        <FeatureCard 
          icon={<Layers size={28} />}
          title="Quy trình"
          description="Khám phá 4 bước chuẩn hóa để xử lý mọi loại hình khối."
          link="/process"
          gradient="from-orange-500 to-amber-600"
          shadow="shadow-orange-500/20"
        />
        <FeatureCard 
          icon={<ClipboardList size={28} />}
          title="Ví dụ"
          description="4 bài tập điển hình từ cơ bản đến phức tạp (Chóp, Nón, Trụ, Hộp)."
          link="/examples"
          gradient="from-blue-500 to-indigo-600"
          shadow="shadow-blue-500/20"
        />
        <FeatureCard 
          icon={<Target size={28} />}
          title="Thử thách"
          description="Hệ thống bài tập ngẫu nhiên giúp củng cố kiến thức hình học."
          link="/practice"
          gradient="from-amber-500 to-orange-600"
          shadow="shadow-amber-500/20"
        />
      </div>

      {/* Stats/Badge Area */}
      <div className="flex flex-col items-center justify-center py-12 px-6 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center w-full max-w-4xl">
           <div>
             <h4 className="text-4xl font-black text-blue-600">4+</h4>
             <p className="text-slate-500 font-bold text-sm uppercase tracking-widest mt-1">Loại hình học</p>
           </div>
           <div>
             <h4 className="text-4xl font-black text-indigo-600">Pro</h4>
             <p className="text-slate-500 font-bold text-sm uppercase tracking-widest mt-1">Chuẩn kỹ thuật</p>
           </div>
           <div>
             <h4 className="text-4xl font-black text-emerald-600">100%</h4>
             <p className="text-slate-500 font-bold text-sm uppercase tracking-widest mt-1">Độ chính xác</p>
           </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  link: string, 
  gradient: string,
  shadow: string 
}> = ({ icon, title, description, link, gradient, shadow }) => (
  <Link to={link} className="group h-full">
    <div className={`h-full p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm ${shadow} hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col`}>
      <div className={`w-14 h-14 flex items-center justify-center bg-gradient-to-br ${gradient} text-white rounded-2xl mb-6 shadow-lg shadow-inherit group-hover:rotate-6 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-black mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1">{description}</p>
      <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-blue-600 group-hover:gap-4 transition-all">
        Khám phá <ChevronRight size={16} />
      </div>
    </div>
  </Link>
);

export default HomePage;
