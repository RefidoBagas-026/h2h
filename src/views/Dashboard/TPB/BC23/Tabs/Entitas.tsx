import { useState } from "react";
import Card from "../../../../../components/Card";

const EntitasBC23Page = (props: any) => {
  const [data, setData] = useState(props.data || {});
  const taxList = [
    { label: "PPN", value: "ppn" },
    { label: "PPh 21", value: "pph21" },
    { label: "PPh 23", value: "pph23" },
    { label: "PPh 4(2)", value: "pph4(2)" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "center" }}>
      <Card
          title="Importir/Pengusaha TPB"
          headerStyle={{ backgroundColor: "#f5f5f5"}}
        >
          <Card.Input
            label="NPWP"
            name="npwp"
            value={data.npwp}
            onChange={(e) => setData({ ...data, npwp: e.target.value })}
            error={!data.npwp ? "Nomor Kosong" : ""}
            readonly={true}
          />
          <Card.Input
            label="Nama"
            name="nama"
            value={data.nama}
            onChange={(e) => setData({ ...data, nama: e.target.value })}
            error={!data.nama ? "Nama Kosong" : ""}
            readonly={true}
          />
          <Card.Textarea
            label="Alamat"
            name="alamat"
            value={data.alamat}
            onChange={(e) => setData({ ...data, alamat: e.target.value })}
            error={!data.alamat ? "Alamat Kosong" : ""}
            readonly={false}
          />
        <div style={{ display: "flex", flexDirection: "row", gap: 8, marginTop: 8, }}> 
          <Card.Numeric
            label="Telepon"
            name="telepon"
            value={data.telepon}
            onChange={(val) => setData({ ...data, telepon: val })}
            error={!data.telepon ? "Telepon Kosong" : ""}
            readonly={false}
          />
          <Card.DatePicker
            label={"\u00A0"}
            name="tanggalIjinEntitas"
            value={data.tanggalIjinEntitas ? data.tanggalIjinEntitas.toISOString().slice(0, 10) : undefined}
            onChange={(val) => {
              let dateVal = val ? new Date(val) : null;
              setData({ ...data, tanggalIjinEntitas: dateVal });
            }}
            error={!data.tanggalIjinEntitas ? "Tanggal Ijin Entitas Kosong" : ""}
            readonly={false}
          /> 
        </div>
          
        </Card>
        <Card
          title="Pemasok" headerStyle={{ backgroundColor: "#f5f5f5" }}>
          <Card.Select
            label="Pelabuhan Bongkar"
            name="nomorPelBongkar"
            value={data.nomorPelBongkar}
            list={taxList}
            onChange={(val) => setData({ ...data, nomorPelBongkar: val })}
            error={!data.nomorPelBongkar ? "Pelabuhan wajib dipilih" : ""}
          />
          <Card.Select
            label="Negara"
            name="negara"
            value={data.negara}
            list={[
              { label: "Indonesia", value: "ID" },
              { label: "Singapore", value: "SG" },
              { label: "Japan", value: "JP" },
            ]}
            onChange={(val) => setData({ ...data, negara: val })}
            error={!data.negara ? "Negara wajib dipilih" : ""}
          />
          <Card.Input
            label="Kantor Pelabuhan Bongkar"
            name="kantorPelabuhanBongkar"
            value={data.kantorPelabuhanBongkar}
            onChange={(e) => setData({ ...data, kantorPelabuhanBongkar: e.target.value })}
            readonly={true}
          />
          <Card.Select
            label="Kantor Pabean Pengawas"
            name="kantorPabeanPengawas"
            value={data.kantorPabeanPengawas}
            onChange={(val) => setData({ ...data, kantorPabeanPengawas: val })}
            readonly={true}
            list={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
            ]}
            error={!data.kantorPabeanPengawas ? "Role wajib dipilih" : ""}
          />
        </Card>
        <Card
          title="Pemilik Barang"
          headerStyle={{ backgroundColor: "#f5f5f5"}}
        >
          <Card.Select
            label="Tujuan"
            name="taxType"
            value={data.tujuan}
            onChange={(val) => setData({ ...data, tujuan: val })}
            list={taxList}
            error={!data.tujuan ? "Tujuan wajib dipilih" : ""}
          />
        </Card>
    </div>
  );
};

export default EntitasBC23Page;