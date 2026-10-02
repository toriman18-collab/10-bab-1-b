import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  Trophy, 
  Medal, 
  BarChart3, 
  Users, 
  KeyRound, 
  Copy, 
  Check, 
  RefreshCw, 
  Download, 
  Trash2, 
  RotateCcw, 
  LogOut,
  Calendar,
  Sparkles,
  FileSpreadsheet,
  AlertTriangle
} from 'lucide-react';
import Chart from 'chart.js/auto';
import { NilaiRecord, TokenRecord, KelasType } from '../types';
import { gasService } from '../services/gasService';

interface GuruDashboardProps {
  onLogout: () => void;
}

export const GuruDashboard: React.FC<GuruDashboardProps> = ({ onLogout }) => {
  const [leaderboard, setLeaderboard] = useState<{ topKuis: NilaiRecord[]; topUji: NilaiRecord[] }>({
    topKuis: [],
    topUji: []
  });
  const [allResponses, setAllResponses] = useState<NilaiRecord[]>([]);
  const [activeTokens, setActiveTokens] = useState<Record<string, TokenRecord | null>>({
    'Game Kuis': null,
    'Uji Kompetensi': null
  });

  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [filterKelas, setFilterKelas] = useState<string>('SEMUA');
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // Load Data
  const refreshData = () => {
    const lb = gasService.getLeaderboard();
    setLeaderboard(lb);

    const responses = gasService.getAllResponses();
    setAllResponses(responses);

    const tokens = gasService.getActiveTokens();
    setActiveTokens(tokens);
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Update Chart.js saat responses berubah
  useEffect(() => {
    if (!chartCanvasRef.current) return;

    // Hitung rata-rata per kelas untuk Kuis dan Uji Komp
    const kelasList: KelasType[] = ['X-A', 'X-B', 'X-C'];
    const avgKuis = kelasList.map((k) => {
      const filtered = allResponses.filter((r) => r.kelas === k && r.jenisUjian === 'Game Kuis');
      if (filtered.length === 0) return 0;
      const sum = filtered.reduce((acc, curr) => acc + curr.nilai, 0);
      return Math.round(sum / filtered.length);
    });

    const avgUji = kelasList.map((k) => {
      const filtered = allResponses.filter((r) => r.kelas === k && r.jenisUjian === 'Uji Kompetensi');
      if (filtered.length === 0) return 0;
      const sum = filtered.reduce((acc, curr) => acc + curr.nilai, 0);
      return Math.round(sum / filtered.length);
    });

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartCanvasRef.current.getContext('2d');
    if (ctx) {
      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Kelas X-A', 'Kelas X-B', 'Kelas X-C'],
          datasets: [
            {
              label: 'Rata-rata Game Kuis',
              data: avgKuis,
              backgroundColor: '#F59E0B', // Amber
              borderRadius: 8
            },
            {
              label: 'Rata-rata Uji Kompetensi',
              data: avgUji,
              backgroundColor: '#1E3A8A', // Deep Blue
              borderRadius: 8
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: { family: 'Plus Jakarta Sans', weight: 'bold' }
              }
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.dataset.label}: ${context.raw} Poin`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              grid: { color: '#F1F5F9' },
              ticks: { font: { family: 'Plus Jakarta Sans' } }
            },
            x: {
              grid: { display: false },
              ticks: { font: { family: 'Plus Jakarta Sans', weight: 'bold' } }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [allResponses]);

  // Handler Generate Token Terpisah
  const handleGenerateToken = (jenis: 'Game Kuis' | 'Uji Kompetensi') => {
    const durasi = jenis === 'Game Kuis' ? 10 : 15;
    const res = gasService.generateToken(jenis, durasi);
    refreshData();
    showToast(`Token baru untuk ${jenis} berhasil digenerate: ${res.kodeToken} (Aktif ${durasi} menit)`);
  };

  // Salin Token ke Clipboard
  const handleCopyToken = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    showToast(`Kode token ${text} berhasil disalin ke clipboard!`);
    setTimeout(() => setCopiedType(null), 2500);
  };

  // Reset Jawaban Siswa
  const handleResetStudent = (id: string, nama: string) => {
    if (confirm(`Apakah Anda yakin ingin mereset ujian siswa: ${nama}? Siswa harus memasukkan token ulang.`)) {
      gasService.resetStudentResponse(id);
      refreshData();
      showToast(`Data ujian ${nama} berhasil direset.`);
    }
  };

  // Hapus Seluruh Data Respon
  const handleClearAll = () => {
    gasService.clearAllResponses();
    refreshData();
    setShowClearConfirm(false);
    showToast('Seluruh respon nilai siswa berhasil dibersihkan.');
  };

  // Download Rekap CSV / Excel
  const handleExportCsv = (kelas?: KelasType) => {
    const csvContent = gasService.exportRekapCsv(kelas);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const filename = kelas 
      ? `Rekap_Nilai_Pancasila_${kelas}_${Date.now()}.csv`
      : `Rekap_Semua_Nilai_Pancasila_${Date.now()}.csv`;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`File ${filename} berhasil diunduh.`);
  };

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // Sisa Waktu Token Format
  const getTokenRemainingTime = (token: TokenRecord | null) => {
    if (!token) return 'Belum digenerate';
    const remainingMs = token.expiredAt - Date.now();
    if (remainingMs <= 0) return 'Kadaluarsa (Expired)';
    const mins = Math.floor(remainingMs / 60000);
    const secs = Math.floor((remainingMs % 60000) / 1000);
    return `${mins} menit ${secs} detik lagi`;
  };

  // Filtered responses
  const filteredList = allResponses.filter((item) => {
    const matchesKelas = filterKelas === 'SEMUA' || item.kelas === filterKelas;
    const matchesQuery = item.nama.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesKelas && matchesQuery;
  });

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      
      {/* Toast Alert */}
      {successToast && (
        <div className="fixed top-24 right-6 z-50 bg-blue-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-400 flex items-center gap-3 animate-fadeIn">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-xs sm:text-sm font-semibold">{successToast}</span>
        </div>
      )}

      {/* Header Guru Dashboard */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-700 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-blue-950 flex items-center justify-center font-black shadow-lg">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase mb-1">
              <span>Panel Guru Pengampu</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Dashboard Kontrol & Analisis Evaluasi
            </h1>
            <p className="text-xs sm:text-sm text-blue-200">
              Pendidikan Pancasila Fase E - Dinamika Kelahiran Pancasila
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleExportCsv()}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Semua (CSV)</span>
          </button>

          <button
            onClick={() => setShowClearConfirm(true)}
            className="flex items-center gap-2 bg-red-600/80 hover:bg-red-600 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Hapus Respon</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors border border-slate-600"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Bagian Generator Token Terpisah (Kuis 10 Menit & Uji Komp 15 Menit) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Token Game Kuis */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Token Game Kuis</h3>
                <p className="text-[11px] text-slate-500">Masa aktif: Tepat 10 Menit</p>
              </div>
            </div>
            <button
              onClick={() => handleGenerateToken('Game Kuis')}
              className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1.5 rounded-xl hover:bg-amber-200 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Generate Baru</span>
            </button>
          </div>

          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                Kode Token Aktif Siswa:
              </span>
              <span className="text-2xl sm:text-3xl font-black text-amber-950 font-mono tracking-widest">
                {activeTokens['Game Kuis']?.kodeToken || 'KUIS10'}
              </span>
              <span className="text-xs text-amber-800 block mt-0.5">
                Sisa Waktu: {getTokenRemainingTime(activeTokens['Game Kuis'])}
              </span>
            </div>
            <button
              onClick={() => handleCopyToken(activeTokens['Game Kuis']?.kodeToken || 'KUIS10', 'kuis')}
              className="p-3 bg-amber-400 hover:bg-amber-500 text-blue-950 rounded-xl font-bold shadow-md transition-all"
              title="Salin Kode Token"
            >
              {copiedType === 'kuis' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Token Uji Kompetensi */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Token Uji Kompetensi</h3>
                <p className="text-[11px] text-slate-500">Masa aktif: Tepat 15 Menit</p>
              </div>
            </div>
            <button
              onClick={() => handleGenerateToken('Uji Kompetensi')}
              className="text-xs font-bold bg-blue-100 text-blue-900 px-3 py-1.5 rounded-xl hover:bg-blue-200 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Generate Baru</span>
            </button>
          </div>

          <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block">
                Kode Token Aktif Siswa:
              </span>
              <span className="text-2xl sm:text-3xl font-black text-blue-950 font-mono tracking-widest">
                {activeTokens['Uji Kompetensi']?.kodeToken || 'KOMP15'}
              </span>
              <span className="text-xs text-blue-800 block mt-0.5">
                Sisa Waktu: {getTokenRemainingTime(activeTokens['Uji Kompetensi'])}
              </span>
            </div>
            <button
              onClick={() => handleCopyToken(activeTokens['Uji Kompetensi']?.kodeToken || 'KOMP15', 'uji')}
              className="p-3 bg-blue-800 hover:bg-blue-900 text-white rounded-xl font-bold shadow-md transition-all"
              title="Salin Kode Token"
            >
              {copiedType === 'uji' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

      </div>

      {/* Top 5 Leaderboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Top 5 Game Kuis */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Top 5 Nilai Game Kuis</h3>
                <p className="text-[11px] text-slate-500">Peringkat tertinggi realtime</p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
              Kahoot Mode
            </span>
          </div>

          <div className="space-y-2.5">
            {leaderboard.topKuis.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">Belum ada respon kuis</p>
            ) : (
              leaderboard.topKuis.map((item, idx) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-xl font-extrabold text-xs flex items-center justify-center ${
                      idx === 0 
                        ? 'bg-amber-400 text-blue-950 font-black' 
                        : idx === 1 
                          ? 'bg-slate-300 text-slate-800' 
                          : idx === 2 
                            ? 'bg-amber-700 text-white' 
                            : 'bg-slate-100 text-slate-600'
                    }`}>
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{item.nama}</h4>
                      <p className="text-[10px] text-slate-500">{item.kelas} • {item.waktu}</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-amber-600 bg-amber-100/70 px-2.5 py-1 rounded-xl">
                    {item.nilai} Poin
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top 5 Uji Kompetensi */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                <Medal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Top 5 Nilai Uji Kompetensi</h3>
                <p className="text-[11px] text-slate-500">Peringkat tertinggi AKM CBT</p>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
              AKM 20 Soal
            </span>
          </div>

          <div className="space-y-2.5">
            {leaderboard.topUji.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">Belum ada respon ujian</p>
            ) : (
              leaderboard.topUji.map((item, idx) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-xl font-extrabold text-xs flex items-center justify-center ${
                      idx === 0 
                        ? 'bg-blue-800 text-white font-black' 
                        : idx === 1 
                          ? 'bg-blue-600 text-white' 
                          : idx === 2 
                            ? 'bg-blue-400 text-white' 
                            : 'bg-slate-100 text-slate-600'
                    }`}>
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{item.nama}</h4>
                      <p className="text-[10px] text-slate-500">{item.kelas} • {item.waktu}</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-blue-700 bg-blue-100/70 px-2.5 py-1 rounded-xl">
                    {item.nilai} Poin
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Visualisasi Grafik Nilai Siswa (Chart.js) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-700" />
              <span>Grafik Analisis Komparasi Nilai Rata-rata per Kelas</span>
            </h3>
            <p className="text-xs text-slate-500">Perbandingan capaian Game Kuis vs Uji Kompetensi AKM (Kelas X-A, X-B, X-C)</p>
          </div>
          <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-bold self-start sm:self-auto">
            Live Chart.js
          </span>
        </div>

        <div className="h-72 w-full pt-2">
          <canvas ref={chartCanvasRef} />
        </div>
      </div>

      {/* Rekap Nilai per Kelas Cards (X-A, X-B, X-C) */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
          <span>Rekapitulasi Nilai Berdasarkan Kelas</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['X-A', 'X-B', 'X-C'] as KelasType[]).map((k) => {
            const list = allResponses.filter((r) => r.kelas === k);
            const countKuis = list.filter((r) => r.jenisUjian === 'Game Kuis').length;
            const countUji = list.filter((r) => r.jenisUjian === 'Uji Kompetensi').length;
            const avg = list.length > 0 ? Math.round(list.reduce((acc, c) => acc + c.nilai, 0) / list.length) : 0;

            return (
              <div key={k} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="font-extrabold text-base text-slate-800">Kelas {k}</h4>
                  <span className="text-xs font-bold bg-blue-100 text-blue-900 px-2.5 py-1 rounded-xl">
                    Rata-rata: {avg}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Peserta Game Kuis:</span>
                    <span className="font-bold text-slate-800">{countKuis} siswa</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Peserta Uji Kompetensi:</span>
                    <span className="font-bold text-slate-800">{countUji} siswa</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Lembar Jawaban:</span>
                    <span className="font-bold text-slate-800">{list.length}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleExportCsv(k)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 font-bold text-xs border border-slate-200 hover:border-emerald-300 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Excel {k}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabel Status Realtime Siswa */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-700" />
              <span>Tabel Respon Realtime Peserta Didik</span>
            </h3>
            <p className="text-xs text-slate-500">Daftar siswa yang telah menyelesaikan Game Kuis maupun Uji Kompetensi</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Cari nama siswa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2 px-3.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 outline-none focus:border-blue-600"
            />

            <select
              value={filterKelas}
              onChange={(e) => setFilterKelas(e.target.value)}
              className="py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white outline-none focus:border-blue-600"
            >
              <option value="SEMUA">Semua Kelas</option>
              <option value="X-A">Kelas X-A</option>
              <option value="X-B">Kelas X-B</option>
              <option value="X-C">Kelas X-C</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#1E3A8A] text-white">
              <tr>
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider rounded-l-xl">No</th>
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider">Nama Lengkap</th>
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider">Kelas</th>
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider">Jenis Ujian</th>
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider">Nilai</th>
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider">Waktu Pengerjaan</th>
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-center rounded-r-xl">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Tidak ada data respon siswa yang sesuai dengan filter.
                  </td>
                </tr>
              ) : (
                filteredList.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-600">{idx + 1}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{row.nama}</td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
                        {row.kelas}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        row.jenisUjian === 'Game Kuis' 
                          ? 'bg-amber-100 text-amber-900' 
                          : 'bg-blue-100 text-blue-900'
                      }`}>
                        {row.jenisUjian}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-black text-sm text-slate-900">{row.nilai}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-xs">{row.waktu}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleResetStudent(row.id, row.nama)}
                        className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors font-bold text-xs"
                        title="Reset Ujian Siswa Ini"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Konfirmasi Hapus Semua Respon */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">
                Hapus Semua Data Respon Siswa?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 text-justify">
                Tindakan ini akan mengosongkan seluruh riwayat pengerjaan nilai Game Kuis dan Uji Kompetensi yang tersimpan di spreadsheet database. Pastikan Anda telah mengunduh rekap CSV sebelum melanjutkan.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="py-3 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md"
              >
                Ya, Hapus Semua
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
