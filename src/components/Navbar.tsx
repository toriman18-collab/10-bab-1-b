import React, { useState } from 'react';
import { 
  BookOpen, 
  Target, 
  HelpCircle, 
  Award, 
  FileText, 
  CheckCircle2, 
  Gamepad2, 
  Code2, 
  Menu, 
  X, 
  UserCheck, 
  LogOut, 
  GraduationCap,
  ShieldAlert
} from 'lucide-react';
import { SiswaRecord } from '../types';

export type TabId = 
  | 'home' 
  | 'tujuan' 
  | 'pemantik' 
  | 'manfaat' 
  | 'materi' 
  | 'kesimpulan' 
  | 'portal' 
  | 'siswa-dashboard'
  | 'guru-dashboard'
  | 'game-kuis' 
  | 'uji-kompetensi' 
  | 'gas-code';

interface NavbarProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  currentSiswa: SiswaRecord | null;
  isGuruLoggedIn: boolean;
  onLogoutSiswa: () => void;
  onLogoutGuru: () => void;
  onOpenPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  currentSiswa,
  isGuruLoggedIn,
  onLogoutSiswa,
  onLogoutGuru,
  onOpenPortal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as TabId, label: 'Home', icon: BookOpen },
    { id: 'tujuan' as TabId, label: 'Tujuan Pembelajaran', icon: Target },
    { id: 'pemantik' as TabId, label: 'Pertanyaan Pemantik', icon: HelpCircle },
    { id: 'manfaat' as TabId, label: 'Manfaat', icon: Award },
    { id: 'materi' as TabId, label: 'Penjelasan Materi', icon: FileText },
    { id: 'kesimpulan' as TabId, label: 'Kesimpulan', icon: CheckCircle2 },
    { id: 'portal' as TabId, label: 'Kuis & Uji Kompetensi', icon: Gamepad2, highlight: true },
    { id: 'gas-code' as TabId, label: 'Deploy GAS (Code.gs)', icon: Code2 }
  ];

  const handleNavClick = (tab: TabId) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#1E3A8A] text-white shadow-xl border-b border-blue-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Edukatif */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="w-7 h-7 text-[#1E3A8A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  Pancasila<span className="text-amber-400">Edu</span>
                </span>
                <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                  Fase E
                </span>
              </div>
              <p className="text-xs text-blue-200 hidden sm:block">
                Menganalisis Dinamika Kelahiran Pancasila
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'bg-amber-400 text-blue-950 shadow-md font-bold'
                      : item.highlight
                        ? 'bg-blue-600/90 text-white hover:bg-blue-500 border border-blue-400/40 shadow-sm'
                        : 'text-blue-100 hover:text-white hover:bg-blue-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-950' : item.highlight ? 'text-amber-300' : 'text-blue-200'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Profile / Portal Status */}
          <div className="hidden lg:flex items-center gap-3">
            {isGuruLoggedIn ? (
              <div className="flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 py-1.5 px-3 rounded-xl">
                <ShieldAlert className="w-4 h-4 text-amber-300" />
                <div className="text-left">
                  <p className="text-xs font-bold text-amber-200">Panel Guru</p>
                  <p className="text-[10px] text-amber-300/80">Mode Administrator</p>
                </div>
                <button
                  onClick={() => handleNavClick('guru-dashboard')}
                  className="ml-1 text-xs bg-amber-400 text-blue-950 px-2.5 py-1 rounded-lg font-bold hover:bg-amber-300 transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={onLogoutGuru}
                  title="Logout Guru"
                  className="p-1 hover:bg-red-500/20 text-red-300 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : currentSiswa ? (
              <div className="flex items-center gap-2 bg-blue-800/80 border border-blue-700 py-1.5 px-3 rounded-xl">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <div className="text-left max-w-[140px] truncate">
                  <p className="text-xs font-bold text-white truncate">{currentSiswa.nama}</p>
                  <p className="text-[10px] text-emerald-300 font-semibold">{currentSiswa.kelas}</p>
                </div>
                <button
                  onClick={() => handleNavClick('siswa-dashboard')}
                  className="ml-1 text-xs bg-blue-500 text-white px-2.5 py-1 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
                >
                  Ujian
                </button>
                <button
                  onClick={onLogoutSiswa}
                  title="Logout Siswa"
                  className="p-1 hover:bg-red-500/20 text-red-300 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenPortal}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-blue-950 px-4 py-2 rounded-xl font-bold text-xs shadow-md hover:from-amber-300 hover:to-amber-400 transition-all transform hover:-translate-y-0.5"
              >
                <Gamepad2 className="w-4 h-4 text-blue-950" />
                <span>Masuk Portal Ujian</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            {currentSiswa && (
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded-md font-semibold">
                {currentSiswa.kelas}
              </span>
            )}
            {isGuruLoggedIn && (
              <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-1 rounded-md font-semibold">
                Guru
              </span>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-blue-800 text-white hover:bg-blue-700 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-blue-950/95 border-b border-blue-800 px-4 pt-3 pb-6 space-y-2 backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive 
                    ? 'bg-amber-400 text-blue-950 font-bold shadow' 
                    : item.highlight
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-950' : 'text-amber-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-4 border-t border-blue-800/80 flex flex-col gap-2">
            {isGuruLoggedIn ? (
              <div className="flex items-center justify-between bg-amber-500/20 p-3 rounded-xl border border-amber-400/30">
                <div>
                  <p className="text-xs font-bold text-amber-200">Guru Aktif</p>
                  <p className="text-[10px] text-amber-300">Mode Kontrol Guru</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleNavClick('guru-dashboard')}
                    className="text-xs bg-amber-400 text-blue-950 px-3 py-1.5 rounded-lg font-bold"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={onLogoutGuru}
                    className="text-xs bg-red-500/20 text-red-300 px-3 py-1.5 rounded-lg font-bold"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : currentSiswa ? (
              <div className="flex items-center justify-between bg-blue-900/80 p-3 rounded-xl border border-blue-700">
                <div>
                  <p className="text-xs font-bold text-white">{currentSiswa.nama}</p>
                  <p className="text-[10px] text-emerald-300 font-semibold">{currentSiswa.kelas}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleNavClick('siswa-dashboard')}
                    className="text-xs bg-blue-500 text-white px-3 py-1.5 rounded-lg font-bold"
                  >
                    Ujian
                  </button>
                  <button
                    onClick={onLogoutSiswa}
                    className="text-xs bg-red-500/20 text-red-300 px-3 py-1.5 rounded-lg font-bold"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal();
                }}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-blue-950 font-bold rounded-xl text-center shadow-lg"
              >
                Masuk Portal Siswa / Guru
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
