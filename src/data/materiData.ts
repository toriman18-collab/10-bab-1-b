export interface MateriSectionData {
  tujuanPembelajaran: string[];
  pertanyaanPemantik: {
    nomor: number;
    pertanyaan: string;
    fokus: string;
  }[];
  manfaatPembelajaran: {
    judul: string;
    deskripsi: string;
    icon: string;
  }[];
  tahapanKronologi: {
    fase: string;
    judul: string;
    rentangWaktu: string;
    deskripsi: string;
    poinPenting: string[];
    tokohTerkait: string[];
  }[];
  komparasiGagasan: {
    tokoh: string;
    tanggal: string;
    usulan: string[];
    maknaFilosofis: string;
  }[];
  autoTablePerbandingan: {
    aspek: string;
    mohYamin: string;
    mrSoepomo: string;
    irSoekarno: string;
    piagamJakarta: string;
    pengesahanPPKI: string;
  }[];
  kesimpulanPoin: {
    judul: string;
    uraian: string;
  }[];
}

export const materiData: MateriSectionData = {
  tujuanPembelajaran: [
    "Peserta didik mampu menganalisis latar belakang historis dan kronologi pembentukan BPUPKI serta dinamika perumusan dasar negara Indonesia merdeka.",
    "Peserta didik mampu membandingkan dan mengevaluasi gagasan rumusan dasar negara yang disampaikan oleh Mohammad Yamin, Mr. Soepomo, dan Ir. Soekarno dalam Sidang Pertama BPUPKI.",
    "Peserta didik mampu menguraikan peran strategis Panitia Sembilan dalam merumuskan Piagam Jakarta serta kesepakatan kompromi agung pada tanggal 22 Juni 1945.",
    "Peserta didik mampu menganalisis peristiwa krusial tanggal 18 Agustus 1945 dalam penetapan Pembukaan UUD 1945 dan rumusan final Pancasila sebagai dasar negara.",
    "Peserta didik mampu menginternalisasi nilai-nilai keteladanan para pendiri bangsa seperti toleransi, jiwa persatuan, dan musyawarah mufakat dalam kehidupan sehari-hari."
  ],

  pertanyaanPemantik: [
    {
      nomor: 1,
      pertanyaan: "Mengapa para pendiri bangsa Indonesia memilih menggali dasar negara dari kepribadian, kebudayaan, dan nilai-nilai luhur nusantara, bukan sekadar mencontoh ideologi besar dunia yang sudah ada saat itu seperti liberalisme atau komunisme?",
      fokus: "Eksplorasi Jati Diri Bangsa dan Filosofi Kebudayaan Nusantara"
    },
    {
      nomor: 2,
      pertanyaan: "Bagaimana para tokoh bangsa yang memiliki latar belakang agama, suku, dan pandangan politik yang berbeda mampu menanggalkan kepentingan kelompok demi menyepakati Pancasila pada peristiwa krusial 18 Agustus 1945?",
      fokus: "Analisis Sikap Negosiasi, Toleransi, dan Komitmen Kebangsaan"
    }
  ],

  manfaatPembelajaran: [
    {
      judul: "Memperkuat Identitas Diri Pelajar Pancasila",
      deskripsi: "Menyadari bahwa setiap sila lahir dari perjuangan darah dan pemikiran mendalam para leluhur bangsa, sehingga kita memiliki rasa bangga dan integritas tinggi sebagai generasi penerus nusantara.",
      icon: "ShieldCheck"
    },
    {
      judul: "Menumbuhkan Moderasi dan Sikap Toleransi",
      deskripsi: "Memahami bagaimana kearifan para tokoh Islam dan tokoh kawasan timur Indonesia yang rela bermusyawarah demi persatuan bangsa, memberikan teladan hidup rukun di tengah keberagaman.",
      icon: "Users"
    },
    {
      judul: "Melatih Kemampuan Berpikir Kritis Analitis",
      deskripsi: "Mampu membedakan perspektif ideologis, menelaah dokumen sejarah otentik, serta tidak mudah terprovokasi oleh narasi perpecahan yang bertentangan dengan konsensus kebangsaan.",
      icon: "Brain"
    },
    {
      judul: "Menjadi Solusioner Berbasis Musyawarah",
      deskripsi: "Mengaplikasikan budaya musyawarah mufakat dalam memecahkan masalah di kelas, OSIS, lingkungan pertemanan, maupun komunitas pemuda tanpa memaksakan kehendak sepihak.",
      icon: "Sparkles"
    }
  ],

  tahapanKronologi: [
    {
      fase: "Fase 1",
      judul: "Janji Koiso dan Pembentukan BPUPKI",
      rentangWaktu: "1 Maret 1945 - 29 April 1945",
      deskripsi: "Ketika posisi balatentara Jepang semakin terdesak dalam Perang Asia Timur Raya, Perdana Menteri Kuniaki Koiso mengumumkan janji kemerdekaan bagi Indonesia di kemudian hari. Sebagai realisasi janji tersebut, pada tanggal 1 Maret 1945 diumumkan pembentukan Badan Penyelidik Usaha-usaha Persiapan Kemerdekaan Indonesia (BPUPKI) atau Dokuritsu Junbi Cosakai, yang secara resmi dilantik pada tanggal 28 Mei 1945 dipimpin oleh Dr. K.R.T. Radjiman Wedyodiningrat bersama 67 orang anggota.",
      poinPenting: [
        "Dipimpin oleh Dr. K.R.T. Radjiman Wedyodiningrat dengan wakil Ichibangase Yosio dan R.P. Soeroso.",
        "Tugas utama menyelidiki hal-hal penting menyangkut tata pemerintahan, ekonomi, dan politik kemerdekaan.",
        "Pertanyaan pembuka ketua sidang: Apakah dasar negara Indonesia merdeka yang akan kita bangun?"
      ],
      tokohTerkait: ["Dr. K.R.T. Radjiman Wedyodiningrat", "R.P. Soeroso", "Letjen Kumakichi Harada"]
    },
    {
      fase: "Fase 2",
      judul: "Sidang Pertama BPUPKI: Perumusan Dasar Negara",
      rentangWaktu: "29 Mei 1945 - 1 Juni 1945",
      deskripsi: "Sidang pertama berlangsung di Gedung Chuo Sangi In (sekarang Gedung Pancasila, Kementerian Luar Negeri, Jakarta). Dalam sidang ini, para tokoh menyampaikan pidato mengenai calon dasar negara. Tiga tokoh utama yang mengemukakan konsep komprehensif adalah Mohammad Yamin (29 Mei 1945), Mr. Soepomo (31 Mei 1945), dan Ir. Soekarno (1 Juni 1945). Pada tanggal 1 Juni 1945, Bung Karno untuk pertama kalinya secara eksplisit memperkenalkan nama Pancasila.",
      poinPenting: [
        "Mohammad Yamin menyampaikan 5 asas dasar negara baik secara lisan maupun rancangan tertulis.",
        "Mr. Soepomo mengajukan teori negara integralistik atau negara kekeluargaan yang menyatu dengan seluruh rakyat.",
        "Ir. Soekarno mengusulkan lima dasar yang dinamakan Pancasila atas saran seorang ahli bahasa.",
        "Bung Karno juga menawarkan opsi pemerasan menjadi Trisila (Sosio-nasionalisme, Sosio-demokrasi, Ketuhanan) dan Ekasila (Gotong Royong)."
      ],
      tokohTerkait: ["Mohammad Yamin", "Mr. Soepomo", "Ir. Soekarno"]
    },
    {
      fase: "Fase 3",
      judul: "Masa Reses dan Lahirnya Piagam Jakarta",
      rentangWaktu: "2 Juni 1945 - 22 Juni 1945",
      deskripsi: "Meskipun sidang pertama selesai, belum dicapai kata sepakat bulat mengenai rumusan akhir dasar negara. Oleh karena itu, dibentuk Panitia Kecil beranggotakan 8 orang yang kemudian diperluas menjadi Panitia Sembilan. Panitia Sembilan mewakili dua arus pemikiran utama bangsa: golongan kebangsaan (nasionalis netral agama) dan golongan Islam. Pada tanggal 22 Juni 1945, bertempat di kediaman Bung Karno di Jalan Pegangsaan Timur No. 56 Jakarta, disepakatilah sebuah rancangan pembukaan undang-undang dasar yang oleh Mohammad Yamin diberi nama Piagam Jakarta (Jakarta Charter).",
      poinPenting: [
        "Anggota Panitia Sembilan: Ir. Soekarno, Drs. Mohammad Hatta, Mr. A.A. Maramis, Abikoesno Tjokrosoejoso, Abdoel Kahar Moezakir, H. Agus Salim, Mr. Achmad Soebardjo, K.H. Abdul Wahid Hasjim, dan Mr. Mohammad Yamin.",
        "Sila pertama dalam Piagam Jakarta berbunyi: Ketuhanan dengan kewajiban menjalankan syariat Islam bagi pemeluk-pemeluknya.",
        "Kesepakatan ini merupakan kompromi historis yang sangat monumental untuk menjaga persatuan."
      ],
      tokohTerkait: ["Ir. Soekarno", "Drs. Mohammad Hatta", "K.H. Wahid Hasjim", "H. Agus Salim", "Mr. A.A. Maramis"]
    },
    {
      fase: "Fase 4",
      judul: "Sidang Kedua BPUPKI dan Pembentukan PPKI",
      rentangWaktu: "10 Juli 1945 - 7 Agustus 1945",
      deskripsi: "Sidang kedua BPUPKI membahas wilayah negara, bentuk negara republik, rancangan undang-undang dasar, serta ekonomi dan pembelaan tanah air. Piagam Jakarta diterima sebagai rancangan preambule atau pembukaan UUD. Setelah tugas BPUPKI dianggap selesai, lembaga ini dibubarkan pada tanggal 7 Agustus 1945 dan digantikan oleh Panitia Persiapan Kemerdekaan Indonesia (PPKI) atau Dokuritsu Junbi Inkai yang diketuai oleh Ir. Soekarno dan Drs. Mohammad Hatta sebagai wakil.",
      poinPenting: [
        "Menyepakati wilayah Indonesia meliputi seluruh bekas wilayah Hindia Belanda.",
        "Menyetujui bentuk negara Republik Indonesia berdasarkan mayoritas suara.",
        "Mempersiapkan pemindahan kekuasaan secara cepat seiring menyerahnya Jepang kepada Sekutu pada pertengahan Agustus 1945."
      ],
      tokohTerkait: ["Ir. Soekarno", "Drs. Mohammad Hatta", "Dr. K.R.T. Radjiman Wedyodiningrat"]
    },
    {
      fase: "Fase 5",
      judul: "Detik-Detik Krusial 18 Agustus 1945: Pengesahan Final Pancasila",
      rentangWaktu: "17 - 18 Agustus 1945",
      deskripsi: "Satu hari setelah Proklamasi Kemerdekaan 17 Agustus 1945, PPKI menggelar sidang bersejarah di Gedung Kesenian Jakarta. Sebelum sidang dibuka, Bung Hatta menemui para tokoh Islam (seperti Ki Bagoes Hadikoesoemo, Wahid Hasjim, Kasman Singodimedjo, dan Teuku Mohammad Hasan) menindaklanjuti keberatan tokoh kawasan Indonesia Timur terhadap tujuh kata dalam Piagam Jakarta. Dengan jiwa kenegarawanan yang luar biasa, para tokoh Islam bersepakat mengganti anak kalimat tersebut menjadi Ketuhanan Yang Maha Esa demi menjaga keutuhan Negara Kesatuan Republik Indonesia.",
      poinPenting: [
        "Tujuh kata 'dengan kewajiban menjalankan syariat Islam bagi pemeluk-pemeluknya' diubah menjadi 'Ketuhanan Yang Maha Esa'.",
        "Menetapkan dan mengesahkan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 (di dalamnya termaktub Pancasila pada alinea keempat).",
        "Memilih Ir. Soekarno sebagai Presiden dan Drs. Mohammad Hatta sebagai Wakil Presiden.",
        "Membentuk Komite Nasional Indonesia Pusat (KNIP) untuk membantu presiden sebelum terbentuknya MPR dan DPR."
      ],
      tokohTerkait: ["Drs. Mohammad Hatta", "Ki Bagoes Hadikoesoemo", "Kasman Singodimedjo", "K.H. Wahid Hasjim", "Mr. Teuku Mohammad Hasan"]
    }
  ],

  komparasiGagasan: [
    {
      tokoh: "Mohammad Yamin",
      tanggal: "29 Mei 1945",
      usulan: [
        "Peri Kebangsaan",
        "Peri Kemanusiaan",
        "Peri Ketuhanan",
        "Peri Kerakyatan",
        "Kesejahteraan Rakyat"
      ],
      maknaFilosofis: "Menekankan pada fondasi historis kebangsaan dan kearifan luhur peradaban nusantara yang telah mengakar berabad-abad."
    },
    {
      tokoh: "Mr. Soepomo",
      tanggal: "31 Mei 1945",
      usulan: [
        "Persatuan",
        "Kekeluargaan",
        "Keseimbangan Lahir dan Batin",
        "Musyawarah",
        "Keadilan Rakyat"
      ],
      maknaFilosofis: "Menekankan konsep negara integralistik, di mana negara bersatu dengan seluruh rakyatnya tanpa memihak salah satu golongan mayoritas ataupun minoritas."
    },
    {
      tokoh: "Ir. Soekarno",
      tanggal: "1 Juni 1945",
      usulan: [
        "Kebangsaan Indonesia (Nasionalisme)",
        "Internasionalisme atau Peri-Kemanusiaan",
        "Mufakat atau Demokrasi",
        "Kesejahteraan Sosial",
        "Ketuhanan yang berkebudayaan"
      ],
      maknaFilosofis: "Memperkenalkan nama resmi Pancasila sebagai philosophische grondslag (dasar filsafat) dan weltanschauung (pandangan hidup dunia) bangsa Indonesia merdeka."
    }
  ],

  autoTablePerbandingan: [
    {
      aspek: "Sila Pertama",
      mohYamin: "Peri Kebangsaan",
      mrSoepomo: "Persatuan",
      irSoekarno: "Kebangsaan Indonesia",
      piagamJakarta: "Ketuhanan dengan kewajiban menjalankan syariat Islam bagi pemeluk-pemeluknya",
      pengesahanPPKI: "Ketuhanan Yang Maha Esa"
    },
    {
      aspek: "Sila Kedua",
      mohYamin: "Peri Kemanusiaan",
      mrSoepomo: "Kekeluargaan",
      irSoekarno: "Internasionalisme atau Peri-Kemanusiaan",
      piagamJakarta: "Kemanusiaan yang adil dan beradab",
      pengesahanPPKI: "Kemanusiaan yang adil dan beradab"
    },
    {
      aspek: "Sila Ketiga",
      mohYamin: "Peri Ketuhanan",
      mrSoepomo: "Keseimbangan lahir dan batin",
      irSoekarno: "Mufakat atau Demokrasi",
      piagamJakarta: "Persatuan Indonesia",
      pengesahanPPKI: "Persatuan Indonesia"
    },
    {
      aspek: "Sila Keempat",
      mohYamin: "Peri Kerakyatan",
      mrSoepomo: "Musyawarah",
      irSoekarno: "Kesejahteraan Sosial",
      piagamJakarta: "Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan perwakilan",
      pengesahanPPKI: "Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan perwakilan"
    },
    {
      aspek: "Sila Kelima",
      mohYamin: "Kesejahteraan Rakyat",
      mrSoepomo: "Keadilan Rakyat",
      irSoekarno: "Ketuhanan yang berkebudayaan",
      piagamJakarta: "Keadilan sosial bagi seluruh rakyat Indonesia",
      pengesahanPPKI: "Keadilan sosial bagi seluruh rakyat Indonesia"
    }
  ],

  kesimpulanPoin: [
    {
      judul: "Pancasila adalah Titik Temu (Kalimatun Sawa)",
      uraian: "Pancasila bukan hasil tiruan dari ideologi barat maupun timur, melainkan kristalisasi nilai luhur yang digali langsung dari bumi pertiwi Indonesia melalui proses dialektika para pendiri bangsa."
    },
    {
      judul: "Toleransi dan Kebijaksanaan Para Pendiri Bangsa",
      uraian: "Peristiwa perubahan tujuh kata pada Piagam Jakarta pada 18 Agustus 1945 membuktikan bahwa para tokoh bangsa lebih mengutamakan persatuan dan keutuhan Negara Kesatuan Republik Indonesia di atas kepentingan golongan atau agama tertentu."
    },
    {
      judul: "Legitimasi Konstitusional yang Mengikat Seluruh Bangsa",
      uraian: "Pengesahan Pembukaan UUD 1945 oleh PPKI pada tanggal 18 Agustus 1945 menjadikan rumusan Pancasila sah secara yuridis-formal sebagai dasar negara, ideologi nasional, dan sumber dari segala sumber hukum negara Republik Indonesia."
    },
    {
      judul: "Tanggung Jawab Generasi Muda di Era Kontemporer",
      uraian: "Sebagai pelajar jenjang SMA Fase E, tugas kita bukan lagi merumuskan dasar negara, melainkan merawat, mengamalkan, dan membentengi nilai-nilai luhur Pancasila dalam tindakan konkret sehari-hari di tengah tantangan zaman."
    }
  ]
};
