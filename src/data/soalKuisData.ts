import { SoalKuis } from '../types';

export const soalKuisList: SoalKuis[] = [
  {
    id: 1,
    tipe: 'pilihan_ganda',
    pertanyaan: 'Siapakah tokoh bangsa yang menyampaikan pidato pada tanggal 1 Juni 1945 dan untuk pertama kalinya secara resmi memperkenalkan istilah Pancasila sebagai dasar filsafat negara Indonesia merdeka?',
    opsi: [
      'Mohammad Yamin',
      'Mr. Soepomo',
      'Ir. Soekarno',
      'Drs. Mohammad Hatta',
      'Dr. K.R.T. Radjiman Wedyodiningrat'
    ],
    kunciJawaban: 2, // Ir. Soekarno
    penjelasan: 'Pada tanggal 1 Juni 1945, Ir. Soekarno menyampaikan pidato monumental di hadapan sidang BPUPKI dan mengusulkan lima prinsip dasar negara yang dinamakan Pancasila atas petunjuk seorang kawan ahli bahasa.'
  },
  {
    id: 2,
    tipe: 'benar_salah',
    pertanyaan: 'Benar atau Salah: Badan Penyelidik Usaha-usaha Persiapan Kemerdekaan Indonesia (BPUPKI) secara resmi diketuai oleh Dr. K.R.T. Radjiman Wedyodiningrat.',
    opsi: ['BENAR', 'SALAH'],
    kunciJawaban: 'BENAR',
    penjelasan: 'Pernyataan tersebut BENAR. Dr. K.R.T. Radjiman Wedyodiningrat dilantik sebagai ketua BPUPKI dengan didampingi oleh dua orang wakil ketua, yaitu R.P. Soeroso dan Ichibangase Yosio.'
  },
  {
    id: 3,
    tipe: 'pilihan_ganda',
    pertanyaan: 'Pada tanggal 22 Juni 1945, Panitia Sembilan berhasil merumuskan rancangan pembukaan undang-undang dasar yang memuat rumusan Pancasila. Mohammad Yamin menamai dokumen bersejarah tersebut dengan sebutan:',
    opsi: [
      'Mukaddimah UUD',
      'Piagam Jakarta (Jakarta Charter)',
      'Deklarasi Kemerdekaan Indonesia',
      'Manifesto Politik Kebangsaan',
      'Piagam Kebangsaan Nusantara'
    ],
    kunciJawaban: 1, // Piagam Jakarta
    penjelasan: 'Mohammad Yamin memberi nama rancangan pembukaan UUD hasil karya Panitia Sembilan tersebut dengan nama Piagam Jakarta (Jakarta Charter), sedangkan Sukiman Wirjosandjojo menyebutnya Gentlemens Agreement.'
  },
  {
    id: 4,
    tipe: 'benar_salah',
    pertanyaan: 'Benar atau Salah: Pada usulan tanggal 31 Mei 1945, Mr. Soepomo mengusulkan teori negara integralistik yang menyatakan bahwa negara bersatu dengan seluruh rakyatnya tanpa memihak salah satu golongan mayoritas.',
    opsi: ['BENAR', 'SALAH'],
    kunciJawaban: 'BENAR',
    penjelasan: 'Pernyataan tersebut BENAR. Mr. Soepomo menekankan teori integralistik atau persatuan kekeluargaan, di mana pemimpin dan rakyat bersatu padu mengatasi golongan dan paham perseorangan.'
  },
  {
    id: 5,
    tipe: 'pilihan_ganda',
    pertanyaan: 'Pada tanggal 18 Agustus 1945, PPKI secara resmi mengesahkan Pancasila sebagai dasar negara. Perubahan penting yang disepakati demi persatuan dan kesatuan bangsa pada sila pertama adalah mengubah kalimat:',
    opsi: [
      'Ketuhanan Yang Maha Esa menjadi Peri Ketuhanan',
      'Ketuhanan dengan kewajiban menjalankan syariat Islam bagi pemeluk-pemeluknya menjadi Ketuhanan Yang Maha Esa',
      'Ketuhanan yang berkebudayaan menjadi Ketuhanan Yang Maha Pengasih',
      'Ketuhanan menurut dasar kemanusiaan menjadi Ketuhanan Yang Maha Esa',
      'Ketuhanan dengan syariat universal menjadi Ketuhanan Yang Berkeadilan'
    ],
    kunciJawaban: 1, // Ketuhanan dengan kewajiban...
    penjelasan: 'Bung Hatta bersama para tokoh Islam menyepakati penggantian tujuh kata dalam Piagam Jakarta menjadi Ketuhanan Yang Maha Esa untuk merangkul seluruh rakyat Indonesia dari Sabang sampai Merauke.'
  }
];
