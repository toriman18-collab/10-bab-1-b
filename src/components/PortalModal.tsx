import React, { useState } from 'react';
import { 
  Gamepad2, 
  GraduationCap, 
  User, 
  KeyRound, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  Lock,
  X
} from 'lucide-react';
import { KelasType, UjianType, SiswaRecord } from '../types';
import { gasService } from '../services/gasService';

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartExam: (siswa: SiswaRecord, mode: UjianType) => void;
  onLoginGuruSuccess: () => void;
}

export const PortalModal: React.FC<PortalModalProps> = ({
  isOpen,
  onClose,
  onStartExam,
  onLoginGuruSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'siswa' | 'guru'>('siswa');

  // Form Siswa
  const [namaLengkap, setNamaLengkap] = useState('');
  const [kelas, setKelas] = useState<KelasType>('X-A');
  const [modeUjian, setModeUjian] = useState<UjianType>('Game Kuis');
  const [kodeToken, setKodeToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Form Guru
  const [guruUser, setGuruUser] = useState('');
  const [guruPass, setGuruPass] = useState('');
  const [guruError, setGuruError] = useState('');

  if (!isOpen) return null;

  const handleStartSiswa = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!namaLengkap.trim()) {
      setErrorMessage('Silakan masukkan nama lengkap peserta didik.');
      return;
    }

    if (!kodeToken.trim()) {
      setErrorMessage('Kode token wajib diisi. Silakan minta kode token kepada guru Anda.');
      return;
    }

    setIsLoading(true);

    // Verifikasi Token
    const verifyRes = gasService.verifyToken(modeUjian, kodeToken);
    if (!verifyRes.valid) {
      setErrorMessage(verifyRes.message);
      setIsLoading(false);
      return;
    }

    // Simpan data pendaftaran siswa
    const siswaRes = gasService.saveSiswa(namaLengkap, kelas);
    setIsLoading(false);

    onStartExam(siswaRes.data, modeUjian);
    onClose();
  };

  const handleLoginGuru = (e: React.FormEvent) => {
    e.preventDefault();
    setGuruError('');

    if (guruUser.trim() === 'guru' && guruPass.trim() === 'guru123') {
      onLoginGuruSuccess();
      onClose();
    } else {
      setGuruError('Username atau password salah! (Default: guru / guru123)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-bold">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold">Portal Masuk Ujian</h2>
              <p className="text-xs text-blue-200">Pendidikan Pancasila Kelas X (Fase E)</p>
            </div>
          </div>

          {/* Toggle Tab Siswa / Guru */}
          <div className="grid grid-cols-2 gap-2 mt-4 bg-blue-950/60 p-1.5 rounded-2xl">
            <button
              onClick={() => {
                setActiveTab('siswa');
                setErrorMessage('');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'siswa' 
                  ? 'bg-amber-400 text-blue-950 shadow-md' 
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Login Peserta Didik</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('guru');
                setGuruError('');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'guru' 
                  ? 'bg-amber-400 text-blue-950 shadow-md' 
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Login Guru Pengampu</span>
            </button>
          </div>
        </div>

        {/* Body Modal */}
        <div className="p-6 sm:p-8">
          {activeTab === 'siswa' ? (
            <form onSubmit={handleStartSiswa} className="space-y-5">
              
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-xs sm:text-sm animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-justify">{errorMessage}</p>
                </div>
              )}

              {/* Input Nama Lengkap */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Nama Lengkap Siswa
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={namaLengkap}
                    onChange={(e) => setNamaLengkap(e.target.value)}
                    placeholder="Contoh: Muhammad Fauzan Rahman"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-800 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Pilihan Kelas */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Pilihan Kelas (Fase E)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['X-A', 'X-B', 'X-C'] as KelasType[]).map((k) => (
                    <button
                      type="button"
                      key={k}
                      onClick={() => setKelas(k)}
                      className={`py-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
                        kelas === k 
                          ? 'bg-blue-800 text-white border-blue-900 shadow-md' 
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      Kelas {k}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pilihan Mode Ujian */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Pilihan Mode Ujian
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setModeUjian('Game Kuis')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      modeUjian === 'Game Kuis'
                        ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-amber-900">Game Kuis</span>
                      <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                        5 Soal
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Kahoot Live Style, 20 detik per soal, penilaian instan
                    </p>
                  </div>

                  <div
                    onClick={() => setModeUjian('Uji Kompetensi')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      modeUjian === 'Uji Kompetensi'
                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-300'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-blue-900">Uji Kompetensi</span>
                      <span className="text-[10px] bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full font-bold">
                        20 Soal AKM
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      CBT Mode, 90 menit, PG, Benar/Salah, Kompleks, Menjodohkan
                    </p>
                  </div>
                </div>
              </div>

              {/* Input Kode Token */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Kode Token dari Guru
                  </label>
                  <span className="text-[11px] text-blue-700 font-semibold">
                    Wajib diisi siswa
                  </span>
                </div>
                <div className="relative">
                  <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={kodeToken}
                    onChange={(e) => setKodeToken(e.target.value.toUpperCase())}
                    placeholder="Masukkan 6 digit kode token guru"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 text-sm font-extrabold tracking-widest uppercase text-slate-800 outline-none transition-all"
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-slate-500 text-justify">
                  Petunjuk: Hubungi guru Anda untuk mendapatkan kode token aktif. Token Game Kuis berlaku 10 menit dan Token Uji Kompetensi berlaku 15 menit.
                </p>
              </div>

              {/* Tombol Submit Mulai */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                <span>Mulai Pengerjaan {modeUjian}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleLoginGuru} className="space-y-5">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-1">
                <p className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-amber-700" />
                  Area Khusus Guru Pengampu
                </p>
                <p className="text-xs text-amber-800 text-justify">
                  Gunakan kredensial guru untuk membuka Dashboard Guru, memantau Leaderboard realtime, grafik nilai, mengontrol token ujian, dan mengekspor rekap spreadsheet.
                </p>
                <p className="text-[11px] text-amber-700 font-mono mt-1">
                  Kredensial Default: User: <b>guru</b> | Pass: <b>guru123</b>
                </p>
              </div>

              {guruError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-xs sm:text-sm animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <p>{guruError}</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Username Guru
                </label>
                <input
                  type="text"
                  required
                  value={guruUser}
                  onChange={(e) => setGuruUser(e.target.value)}
                  placeholder="Masukkan username (contoh: guru)"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-800 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Password Guru
                </label>
                <input
                  type="password"
                  required
                  value={guruPass}
                  onChange={(e) => setGuruPass(e.target.value)}
                  placeholder="Masukkan password (contoh: guru123)"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-800 outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-blue-950 font-extrabold text-sm sm:text-base shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Buka Dashboard Guru</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
