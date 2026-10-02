import React, { useState, useEffect } from 'react';
import { 
  TabId, 
  Navbar 
} from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { TujuanSection } from './components/TujuanSection';
import { PemantikSection } from './components/PemantikSection';
import { ManfaatSection } from './components/ManfaatSection';
import { MateriSection } from './components/MateriSection';
import { KesimpulanSection } from './components/KesimpulanSection';
import { PortalModal } from './components/PortalModal';
import { SiswaDashboard } from './components/SiswaDashboard';
import { GuruDashboard } from './components/GuruDashboard';
import { GameKuisKahoot } from './components/GameKuisKahoot';
import { UjiKompetensiCBT } from './components/UjiKompetensiCBT';
import { GasCodeModal } from './components/GasCodeModal';
import { SiswaRecord, UjianType } from './types';
import { gasService } from './services/gasService';
import { GraduationCap, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [currentSiswa, setCurrentSiswa] = useState<SiswaRecord | null>(null);
  const [isGuruLoggedIn, setIsGuruLoggedIn] = useState(false);
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);

  // Inisialisasi awal database lokal (mirroring Code.gs setupDatabase)
  useEffect(() => {
    gasService.setupDatabase();
  }, []);

  // Mulai ujian dari portal modal
  const handleStartExamFromModal = (siswa: SiswaRecord, mode: UjianType) => {
    setCurrentSiswa(siswa);
    if (mode === 'Game Kuis') {
      setActiveTab('game-kuis');
    } else {
      setActiveTab('uji-kompetensi');
    }
  };

  // Mulai ujian dari dashboard siswa
  const handleStartExamFromDashboard = (mode: UjianType) => {
    if (mode === 'Game Kuis') {
      setActiveTab('game-kuis');
    } else {
      setActiveTab('uji-kompetensi');
    }
  };

  // Logout siswa
  const handleLogoutSiswa = () => {
    setCurrentSiswa(null);
    setActiveTab('home');
  };

  // Logout guru
  const handleLogoutGuru = () => {
    setIsGuruLoggedIn(false);
    setActiveTab('home');
  };

  // Login guru berhasil
  const handleLoginGuruSuccess = () => {
    setIsGuruLoggedIn(true);
    setActiveTab('guru-dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-blue-950 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header Bar Utama */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'portal') {
            setIsPortalModalOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        currentSiswa={currentSiswa}
        isGuruLoggedIn={isGuruLoggedIn}
        onLogoutSiswa={handleLogoutSiswa}
        onLogoutGuru={handleLogoutGuru}
        onOpenPortal={() => setIsPortalModalOpen(true)}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === 'home' && (
          <HomeSection 
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenPortal={() => setIsPortalModalOpen(true)}
          />
        )}

        {activeTab === 'tujuan' && <TujuanSection />}
        {activeTab === 'pemantik' && <PemantikSection />}
        {activeTab === 'manfaat' && <ManfaatSection />}
        {activeTab === 'materi' && <MateriSection />}
        {activeTab === 'kesimpulan' && (
          <KesimpulanSection onOpenPortal={() => setIsPortalModalOpen(true)} />
        )}

        {activeTab === 'gas-code' && <GasCodeModal />}

        {/* Dashboard Siswa */}
        {activeTab === 'siswa-dashboard' && currentSiswa && (
          <SiswaDashboard
            siswa={currentSiswa}
            onStartExam={handleStartExamFromDashboard}
            onLogout={handleLogoutSiswa}
          />
        )}

        {/* Dashboard Guru */}
        {activeTab === 'guru-dashboard' && isGuruLoggedIn && (
          <GuruDashboard onLogout={handleLogoutGuru} />
        )}

        {/* Engine Game Kuis Kahoot-Style */}
        {activeTab === 'game-kuis' && currentSiswa && (
          <GameKuisKahoot
            siswa={currentSiswa}
            onFinish={() => setActiveTab('home')}
          />
        )}

        {/* Engine Uji Kompetensi AKM CBT */}
        {activeTab === 'uji-kompetensi' && currentSiswa && (
          <UjiKompetensiCBT
            siswa={currentSiswa}
            onFinish={() => setActiveTab('home')}
          />
        )}
      </main>

      {/* Footer Edukatif */}
      <footer className="bg-blue-950 text-white border-t border-blue-900/60 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-blue-950 font-bold shadow">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <p className="font-extrabold text-base">
                  Pancasila<span className="text-amber-400">Edu</span>
                </p>
                <p className="text-xs text-blue-300">
                  Media Pembelajaran Interaktif Pendidikan Pancasila Kelas X (Fase E)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-blue-200">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Kurikulum Merdeka</span>
              </span>
              <span className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-amber-400" />
                <span>Profil Pelajar Pancasila</span>
              </span>
              <span>Siap Deploy Google Apps Script</span>
            </div>

            <div className="text-xs text-blue-400 text-center md:text-right">
              Menganalisis Dinamika Kelahiran Pancasila
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Masuk Portal Siswa / Guru */}
      <PortalModal
        isOpen={isPortalModalOpen}
        onClose={() => setIsPortalModalOpen(false)}
        onStartExam={handleStartExamFromModal}
        onLoginGuruSuccess={handleLoginGuruSuccess}
      />
    </div>
  );
}
