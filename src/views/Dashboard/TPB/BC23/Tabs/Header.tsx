import { useState } from "react";
import Card from "../../../../../components/Card";

const HeaderPageBC23 = (props: any) => {

  const [data, setData] = useState(props.data || {});
  const [tujuan, setTujuan] = useState("");
  const taxList = [
    { label: "PPN", value: "ppn" },
    { label: "PPh 21", value: "pph21" },
    { label: "PPh 23", value: "pph23" },
    { label: "PPh 4(2)", value: "pph4(2)" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "center" }}>
      <Card
          title="Pengajuan"
          headerStyle={{ backgroundColor: "#f5f5f5"}}
        >
          <Card.Input
            label="Nomor Aju"
            name="nomorAju"
            value={data.nomorAju || ""}
            onChange={(e) => setData({ ...data, nomorAju: e.target.value })}
            error={!data.nomorAju ? "Nomor Kosong" : ""}
            readonly={false}
          />
        </Card>
        <Card
          title="Kantor Pabean" headerStyle={{ backgroundColor: "#f5f5f5" }}>
          <Card.Select
            label="Pelabuhan Bongkar"
            name="nomorPelBongkar"
            value={data.nomorPelBongkar || ""}
            list={taxList}
            onChange={(val) => setData({ ...data, nomorPelBongkar: val })}
            error={!data.nomorPelBongkar ? "Pelabuhan wajib dipilih" : ""}
          />
          <Card.Input
            label="Kantor Pelabuhan Bongkar"
            name="kantorPelabuhanBongkar"
            value={data.kantorPelabuhanBongkar || ""}
            onChange={(e) => setData({ ...data, kantorPelabuhanBongkar: e.target.value })}
            readonly={false}
          />
          <Card.Select
            label="Kantor Pabean Pengawas"
            name="kantorPabeanPengawas"
            value={data.kantorPabeanPengawas || ""}
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
          title="Keterangan Lain"
          headerStyle={{ backgroundColor: "#f5f5f5"}}
        >
          <Card.Select
            label="Tujuan"
            name="taxType"
            value={tujuan}
            onChange={(val) => setTujuan(val)}
            list={taxList}
            error={!tujuan ? "Tujuan wajib dipilih" : ""}
          />
        </Card>
    </div>
  );
};

export default HeaderPageBC23;