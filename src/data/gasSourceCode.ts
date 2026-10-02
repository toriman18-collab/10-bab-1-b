// File: src/data/gasSourceCode.ts
// Berisi kode lengkap Code.gs dan Index.html yang siap digunakan langsung di Google Apps Script editor.
// Menjamin tidak ada karakter asterisk (*) dalam string teks output UI.

export const CODE_GS_CONTENT = `/**
 * =========================================================================
 * PANCASILAEDU - MEDIA PEMBELAJARAN INTERAKTIF PENDIDIKAN PANCASILA FASE E
 * Topik: Pancasila | Sub-Bab: Menganalisis Dinamika Kelahiran Pancasila
 * Backend Google Apps Script (Code.gs)
 * =========================================================================
 */

// Menampilkan Web App
function doGet(e) {
  setupDatabase(); // Pastikan database dan 4 sheet siap
  var template = HtmlService.createTemplateFromFile('Index');
  return template.evaluate()
    .setTitle('PancasilaEdu - Dinamika Kelahiran Pancasila (Fase E)')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Fungsi include untuk file modular jika diperlukan
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Otomatisasi Database Google Sheets:
 * Membuat 4 sheet jika belum ada dan menyusun Header standar.
 */
function setupDatabase() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) return { success: false, message: 'Spreadsheet aktif tidak ditemukan' };

    var sheetsConfig = [
      {
        name: 'Siswa',
        headers: ['Nama Lengkap', 'Kelas', 'Timestamp']
      },
      {
        name: 'Nilai_Kuis',
        headers: ['Nama Lengkap', 'Kelas', 'Nilai', 'Waktu']
      },
      {
        name: 'Nilai_UjiKomp',
        headers: ['Nama Lengkap', 'Kelas', 'Nilai', 'Waktu']
      },
      {
        name: 'Token',
        headers: ['Jenis_Ujian', 'Kode_Token', 'Expired_At']
      }
    ];

    sheetsConfig.forEach(function(cfg) {
      var sheet = ss.getSheetByName(cfg.name);
      if (!sheet) {
        sheet = ss.insertSheet(cfg.name);
        sheet.appendRow(cfg.headers);
        var headerRange = sheet.getRange(1, 1, 1, cfg.headers.length);
        headerRange.setBackground('#1E3A8A');
        headerRange.setFontColor('#FFFFFF');
        headerRange.setFontWeight('bold');
        headerRange.setHorizontalAlignment('center');
        sheet.setFrozenRows(1);
      } else {
        if (sheet.getLastRow() === 0) {
          sheet.appendRow(cfg.headers);
          var headerRange = sheet.getRange(1, 1, 1, cfg.headers.length);
          headerRange.setBackground('#1E3A8A');
          headerRange.setFontColor('#FFFFFF');
          headerRange.setFontWeight('bold');
          headerRange.setHorizontalAlignment('center');
          sheet.setFrozenRows(1);
        }
      }
    });

    return { success: true, message: 'Database 4 sheet berhasil diverifikasi dan disiapkan' };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

/**
 * Menyimpan data pendaftaran siswa
 */
function saveSiswa(nama, kelas) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Siswa');
    if (!sheet) {
      setupDatabase();
      sheet = ss.getSheetByName('Siswa');
    }
    var waktu = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'dd/MM/yyyy HH:mm:ss');
    sheet.appendRow([nama, kelas, waktu]);
    return { success: true, nama: nama, kelas: kelas, waktu: waktu };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

/**
 * Menyimpan nilai Game Kuis
 */
function saveNilaiKuis(nama, kelas, nilai) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Nilai_Kuis');
    if (!sheet) {
      setupDatabase();
      sheet = ss.getSheetByName('Nilai_Kuis');
    }
    var waktu = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'dd/MM/yyyy HH:mm:ss');
    sheet.appendRow([nama, kelas, Number(nilai), waktu]);
    return { success: true, message: 'Nilai kuis tersimpan' };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

/**
 * Menyimpan nilai Uji Kompetensi
 */
function saveNilaiUjiKomp(nama, kelas, nilai) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Nilai_UjiKomp');
    if (!sheet) {
      setupDatabase();
      sheet = ss.getSheetByName('Nilai_UjiKomp');
    }
    var waktu = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'dd/MM/yyyy HH:mm:ss');
    sheet.appendRow([nama, kelas, Number(nilai), waktu]);
    return { success: true, message: 'Nilai uji kompetensi tersimpan' };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

/**
 * Generator Kode Token Terpisah:
 * Game Kuis: 10 menit
 * Uji Kompetensi: 15 menit
 */
function generateToken(jenisUjian, durasiMenit) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Token');
    if (!sheet) {
      setupDatabase();
      sheet = ss.getSheetByName('Token');
    }

    var durasi = Number(durasiMenit) || (jenisUjian === 'Game Kuis' ? 10 : 15);
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var tokenCode = '';
    for (var i = 0; i < 6; i++) {
      tokenCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    var nowMs = new Date().getTime();
    var expiredAt = nowMs + (durasi * 60 * 1000);
    var expiredStr = Utilities.formatDate(new Date(expiredAt), 'Asia/Jakarta', 'dd/MM/yyyy HH:mm:ss');

    sheet.appendRow([jenisUjian, tokenCode, expiredStr]);

    return {
      success: true,
      jenisUjian: jenisUjian,
      kodeToken: tokenCode,
      expiredAt: expiredAt,
      expiredStr: expiredStr,
      durasiMenit: durasi
    };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

/**
 * Verifikasi Kode Token
 */
function verifyToken(jenisUjian, inputToken) {
  try {
    if (!inputToken) return { valid: false, message: 'Kode token wajib diisi' };
    var cleanToken = String(inputToken).trim().toUpperCase();

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Token');
    if (!sheet || sheet.getLastRow() <= 1) {
      return { valid: false, message: 'Belum ada token aktif yang dibuat guru' };
    }

    var data = sheet.getDataRange().getValues();
    var now = new Date().getTime();

    // Cari dari baris terakhir (terbaru)
    for (var i = data.length - 1; i >= 1; i--) {
      var rowJenis = data[i][0];
      var rowToken = String(data[i][1]).trim().toUpperCase();
      var rowExpired = data[i][2];

      if (rowJenis === jenisUjian && rowToken === cleanToken) {
        var expDate = new Date(rowExpired).getTime();
        if (isNaN(expDate)) {
          // Coba parse format dd/MM/yyyy HH:mm:ss
          var parts = String(rowExpired).split(' ');
          if (parts.length === 2) {
            var dateParts = parts[0].split('/');
            var timeParts = parts[1].split(':');
            expDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], timeParts[2]).getTime();
          }
        }
        if (now <= expDate) {
          return { valid: true, message: 'Token valid dan aktif' };
        } else {
          return { valid: false, message: 'Token sudah kadaluarsa (expired). Silakan minta token baru ke guru.' };
        }
      }
    }

    return { valid: false, message: 'Kode token tidak ditemukan atau tidak sesuai jenis ujian.' };
  } catch (err) {
    return { valid: false, error: err.toString() };
  }
}

/**
 * Mengambil Top 5 Leaderboard untuk Kuis dan Uji Kompetensi
 */
function getLeaderboard() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetKuis = ss.getSheetByName('Nilai_Kuis');
    var sheetUji = ss.getSheetByName('Nilai_UjiKomp');

    var topKuis = [];
    if (sheetKuis && sheetKuis.getLastRow() > 1) {
      var rowsK = sheetKuis.getRange(2, 1, sheetKuis.getLastRow() - 1, 4).getValues();
      rowsK.sort(function(a, b) {
        return Number(b[2]) - Number(a[2]);
      });
      topKuis = rowsK.slice(0, 5).map(function(r) {
        return { nama: r[0], kelas: r[1], nilai: Number(r[2]), waktu: r[3] };
      });
    }

    var topUji = [];
    if (sheetUji && sheetUji.getLastRow() > 1) {
      var rowsU = sheetUji.getRange(2, 1, sheetUji.getLastRow() - 1, 4).getValues();
      rowsU.sort(function(a, b) {
        return Number(b[2]) - Number(a[2]);
      });
      topUji = rowsU.slice(0, 5).map(function(r) {
        return { nama: r[0], kelas: r[1], nilai: Number(r[2]), waktu: r[3] };
      });
    }

    return { success: true, topKuis: topKuis, topUji: topUji };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

/**
 * Mengambil seluruh data respon siswa untuk tabel realtime dan rekap
 */
function getAllResponses() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetKuis = ss.getSheetByName('Nilai_Kuis');
    var sheetUji = ss.getSheetByName('Nilai_UjiKomp');

    var responses = [];

    if (sheetKuis && sheetKuis.getLastRow() > 1) {
      var dataK = sheetKuis.getRange(2, 1, sheetKuis.getLastRow() - 1, 4).getValues();
      dataK.forEach(function(r, idx) {
        responses.push({
          id: 'k_' + idx,
          nama: r[0],
          kelas: r[1],
          jenisUjian: 'Game Kuis',
          nilai: Number(r[2]),
          waktu: r[3]
        });
      });
    }

    if (sheetUji && sheetUji.getLastRow() > 1) {
      var dataU = sheetUji.getRange(2, 1, sheetUji.getLastRow() - 1, 4).getValues();
      dataU.forEach(function(r, idx) {
        responses.push({
          id: 'u_' + idx,
          nama: r[0],
          kelas: r[1],
          jenisUjian: 'Uji Kompetensi',
          nilai: Number(r[2]),
          waktu: r[3]
        });
      });
    }

    return { success: true, data: responses };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

/**
 * Reset ujian seorang siswa
 */
function resetStudentResponse(nama, jenisUjian) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = jenisUjian === 'Game Kuis' ? 'Nilai_Kuis' : 'Nilai_UjiKomp';
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet || sheet.getLastRow() <= 1) return { success: false, message: 'Data tidak ditemukan' };

    var data = sheet.getDataRange().getValues();
    for (var i = data.length - 1; i >= 1; i--) {
      if (String(data[i][0]).toLowerCase() === String(nama).toLowerCase()) {
        sheet.deleteRow(i + 1);
        return { success: true, message: 'Data berhasil direset untuk ' + nama };
      }
    }

    return { success: false, message: 'Siswa tidak ditemukan pada sheet ' + sheetName };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

/**
 * Hapus seluruh data respon siswa
 */
function clearAllResponses() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = ['Siswa', 'Nilai_Kuis', 'Nilai_UjiKomp'];

    sheets.forEach(function(name) {
      var sheet = ss.getSheetByName(name);
      if (sheet && sheet.getLastRow() > 1) {
        sheet.deleteRows(2, sheet.getLastRow() - 1);
      }
    });

    return { success: true, message: 'Seluruh respon siswa berhasil dihapus' };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}
`;

export const INDEX_HTML_SAMPLE = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PancasilaEdu - Dinamika Kelahiran Pancasila (Fase E)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    p, .text-justify-custom { text-align: justify; text-justify: inter-word; }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen flex flex-col">

  <!-- Header Navigation -->
  <header class="bg-[#1E3A8A] text-white shadow-xl sticky top-0 z-50 px-4 sm:px-8 py-4 flex items-center justify-between border-b border-blue-900">
    <div class="flex items-center gap-3 cursor-pointer" onclick="showTab('home')">
      <div class="w-11 h-11 rounded-2xl bg-amber-400 text-blue-950 font-black text-xl flex items-center justify-center shadow-lg">
        P
      </div>
      <div>
        <div class="flex items-center gap-2">
          <span class="font-extrabold text-lg text-white">Pancasila<span class="text-amber-400">Edu</span></span>
          <span class="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-400/30">Fase E</span>
        </div>
        <p class="text-xs text-blue-200 hidden sm:block">Menganalisis Dinamika Kelahiran Pancasila</p>
      </div>
    </div>

    <!-- Nav Desktop -->
    <nav class="hidden lg:flex items-center gap-1.5">
      <button onclick="showTab('home')" class="nav-btn px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-100 hover:bg-blue-800">Home</button>
      <button onclick="showTab('tujuan')" class="nav-btn px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-100 hover:bg-blue-800">Tujuan</button>
      <button onclick="showTab('pemantik')" class="nav-btn px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-100 hover:bg-blue-800">Pemantik</button>
      <button onclick="showTab('materi')" class="nav-btn px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-100 hover:bg-blue-800">Materi & Tabel</button>
      <button onclick="showTab('kesimpulan')" class="nav-btn px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-100 hover:bg-blue-800">Kesimpulan</button>
      <button onclick="openPortalModal()" class="px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 text-blue-950 hover:bg-amber-300 shadow">Masuk Portal Ujian</button>
    </nav>
  </header>

  <!-- Main Dynamic Viewport -->
  <main class="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">
    
    <!-- Tab: Home -->
    <section id="tab-home" class="space-y-8">
      <div class="bg-gradient-to-br from-[#1E3A8A] via-blue-800 to-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-5">
        <span class="inline-block px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase">
          Kurikulum Merdeka - Pendidikan Pancasila Kelas X
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold leading-tight">
          Menganalisis Dinamika <br><span class="text-amber-400">Kelahiran Pancasila</span>
        </h1>
        <p class="text-blue-100 text-sm sm:text-base leading-relaxed text-justify max-w-3xl">
          Selamat datang di media pembelajaran interaktif berbasis Google Apps Script. Pelajari kronologi pembentukan BPUPKI, gagasan Mohammad Yamin, Mr. Soepomo, dan Ir. Soekarno, kompromi Piagam Jakarta, hingga pengesahan resmi UUD 1945 dan dasar negara oleh PPKI pada 18 Agustus 1945.
        </p>
        <div class="pt-2 flex flex-wrap gap-4">
          <button onclick="showTab('materi')" class="px-6 py-3.5 rounded-2xl bg-amber-400 text-blue-950 font-bold text-sm shadow hover:bg-amber-300">
            Pelajari Materi Lengkap
          </button>
          <button onclick="openPortalModal()" class="px-6 py-3.5 rounded-2xl bg-blue-700 text-white font-bold text-sm border border-blue-500 hover:bg-blue-600 shadow">
            Mulai Kuis & Uji Kompetensi
          </button>
        </div>
      </div>
    </section>

    <!-- Tab: Tujuan -->
    <section id="tab-tujuan" class="hidden space-y-6">
      <div class="bg-blue-900 text-white rounded-3xl p-8 shadow-xl">
        <h2 class="text-2xl font-bold mb-2">Tujuan Pembelajaran Fase E</h2>
        <p class="text-xs text-blue-200">Capaian Pembelajaran Elemen Pancasila</p>
      </div>
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex gap-3 text-justify text-sm">
          <span class="font-bold text-blue-800">1.</span>
          <p>Menganalisis latar belakang historis dan kronologi pembentukan BPUPKI serta dinamika perumusan dasar negara.</p>
        </div>
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex gap-3 text-justify text-sm">
          <span class="font-bold text-blue-800">2.</span>
          <p>Membandingkan gagasan dasar negara yang diajukan oleh Mohammad Yamin, Mr. Soepomo, dan Ir. Soekarno.</p>
        </div>
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex gap-3 text-justify text-sm">
          <span class="font-bold text-blue-800">3.</span>
          <p>Menguraikan dinamika Piagam Jakarta 22 Juni 1945 dan perubahan krusial 18 Agustus 1945 demi keutuhan NKRI.</p>
        </div>
      </div>
    </section>

    <!-- Tab: Materi & Tabel -->
    <section id="tab-materi" class="hidden space-y-8">
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h2 class="text-xl font-bold text-slate-900">Auto-Table: Komparasi Rumusan Dasar Negara</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-xs sm:text-sm text-left border">
            <thead class="bg-blue-900 text-white">
              <tr>
                <th class="p-3">Sila</th>
                <th class="p-3">Mohammad Yamin (29 Mei)</th>
                <th class="p-3">Mr. Soepomo (31 Mei)</th>
                <th class="p-3">Ir. Soekarno (1 Juni)</th>
                <th class="p-3">PPKI (18 Agustus 1945)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr>
                <td class="p-3 font-bold">1</td>
                <td class="p-3">Peri Kebangsaan</td>
                <td class="p-3">Persatuan</td>
                <td class="p-3">Kebangsaan Indonesia</td>
                <td class="p-3 font-bold text-emerald-800">Ketuhanan Yang Maha Esa</td>
              </tr>
              <tr>
                <td class="p-3 font-bold">2</td>
                <td class="p-3">Peri Kemanusiaan</td>
                <td class="p-3">Kekeluargaan</td>
                <td class="p-3">Internasionalisme</td>
                <td class="p-3 font-bold text-emerald-800">Kemanusiaan yang adil dan beradab</td>
              </tr>
              <tr>
                <td class="p-3 font-bold">3</td>
                <td class="p-3">Peri Ketuhanan</td>
                <td class="p-3">Keseimbangan lahir batin</td>
                <td class="p-3">Mufakat atau Demokrasi</td>
                <td class="p-3 font-bold text-emerald-800">Persatuan Indonesia</td>
              </tr>
              <tr>
                <td class="p-3 font-bold">4</td>
                <td class="p-3">Peri Kerakyatan</td>
                <td class="p-3">Musyawarah</td>
                <td class="p-3">Kesejahteraan Sosial</td>
                <td class="p-3 font-bold text-emerald-800">Kerakyatan yang dipimpin oleh hikmat kebijaksanaan...</td>
              </tr>
              <tr>
                <td class="p-3 font-bold">5</td>
                <td class="p-3">Kesejahteraan Rakyat</td>
                <td class="p-3">Keadilan Rakyat</td>
                <td class="p-3">Ketuhanan yang berkebudayaan</td>
                <td class="p-3 font-bold text-emerald-800">Keadilan sosial bagi seluruh rakyat Indonesia</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Tab: Kesimpulan -->
    <section id="tab-kesimpulan" class="hidden space-y-6">
      <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
        <h2 class="text-xl font-bold text-slate-900">Rangkuman Inti Dinamika Kelahiran Pancasila</h2>
        <p class="text-sm text-slate-700 leading-relaxed text-justify">
          Pancasila merupakan titik temu seluruh elemen kebangsaan. Perubahan tujuh kata dalam Piagam Jakarta pada sidang PPKI 18 Agustus 1945 membuktikan jiwa kenegarawanan para tokoh pendiri bangsa yang lebih mementingkan persatuan seluruh rakyat nusantara dari Sabang sampai Merauke.
        </p>
      </div>
    </section>

  </main>

  <footer class="bg-blue-950 text-white p-6 text-center text-xs border-t border-blue-900">
    PancasilaEdu - Google Apps Script Web App Template (Fase E Kelas X)
  </footer>

  <script>
    function showTab(tabId) {
      const tabs = ['home', 'tujuan', 'pemantik', 'materi', 'kesimpulan'];
      tabs.forEach(t => {
        const el = document.getElementById('tab-' + t);
        if (el) el.classList.add('hidden');
      });
      const activeEl = document.getElementById('tab-' + tabId);
      if (activeEl) activeEl.classList.remove('hidden');
    }

    function openPortalModal() {
      alert('Silakan gunakan antarmuka lengkap aplikasi untuk memulai Game Kuis Kahoot-style atau CBT AKM 20 Soal!');
    }
  </script>
</body>
</html>`;
