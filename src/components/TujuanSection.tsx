import React from 'react';
import { Target, CheckCircle2, Award, BookCheck } from 'lucide-react';
import { materiData } from '../data/materiData';

export const TujuanSection: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header Tujuan */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-3xl p-8 shadow-xl border border-blue-700/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-amber-400 text-blue-950 rounded-xl font-bold shadow-md">
            <Target className="w-6 h-6" />
          </div>
          <span className="text-amber-300 font-bold text-sm uppercase tracking-wider">
            Capaian Pembelajaran (CP) - Fase E
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Tujuan Pembelajaran Modul
        </h1>
        <p className="text-blue-100 text-sm sm:text-base leading-relaxed text-justify">
          Berdasarkan Kurikulum Merdeka Mata Pelajaran Pendidikan Pancasila Kelas X (Fase E), peserta didik diharapkan mampu mencapai lima indikator kompetensi inti berikut setelah menyelesaikan seluruh modul, kuis, dan uji kompetensi.
        </p>
      </div>

      {/* List Tujuan Pembelajaran */}
      <div className="grid grid-cols-1 gap-4">
        {materiData.tujuanPembelajaran.map((tujuan, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-extrabold text-base shrink-0 border border-blue-200/60">
              {idx + 1}
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-slate-800">Indikator Capaian {idx + 1}</h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
                {tujuan}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Profil Pelajar Pancasila Hubungan */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6 text-amber-700" />
          <h2 className="text-lg font-bold text-amber-950">
            Korelasi dengan Profil Pelajar Pancasila
          </h2>
        </div>
        <p className="text-sm text-amber-900 leading-relaxed text-justify">
          Melalui telaah kritis dinamika sejarah kelahiran Pancasila, peserta didik dikembangkan karakternya pada dimensi Beriman, Bertakwa kepada Tuhan YME dan Berakhlak Mulia (menghargai keragaman keyakinan), Berkebinekaan Global (mempertahankan kearifan lokal dalam kesatuan bangsa), Bernalar Kritis (menganalisis dokumen sejarah), dan Bergotong Royong (meneladani mufakat para pendiri bangsa).
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-white rounded-xl p-3 border border-amber-200 text-center font-bold text-xs text-amber-900 shadow-sm">
            Bernalar Kritis
          </div>
          <div className="bg-white rounded-xl p-3 border border-amber-200 text-center font-bold text-xs text-amber-900 shadow-sm">
            Berkebinekaan Global
          </div>
          <div className="bg-white rounded-xl p-3 border border-amber-200 text-center font-bold text-xs text-amber-900 shadow-sm">
            Bergotong Royong
          </div>
          <div className="bg-white rounded-xl p-3 border border-amber-200 text-center font-bold text-xs text-amber-900 shadow-sm">
            Akhlak Bernegara
          </div>
        </div>
      </div>
    </div>
  );
};
