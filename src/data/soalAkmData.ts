import { SoalAKM } from '../types';

export const soalAkmList: SoalAKM[] = [
  // ===================== BAGIAN 1: 5 SOAL PILIHAN GANDA (A-E) =====================
  {
    id: 1,
    tipe: 'pilihan_ganda',
    kesukaran: 'LOW',
    stimulus: 'Kekalahan tentara Jepang dalam berbagai front pertempuran Pasifik memicu Perdana Menteri Kuniaki Koiso untuk menjanjikan kemerdekaan bagi Hindia Timur pada masa mendatang. Janji ini kemudian ditindaklanjuti oleh Letnan Jenderal Kumakichi Harada dengan membentuk sebuah badan penyelidik resmi yang bertugas mempersiapkan kemerdekaan Indonesia.',
    pertanyaan: 'Berdasarkan narasi sejarah tersebut, badan resmi bentukan pemerintah pendudukan militer Jepang yang bertugas menyelidiki persiapan kemerdekaan Indonesia adalah:',
    opsi: [
      'Dokuritsu Junbi Inkai',
      'Dokuritsu Junbi Cosakai',
      'Gerakan Tiga A',
      'Jawa Hokokai',
      'Chuo Sangi In'
    ],
    kunciJawaban: 1, // Dokuritsu Junbi Cosakai
    penjelasan: 'Dokuritsu Junbi Cosakai adalah nama resmi dalam bahasa Jepang untuk Badan Penyelidik Usaha-usaha Persiapan Kemerdekaan Indonesia (BPUPKI) yang dibentuk pada 1 Maret 1945.'
  },
  {
    id: 2,
    tipe: 'pilihan_ganda',
    kesukaran: 'MEDIUM',
    stimulus: 'Pada sidang pertama BPUPKI tanggal 29 Mei 1945, Mohammad Yamin mengemukakan pidato yang memuat lima dasar negara merdeka. Selain berpidato, beliau juga menyerahkan naskah tertulis rancangan undang-undang dasar negara yang memiliki sedikit perbedaan rumusan dengan usulan lisannya.',
    pertanyaan: 'Manakah di bawah ini yang merupakan salah satu butir usulan dasar negara Mohammad Yamin yang disampaikan dalam pidato lisannya?',
    opsi: [
      'Kebangsaan Indonesia',
      'Peri Ketuhanan',
      'Keseimbangan Lahir dan Batin',
      'Internasionalisme',
      'Negara Integralistik'
    ],
    kunciJawaban: 1, // Peri Ketuhanan
    penjelasan: 'Lima asas lisan Mohammad Yamin: 1. Peri Kebangsaan, 2. Peri Kemanusiaan, 3. Peri Ketuhanan, 4. Peri Kerakyatan, 5. Kesejahteraan Rakyat.'
  },
  {
    id: 3,
    tipe: 'pilihan_ganda',
    kesukaran: 'HOTS',
    stimulus: 'Ir. Soekarno dalam pidato tanggal 1 Juni 1945 tidak hanya menawarkan lima dasar yang disebut Pancasila, tetapi juga menawarkan konsep pemerasan lima sila tersebut menjadi Trisila dan kemudian Ekasila apabila ada anggota sidang yang menginginkan rumusan lebih ringkas.',
    pertanyaan: 'Apabila Pancasila diperas menjadi Ekasila menurut konsep pemikiran Ir. Soekarno, maka intisari tunggal dari seluruh nilai kepribadian bangsa Indonesia tersebut adalah:',
    opsi: [
      'Ketuhanan Yang Berkebudayaan',
      'Sosio-nasionalisme',
      'Sosio-demokrasi',
      'Gotong Royong',
      'Keadilan Sosial'
    ],
    kunciJawaban: 3, // Gotong Royong
    penjelasan: 'Menurut Ir. Soekarno, jika Trisila (Sosio-nasionalisme, Sosio-demokrasi, dan Ketuhanan) diperas lagi menjadi satu sila (Ekasila), maka intisari intinya adalah Gotong Royong sebagai jiwa asli bangsa Indonesia.'
  },
  {
    id: 4,
    tipe: 'pilihan_ganda',
    kesukaran: 'MEDIUM',
    stimulus: 'Panitia Sembilan dibentuk pada masa reses BPUPKI untuk menjembatani jurang pemisah antara golongan kebangsaan dan golongan Islam mengenai dasar negara. Anggota panitia ini mencerminkan representasi yang seimbang dari dua kubu pemikiran besar tersebut.',
    pertanyaan: 'Tokoh nasional beragama Kristen Protestan yang turut menandatangani naskah Piagam Jakarta sebagai perwakilan golongan kebangsaan dalam Panitia Sembilan adalah:',
    opsi: [
      'I.J. Kasimo',
      'Dr. G.S.S.J. Ratulangie',
      'Mr. A.A. Maramis',
      'Johannes Leimena',
      'Frans Kaisiepo'
    ],
    kunciJawaban: 2, // Mr. A.A. Maramis
    penjelasan: 'Mr. Alexander Andries Maramis adalah tokoh pejuang kemerdekaan asal Minahasa yang menjadi anggota Panitia Sembilan mewakili golongan kebangsaan.'
  },
  {
    id: 5,
    tipe: 'pilihan_ganda',
    kesukaran: 'HOTS',
    stimulus: 'Pada sore hari tanggal 17 Agustus 1945, Drs. Mohammad Hatta didatangi oleh seorang perwira angkatan laut Jepang (Kaigun) yang menyampaikan bahwa wakil-wakil umat Kristen dan Katolik di kawasan Indonesia bagian timur berkeberatan terhadap rumusan sila pertama Piagam Jakarta.',
    pertanyaan: 'Langkah strategis dan bijaksana yang segera dilakukan oleh Bung Hatta pada pagi hari tanggal 18 Agustus 1945 sebelum sidang PPKI dibuka adalah:',
    opsi: [
      'Mengabaikan aspirasi tersebut demi menghormati kesepakatan Panitia Sembilan',
      'Mengadakan referendum kilat di seluruh wilayah Jakarta',
      'Mengajak musyawarah empat tokoh Islam utama untuk bermufakat demi keutuhan republik',
      'Menyerahkan keputusan sepenuhnya kepada balatentara Sekutu',
      'Membatalkan seluruh hasil sidang BPUPKI sebelumnya'
    ],
    kunciJawaban: 2, // Mengajak musyawarah empat tokoh Islam...
    penjelasan: 'Bung Hatta menemui Ki Bagoes Hadikoesoemo, Wahid Hasjim, Kasman Singodimedjo, dan Teuku Mohammad Hasan dalam rapat pendahuluan untuk bermusyawarah mengubah tujuh kata tersebut demi menjaga NKRI.'
  },

  // ===================== BAGIAN 2: 5 SOAL BENAR / SALAH =====================
  {
    id: 6,
    tipe: 'benar_salah',
    kesukaran: 'LOW',
    stimulus: 'BPUPKI diresmikan pembentukannya pada tanggal 29 April 1945 bertepatan dengan hari ulang tahun Kaisar Hirohito (Tencho Setsu). Sidang pertamanya berlangsung dari tanggal 29 Mei sampai dengan 1 Juni 1945 untuk membahas calon dasar filsafat negara.',
    pertanyaan: 'Benar atau Salah: Sidang pertama BPUPKI bertujuan utama untuk merumuskan calon dasar negara Indonesia yang akan merdeka.',
    opsi: ['BENAR', 'SALAH'],
    kunciJawaban: 'BENAR',
    penjelasan: 'Pernyataan tersebut BENAR. Agenda utama sidang pertama BPUPKI adalah merumuskan dasar negara Indonesia merdeka atas pertanyaan pembuka ketua Radjiman Wedyodiningrat.'
  },
  {
    id: 7,
    tipe: 'benar_salah',
    kesukaran: 'MEDIUM',
    stimulus: 'Mr. Soepomo dalam pidatonya pada tanggal 31 Mei 1945 mengulas tiga teori kenegaraan: teori individualistik dari Thomas Hobbes dan John Locke, teori kelas atau pertentangan kelas dari Karl Marx, serta teori integralistik dari Spinoza, Adam Muller, dan Hegel.',
    pertanyaan: 'Benar atau Salah: Mr. Soepomo menyarankan agar Indonesia memakai teori individualistik barat yang mengedepankan hak individu di atas kepentingan negara.',
    opsi: ['BENAR', 'SALAH'],
    kunciJawaban: 'SALAH',
    penjelasan: 'Pernyataan tersebut SALAH. Mr. Soepomo secara tegas menolak paham individualistik dan paham pertentangan kelas, lalu merekomendasikan paham integralistik atau persatuan kekeluargaan.'
  },
  {
    id: 8,
    tipe: 'benar_salah',
    kesukaran: 'MEDIUM',
    stimulus: 'Naskah Piagam Jakarta disetujui pada tanggal 22 Juni 1945 oleh sembilan tokoh nasional. Dokumen ini menjadi rancangan preambule atau pembukaan UUD yang kemudian diterima secara bulat dalam Sidang Kedua BPUPKI pada bulan Juli 1945.',
    pertanyaan: 'Benar atau Salah: Naskah Piagam Jakarta tanggal 22 Juni 1945 merupakan rancangan awal dari Pembukaan Undang-Undang Dasar 1945.',
    opsi: ['BENAR', 'SALAH'],
    kunciJawaban: 'BENAR',
    penjelasan: 'Pernyataan tersebut BENAR. Piagam Jakarta dijadikan sebagai Pembukaan UUD 1945 dengan perubahan pada sila pertama dan klausul presiden harus beragama Islam pada 18 Agustus 1945.'
  },
  {
    id: 9,
    tipe: 'benar_salah',
    kesukaran: 'HOTS',
    stimulus: 'Panitia Persiapan Kemerdekaan Indonesia (PPKI) dibentuk pada tanggal 7 Agustus 1945 menggantikan BPUPKI. Semula beranggotakan 21 orang dan disahkan Jepang, namun Soekarno-Hatta kemudian menambah 6 orang tokoh tanpa seizin Jepang sehingga PPKI berubah murni menjadi badan perwakilan rakyat Indonesia.',
    pertanyaan: 'Benar atau Salah: Penambahan enam anggota PPKI tanpa persetujuan pihak Jepang menunjukkan bahwa proklamasi dan penetapan dasar negara merupakan murni kehendak mandiri bangsa Indonesia.',
    opsi: ['BENAR', 'SALAH'],
    kunciJawaban: 'BENAR',
    penjelasan: 'Pernyataan tersebut BENAR. Penambahan anggota tersebut melepaskan sifat ketergantungan pada Jepang dan menegaskan kemandirian bangsa Indonesia.'
  },
  {
    id: 10,
    tipe: 'benar_salah',
    kesukaran: 'LOW',
    stimulus: 'Pada tanggal 18 Agustus 1945, PPKI menggelar sidangnya yang pertama. Sidang ini menetapkan tiga keputusan besar: mengesahkan UUD 1945, memilih Presiden dan Wakil Presiden, serta membentuk Komite Nasional Indonesia Pusat (KNIP).',
    pertanyaan: 'Benar atau Salah: Pemilihan Ir. Soekarno sebagai Presiden dan Drs. Mohammad Hatta sebagai Wakil Presiden RI pertama dilakukan secara aklamasi dalam sidang PPKI tanggal 18 Agustus 1945.',
    opsi: ['BENAR', 'SALAH'],
    kunciJawaban: 'BENAR',
    penjelasan: 'Pernyataan tersebut BENAR. Otto Iskandardinata mengusulkan pemilihan Soekarno dan Hatta secara aklamasi dan langsung disambut tepuk tangan persetujuan seluruh anggota sidang.'
  },

  // ===================== BAGIAN 3: 5 SOAL PILIHAN GANDA KOMPLEKS (BANYAK JAWABAN) =====================
  {
    id: 11,
    tipe: 'pg_kompleks',
    kesukaran: 'MEDIUM',
    stimulus: 'Sidang Pertama BPUPKI (29 Mei - 1 Juni 1945) mendengarkan pandangan para pembicara mengenai prinsip-prinsip berdirinya negara merdeka. Beberapa tokoh mengemukakan gagasan lisan maupun tertulis yang menjadi embrio rumusan dasar negara.',
    pertanyaan: 'Manakah dari pernyataan berikut yang merupakan tokoh-tokoh yang secara eksplisit menyampaikan gagasan komprehensif mengenai dasar negara dalam Sidang Pertama BPUPKI? (Pilih semua yang benar)',
    opsi: [
      'Mohammad Yamin',
      'Mr. Soepomo',
      'Ir. Soekarno',
      'Sutan Sjahrir',
      'Tan Malaka'
    ],
    kunciJawaban: [0, 1, 2], // Mohammad Yamin, Mr. Soepomo, Ir. Soekarno
    penjelasan: 'Tiga tokoh yang mengemukakan usulan dasar negara dalam sidang pertama BPUPKI adalah Mohammad Yamin (29 Mei), Mr. Soepomo (31 Mei), dan Ir. Soekarno (1 Juni).'
  },
  {
    id: 12,
    tipe: 'pg_kompleks',
    kesukaran: 'HOTS',
    stimulus: 'Panitia Sembilan bertugas mengolah dan menyelaraskan usul-usul dasar negara yang masuk selama sidang pertama BPUPKI. Komposisi panitia ini sengaja dirancang agar mewakili golongan Islam dan golongan kebangsaan secara berimbang.',
    pertanyaan: 'Manakah di antara tokoh-tokoh berikut yang merupakan anggota Panitia Sembilan perwakilan dari golongan Islam? (Pilih semua yang benar)',
    opsi: [
      'K.H. Abdul Wahid Hasjim',
      'Haji Agus Salim',
      'Abikoesno Tjokrosoejoso',
      'Mr. Achmad Soebardjo',
      'K.H. Kahar Moezakir'
    ],
    kunciJawaban: [0, 1, 2, 4], // Wahid Hasjim, Agus Salim, Abikoesno, Kahar Moezakir
    penjelasan: 'Empat tokoh golongan Islam dalam Panitia Sembilan adalah K.H. Abdul Wahid Hasjim, H. Agus Salim, Abikoesno Tjokrosoejoso, dan Abdoel Kahar Moezakir. Sedangkan Achmad Soebardjo mewakili golongan kebangsaan.'
  },
  {
    id: 13,
    tipe: 'pg_kompleks',
    kesukaran: 'MEDIUM',
    stimulus: 'Sidang PPKI tanggal 18 Agustus 1945 menghasilkan keputusan monumental yang meletakkan dasar ketatanegaraan bagi Republik Indonesia yang baru berumur satu hari.',
    pertanyaan: 'Manakah hasil-hasil keputusan resmi sidang PPKI yang diselenggarakan pada tanggal 18 Agustus 1945? (Pilih semua yang benar)',
    opsi: [
      'Menetapkan dan mengesahkan Pembukaan dan Batang Tubuh UUD 1945',
      'Memilih Ir. Soekarno sebagai Presiden dan Drs. Mohammad Hatta sebagai Wakil Presiden',
      'Membentuk Komite Nasional Indonesia Pusat (KNIP) untuk membantu tugas Presiden',
      'Menetapkan lagu kebangsaan Indonesia Raya sebagai gubahan resmi tiga stanza',
      'Membentuk 12 Kementerian dan membagi wilayah Indonesia menjadi 8 Provinsi'
    ],
    kunciJawaban: [0, 1, 2], // Pengesahan UUD, Presiden/Wapres, KNIP
    penjelasan: 'Keputusan sidang 18 Agustus 1945 adalah mengesahkan UUD 1945, memilih Presiden dan Wakil Presiden, serta membentuk KNIP. Pembagian kementerian dan 8 provinsi baru diputuskan pada sidang 19 Agustus 1945.'
  },
  {
    id: 14,
    tipe: 'pg_kompleks',
    kesukaran: 'HOTS',
    stimulus: 'Perumusan Pancasila melibatkan dialektika pemikiran tajam namun penuh rasa saling menghormati antara kelompok agamawan dan kelompok nasionalis sekuler. Diperlukan konsensus agung agar Indonesia tidak terpecah belah.',
    pertanyaan: 'Sikap-sikap keteladanan apakah yang ditunjukkan oleh para pendiri bangsa dalam proses kelahiran Pancasila yang wajib dicontoh oleh generasi muda masa kini? (Pilih semua yang benar)',
    opsi: [
      'Mengedepankan musyawarah untuk mencapai mufakat',
      'Menomorsatukan persatuan dan kesatuan di atas kepentingan kelompok sendiri',
      'Memaksakan kehendak golongan mayoritas atas golongan minoritas',
      'Saling menghormati perbedaan agama, suku, dan ideologi politik',
      'Memiliki komitmen pantang menyerah demi kemerdekaan bangsa'
    ],
    kunciJawaban: [0, 1, 3, 4], // 0, 1, 3, 4
    penjelasan: 'Para pendiri bangsa memberi teladan musyawarah, persatuan di atas kepentingan pribadi/golongan, toleransi kebinekaan, serta patriotisme tanpa memaksakan kehendak sepihak.'
  },
  {
    id: 15,
    tipe: 'pg_kompleks',
    kesukaran: 'MEDIUM',
    stimulus: 'Ir. Soekarno dalam pidato 1 Juni 1945 menjelaskan filosofi di balik usulan lima sila dasar negara merdeka.',
    pertanyaan: 'Manakah rumusan lima dasar yang diusulkan oleh Ir. Soekarno pada tanggal 1 Juni 1945? (Pilih semua yang benar)',
    opsi: [
      'Kebangsaan Indonesia (Nasionalisme)',
      'Internasionalisme atau Peri-Kemanusiaan',
      'Mufakat atau Demokrasi',
      'Kesejahteraan Sosial',
      'Ketuhanan yang berkebudayaan'
    ],
    kunciJawaban: [0, 1, 2, 3, 4], // Semua benar
    penjelasan: 'Kelima poin tersebut merupakan rumusan otentik lima dasar negara yang disampaikan Bung Karno dalam pidato lahirnya Pancasila tanggal 1 Juni 1945.'
  },

  // ===================== BAGIAN 4: 5 SOAL MENJODOHKAN (MATCHING PAIR) =====================
  {
    id: 16,
    tipe: 'menjodohkan',
    kesukaran: 'MEDIUM',
    stimulus: 'Dinamika perumusan Pancasila diwarnai oleh berbagai istilah penting dan dokumen historis yang memiliki peranan krusial dalam sejarah ketatanegaraan Indonesia.',
    pertanyaan: 'Jodohkanlah istilah atau dokumen historis di kolom kiri dengan arti atau peristiwa yang tepat di kolom kanan!',
    pasangan: {
      premisList: [
        { id: 'p1', teks: 'Dokuritsu Junbi Cosakai' },
        { id: 'p2', teks: 'Philosophische Grondslag' },
        { id: 'p3', teks: 'Piagam Jakarta' },
        { id: 'p4', teks: 'Dokuritsu Junbi Inkai' }
      ],
      responList: [
        { id: 'r1', teks: 'Badan Penyelidik Usaha-usaha Persiapan Kemerdekaan Indonesia (BPUPKI)' },
        { id: 'r2', teks: 'Dasar filsafat atau fundamen falsafah berdirinya negara merdeka' },
        { id: 'r3', teks: 'Rancangan pembukaan undang-undang dasar bertanggal 22 Juni 1945' },
        { id: 'r4', teks: 'Panitia Persiapan Kemerdekaan Indonesia (PPKI)' }
      ],
      kunci: {
        p1: 'r1',
        p2: 'r2',
        p3: 'r3',
        p4: 'r4'
      }
    },
    kunciJawaban: { p1: 'r1', p2: 'r2', p3: 'r3', p4: 'r4' },
    penjelasan: 'Dokuritsu Junbi Cosakai adalah BPUPKI; Philosophische Grondslag adalah dasar filsafat negara; Piagam Jakarta adalah rumusan 22 Juni 1945; Dokuritsu Junbi Inkai adalah PPKI.'
  },
  {
    id: 17,
    tipe: 'menjodohkan',
    kesukaran: 'MEDIUM',
    stimulus: 'Para pendiri bangsa menyampaikan pokok-pokok pikiran pada tanggal yang berbeda dalam Sidang Pertama BPUPKI serta kompromi Panitia Sembilan.',
    pertanyaan: 'Jodohkanlah tokoh bangsa berikut dengan tanggal penyampaian gagasan atau peran perumusannya!',
    pasangan: {
      premisList: [
        { id: 'p1', teks: 'Mohammad Yamin' },
        { id: 'p2', teks: 'Mr. Soepomo' },
        { id: 'p3', teks: 'Ir. Soekarno' },
        { id: 'p4', teks: 'Panitia Sembilan' }
      ],
      responList: [
        { id: 'r1', teks: 'Menyampaikan lima dasar negara pada tanggal 29 Mei 1945' },
        { id: 'r2', teks: 'Menguraikan paham negara integralistik pada 31 Mei 1945' },
        { id: 'r3', teks: 'Memperkenalkan istilah Pancasila pada tanggal 1 Juni 1945' },
        { id: 'r4', teks: 'Menghasilkan Piagam Jakarta pada tanggal 22 Juni 1945' }
      ],
      kunci: {
        p1: 'r1',
        p2: 'r2',
        p3: 'r3',
        p4: 'r4'
      }
    },
    kunciJawaban: { p1: 'r1', p2: 'r2', p3: 'r3', p4: 'r4' },
    penjelasan: 'Mohammad Yamin berpidato 29 Mei 1945; Mr. Soepomo pada 31 Mei 1945; Ir. Soekarno pada 1 Juni 1945; Panitia Sembilan menghasilkan Piagam Jakarta pada 22 Juni 1945.'
  },
  {
    id: 18,
    tipe: 'menjodohkan',
    kesukaran: 'HOTS',
    stimulus: 'Setiap tokoh BPUPKI memiliki konsep khas yang melandasi pandangan filsafat kenegaraannya.',
    pertanyaan: 'Jodohkanlah konsep gagasan falsafah di sebelah kiri dengan tokoh pencetus utamanya di sebelah kanan!',
    pasangan: {
      premisList: [
        { id: 'p1', teks: 'Negara Integralistik (Keluarga Besar)' },
        { id: 'p2', teks: 'Ekasila yaitu Gotong Royong' },
        { id: 'p3', teks: 'Asas Peri Kebangsaan dan Peri Kerakyatan' },
        { id: 'p4', teks: 'Musyawarah penghapusan 7 kata demi kesatuan bangsa' }
      ],
      responList: [
        { id: 'r1', teks: 'Mr. Soepomo' },
        { id: 'r2', teks: 'Ir. Soekarno' },
        { id: 'r3', teks: 'Mohammad Yamin' },
        { id: 'r4', teks: 'Drs. Mohammad Hatta' }
      ],
      kunci: {
        p1: 'r1',
        p2: 'r2',
        p3: 'r3',
        p4: 'r4'
      }
    },
    kunciJawaban: { p1: 'r1', p2: 'r2', p3: 'r3', p4: 'r4' },
    penjelasan: 'Integralistik digagas Soepomo; Ekasila Gotong Royong oleh Bung Karno; Peri Kebangsaan oleh Yamin; Diplomasi penghapusan 7 kata oleh Bung Hatta.'
  },
  {
    id: 19,
    tipe: 'menjodohkan',
    kesukaran: 'LOW',
    stimulus: 'Perumusan Pancasila melibatkan para pemimpin yang memiliki posisi dan amanah kepemimpinan penting dalam kelembagaan persiapan kemerdekaan.',
    pertanyaan: 'Jodohkanlah jabatan atau amanah kepemimpinan di kolom kiri dengan nama tokoh pejuang di kolom kanan!',
    pasangan: {
      premisList: [
        { id: 'p1', teks: 'Ketua BPUPKI' },
        { id: 'p2', teks: 'Ketua Panitia Sembilan dan PPKI' },
        { id: 'p3', teks: 'Wakil Ketua BPUPKI dari pihak Indonesia' },
        { id: 'p4', teks: 'Tokoh Islam perwakilan Muhammadiyah dalam musyawarah 18 Agustus 1945' }
      ],
      responList: [
        { id: 'r1', teks: 'Dr. K.R.T. Radjiman Wedyodiningrat' },
        { id: 'r2', teks: 'Ir. Soekarno' },
        { id: 'r3', teks: 'R.P. Soeroso' },
        { id: 'r4', teks: 'Ki Bagoes Hadikoesoemo' }
      ],
      kunci: {
        p1: 'r1',
        p2: 'r2',
        p3: 'r3',
        p4: 'r4'
      }
    },
    kunciJawaban: { p1: 'r1', p2: 'r2', p3: 'r3', p4: 'r4' },
    penjelasan: 'Radjiman adalah Ketua BPUPKI; Soekarno Ketua Panitia Sembilan & PPKI; R.P. Soeroso Wakil Ketua BPUPKI; Ki Bagoes Hadikoesoemo tokoh Islam Muhammadiyah.'
  },
  {
    id: 20,
    tipe: 'menjodohkan',
    kesukaran: 'HOTS',
    stimulus: 'Rumusan sila dasar negara mengalami evolusi teks yang sangat signifikan sejak tanggal 1 Juni 1945, 22 Juni 1945, hingga penetapan resmi 18 Agustus 1945.',
    pertanyaan: 'Jodohkanlah teks rumusan sila pertama berikut dengan sumber dokumen historisnya!',
    pasangan: {
      premisList: [
        { id: 'p1', teks: 'Kebangsaan Indonesia (Nasionalisme)' },
        { id: 'p2', teks: 'Ketuhanan dengan kewajiban menjalankan syariat Islam bagi pemeluk-pemeluknya' },
        { id: 'p3', teks: 'Ketuhanan Yang Maha Esa' },
        { id: 'p4', teks: 'Peri Kebangsaan' }
      ],
      responList: [
        { id: 'r1', teks: 'Sila Pertama Usulan Ir. Soekarno (1 Juni 1945)' },
        { id: 'r2', teks: 'Sila Pertama Naskah Piagam Jakarta (22 Juni 1945)' },
        { id: 'r3', teks: 'Sila Pertama Rumusan Sah Pembukaan UUD 1945 (18 Agustus 1945)' },
        { id: 'r4', teks: 'Asas Pertama Usulan Lisan Mohammad Yamin (29 Mei 1945)' }
      ],
      kunci: {
        p1: 'r1',
        p2: 'r2',
        p3: 'r3',
        p4: 'r4'
      }
    },
    kunciJawaban: { p1: 'r1', p2: 'r2', p3: 'r3', p4: 'r4' },
    penjelasan: 'Kebangsaan Indonesia urutan pertama 1 Juni 1945; Syariat Islam pada 22 Juni 1945; Ketuhanan Yang Maha Esa pada 18 Agustus 1945; Peri Kebangsaan pada 29 Mei 1945.'
  }
];
