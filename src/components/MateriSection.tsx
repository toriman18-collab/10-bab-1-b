import React, { useState } from 'react';
import { 
  FileText, 
  Table, 
  Calendar, 
  User, 
  CheckCircle, 
  Sparkles, 
  ArrowRight, 
  ChevronRight,
  BookmarkCheck
} from 'lucide-react';
import { materiData } from '../data/materiData';

export const MateriSection: React.FC = () => {
  const [activeFaseIndex, setActiveFaseIndex] = useState(0);
  const [selectedTokohTab, setSelectedTokohTab] = useState(0);

  const activeFase = materiData.tahapanKronologi[activeFaseIndex];
  const activeTokoh = materiData.komparasiGagasan[selectedTokohTab];

  return (
    <div className="space-y-10 animate-fadeIn max-w-6xl mx-auto">
      {/* Header Penjelasan Materi */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-blue-700/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-amber-400 text-blue-950 rounded-xl font-bold shadow-md">
            <FileText className="w-6 h-6" />
          </div>
          <span className="text-amber-300 font-bold text-sm uppercase tracking-wider">
            Modul Utama Pembelajaran
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Dinamika Historis Kelahiran Pancasila
        </h1>
        <p className="text-blue-100 text-sm sm:text-base leading-relaxed text-justify">
          Pancasila tidak hadir secara instan atau jatuh begitu saja dari langit. Pancasila lahir dari pergulatan intelektual, kompromi kebangsaan, dan ketulusan hati para pejuang kemerdekaan yang berhasil menyatukan ratusan suku bangsa dan agama dalam satu payung filosofis negara yang abadi.
        </p>
      </div>

      {/* Bagian 1: 5 Fase Kronologi Bertahap */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-700" />
              <span>Lima Babak Sejarah Kelahiran Pancasila</span>
            </h2>
            <p className="text-xs text-slate-500">Klik tab fase untuk menelaah setiap babak perjuangan</p>
          </div>
        </div>

        {/* Tab Buttons Fase */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {materiData.tahapanKronologi.map((faseItem, idx) => {
            const isSelected = activeFaseIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveFaseIndex(idx)}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  isSelected 
                    ? 'bg-blue-800 text-white border-blue-900 shadow-md font-bold' 
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <span className={`text-[10px] font-extrabold uppercase block ${isSelected ? 'text-amber-300' : 'text-blue-600'}`}>
                  {faseItem.fase}
                </span>
                <span className="text-xs font-semibold line-clamp-1">
                  {faseItem.judul}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail Fase Terpilih Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
                {activeFase.fase} - Periode {activeFase.rentangWaktu}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {activeFase.judul}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
              {activeFase.tokohTerkait.map((t, tidx) => (
                <span key={tidx} className="bg-blue-50 text-blue-800 text-xs px-2.5 py-1 rounded-full font-semibold border border-blue-200/50">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
            {activeFase.deskripsi}
          </p>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-blue-700" />
              <span>Fakta dan Poin Kunci Bersejarah</span>
            </h4>
            <div className="space-y-2">
              {activeFase.poinPenting.map((poin, pidx) => (
                <div key={pidx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {pidx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                    {poin}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bagian 2: Tiga Tokoh Utama Sidang Pertama BPUPKI */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <User className="w-6 h-6 text-amber-600" />
            <span>Tiga Konsepsi Usulan Tokoh Bangsa</span>
          </h2>
          <p className="text-xs text-slate-500">Telaah gagasan Mohammad Yamin, Mr. Soepomo, dan Ir. Soekarno</p>
        </div>

        {/* Tab Tokoh */}
        <div className="flex flex-wrap gap-3">
          {materiData.komparasiGagasan.map((item, idx) => {
            const isTab = selectedTokohTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedTokohTab(idx)}
                className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all border flex items-center gap-2 ${
                  isTab 
                    ? 'bg-amber-400 text-blue-950 border-amber-500 shadow-md' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <User className="w-4 h-4" />
                <span>{item.tokoh}</span>
                <span className="text-xs opacity-75">({item.tanggal})</span>
              </button>
            );
          })}
        </div>

        {/* Card Tokoh Terpilih */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">{activeTokoh.tokoh}</h3>
              <p className="text-xs text-slate-500">Disampaikan pada Sidang I BPUPKI: {activeTokoh.tanggal}</p>
            </div>
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-200 self-start sm:self-auto">
              5 Pokok Gagasan Dasar Negara
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeTokoh.usulan.map((sila, sidx) => (
              <div key={sidx} className="flex items-center gap-3 p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                <span className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {sidx + 1}
                </span>
                <span className="text-sm font-semibold text-slate-800">{sila}</span>
              </div>
            ))}
          </div>

          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
              Esensi Filosofis Gagasan:
            </h4>
            <p className="text-xs sm:text-sm text-amber-950 text-justify leading-relaxed">
              {activeTokoh.maknaFilosofis}
            </p>
          </div>
        </div>
      </div>

      {/* Bagian 3: AUTO-TABLE Ringkasan Otomatis Perbandingan Sila */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Table className="w-6 h-6 text-blue-700" />
              <span>Auto-Table: Komparasi Lengkap Rumusan Dasar Negara</span>
            </h2>
            <p className="text-xs text-slate-500">Perbandingan runut dari usulan tokoh, Piagam Jakarta, hingga pengesahan PPKI</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#1E3A8A] text-white">
                <tr>
                  <th className="py-4 px-4 font-bold tracking-wider uppercase text-[11px] border-r border-blue-800">
                    Sila / Asas
                  </th>
                  <th className="py-4 px-4 font-bold tracking-wider uppercase text-[11px] border-r border-blue-800">
                    Mohammad Yamin (29 Mei 1945)
                  </th>
                  <th className="py-4 px-4 font-bold tracking-wider uppercase text-[11px] border-r border-blue-800">
                    Mr. Soepomo (31 Mei 1945)
                  </th>
                  <th className="py-4 px-4 font-bold tracking-wider uppercase text-[11px] border-r border-blue-800">
                    Ir. Soekarno (1 Juni 1945)
                  </th>
                  <th className="py-4 px-4 font-bold tracking-wider uppercase text-[11px] border-r border-blue-800">
                    Piagam Jakarta (22 Juni 1945)
                  </th>
                  <th className="py-4 px-4 font-bold tracking-wider uppercase text-[11px] bg-amber-500 text-blue-950">
                    Pengesahan PPKI (18 Agustus 1945)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {materiData.autoTablePerbandingan.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                    <td className="py-4 px-4 font-bold text-blue-900 border-r border-slate-200/80 bg-blue-50/30 whitespace-nowrap">
                      {row.aspek}
                    </td>
                    <td className="py-4 px-4 text-slate-700 border-r border-slate-200/80 text-justify">
                      {row.mohYamin}
                    </td>
                    <td className="py-4 px-4 text-slate-700 border-r border-slate-200/80 text-justify">
                      {row.mrSoepomo}
                    </td>
                    <td className="py-4 px-4 text-slate-700 border-r border-slate-200/80 text-justify">
                      {row.irSoekarno}
                    </td>
                    <td className="py-4 px-4 text-slate-700 border-r border-slate-200/80 text-justify">
                      {row.piagamJakarta}
                    </td>
                    <td className="py-4 px-4 font-bold text-emerald-900 bg-emerald-50/50 text-justify">
                      {row.pengesahanPPKI}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 text-justify">
            Catatan Historis: Perhatikan bahwa rumusan akhir yang disahkan oleh PPKI pada tanggal 18 Agustus 1945 menjadi rumusan otentik dan sah secara konstitusional dalam Pembukaan UUD 1945 yang berlaku hingga hari ini.
          </div>
        </div>
      </div>
    </div>
  );
};
