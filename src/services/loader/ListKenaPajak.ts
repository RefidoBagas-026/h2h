export const ListKenaPajak = [
    { kode: "1", nama: "PEMBELIAN BKP" },
    { kode: "2", nama: "PENERIMA JASA BKP" },
].map(item => ({ label: `${item.kode} - ${item.nama}`, value: item.kode }));