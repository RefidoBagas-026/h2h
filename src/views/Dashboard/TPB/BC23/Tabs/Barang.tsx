import { Button } from "react-bootstrap";
import Card from "../../../../../components/Card";
import { FaPlusCircle } from "react-icons/fa";
import CustomTable from "../../../../../components/TableList";
import { useEffect, useState } from "react";
import { ListDokumen } from "../../../../../services/loader/ListDokumen";
import moment from "moment";
import ModalManifest from "../Modals/ModalManifest";
import { FaCircleExclamation } from "react-icons/fa6";
import { ModalBarang } from "../Modals/ModalBarang";

const BarangBC23Page = ({ data, setData, headers }: any) => {
    const initForm = {
        seriDokumen: "",
        jenisDokumen: "",
        nomorDokumen: "",
        tanggalDokumen: "",
    };
    const [headState, setHeadState] = useState(() => ({
        kodeKantor: "",
        namaImportir: "",
        noHostBl: "",
        tglHostBl: "",
    }));
    const [showModal, setShowModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [form, setForm] = useState({ ...initForm });
    const generateSeri = () => {
        if (data.length === 0) return "1";
        const maxSeri = Math.max(...data.map((item: any) => parseInt(item.seriDokumen)));
        return (maxSeri + 1).toString();
    };
    const [showForm, setShowForm] = useState(false);
    const handleInputChange = (field: string, value: any) => {
        setForm((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    };
    const handleSimpan = () => {
        if (!form.jenisDokumen || !form.nomorDokumen || !form.tanggalDokumen) {
            alert("Lengkapi data terlebih dahulu");
            return;
        }
        if (editingIndex !== null) {
            // MODE EDIT
            setData((prev: any) => {
            const updated = [...(prev.dokumen || [])];
            updated[editingIndex] = {
                ...updated[editingIndex],
                ...form,
            };
            if(updated[editingIndex].jenisDokumen === "705" || updated[editingIndex].jenisDokumen === "740") {
                setShowModal(true);
                setHeadState((prev) => ({
                    ...prev,
                    noHostBl: form.nomorDokumen,
                    tglHostBl: form.tanggalDokumen,
                }));
            }

            return {
                ...prev,
                dokumen: updated,
            };
            });

            setEditingIndex(null);
        } else {
            const newData = {
            ...form,
            seriDokumen: generateSeri(),
            };
            if(newData.jenisDokumen === "705" || newData.jenisDokumen === "740") {
                setShowModal(true);
                setHeadState((prev) => ({
                    ...prev,
                    noHostBl: form.nomorDokumen,
                    tglHostBl: form.tanggalDokumen,
                }));
            }

            setData((prev: any) => ({
                ...prev,
                dokumen: [...(prev.dokumen || []), newData],
        }))};

        setForm({ ...initForm });
        setShowForm(false);
    };
    useEffect(() => {
        setHeadState((prev) => ({
            ...prev,
            kodeKantor: headers?.kodeKantor || "",
            namaImportir: headers?.entitas?.find((x: any) => x.kodeEntitas === "3")?.namaEntitas || "",
        }));
    }, [headers]);

    const getNamaDokumen = (kode: string) => {
        const dokumen = ListDokumen.find((item) => item.key === kode);
        return dokumen ? `${dokumen.key} - ${dokumen.value}` : "";
    };

    const handleEdit = (row: any, index: number) => {
        setForm({
            seriDokumen: row.seriDokumen,
            jenisDokumen: row.jenisDokumen,
            nomorDokumen: row.nomorDokumen,
            tanggalDokumen: row.tanggalDokumen,
        });

        setEditingIndex(index);
        setShowForm(true);
    };

const handleDelete = (index: number) => {
  if (!window.confirm("Yakin ingin menghapus dokumen ini?")) return;

  setData((prev: any) => {
    const updated = [...(prev.dokumen || [])];
    updated.splice(index, 1);
        const reIndexed = updated.map((item, i) => ({
        ...item,
        seriDokumen: (i + 1).toString(),
        }));
    return {
      ...prev,
      dokumen: reIndexed,
    };
  });
};

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "row", fontWeight: 500, fontSize: 12, padding: 12, backgroundColor: "#fff7db", alignItems: "center", gap: 6}}>
            <FaCircleExclamation style={{color:"orange"}}/> <span style={{color:"black"}}>Wajib mengisi data barang</span>
        </div>
        <div style={{ display: "flex", flexDirection: "row", fontWeight: 500, fontSize: 12, padding: 12, backgroundColor: "#fff7db", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <FaCircleExclamation style={{color:"orange"}}/> <span style={{color:"black"}}>CIF barang ({data.cif ?? 0}) tidak sama dengan CIF transaksi ({headers.cif ?? 0})</span>
        </div>
      {!showForm && <Card
          title="Data Barang"
          headerStyle={{ backgroundColor: "#f5f5f5"}}
          headerCustom={(
            <Button size="sm" variant="primary" style={{ display: "flex", alignItems:"center", justifyContent:"center", gap: 4 , borderRadius: 0, fontSize: 12 }} onClick={() => setShowForm(true)}>
                <FaPlusCircle/><span style={{paddingTop:1}}>Tambah</span>                
            </Button>
          )}
        >
        <CustomTable
            title=""
            containerStyle={{ background: "#f9fafc", padding: 0}}
            headerStyle={{marginBottom:0}}
            actionContainerStyle={{ gap: 15 }}
            tableStyle={{ fontSize: 12, marginBottom: 0 }}
            columns={[
                { header: "Seri", accessor: "seriBarang",thStyle:{ textAlign: "center" }, tdStyle: { minWidth: 50, textAlign: "center" } },
                { header: "HS", accessor: "posTarif", tdStyle: { minWidth: 100},},
                { header: "Uraian", accessor: "uraian", tdStyle: { minWidth: 200}, },
                { header: "Nilai Barang", accessor: "nilaiBarang", tdStyle: { minWidth: 100},},
                { header: "Jumlah Satuan", accessor: "jumlahSatuan" ,tdStyle: { minWidth: 100} },
                { header: "Kode Satuan", accessor: "kodeSatuan", tdStyle: { minWidth: 100} },
                {
                    header: "Action",
                    accessor: "id",
                    tdStyle: { minWidth: 100 },
                    render: (row, index) => (
                        <div style={{ display: "flex", gap: 6 }}>
                        <Button
                            size="sm"
                            variant="outline-warning"
                            onClick={() => handleEdit(row, index)}
                        >
                            Edit
                        </Button>

                        <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleDelete(index)}
                        >
                            Hapus
                        </Button>
                        </div>
                    ),
                },
            ]}
            data={data}   
            striped={false}
            bordered={false}
            hover={true}
            responsive={true}
            className="custom-table"
        />
        </Card>}
        {showForm && <ModalBarang data={data} setData={setData} setActiveForm={setShowForm} />}
    </div>
  );
};

export default BarangBC23Page;