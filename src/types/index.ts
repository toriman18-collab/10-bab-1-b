export type KelasType = 'X-A' | 'X-B' | 'X-C';

export type UjianType = 'Game Kuis' | 'Uji Kompetensi';

export interface SiswaRecord {
  id: string;
  nama: string;
  kelas: KelasType;
  timestamp: string;
}

export interface NilaiRecord {
  id: string;
  nama: string;
  kelas: KelasType;
  jenisUjian: UjianType;
  nilai: number;
  waktu: string;
  detail?: string;
}

export interface TokenRecord {
  jenisUjian: UjianType;
  kodeToken: string;
  expiredAt: number; // Unix timestamp in ms
  createdAt: number;
  durasiMenit: number;
}

// Game Kuis Kahoot-style Question
export interface SoalKuis {
  id: number;
  tipe: 'pilihan_ganda' | 'benar_salah';
  pertanyaan: string;
  opsi?: string[];
  kunciJawaban: string | number; // index or "BENAR"/"SALAH"
  penjelasan: string;
}

// AKM Question Types for Uji Kompetensi
export type AkmTipe = 'pilihan_ganda' | 'benar_salah' | 'pg_kompleks' | 'menjodohkan';
export type KesukaranTipe = 'LOW' | 'MEDIUM' | 'HOTS';

export interface PasanganMenjodohkan {
  id: string;
  premis: string;
  respon: string;
}

export interface SoalAKM {
  id: number;
  tipe: AkmTipe;
  kesukaran: KesukaranTipe;
  stimulus: string;
  pertanyaan: string;
  opsi?: string[]; // for pilihan_ganda & pg_kompleks
  kunciJawaban: string | number | number[] | Record<string, string>;
  pasangan?: {
    premisList: { id: string; teks: string }[];
    responList: { id: string; teks: string }[];
    kunci: Record<string, string>; // premisId -> responId
  };
  penjelasan: string;
}

export interface JawabanSiswaAKM {
  [soalId: number]: {
    jawaban: any;
    ragu: boolean;
  };
}
