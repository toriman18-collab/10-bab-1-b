import React, { useState } from 'react';
import { HelpCircle, Sparkles, MessageSquare, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { materiData } from '../data/materiData';

export const PemantikSection: React.FC = () => {
  const [openHint, setOpenHint] = useState<number | null>(null);

  const hints = [
    "Petunjuk Refleksi: Ingatlah bahwa Indonesia bukanlah bangsa yang baru lahir tanpa peradaban. Nenek moyang kita telah mempraktikkan gotong royong, musyawarah desa, nilai ketuhanan, dan perikemanusiaan selama berabad-abad. Mengadopsi ideologi barat yang individualistis atau komunisme yang menafikan ketuhanan dinilai para pendiri bangsa tidak cocok dengan urat nadi jiwa rakyat nusantara.",
    "Petunjuk Refleksi: Perhatikan kerendahan hati tokoh-tokoh Islam seperti Ki Bagoes Hadikoesoemo dan Kasman Singodimedjo ketika Bung Hatta menyampaikan aspirasi masyarakat kawasan timur. Mereka rela menghapus tujuh kata dalam Piagam Jakarta bukan karena kalah berdebat, melainkan demi menyelamatkan proklamasi dan mencegah tanah air terpecah menjadi negara-negara kecil."
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header Pemantik */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-8 shadow-xl border border-blue-700/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-amber-400 text-blue-950 rounded-xl font-bold shadow-md">
            <HelpCircle className="w-6 h-6" />
          </div>
          <span className="text-amber-300 font-bold text-sm uppercase tracking-wider">
            Eksplorasi Nalar Kritis
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Pertanyaan Pemantik
        </h1>
        <p className="text-blue-100 text-sm sm:text-base leading-relaxed text-justify">
          Sebelum menelaah kronologi sejarah secara mendalam, renungkanlah dua pertanyaan pemantik berikut ini untuk membangkitkan kepekaan intelektual dan empati sejarah Anda sebagai generasi muda penerus estafet bangsa.
        </p>
      </div>

      {/* Cards Pertanyaan Pemantik */}
      <div className="space-y-6">
        {materiData.pertanyaanPemantik.map((item, index) => {
          const isOpen = openHint === index;
          return (
            <div 
              key={item.nomor}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 hover:border-blue-300 transition-all"
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-amber-400 text-blue-950 font-black text-sm flex items-center justify-center shadow">
                    #{item.nomor}
                  </span>
                  <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">
                    {item.fokus}
                  </span>
                </div>
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>

              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug text-justify">
                  {item.pertanyaan}
                </h2>
              </div>

              {/* Tombol Buka Petunjuk Refleksi */}
              <div className="pt-2">
                <button
                  onClick={() => setOpenHint(isOpen ? null : index)}
                  className="flex items-center justify-between w-full p-4 rounded-2xl bg-blue-50/70 hover:bg-blue-100/70 text-blue-900 transition-colors border border-blue-200/60 text-xs sm:text-sm font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>{isOpen ? "Tutup Telaah Kritis Guru" : "Buka Panduan Telaah Kritis Guru"}</span>
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isOpen && (
                  <div className="mt-3 p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-950 text-xs sm:text-sm leading-relaxed animate-fadeIn text-justify">
                    <p className="font-bold mb-1 flex items-center gap-1.5 text-amber-900">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Ulasan Pedagogis:
                    </p>
                    {hints[index]}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
