import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  Download, 
  BookOpen, 
  FileCode, 
  Database, 
  Sparkles, 
  ExternalLink,
  Layers,
  ChevronRight
} from 'lucide-react';
import { CODE_GS_CONTENT, INDEX_HTML_SAMPLE } from '../data/gasSourceCode';

export const GasCodeModal: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'codegs' | 'indexhtml' | 'panduan'>('codegs');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* Header Modal */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-blue-700">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-amber-400 text-blue-950 rounded-xl font-bold shadow-md">
            <Code2 className="w-6 h-6" />
          </div>
          <span className="text-amber-300 font-bold text-sm uppercase tracking-wider">
            Source Code & Deploy Guide
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Integrasi Google Apps Script (GAS)
        </h1>
        <p className="text-blue-100 text-sm sm:text-base leading-relaxed text-justify">
          Seluruh kode backend (Code.gs) dan antarmuka web (Index.html) telah dirancang secara modular dan bebas error. Anda dapat menyalin atau mengunduh kode ini langsung untuk dideploy ke Google Spreadsheet sekolah Anda tanpa konfigurasi server yang rumit.
        </p>

        {/* Tab Selector */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6 bg-blue-950/60 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveCodeTab('codegs')}
            className={`py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeCodeTab === 'codegs'
                ? 'bg-amber-400 text-blue-950 shadow-md'
                : 'text-blue-200 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Code.gs (Backend)</span>
          </button>

          <button
            onClick={() => setActiveCodeTab('indexhtml')}
            className={`py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeCodeTab === 'indexhtml'
                ? 'bg-amber-400 text-blue-950 shadow-md'
                : 'text-blue-200 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Index.html (Frontend)</span>
          </button>

          <button
            onClick={() => setActiveCodeTab('panduan')}
            className={`py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeCodeTab === 'panduan'
                ? 'bg-amber-400 text-blue-950 shadow-md'
                : 'text-blue-200 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Panduan Deploy 5 Langkah</span>
          </button>
        </div>
      </div>

      {/* Konten Tab 1: Code.gs */}
      {activeCodeTab === 'codegs' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <FileCode className="w-5 h-5 text-blue-700" />
                <span>File: Code.gs (Logic Backend Apps Script)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Memuat fungsi doGet, setupDatabase, saveSiswa, saveNilai, token generator, dan leaderboard.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(CODE_GS_CONTENT, 'codegs')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold transition-colors shadow-sm"
              >
                {copiedCode === 'codegs' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode === 'codegs' ? 'Tersalin!' : 'Salin Code.gs'}</span>
              </button>

              <button
                onClick={() => handleDownload('Code.gs', CODE_GS_CONTENT)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors border border-slate-200"
              >
                <Download className="w-4 h-4" />
                <span>Unduh File</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <pre className="bg-slate-900 text-slate-100 p-5 rounded-2xl text-xs font-mono overflow-x-auto max-h-[500px] leading-relaxed">
              <code>{CODE_GS_CONTENT}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Konten Tab 2: Index.html */}
      {activeCodeTab === 'indexhtml' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-600" />
                <span>File: Index.html (Client Interface Web App)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Struktur HTML5, Tailwind CSS via CDN, Chart.js, dan pemanggilan google.script.run tanpa reload.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(INDEX_HTML_SAMPLE, 'indexhtml')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold transition-colors shadow-sm"
              >
                {copiedCode === 'indexhtml' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode === 'indexhtml' ? 'Tersalin!' : 'Salin Index.html'}</span>
              </button>

              <button
                onClick={() => handleDownload('Index.html', INDEX_HTML_SAMPLE)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors border border-slate-200"
              >
                <Download className="w-4 h-4" />
                <span>Unduh File</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <pre className="bg-slate-900 text-slate-100 p-5 rounded-2xl text-xs font-mono overflow-x-auto max-h-[500px] leading-relaxed">
              <code>{INDEX_HTML_SAMPLE}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Konten Tab 3: Panduan Deploy 5 Langkah */}
      {activeCodeTab === 'panduan' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-700" />
              <span>Panduan Lengkap Deploy ke Google Apps Script (5 Langkah)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Ikuti lima langkah mudah berikut agar aplikasi dapat diakses secara publik oleh seluruh murid kelas X.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-blue-800 text-white font-black text-sm flex items-center justify-center shrink-0">
                1
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-blue-950">Buat Google Spreadsheet Baru</h3>
                <p className="text-xs text-slate-600 leading-relaxed text-justify">
                  Buka Google Spreadsheet baru di browser (sheets.google.com). Beri nama file misalnya: "Database Pembelajaran Pancasila Kelas X". Anda tidak perlu membuat sheet manual karena fungsi setupDatabase() akan membuatnya otomatis.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-blue-800 text-white font-black text-sm flex items-center justify-center shrink-0">
                2
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-blue-950">Buka Menu Ekstensi - Apps Script</h3>
                <p className="text-xs text-slate-600 leading-relaxed text-justify">
                  Pada menu bar atas spreadsheet, klik menu <b>Ekstensi</b> lalu pilih <b>Apps Script</b>. Jendela editor Google Apps Script akan terbuka di tab baru.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-blue-800 text-white font-black text-sm flex items-center justify-center shrink-0">
                3
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-blue-950">Tempelkan File Code.gs dan Buat Index.html</h3>
                <p className="text-xs text-slate-600 leading-relaxed text-justify">
                  Hapus seluruh kode default di file <b>Code.gs</b>, lalu tempelkan kode dari tab <b>Code.gs</b> di atas. Selanjutnya, klik tombol tanda tambah (+) di sebelah File, pilih <b>HTML</b>, beri nama <b>Index</b> (tanpa ekstensi .html), dan tempelkan seluruh isi dari tab <b>Index.html</b>.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-blue-800 text-white font-black text-sm flex items-center justify-center shrink-0">
                4
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-blue-950">Jalankan Inisialisasi setupDatabase()</h3>
                <p className="text-xs text-slate-600 leading-relaxed text-justify">
                  Pilih fungsi <b>setupDatabase</b> pada dropdown fungsi di toolbar atas Apps Script, lalu klik tombol <b>Jalankan (Run)</b>. Berikan izin akses (review permissions) pada akun Google Anda. Periksa Google Spreadsheet Anda, empat sheet otomatis terbuat lengkap dengan header biru tua: Siswa, Nilai_Kuis, Nilai_UjiKomp, dan Token.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-blue-800 text-white font-black text-sm flex items-center justify-center shrink-0">
                5
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-blue-950">Deploy Sebagai Aplikasi Web (Web App)</h3>
                <p className="text-xs text-slate-600 leading-relaxed text-justify">
                  Klik tombol biru <b>Terapkan (Deploy)</b> di pojok kanan atas, pilih <b>Penerapan Baru (New Deployment)</b>. Klik ikon roda gigi pilih <b>Aplikasi Web (Web App)</b>. Atur:
                  <br />• Jalankan sebagai: <b>Saya (email Anda)</b>
                  <br />• Siapa yang memiliki akses: <b>Siapa saja (Anyone)</b>
                  <br />Klik <b>Terapkan</b> dan salin URL Web App yang dihasilkan. Bagikan link tersebut ke peserta didik Anda!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
