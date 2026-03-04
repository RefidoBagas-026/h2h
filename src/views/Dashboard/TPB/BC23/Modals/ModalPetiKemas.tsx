import { useEffect, useState } from "react";
import Card from "../../../../../components/Card";
import { Button } from "react-bootstrap";
import { ListUkuranKontainer } from "../../../../../services/loader/ListUkuranKontainer";
import { ListJenisKontainer } from "../../../../../services/loader/ListJenisKontainer";
import { ListTipeKontainer } from "../../../../../services/loader/ListTipeKontainer";

export const ModalPetiKemas = ({ data=[], setData, setActiveForm, editingPetiKemasIndex, setEditingPetiKemasIndex }: any) => {
    const isEdit = editingPetiKemasIndex !== null && editingPetiKemasIndex !== undefined;

    const [form, setForm] = useState({
        kodeTipeKontainer: "",
        kodeUkuranKontainer: "",
        nomorKontainer: null,
        seriKontainer: 0,
        kodeJenisKontainer: "",
    });

    const generateSeri = () => {
        if (!data || data.length === 0) return "1";
        const maxSeri = Math.max(...data.map((item: any) => parseInt(item.seriKontainer)));
        return (maxSeri + 1).toString();
    }

    useEffect(() => {
        if (isEdit && data && data[editingPetiKemasIndex!]) {
        setForm(data[editingPetiKemasIndex!]);
        }
    }, [editingPetiKemasIndex]);

    const handleChange = (field: string, value: any) => {
        setForm((prev: any) => ({
        ...prev,
        [field]: value,
        }));
    }

    const handleSimpan = () => {
        if (!form.kodeTipeKontainer || !form.kodeUkuranKontainer || !form.nomorKontainer || !form.kodeJenisKontainer) {
            alert("Lengkapi data terlebih dahulu");
            return;
        }
        setData((prev: any) => {
      const updated = [...(prev.kontainer || [])];

      if (isEdit) {
        updated[editingPetiKemasIndex!] = form;
      } else {
        updated.push({
          ...form,
          seriKontainer: updated.length + 1,
        });
      }

      return {
        ...prev,
        kontainer: updated,
      };
    });

    setActiveForm(null);
  };
    return (
    <Card
            title={editingPetiKemasIndex !== null ? "Edit Peti Kemas" : "Tambah Peti Kemas"}
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
                            kodeTipeKontainer: "",
                            kodeUkuranKontainer: "",
                            nomorKontainer: null,
                            seriKontainer: 0,
                            kodeJenisKontainer: "",
                        });
                        setEditingPetiKemasIndex(null);
                        setActiveForm(null);
                    }}>
                        <span style={{paddingTop:1, minWidth:70}}>Batal</span>                
                    </Button>
                </div>
          )}
        >
          <Card.Numeric
            label="Seri"
            name="seriKontainer"
            value={form.seriKontainer || generateSeri()}
            onChange={(val) => handleChange("seriKontainer", val)}
            readonly={true}
            inputStyle={{ width: "100%" }}
        />
        <Card.Input
            label="Nomor"
            name="nomorKontainer"
            value={form.nomorKontainer}
            onChange={(val) => handleChange("nomorKontainer", val)}
            error={!form.nomorKontainer ? "Nomor harus lebih dari 0" : ""}
            inputStyle={{ width: "100%" }}
        />
            <Card.Select
            label="Ukuran"
            name="kodeUkuranKontainer"
            value={form.kodeUkuranKontainer}
            onChange={(value) => handleChange("kodeUkuranKontainer", value)}
            error={!form.kodeUkuranKontainer ? "Ukuran Kosong" : ""}
            list={ListUkuranKontainer.map((item) => ({ value: item.value, label: `${item.value} - ${item.label}` }))}
            inputStyle={{ width: "100%" }}
        />
            <Card.Select
            label="Jenis"
            name="kodeJenisKontainer"
            value={form.kodeJenisKontainer}
            onChange={(value) => handleChange("kodeJenisKontainer", value)}
            error={!form.kodeJenisKontainer ? "Jenis Kosong" : ""}
            list={ListJenisKontainer.map((item) => ({ value: item.value, label: `${item.value} - ${item.label}` }))}
            inputStyle={{ width: "100%" }}
        />
        <Card.Select
            label="Tipe"
            name="kodeTipeKontainer"
            value={form.kodeTipeKontainer}
            onChange={(value) => handleChange("kodeTipeKontainer", value)}
            error={!form.kodeTipeKontainer ? "Tipe Kosong" : ""}
            list={ListTipeKontainer.map((item) => ({ value: item.value, label: `${item.value} - ${item.label}` }))}
            inputStyle={{ width: "100%" }}
        />
      </Card>)
};