import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Timer, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Users, 
  Trophy, 
  RotateCcw,
  Sparkles,
  Award
} from 'lucide-react';
import { SoalKuis, SiswaRecord } from '../types';
import { soalKuisList } from '../data/soalKuisData';
import { gasService } from '../services/gasService';

interface GameKuisKahootProps {
  siswa: SiswaRecord;
  onFinish: () => void;
}

export const GameKuisKahoot: React.FC<GameKuisKahootProps> = ({ siswa, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showPopupResult, setShowPopupResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Simulasi daftar respon siswa lain secara realtime
  const [realtimeResponses, setRealtimeResponses] = useState<{
    benarList: string[];
    salahList: string[];
  }>({ benarList: [], salahList: [] });

  const currentSoal = soalKuisList[currentIdx];

  // Colors & shapes ala Kahoot
  const kahootOptionsStyles = [
    { bg: 'bg-red-600 hover:bg-red-700', shape: '▲', colorName: 'Merah' },
    { bg: 'bg-blue-600 hover:bg-blue-700', shape: '◆', colorName: 'Biru' },
    { bg: 'bg-amber-500 hover:bg-amber-600', shape: '●', colorName: 'Kuning' },
    { bg: 'bg-emerald-600 hover:bg-emerald-700', shape: '■', colorName: 'Hijau' },
    { bg: 'bg-purple-600 hover:bg-purple-700', shape: '⬢', colorName: 'Ungu' },
  ];

  // Timer Countdown 20 detik per soal
  useEffect(() => {
    if (quizFinished || isAnswered) return;

    if (timeLeft <= 0) {
      // Waktu habis
      handleTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, quizFinished]);

  // Handle timeout
  const handleTimeout = () => {
    setIsAnswered(true);
    generateSimulatedStudentAnswers(false);
    setShowPopupResult(true);
  };

  // Handle student selects answer
  const handleSelectAnswer = (ans: number | string) => {
    if (isAnswered) return;
    setSelectedAnswer(ans);
    setIsAnswered(true);

    const isCorrect = ans === currentSoal.kunciJawaban;
    if (isCorrect) {
      setScore((prev) => prev + 20);
    }

    generateSimulatedStudentAnswers(isCorrect);
    setShowPopupResult(true);
  };

  // Generate simulated realtime student answers
  const generateSimulatedStudentAnswers = (userCorrect: boolean) => {
    const peers = [
      'Aditya Pratama (X-A)',
      'Nabila Azzahra (X-A)',
      'Bima Satria (X-B)',
      'Dewi Sekar (X-B)',
      'Fajar Nugraha (X-C)',
      'Siti Rahmawati (X-C)'
    ];

    const shuffled = [...peers].sort(() => 0.5 - Math.random());
    const countCorrect = Math.floor(Math.random() * 3) + 2;

    const benar = shuffled.slice(0, countCorrect);
    const salah = shuffled.slice(countCorrect);

    if (userCorrect) {
      benar.unshift(`${siswa.nama} (Anda)`);
    } else {
      salah.unshift(`${siswa.nama} (Anda)`);
    }

    setRealtimeResponses({ benarList: benar, salahList: salah });
  };

  // Lanjut ke soal berikutnya
  const handleNextQuestion = () => {
    setShowPopupResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTimeLeft(20);

    if (currentIdx + 1 < soalKuisList.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Kuis selesai!
      const finalScore = score + (selectedAnswer === currentSoal.kunciJawaban ? 20 : 0);
      setScore(finalScore);
      setQuizFinished(true);

      // Simpan ke Google Sheets database
      gasService.saveNilaiKuis(siswa.nama, siswa.kelas, finalScore);

      // Rayakan dengan confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // no-op
      }
    }
  };

  if (quizFinished) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-2xl text-center space-y-6 animate-fadeIn">
        <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
          <Trophy className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
            Kuis Selesai
          </span>
          <h2 className="text-3xl font-black text-slate-900">
            Hasil Game Kuis Pancasila
          </h2>
          <p className="text-sm text-slate-600">
            Prestasi hasil belajar Anda telah tercatat otomatis di Google Sheets.
          </p>
        </div>

        {/* Skor Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-900 to-indigo-900 text-white shadow-xl space-y-2">
          <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">
            Nilai Akhir
          </p>
          <div className="text-6xl font-black text-amber-400">
            {score}
          </div>
          <p className="text-sm font-semibold text-blue-100">
            Peserta: {siswa.nama} ({siswa.kelas})
          </p>
        </div>

        <div className="text-xs text-slate-500 text-justify">
          Evaluasi: Anda telah menyelesaikan lima tantangan cepat dinamika kelahiran Pancasila. Silakan lanjutkan ke Uji Kompetensi AKM untuk evaluasi pemahaman yang lebih komprehensif.
        </div>

        <button
          onClick={onFinish}
          className="w-full py-4 rounded-2xl bg-blue-800 hover:bg-blue-900 text-white font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <span>Kembali ke Dashboard / Menu Utama</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  const isUserCorrect = selectedAnswer === currentSoal.kunciJawaban;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Bar Status Kuis */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="bg-blue-100 text-blue-800 font-extrabold text-xs px-3 py-1.5 rounded-xl">
            Soal {currentIdx + 1} dari {soalKuisList.length}
          </span>
          <span className="text-xs font-semibold text-slate-600 hidden sm:inline">
            Mode: Kahoot Live Kuis
          </span>
        </div>

        {/* Countdown Timer Circle/Bar */}
        <div className="flex items-center gap-2">
          <Timer className={`w-5 h-5 ${timeLeft <= 5 ? 'text-red-600 animate-pulse' : 'text-blue-700'}`} />
          <div className={`px-3 py-1 rounded-xl font-black text-sm sm:text-base border ${
            timeLeft <= 5 
              ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' 
              : 'bg-blue-50 text-blue-900 border-blue-200'
          }`}>
            {timeLeft}s
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold text-slate-700">Skor: {score}</span>
        </div>
      </div>

      {/* Pertanyaan Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
          <span className="uppercase tracking-wider font-bold text-blue-800">
            {currentSoal.tipe === 'benar_salah' ? 'Tipe: Benar atau Salah' : 'Tipe: Pilihan Ganda (5 Opsi)'}
          </span>
          <span>Waktu Menjawab: 20 Detik</span>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed text-justify">
          {currentSoal.pertanyaan}
        </h2>
      </div>

      {/* Opsi Jawaban Kahoot Style */}
      {currentSoal.tipe === 'benar_salah' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['BENAR', 'SALAH'].map((val, idx) => {
            const isSelected = selectedAnswer === val;
            return (
              <button
                key={val}
                disabled={isAnswered}
                onClick={() => handleSelectAnswer(val)}
                className={`py-8 px-6 rounded-3xl font-black text-xl text-white shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-4 ${
                  val === 'BENAR' 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-red-600 hover:bg-red-700'
                } ${isSelected ? 'ring-4 ring-amber-400 scale-[1.02]' : ''}`}
              >
                <span className="text-2xl">{val === 'BENAR' ? '▲' : '◆'}</span>
                <span>{val}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentSoal.opsi?.map((opsiText, oidx) => {
            const style = kahootOptionsStyles[oidx % kahootOptionsStyles.length];
            const isSelected = selectedAnswer === oidx;
            return (
              <button
                key={oidx}
                disabled={isAnswered}
                onClick={() => handleSelectAnswer(oidx)}
                className={`${style.bg} py-5 px-5 rounded-2xl font-bold text-white shadow-md transition-all transform active:scale-95 flex items-center gap-3 text-left ${
                  oidx === 4 ? 'sm:col-span-2' : ''
                } ${isSelected ? 'ring-4 ring-amber-400 scale-[1.01]' : ''}`}
              >
                <span className="w-8 h-8 rounded-xl bg-black/20 flex items-center justify-center text-sm font-black shrink-0">
                  {style.shape}
                </span>
                <span className="text-xs sm:text-sm text-justify leading-tight flex-1">
                  {String.fromCharCode(65 + oidx)}. {opsiText}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* POP-UP MODAL EVALUASI & REALTIME RESPONSES SISWA */}
      {showPopupResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            
            <div className={`p-6 text-white text-center space-y-2 ${
              isUserCorrect ? 'bg-emerald-600' : 'bg-red-600'
            }`}>
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto">
                {isUserCorrect ? (
                  <CheckCircle2 className="w-10 h-10 text-white" />
                ) : (
                  <XCircle className="w-10 h-10 text-white" />
                )}
              </div>
              <h3 className="text-2xl font-black">
                {isUserCorrect ? 'Jawaban Anda Tepat!' : 'Jawaban Kurang Tepat!'}
              </h3>
              <p className="text-xs text-white/90">
                {isUserCorrect ? 'Poin bertambah +20' : 'Tetap semangat, pelajari ulasan berikut'}
              </p>
            </div>

            <div className="p-6 space-y-4">
              {/* Penjelasan Soal */}
              <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-200 space-y-1">
                <span className="text-xs font-bold text-blue-900 block">Kunci & Penjelasan Historis:</span>
                <p className="text-xs text-blue-950 leading-relaxed text-justify">
                  {currentSoal.penjelasan}
                </p>
              </div>

              {/* Realtime Siswa Pop-Up List */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Users className="w-4 h-4 text-blue-700" />
                  <span>Status Respon Siswa Realtime:</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[11px] font-bold text-emerald-800 block mb-1">
                      Menjawab Benar ({realtimeResponses.benarList.length})
                    </span>
                    <ul className="text-[10px] text-emerald-900 space-y-0.5">
                      {realtimeResponses.benarList.map((n, i) => (
                        <li key={i} className="truncate">• {n}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                    <span className="text-[11px] font-bold text-red-800 block mb-1">
                      Menjawab Salah / Lewat ({realtimeResponses.salahList.length})
                    </span>
                    <ul className="text-[10px] text-red-900 space-y-0.5">
                      {realtimeResponses.salahList.map((n, i) => (
                        <li key={i} className="truncate">• {n}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full py-3.5 rounded-2xl bg-blue-800 hover:bg-blue-900 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <span>{currentIdx + 1 < soalKuisList.length ? 'Lanjut ke Soal Berikutnya' : 'Lihat Hasil Akhir Kuis'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
