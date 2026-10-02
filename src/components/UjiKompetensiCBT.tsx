import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Timer, 
  CheckCircle2, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Trophy, 
  ArrowRight,
  AlertTriangle,
  RotateCcw,
  Check,
  Award
} from 'lucide-react';
import { SoalAKM, SiswaRecord, JawabanSiswaAKM } from '../types';
import { soalAkmList } from '../data/soalAkmData';
import { gasService } from '../services/gasService';

interface UjiKompetensiCBTProps {
  siswa: SiswaRecord;
  onFinish: () => void;
}

export const UjiKompetensiCBT: React.FC<UjiKompetensiCBTProps> = ({ siswa, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(90 * 60); // 90 Menit
  const [jawabanState, setJawabanState] = useState<JawabanSiswaAKM>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const currentSoal = soalAkmList[currentIdx];
  const currentJawaban = jawabanState[currentSoal.id];

  // Timer Countdown 90 Menit
  useEffect(() => {
    if (isSubmitted) return;

    if (timeLeftSeconds <= 0) {
      handleSubmitExam();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeftSeconds, isSubmitted]);

  // Format Timer mm:ss
  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Update Jawaban Siswa
  const handleAnswerChange = (val: any) => {
    setJawabanState((prev) => ({
      ...prev,
      [currentSoal.id]: {
        jawaban: val,
        ragu: prev[currentSoal.id]?.ragu || false
      }
    }));
  };

  // Toggle Ragu-ragu
  const handleToggleRagu = () => {
    setJawabanState((prev) => ({
      ...prev,
      [currentSoal.id]: {
        jawaban: prev[currentSoal.id]?.jawaban,
        ragu: !prev[currentSoal.id]?.ragu
      }
    }));
  };

  // Handler Pilihan Ganda Kompleks (Checkbox multi select)
  const handleTogglePgKompleks = (optIdx: number) => {
    const existing: number[] = Array.isArray(currentJawaban?.jawaban) ? currentJawaban.jawaban : [];
    let updated: number[];
    if (existing.includes(optIdx)) {
      updated = existing.filter((i) => i !== optIdx);
    } else {
      updated = [...existing, optIdx].sort((a, b) => a - b);
    }
    handleAnswerChange(updated);
  };

  // Handler Menjodohkan
  const handleMatchSelect = (premisId: string, responId: string) => {
    const existing: Record<string, string> = 
      currentJawaban?.jawaban && typeof currentJawaban.jawaban === 'object' && !Array.isArray(currentJawaban.jawaban)
        ? { ...currentJawaban.jawaban }
        : {};
    
    existing[premisId] = responId;
    handleAnswerChange(existing);
  };

  // Hitung Nilai Akhir
  const calculateScore = (): number => {
    let totalBenar = 0;

    soalAkmList.forEach((soal) => {
      const userAns = jawabanState[soal.id]?.jawaban;
      if (userAns === undefined || userAns === null) return;

      if (soal.tipe === 'pilihan_ganda' || soal.tipe === 'benar_salah') {
        if (userAns === soal.kunciJawaban) {
          totalBenar += 1;
        }
      } else if (soal.tipe === 'pg_kompleks') {
        const kunciArr = soal.kunciJawaban as number[];
        if (Array.isArray(userAns)) {
          const isSame = 
            userAns.length === kunciArr.length && 
            userAns.every((val) => kunciArr.includes(val));
          if (isSame) totalBenar += 1;
        }
      } else if (soal.tipe === 'menjodohkan') {
        const kunciMap = soal.kunciJawaban as Record<string, string>;
        if (typeof userAns === 'object' && userAns !== null) {
          let allMatch = true;
          for (const k in kunciMap) {
            if (userAns[k] !== kunciMap[k]) {
              allMatch = false;
              break;
            }
          }
          if (allMatch) totalBenar += 1;
        }
      }
    });

    // 20 soal = tiap soal bobot 5 poin -> Total 100
    return Math.round((totalBenar / soalAkmList.length) * 100);
  };

  // Selesai & Kirim Ujian
  const handleSubmitExam = () => {
    setShowConfirmModal(false);
    const calculated = calculateScore();
    setFinalScore(calculated);
    setIsSubmitted(true);

    // Kirim data ke database Google Sheets
    gasService.saveNilaiUjiKomp(siswa.nama, siswa.kelas, calculated);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // no-op
    }
  };

  // Hitung status navigasi (Sudah dijawab, Belum, Ragu)
  const getNavStatus = (soalId: number) => {
    const item = jawabanState[soalId];
    if (!item || item.jawaban === undefined || item.jawaban === null) {
      return 'belum'; // Abu-abu
    }
    if (item.ragu) {
      return 'ragu'; // Kuning
    }
    return 'sudah'; // Hijau
  };

  const countAnswered = soalAkmList.filter((s) => getNavStatus(s.id) === 'sudah' || getNavStatus(s.id) === 'ragu').length;

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-2xl text-center space-y-6 animate-fadeIn">
        <div className="w-20 h-20 rounded-3xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto shadow-inner">
          <Trophy className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full">
            Uji Kompetensi Selesai
          </span>
          <h2 className="text-3xl font-black text-slate-900">
            Hasil Uji Kompetensi AKM Pancasila
          </h2>
          <p className="text-sm text-slate-600">
            Lembar jawaban 20 soal AKM Anda telah berhasil diperiksa dan disimpan ke Google Spreadsheet.
          </p>
        </div>

        {/* Skor Box */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-900 to-indigo-900 text-white shadow-xl space-y-2">
          <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">
            Nilai Evaluasi Akhir
          </p>
          <div className="text-6xl font-black text-amber-400">
            {finalScore}
          </div>
          <p className="text-sm font-semibold text-blue-100">
            Nama: {siswa.nama} | Kelas: {siswa.kelas}
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 text-justify">
          Terima kasih atas partisipasi aktif dan kesungguhan Anda dalam menuntaskan 20 soal asesmen kompetensi minimum materi Dinamika Kelahiran Pancasila. Hasil evaluasi dapat dilihat oleh guru pada Dashboard Analisis Kelas.
        </div>

        <button
          onClick={onFinish}
          className="w-full py-4 rounded-2xl bg-blue-800 hover:bg-blue-900 text-white font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <span>Kembali ke Halaman Utama</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto">
      {/* Top Header CBT */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-extrabold text-blue-800 bg-blue-100 px-3 py-1 rounded-xl">
              CBT Uji Kompetensi AKM
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Pendidikan Pancasila Fase E (Kelas X)
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-800">
            Peserta: {siswa.nama} ({siswa.kelas})
          </h2>
        </div>

        {/* Countdown Timer 90 Menit */}
        <div className="flex items-center gap-4 bg-slate-50 p-2.5 px-4 rounded-2xl border border-slate-200 self-start md:self-auto">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-amber-600" />
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase block leading-none">
                Sisa Waktu
              </span>
              <span className="text-base sm:text-lg font-black text-slate-800 tracking-wider">
                {formatTime(timeLeftSeconds)}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowConfirmModal(true)}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Kirim Ujian</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Soal (Left 8 cols) & Navigasi (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Kolom Soal */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            
            {/* Indikator Soal & Tingkat Kesukaran */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-800 text-white font-extrabold text-sm flex items-center justify-center">
                  {currentIdx + 1}
                </span>
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                  Soal Nomor {currentIdx + 1} dari 20
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${
                  currentSoal.kesukaran === 'HOTS' 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : currentSoal.kesukaran === 'MEDIUM' 
                      ? 'bg-amber-100 text-amber-700 border border-amber-200' 
                      : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                }`}>
                  Tingkat: {currentSoal.kesukaran}
                </span>

                <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full uppercase">
                  {currentSoal.tipe.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Stimulus Narasi */}
            {currentSoal.stimulus && (
              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Stimulus Bacaan / Konteks:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                  {currentSoal.stimulus}
                </p>
              </div>
            )}

            {/* Teks Pertanyaan */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed text-justify">
                {currentSoal.pertanyaan}
              </h3>
            </div>

            {/* Area Opsi Jawaban Sesuai Tipe */}
            <div className="pt-2">
              
              {/* 1. Tipe PILIHAN GANDA (A-E) */}
              {currentSoal.tipe === 'pilihan_ganda' && (
                <div className="space-y-3">
                  {currentSoal.opsi?.map((opsiText, oidx) => {
                    const isSelected = currentJawaban?.jawaban === oidx;
                    return (
                      <div
                        key={oidx}
                        onClick={() => handleAnswerChange(oidx)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-200'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {String.fromCharCode(65 + oidx)}
                        </span>
                        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify flex-1">
                          {opsiText}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 2. Tipe BENAR / SALAH */}
              {currentSoal.tipe === 'benar_salah' && (
                <div className="grid grid-cols-2 gap-4">
                  {['BENAR', 'SALAH'].map((val) => {
                    const isSelected = currentJawaban?.jawaban === val;
                    return (
                      <div
                        key={val}
                        onClick={() => handleAnswerChange(val)}
                        className={`py-6 px-4 rounded-2xl border text-center cursor-pointer font-black text-lg transition-all ${
                          isSelected
                            ? val === 'BENAR' 
                              ? 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200' 
                              : 'bg-red-500 text-white border-red-600 shadow-md ring-2 ring-red-200'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {val}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 3. Tipe PILIHAN GANDA KOMPLEKS (Bisa > 1) */}
              {currentSoal.tipe === 'pg_kompleks' && (
                <div className="space-y-3">
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-semibold mb-2">
                    Petunjuk: Anda dapat mencentang lebih dari satu jawaban yang dianggap benar.
                  </div>
                  {currentSoal.opsi?.map((opsiText, oidx) => {
                    const selectedArr = Array.isArray(currentJawaban?.jawaban) ? currentJawaban.jawaban : [];
                    const isChecked = selectedArr.includes(oidx);
                    return (
                      <div
                        key={oidx}
                        onClick={() => handleTogglePgKompleks(oidx)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                          isChecked
                            ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-200'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                          isChecked ? 'bg-amber-500 border-amber-600 text-white' : 'border-slate-300 bg-slate-50'
                        }`}>
                          {isChecked && <Check className="w-4 h-4" />}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify flex-1">
                          {opsiText}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 4. Tipe MENJODOHKAN (Matching Pair) */}
              {currentSoal.tipe === 'menjodohkan' && currentSoal.pasangan && (
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 font-semibold mb-2">
                    Petunjuk: Pasangkan setiap premis di kolom kiri dengan respon yang tepat di kolom kanan.
                  </div>

                  <div className="space-y-3">
                    {currentSoal.pasangan.premisList.map((premis) => {
                      const userMatched = currentJawaban?.jawaban?.[premis.id] || '';
                      return (
                        <div key={premis.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                          <p className="text-xs sm:text-sm font-bold text-slate-800 text-justify">
                            Premis: {premis.teks}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-slate-500">Pasangkan ke:</span>
                            <select
                              value={userMatched}
                              onChange={(e) => handleMatchSelect(premis.id, e.target.value)}
                              className="flex-1 py-2 px-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium text-slate-800 outline-none focus:border-blue-600"
                            >
                              <option value="">Pilih Pasangan Respon...</option>
                              {currentSoal.pasangan?.responList.map((resp) => (
                                <option key={resp.id} value={resp.id}>
                                  {resp.teks}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Baris Tombol Navigasi Bawah Soal */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => prev - 1)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-100 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Soal Sebelumnya</span>
              </button>

              <button
                type="button"
                onClick={handleToggleRagu}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-colors ${
                  currentJawaban?.ragu
                    ? 'bg-amber-400 text-blue-950 border-amber-500 shadow-sm'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-amber-100'
                }`}
              >
                {currentJawaban?.ragu ? 'Hilangkan Ragu-ragu' : 'Tandai Ragu-ragu'}
              </button>

              {currentIdx + 1 < soalAkmList.length ? (
                <button
                  type="button"
                  onClick={() => setCurrentIdx((prev) => prev + 1)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
                >
                  <span>Soal Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(true)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black shadow-md transition-colors"
                >
                  <span>Selesai & Kumpulkan</span>
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Kolom Kanan: Card Grid Navigasi Soal (20 Soal) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800 text-sm">
                Navigasi Nomor Soal
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                {countAnswered} / 20 Terjawab
              </span>
            </div>

            {/* Grid 20 Buttons */}
            <div className="grid grid-cols-5 gap-2.5">
              {soalAkmList.map((s, idx) => {
                const status = getNavStatus(s.id);
                const isCurrent = currentIdx === idx;

                let colorClass = 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'; // Abu-abu: Belum
                if (status === 'sudah') {
                  colorClass = 'bg-emerald-600 text-white border-emerald-700'; // Hijau: Sudah
                } else if (status === 'ragu') {
                  colorClass = 'bg-amber-400 text-blue-950 border-amber-500 font-extrabold'; // Kuning: Ragu
                }

                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-11 rounded-xl text-xs font-bold border transition-all flex items-center justify-center relative ${colorClass} ${
                      isCurrent ? 'ring-4 ring-blue-500 scale-105' : ''
                    }`}
                  >
                    <span>{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            {/* Legenda Warna */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-600 shrink-0" />
                <span className="text-slate-600">Warna Hijau: Sudah Dijawab</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-amber-400 shrink-0" />
                <span className="text-slate-600">Warna Kuning: Ragu-ragu / Aktif</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-slate-200 shrink-0" />
                <span className="text-slate-600">Warna Abu-abu: Belum Dijawab</span>
              </div>
            </div>

            {/* Tombol Kirim Ujian */}
            <div className="pt-2">
              <button
                onClick={() => setShowConfirmModal(true)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Kumpulkan Seluruh Jawaban</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Modal Konfirmasi Pengumpulan */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">
                Konfirmasi Pengumpulan Ujian
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 text-justify">
                Anda telah menjawab {countAnswered} dari 20 soal. Apakah Anda yakin ingin mengakhiri sesi uji kompetensi ini? Setelah dikumpulkan, nilai akan langsung dihitung dan disimpan di Google Spreadsheet.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="py-3 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Lanjutkan Mengerjakan
              </button>
              <button
                type="button"
                onClick={handleSubmitExam}
                className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                Ya, Kumpulkan Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
