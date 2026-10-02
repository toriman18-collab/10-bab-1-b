import { SiswaRecord, NilaiRecord, TokenRecord, UjianType, KelasType } from '../types';

const STORAGE_KEYS = {
  SISWA: 'pancasila_gas_siswa',
  NILAI: 'pancasila_gas_nilai',
  TOKENS: 'pancasila_gas_tokens',
  ACTIVE_USER: 'pancasila_gas_active_user',
};

// Data awal realistis untuk simulasi Google Sheets
const INITIAL_SISWA: SiswaRecord[] = [
  { id: 's1', nama: 'Aditya Pratama Putra', kelas: 'X-A', timestamp: '01/10/2026 08:15:20' },
  { id: 's2', nama: 'Nabila Azzahra Putri', kelas: 'X-A', timestamp: '01/10/2026 08:16:05' },
  { id: 's3', nama: 'Bima Satria Wicaksono', kelas: 'X-B', timestamp: '01/10/2026 08:18:12' },
  { id: 's4', nama: 'Dewi Sekar Arum', kelas: 'X-B', timestamp: '01/10/2026 08:20:44' },
  { id: 's5', nama: 'Fajar Nugraha Santoso', kelas: 'X-C', timestamp: '01/10/2026 08:22:30' },
  { id: 's6', nama: 'Siti Rahmawati Hanum', kelas: 'X-C', timestamp: '01/10/2026 08:25:10' },
  { id: 's7', nama: 'Rizky Ramadhan', kelas: 'X-A', timestamp: '01/10/2026 08:27:00' },
  { id: 's8', nama: 'Aisyah Nur Salsabila', kelas: 'X-B', timestamp: '01/10/2026 08:30:15' }
];

const INITIAL_NILAI: NilaiRecord[] = [
  // Game Kuis
  { id: 'nk1', nama: 'Nabila Azzahra Putri', kelas: 'X-A', jenisUjian: 'Game Kuis', nilai: 100, waktu: '01/10/2026 08:35:10' },
  { id: 'nk2', nama: 'Bima Satria Wicaksono', kelas: 'X-B', jenisUjian: 'Game Kuis', nilai: 100, waktu: '01/10/2026 08:36:40' },
  { id: 'nk3', nama: 'Aditya Pratama Putra', kelas: 'X-A', jenisUjian: 'Game Kuis', nilai: 80, waktu: '01/10/2026 08:38:00' },
  { id: 'nk4', nama: 'Dewi Sekar Arum', kelas: 'X-B', jenisUjian: 'Game Kuis', nilai: 80, waktu: '01/10/2026 08:39:15' },
  { id: 'nk5', nama: 'Siti Rahmawati Hanum', kelas: 'X-C', jenisUjian: 'Game Kuis', nilai: 80, waktu: '01/10/2026 08:41:00' },
  { id: 'nk6', nama: 'Fajar Nugraha Santoso', kelas: 'X-C', jenisUjian: 'Game Kuis', nilai: 60, waktu: '01/10/2026 08:42:30' },
  // Uji Kompetensi
  { id: 'nu1', nama: 'Nabila Azzahra Putri', kelas: 'X-A', jenisUjian: 'Uji Kompetensi', nilai: 95, waktu: '01/10/2026 09:40:20' },
  { id: 'nu2', nama: 'Aditya Pratama Putra', kelas: 'X-A', jenisUjian: 'Uji Kompetensi', nilai: 90, waktu: '01/10/2026 09:42:15' },
  { id: 'nu3', nama: 'Bima Satria Wicaksono', kelas: 'X-B', jenisUjian: 'Uji Kompetensi', nilai: 90, waktu: '01/10/2026 09:45:00' },
  { id: 'nu4', nama: 'Aisyah Nur Salsabila', kelas: 'X-B', jenisUjian: 'Uji Kompetensi', nilai: 85, waktu: '01/10/2026 09:48:30' },
  { id: 'nu5', nama: 'Dewi Sekar Arum', kelas: 'X-B', jenisUjian: 'Uji Kompetensi', nilai: 80, waktu: '01/10/2026 09:50:10' },
  { id: 'nu6', nama: 'Fajar Nugraha Santoso', kelas: 'X-C', jenisUjian: 'Uji Kompetensi', nilai: 75, waktu: '01/10/2026 09:52:00' },
  { id: 'nu7', nama: 'Siti Rahmawati Hanum', kelas: 'X-C', jenisUjian: 'Uji Kompetensi', nilai: 70, waktu: '01/10/2026 09:55:00' }
];

export const gasService = {
  // Inisialisasi Database (mirip setupDatabase() di Code.gs)
  setupDatabase(): { success: boolean; message: string } {
    try {
      if (!localStorage.getItem(STORAGE_KEYS.SISWA)) {
        localStorage.setItem(STORAGE_KEYS.SISWA, JSON.stringify(INITIAL_SISWA));
      }
      if (!localStorage.getItem(STORAGE_KEYS.NILAI)) {
        localStorage.setItem(STORAGE_KEYS.NILAI, JSON.stringify(INITIAL_NILAI));
      }
      if (!localStorage.getItem(STORAGE_KEYS.TOKENS)) {
        // Buat token default awal
        const now = Date.now();
        const initialTokens: TokenRecord[] = [
          {
            jenisUjian: 'Game Kuis',
            kodeToken: 'KUIS10',
            createdAt: now,
            expiredAt: now + (10 * 60 * 1000),
            durasiMenit: 10
          },
          {
            jenisUjian: 'Uji Kompetensi',
            kodeToken: 'KOMP15',
            createdAt: now,
            expiredAt: now + (15 * 60 * 1000),
            durasiMenit: 15
          }
        ];
        localStorage.setItem(STORAGE_KEYS.TOKENS, JSON.stringify(initialTokens));
      }
      return { success: true, message: 'Database 4 sheet (Siswa, Nilai Kuis, Nilai Uji Komp, Token) siap digunakan.' };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Gagal menyiapkan database' };
    }
  },

  // Simpan data pendaftaran siswa
  saveSiswa(nama: string, kelas: KelasType): { success: boolean; data: SiswaRecord } {
    this.setupDatabase();
    const siswaList: SiswaRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.SISWA) || '[]');
    const now = new Date();
    const timeStr = now.toLocaleDateString('id-ID') + ' ' + now.toLocaleTimeString('id-ID');
    
    const record: SiswaRecord = {
      id: 's_' + Date.now(),
      nama: nama.trim(),
      kelas,
      timestamp: timeStr
    };
    siswaList.push(record);
    localStorage.setItem(STORAGE_KEYS.SISWA, JSON.stringify(siswaList));
    return { success: true, data: record };
  },

  // Simpan nilai kuis
  saveNilaiKuis(nama: string, kelas: KelasType, nilai: number): { success: boolean; record: NilaiRecord } {
    this.setupDatabase();
    const nilaiList: NilaiRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.NILAI) || '[]');
    const now = new Date();
    const timeStr = now.toLocaleDateString('id-ID') + ' ' + now.toLocaleTimeString('id-ID');

    const record: NilaiRecord = {
      id: 'nk_' + Date.now(),
      nama: nama.trim(),
      kelas,
      jenisUjian: 'Game Kuis',
      nilai,
      waktu: timeStr
    };
    nilaiList.push(record);
    localStorage.setItem(STORAGE_KEYS.NILAI, JSON.stringify(nilaiList));
    return { success: true, record };
  },

  // Simpan nilai uji kompetensi
  saveNilaiUjiKomp(nama: string, kelas: KelasType, nilai: number): { success: boolean; record: NilaiRecord } {
    this.setupDatabase();
    const nilaiList: NilaiRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.NILAI) || '[]');
    const now = new Date();
    const timeStr = now.toLocaleDateString('id-ID') + ' ' + now.toLocaleTimeString('id-ID');

    const record: NilaiRecord = {
      id: 'nu_' + Date.now(),
      nama: nama.trim(),
      kelas,
      jenisUjian: 'Uji Kompetensi',
      nilai,
      waktu: timeStr
    };
    nilaiList.push(record);
    localStorage.setItem(STORAGE_KEYS.NILAI, JSON.stringify(nilaiList));
    return { success: true, record };
  },

  // Generator Kode Token: Kuis = 10 menit, Uji Komp = 15 menit
  generateToken(jenisUjian: UjianType, durasiMenit?: number): TokenRecord {
    this.setupDatabase();
    const durasi = durasiMenit || (jenisUjian === 'Game Kuis' ? 10 : 15);
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let kode = '';
    for (let i = 0; i < 6; i++) {
      kode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const now = Date.now();
    const token: TokenRecord = {
      jenisUjian,
      kodeToken: kode,
      createdAt: now,
      expiredAt: now + (durasi * 60 * 1000),
      durasiMenit: durasi
    };

    const tokens: TokenRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.TOKENS) || '[]');
    // Filter token lama untuk jenis ujian ini agar diperbarui
    const remaining = tokens.filter(t => t.jenisUjian !== jenisUjian);
    remaining.push(token);
    localStorage.setItem(STORAGE_KEYS.TOKENS, JSON.stringify(remaining));

    return token;
  },

  // Ambil token aktif saat ini
  getActiveTokens(): Record<UjianType, TokenRecord | null> {
    this.setupDatabase();
    const tokens: TokenRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.TOKENS) || '[]');
    let kuisToken: TokenRecord | null = null;
    let ujiToken: TokenRecord | null = null;

    tokens.forEach(t => {
      if (t.jenisUjian === 'Game Kuis') kuisToken = t;
      if (t.jenisUjian === 'Uji Kompetensi') ujiToken = t;
    });

    return {
      'Game Kuis': kuisToken,
      'Uji Kompetensi': ujiToken
    };
  },

  // Verifikasi Token
  verifyToken(jenisUjian: UjianType, inputToken: string): { valid: boolean; message: string } {
    this.setupDatabase();
    if (!inputToken || !inputToken.trim()) {
      return { valid: false, message: 'Kode token wajib diisi oleh siswa sebelum mulai ujian.' };
    }

    const cleanInput = inputToken.trim().toUpperCase();
    const tokens: TokenRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.TOKENS) || '[]');
    const matching = tokens.find(t => t.jenisUjian === jenisUjian && t.kodeToken.toUpperCase() === cleanInput);

    if (!matching) {
      return { valid: false, message: 'Kode token salah atau tidak sesuai dengan jenis ujian terpilih.' };
    }

    const now = Date.now();
    if (now > matching.expiredAt) {
      return { valid: false, message: 'Kode token sudah kadaluarsa (expired). Silakan minta token baru kepada guru pengampu.' };
    }

    return { valid: true, message: 'Kode token valid dan berhasil diverifikasi.' };
  },

  // Ambil Top 5 Leaderboard
  getLeaderboard(): { topKuis: NilaiRecord[]; topUji: NilaiRecord[] } {
    this.setupDatabase();
    const nilaiList: NilaiRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.NILAI) || '[]');

    const kuisSorted = nilaiList
      .filter(n => n.jenisUjian === 'Game Kuis')
      .sort((a, b) => b.nilai - a.nilai)
      .slice(0, 5);

    const ujiSorted = nilaiList
      .filter(n => n.jenisUjian === 'Uji Kompetensi')
      .sort((a, b) => b.nilai - a.nilai)
      .slice(0, 5);

    return {
      topKuis: kuisSorted,
      topUji: ujiSorted
    };
  },

  // Ambil Seluruh Data Respon Siswa
  getAllResponses(): NilaiRecord[] {
    this.setupDatabase();
    const nilaiList: NilaiRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.NILAI) || '[]');
    return nilaiList.slice().reverse();
  },

  // Reset Ujian Siswa Tertentu
  resetStudentResponse(id: string): boolean {
    this.setupDatabase();
    const nilaiList: NilaiRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.NILAI) || '[]');
    const updated = nilaiList.filter(n => n.id !== id);
    localStorage.setItem(STORAGE_KEYS.NILAI, JSON.stringify(updated));
    return true;
  },

  // Hapus Seluruh Data Respon Siswa
  clearAllResponses(): boolean {
    localStorage.setItem(STORAGE_KEYS.NILAI, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.SISWA, JSON.stringify([]));
    return true;
  },

  // Export Data Rekap CSV / Excel
  exportRekapCsv(filterKelas?: KelasType): string {
    const list = this.getAllResponses();
    const filtered = filterKelas ? list.filter(item => item.kelas === filterKelas) : list;
    
    let csv = 'No,Nama Lengkap,Kelas,Jenis Ujian,Nilai,Waktu Pengerjaan\r\n';
    filtered.forEach((r, idx) => {
      const cleanNama = r.nama.replace(/"/g, '""');
      csv += `${idx + 1},"${cleanNama}",${r.kelas},"${r.jenisUjian}",${r.nilai},"${r.waktu}"\r\n`;
    });
    return csv;
  }
};
