/* =========================================
   ROOT
========================================= */

export interface BC23Request {
  asalData: "S";
  asuransi: number;
  bruto: number;
  cif: number;
  fob: number;
  freight: number;
  hargaPenyerahan: number;
  jabatanTtd: string;
  jumlahKontainer: number;
  kodeAsuransi: "LN" | "DN";
  kodeDokumen: "23";
  kodeIncoterm: string;
  kodeKantor: string;
  kodeKantorBongkar: string;
  kodePelBongkar: string;
  kodePelMuat: string;
  kodePelTransit: string;
  kodeTps: string;

  kodeTujuanTpb: string;
  kodeTutupPu: "11" | "12" | "14";
  kodeValuta: string;
  kotaTtd: string;
  namaTtd: string;
  ndpbm: number;
  netto: number;
  nik:string;
  nilaiBarang: number;
  nomorAju: string;
  nomorBc11: string;
  posBc11: string;
  seri: number;
  subposBc11: string;
  tanggalBc11: string;
  tanggalTiba: string;
  tanggalTtd: string;
  biayaTambahan: number;
  biayaPengurang: number;
  kodeKenaPajak: "1" | "2";

  barang: Barang[];
  entitas: Entitas[];
  kemasan: Kemasan[];
  kontainer: Kontainer[];
  dokumen: Dokumen[];
  pengangkut: Pengangkut[];
}

export const defaultBC23Request: BC23Request = {
  asalData: "S",
  asuransi: 0,
  bruto: 0,
  cif: 0,
  fob: 0,
  freight: 0,
  hargaPenyerahan: 0,
  jabatanTtd: "",
  jumlahKontainer: 0,
  kodeAsuransi: "LN",
  kodeDokumen: "23",
  kodeIncoterm: "",
  kodeKantor: "",
  kodeKantorBongkar: "",
  kodePelBongkar: "",
  kodePelMuat: "",
  kodePelTransit: "",
  kodeTps: "",
  kodeTujuanTpb: "",
  kodeTutupPu: "11",
  kodeValuta: "",
  kotaTtd: "",
  namaTtd: "",
  ndpbm: 0,
  netto: 0,
  nik: "",
  nilaiBarang: 0,
  nomorAju: "",
  nomorBc11: "",
  posBc11: "",
  seri: 0,
  subposBc11: "",
  tanggalBc11: "",
  tanggalTiba: "",
  tanggalTtd: "",
  biayaTambahan: 0,
  biayaPengurang: 0,
  kodeKenaPajak: "1",

  barang: [],
  entitas: [],
  kemasan: [],
  kontainer: [],
  dokumen: [],
  pengangkut: []
};

/* =========================================
   BARANG
========================================= */

export interface Barang {
  idBarang: string;
  asuransi: number;
  cif: number;
  diskon: number;
  fob: number;
  freight: number;
  hargaEkspor: number;
  hargaPenyerahan: number;
  hargaSatuan: number;
  isiPerKemasan: number;
  jumlahKemasan: number;
  jumlahSatuan: number;
  kodeBarang: string;
  kodeDokumen: string;
  kodeKategoriBarang: string;
  kodeJenisKemasan: string;
  kodeNegaraAsal: string;
  kodePerhitungan: "0" | "1";
  kodeSatuanBarang: string;
  merk: string;
  netto: number;
  nilaiBarang: number;
  nilaiTambah: number;
  posTarif: string;
  seriBarang: number;
  spesifikasiLain: string;
  tipe: string;
  ukuran: string;
  uraian: string;
  ndpbm: number;
  cifRupiah: number;
  hargaPerolehan: number;
  kodeAsalBahanBaku: "0" | "1";

  barangTarif: BarangTarif[];
  barangDokumen: BarangDokumen[];
}

/* =========================================
   BARANG TARIF
========================================= */

export interface BarangTarif {
  kodeJenisTarif: "1" | "2";
  jumlahSatuan: number;
  kodeFasilitasTarif: string;
  kodeSatuanBarang: string;
  kodeJenisPungutan: string; // BM | PPH | PPN | dll
  nilaiBayar: number;
  nilaiFasilitas: number;
  nilaiSudahDilunasi: number;
  seriBarang: number;
  tarif: number;
  tarifFasilitas: number;
}

/* =========================================
   BARANG DOKUMEN
========================================= */

export interface BarangDokumen {
  seriDokumen: string;
}

/* =========================================
   ENTITAS
========================================= */

export interface Entitas {
  alamatEntitas: string;
  kodeEntitas: string;
  kodeJenisIdentitas: "2" | "3" | "4" | "5" | "6";
  kodeJenisApi: string;
  kodeNegara: string;
  kodeStatus: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
  namaEntitas: string;
  nibEntitas: string;
  nomorIdentitas: string;
  nomorIjinEntitas: string;
  tanggalIjinEntitas?: string;
  seriEntitas: number;


}

/* =========================================
   KEMASAN
========================================= */

export interface Kemasan {
  jumlahKemasan: number;
  kodeJenisKemasan: string;
  seriKemasan: number;
  merkKemasan: string;
}

/* =========================================
   KONTAINER
========================================= */

export interface Kontainer {
  kodeTipeKontainer: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "99";
  kodeUkuranKontainer: "20" | "40" | "45" | "60";
  nomorKontainer: string;
  seriKontainer: number;
  kodeJenisKontainer: "4" | "7" | "8";
}

/* =========================================
   DOKUMEN
========================================= */

export interface Dokumen {
  idDokumen: string;
  kodeDokumen: string;
  nomorDokumen: string;
  seriDokumen: number;
  tanggalDokumen: string;
}

/* =========================================
   PENGANGKUT
========================================= */

export interface Pengangkut {
  kodeBendera: string;
  namaPengangkut: string;
  nomorPengangkut: string;
  kodeCaraAngkut: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  seriPengangkut: number;
}