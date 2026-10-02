import React from 'react';
import { Award, ShieldCheck, Users, Brain, Sparkles } from 'lucide-react';
import { materiData } from '../data/materiData';

export const ManfaatSection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-blue-700" />,
    Users: <Users className="w-6 h-6 text-amber-600" />,
    Brain: <Brain className="w-6 h-6 text-indigo-600" />,
    Sparkles: <Sparkles className="w-6 h-6 text-emerald-600" />
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header Manfaat */}
      <div className="bg-gradient-to-r from-blue-900 to-sky-900 text-white rounded-3xl p-8 shadow-xl border border-blue-700/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-amber-400 text-blue-950 rounded-xl font-bold shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <span className="text-amber-300 font-bold text-sm uppercase tracking-wider">
            Relevansi Kehidupan Nyata
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Manfaat Pembelajaran
        </h1>
        <p className="text-blue-100 text-sm sm:text-base leading-relaxed text-justify">
          Mempelajari dinamika perumusan dasar negara bukan sekadar menghafal tanggal dan nama tokoh, melainkan membekali kita dengan kebijaksanaan praktis dalam menghadapi realitas sosial kemasyarakatan di era modern.
        </p>
      </div>

      {/* Grid Manfaat */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materiData.manfaatPembelajaran.map((manfaat, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                {iconMap[manfaat.icon] || <Sparkles className="w-6 h-6 text-blue-700" />}
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                {manfaat.judul}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed text-justify">
                {manfaat.deskripsi}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-blue-700">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Aplikasi Kontekstual Siswa SMA Fase E</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quote Refleksi */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-3xl p-6 sm:p-8 text-center space-y-3">
        <p className="text-base sm:text-lg font-semibold text-amber-950 italic text-justify sm:text-center">
          "Bangsa yang besar adalah bangsa yang tidak pernah melupakan sejarahnya (Jasmerah). Pancasila adalah rumah bersama yang melindungi seluruh anak bangsa tanpa membeda-bedakan keyakinan, suku, dan asal usul."
        </p>
        <p className="text-xs font-extrabold uppercase tracking-widest text-amber-800">
          Refleksi Keteladanan Pendiri Bangsa
        </p>
      </div>
    </div>
  );
};
