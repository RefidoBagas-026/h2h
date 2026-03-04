import { useEffect, useState } from "react";
import Card from "../../../../../components/Card";
import { Button } from "react-bootstrap";
import { ListJenisKemasan } from "../../../../../services/loader/ListJenisKemasan";

export const ModalKemasan = ({ data=[], setData, setActiveForm, editingKemasanIndex, setEditingKemasanIndex }: any) => {
    const isEdit = editingKemasanIndex !== null && editingKemasanIndex !== undefined;

    const [form, setForm] = useState({
        seriKemasan: "",
        jumlahKemasan: 0,
        kodeJenisKemasan: "",
        merkKemasan: "",
    });

    const generateSeri = () => {
        if (!data || data.length === 0) return "1";
        const maxSeri = Math.max(...data.map((item: any) => parseInt(item.seriKemasan)));
        return (maxSeri + 1).toString();
    }

    useEffect(() => {
        if (isEdit && data && data[editingKemasanIndex!]) {
        setForm(data[editingKemasanIndex!]);
        }
    }, [editingKemasanIndex]);

    const handleChange = (field: string, value: any) => {
        setForm((prev: any) => ({
        ...prev,
        [field]: value,
        }));
    }

    const handleSimpan = () => {
        if (!form.jumlahKemasan || !form.kodeJenisKemasan || !form.merkKemasan) {
            alert("Lengkapi data terlebih dahulu");
            return;
        }
        setData((prev: any) => {
      const updated = [...(prev.kemasan || [])];

      if (isEdit) {
        updated[editingKemasanIndex!] = form;
      } else {
        updated.push({
          ...form,
          seriKemasan: updated.length + 1,
        });
      }
      return {
        ...prev,
        kemasan: updated,
      };
    });
    setActiveForm(null);
  };
    return (
    <Card
            title={editingKemasanIndex !== null ? "Edit Kemasan" : "Tambah Kemasan"}
            headerStyle={{ backgroundColor: "#f5f5f5"}}
            //tampilkan form jika showForm true
            bodyStyle={{display:"flex", flexDirection:"row", width:"100%", gap: 16, justifyContent:"center"}}
            headerCustom={(
                <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                    <Button size="sm" variant="primary" style={{ display: "flex", alignItems:"center", justifyContent:"center", gap: 4 , borderRadius: 0, fontSize: 12 }} 
                        onClick={handleSimpan}>
                        <span style={{paddingTop:1, minWidth:70}}>Simpan</span>                
                    </Button>
                    <Button size="sm" variant="outline-secondary" style={{ display: "flex", alignItems:"center", justifyContent:"center", gap: 4 , borderRadius: 0, fontSize: 12 }} 
                    onClick={() => {
                        setForm({
                            seriKemasan: "",
                            jumlahKemasan: 0,
                            kodeJenisKemasan: "",
                            merkKemasan: "",
                        });
                        setEditingKemasanIndex(null);
                        setActiveForm(null);
                    }}>
                        <span style={{paddingTop:1, minWidth:70}}>Batal</span>                
                    </Button>
                </div>
          )}
        >
          <Card.Numeric
            label="Seri"
            name="seriKemasan"
            value={form.seriKemasan || generateSeri()}
            onChange={(val) => handleChange("seriKemasan", val)}
            readonly={true}
            inputStyle={{ width: "100%" }}
        />
        <Card.Numeric
            label="Jumlah"
            name="jumlahKemasan"
            value={form.jumlahKemasan}
            onChange={(val) => handleChange("jumlahKemasan", val)}
            error={form.jumlahKemasan <= 0 ? "Jumlah harus lebih dari 0" : ""}
            inputStyle={{ width: "100%" }}
        />
            <Card.Select
            label="Jenis"
            name="kodeJenisKemasan"
            value={form.kodeJenisKemasan}
            onChange={(value) => handleChange("kodeJenisKemasan", value)}
            error={!form.kodeJenisKemasan ? "Jenis Kosong" : ""}
            list={ListJenisKemasan.map((item) => ({ value: item.value, label: `${item.value} - ${item.label}` }))}
            inputStyle={{ width: "100%" }}
        />
            <Card.Input
            label="Merek"
            name="merkKemasan"
            value={form.merkKemasan}
            onChange={(val) => handleChange("merkKemasan", val)}
            error={!form.merkKemasan ? "Merk Kosong" : ""}
            inputStyle={{ width: "100%" }}
        />
      </Card>)
};