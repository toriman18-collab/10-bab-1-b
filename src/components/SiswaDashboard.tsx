import React, { useState } from 'react';
import { 
  UserCheck, 
  Gamepad2, 
  BookOpen, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Sparkles,
  Trophy
} from 'lucide-react';
import { SiswaRecord, UjianType } from '../types';
import { gasService } from '../services/gasService';

interface SiswaDashboardProps {
  siswa: SiswaRecord;
  onStartExam: (mode: UjianType) => void;
  onLogout: () => void;
}

export const SiswaDashboard: React.FC<SiswaDashboardProps> = ({
  siswa,
  onStartExam,
  onLogout
}) => {
  const [selectedMode, setSelectedMode] = useState<UjianType>('Game Kuis');
  const [tokenInput, setTokenInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!tokenInput.trim()) {
      setErrorMessage('Kode token wajib diisi. Silakan minta kode token kepada guru pengampu.');
      return;
    }

    const verifyRes = gasService.verifyToken(selectedMode, tokenInput);
    if (!verifyRes.valid) {
      setErrorMessage(verifyRes.message);
      return;
    }

    onStartExam(selectedMode);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Siswa */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-blue-950 flex items-center justify-center font-black shadow-lg">
            <UserCheck className="w-8 h-8 text-blue-950" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase mb-1">
              <span>Siswa Aktif</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black">{siswa.nama}</h1>
            <p className="text-xs sm:text-sm text-blue-200">
              Kelas: {siswa.kelas} • Terdaftar: {siswa.timestamp}
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-blue-800 hover:bg-blue-700 text-xs font-bold text-white border border-blue-600 transition-colors"
        >
          Ganti Akun Siswa
        </button>
      </div>

      {/* Card Pilihan Mode Ujian & Form Token */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">
            Pilih Mode Evaluasi Pembelajaran
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Pilih salah satu mode di bawah, lalu masukkan kode token yang diberikan oleh guru.
          </p>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-xs sm:text-sm animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-justify">{errorMessage}</p>
          </div>
        )}

        {/* 2 Opsi Mode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => {
              setSelectedMode('Game Kuis');
              setErrorMessage('');
            }}
            className={`p-6 rounded-3xl border cursor-pointer transition-all flex flex-col justify-between space-y-4 ${
              selectedMode === 'Game Kuis'
                ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-300 shadow-md'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-amber-900">Game Kuis Live</span>
                <span className="text-xs bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full font-bold">
                  Kahoot Style
                </span>
              </div>
              <p className="text-xs text-slate-600 text-justify">
                5 soal tantangan cepat (3 pilihan ganda, 2 benar/salah), hitung mundur 20 detik per soal, dan papan respon interaktif.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
              <Clock className="w-4 h-4" />
              <span>Token berlaku 10 menit</span>
            </div>
          </div>

          <div
            onClick={() => {
              setSelectedMode('Uji Kompetensi');
              setErrorMessage('');
            }}
            className={`p-6 rounded-3xl border cursor-pointer transition-all flex flex-col justify-between space-y-4 ${
              selectedMode === 'Uji Kompetensi'
                ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-300 shadow-md'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-blue-900">Uji Kompetensi AKM</span>
                <span className="text-xs bg-blue-200 text-blue-900 px-2.5 py-0.5 rounded-full font-bold">
                  20 Soal CBT
                </span>
              </div>
              <p className="text-xs text-slate-600 text-justify">
                Asesmen mendalam berisikan stimulus sejarah: Pilihan Ganda (A-E), Benar/Salah, Pilihan Ganda Kompleks, dan Menjodohkan.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-800">
              <Clock className="w-4 h-4" />
              <span>Waktu 90 menit • Token 15 menit</span>
            </div>
          </div>
        </div>

        {/* Input Token Form */}
        <form onSubmit={handleStart} className="space-y-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Kode Token Ujian ({selectedMode})
            </label>
            <div className="relative">
              <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value.toUpperCase())}
                placeholder="Masukkan 6 digit kode token dari guru"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm sm:text-base font-black tracking-widest uppercase text-slate-900 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-blue-800 hover:bg-blue-900 text-white font-extrabold text-base shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <span>Mulai Sekarang: {selectedMode}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
