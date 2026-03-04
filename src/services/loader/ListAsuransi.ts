export const ListAsuransi = [
    { kode: "LN", nama: "Luar Negeri" },
    { kode: "DN", nama: "Dalam Negeri" },
].map(item => ({ label: `${item.kode} - ${item.nama}`, value: item.kode }));