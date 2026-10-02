import React from 'react';
import { CheckCircle2, Award, Gamepad2, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { materiData } from '../data/materiData';

interface KesimpulanSectionProps {
  onOpenPortal: () => void;
}

export const KesimpulanSection: React.FC<KesimpulanSectionProps> = ({ onOpenPortal }) => {
  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header Kesimpulan */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-blue-700/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-amber-400 text-blue-950 rounded-xl font-bold shadow-md">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="text-amber-300 font-bold text-sm uppercase tracking-wider">
            Rangkuman Inti Materi
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Kesimpulan Dinamika Kelahiran Pancasila
        </h1>
        <p className="text-blue-100 text-sm sm:text-base leading-relaxed text-justify">
          Kelahiran Pancasila adalah mahakarya peradaban para pendiri bangsa yang mempertemukan berbagai keragaman latar belakang suku, agama, dan pandangan politik ke dalam satu kesepakatan agung yang kokoh dan tak lekang oleh waktu.
        </p>
      </div>

      {/* 4 Poin Kesimpulan Kunci */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materiData.kesimpulanPoin.map((item, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all space-y-3"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-amber-400 text-blue-950 font-black text-sm flex items-center justify-center shadow">
                {idx + 1}
              </span>
              <h2 className="text-base font-bold text-slate-800">
                {item.judul}
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed text-justify">
              {item.uraian}
            </p>
          </div>
        ))}
      </div>

      {/* Kotak Semangat Pelajar Pancasila & Tombol Ujian */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 rounded-3xl p-8 sm:p-10 text-blue-950 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/10 text-blue-950 text-xs font-black uppercase">
            <HeartHandshake className="w-4 h-4" />
            <span>Siap Menguji Penguasaan Materi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Sudah Memahami Seluruh Dinamika?
          </h2>
          <p className="text-sm font-medium text-blue-900 leading-relaxed text-justify">
            Sekarang saatnya membuktikan pemahaman Anda melalui Game Kuis Kahoot-Style bertempo cepat atau Uji Kompetensi AKM 20 Soal dengan timer dan navigasi interaktif.
          </p>
        </div>

        <button
          onClick={onOpenPortal}
          className="shrink-0 flex items-center gap-3 bg-blue-900 hover:bg-blue-950 text-white font-extrabold px-8 py-4 rounded-2xl shadow-xl transition-all transform hover:scale-105"
        >
          <Gamepad2 className="w-6 h-6 text-amber-300" />
          <span className="text-base">Masuk Portal Ujian</span>
          <ArrowRight className="w-5 h-5 text-amber-300" />
        </button>
      </div>
    </div>
  );
};
