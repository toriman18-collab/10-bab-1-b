import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Gamepad2, 
  Award, 
  Calendar, 
  Users, 
  ShieldCheck 
} from 'lucide-react';
import { TabId } from './Navbar';

interface HomeSectionProps {
  onNavigate: (tab: TabId) => void;
  onOpenPortal: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate, onOpenPortal }) => {
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Hero Educational Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E3A8A] via-blue-800 to-blue-950 text-white shadow-2xl p-8 md:p-12 border border-blue-700/50">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Kurikulum Merdeka - Fase E (Kelas X)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Menganalisis Dinamika <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200">
              Kelahiran Pancasila
            </span>
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed text-justify">
            Selamat datang di media pembelajaran interaktif Pendidikan Pancasila. Modul pembelajaran digital ini dirancang khusus untuk memandu peserta didik kelas sepuluh dalam menelusuri perjalanan historis, dialektika pemikiran para pendiri bangsa, kompromi kebangsaan monumental Panitia Sembilan, hingga detik-detik pengesahan konstitusional Pancasila pada 18 Agustus 1945 yang melandasi berdirinya Negara Kesatuan Republik Indonesia.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => onNavigate('materi')}
              className="flex items-center gap-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-blue-950 font-bold px-6 py-3.5 rounded-2xl shadow-xl hover:from-amber-300 hover:to-amber-400 hover:shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              <BookOpen className="w-5 h-5 text-blue-950" />
              <span>Pelajari Materi Lengkap</span>
              <ArrowRight className="w-4 h-4 text-blue-950" />
            </button>

            <button
              onClick={onOpenPortal}
              className="flex items-center gap-2.5 bg-blue-600/80 hover:bg-blue-600 border border-blue-400/30 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-all text-sm sm:text-base"
            >
              <Gamepad2 className="w-5 h-5 text-amber-300" />
              <span>Mulai Ujian & Kuis Interaktif</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Quick Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => onNavigate('tujuan')}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md hover:border-blue-400/50 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800 mb-4 group-hover:scale-110 transition-transform">
            <Award className="w-6 h-6 text-blue-700" />
          </div>
          <h2 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
            Capaian Pembelajaran Fase E
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed text-justify">
            Menguasai kompetensi analisis kronologi historis, membandingkan usulan para founding fathers, serta menghayati nilai luhur kompromi kebangsaan.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('pemantik')}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md hover:border-amber-400/50 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 mb-4 group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6 text-amber-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">
            Pertanyaan Kritis Pemantik
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed text-justify">
            Mengapa Pancasila digali dari bumi pertiwi sendiri dan bukan menjiplak ideologi asing? Asah nalar kritis terhadap sejarah ketatanegaraan.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('materi')}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md hover:border-emerald-400/50 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 mb-4 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-6 h-6 text-emerald-700" />
          </div>
          <h2 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">
            Auto-Table Komparasi Gagasan
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed text-justify">
            Tabel ringkas dan terstruktur yang mempertemukan usulan Mohammad Yamin, Mr. Soepomo, Ir. Soekarno, hingga rumusan final 18 Agustus 1945.
          </p>
        </div>
      </div>

      {/* Snapshot Linimasa Singkat */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-700" />
              <span>Linimasa Singkat Dinamika Kelahiran Pancasila</span>
            </h2>
            <p className="text-xs text-slate-500">Tonggak sejarah perumusan dasar negara Republik Indonesia</p>
          </div>
          <button
            onClick={() => onNavigate('materi')}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Buka Materi Lengkap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100">
            <span className="text-xs font-extrabold text-blue-800 block mb-1">1 Maret 1945</span>
            <h3 className="font-bold text-slate-800 text-sm mb-1">Pembentukan BPUPKI</h3>
            <p className="text-xs text-slate-600 text-justify">
              Diumumkan oleh Letjen Kumakichi Harada sebagai pemenuhan janji kemerdekaan Jepang saat posisi militer terdesak.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-100">
            <span className="text-xs font-extrabold text-amber-700 block mb-1">29 Mei - 1 Juni 1945</span>
            <h3 className="font-bold text-slate-800 text-sm mb-1">Sidang I BPUPKI</h3>
            <p className="text-xs text-slate-600 text-justify">
              Penyampaian gagasan dasar negara oleh Mohammad Yamin, Mr. Soepomo, dan pidato Bung Karno yang memperkenalkan istilah Pancasila.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
            <span className="text-xs font-extrabold text-emerald-700 block mb-1">22 Juni 1945</span>
            <h3 className="font-bold text-slate-800 text-sm mb-1">Piagam Jakarta</h3>
            <p className="text-xs text-slate-600 text-justify">
              Panitia Sembilan menyepakati rancangan pembukaan hukum dasar yang memuat kompromi kebangsaan dan rumusan lima sila.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100">
            <span className="text-xs font-extrabold text-purple-700 block mb-1">18 Agustus 1945</span>
            <h3 className="font-bold text-slate-800 text-sm mb-1">Pengesahan PPKI</h3>
            <p className="text-xs text-slate-600 text-justify">
              Kesepakatan perubahan tujuh kata menjadi Ketuhanan Yang Maha Esa serta pengesahan UUD 1945 dan dasar negara resmi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
