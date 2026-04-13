import { FaCheckSquare, FaRegCheckSquare } from "react-icons/fa";
import CustomTable from "../../../../../components/TableList";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ListDokumen } from "../../../../../services/loader/ListDokumen";
import moment from "moment";

export const ModalDokumenLartas = ({data, setData, dataDokumen, sethideModal }: any) => {
    const handleSaveSelectedDokumen = () => {
        const selected = mappedData.filter((item) => item.IsSelected);
        setData((prev: any) => ({
            ...prev,
            barangDokumen: selected.map((item) => ({
            seriDokumen: item.seriDokumen,
            })),
        }));
        setMappedData([]);//reset mapped data
        sethideModal(false);
        };

    const toggleDokumenSelection = (seriDokumen: string) => {
    setMappedData((prev) =>
        prev.map((item) =>
        item.seriDokumen === seriDokumen
            ? { ...item, IsSelected: !item.IsSelected }
            : item
        )
    );
    };
    const [mappedData, setMappedData] = useState<any[]>([]);
    const getNamaDokumen = (kode: string) => {
            const dokumen = ListDokumen.find((item) => item.key === kode);
            return dokumen ? `${dokumen.key} - ${dokumen.value}` : "";
        };
    useEffect(() => {
    if (!dataDokumen) return;

    const mapped = dataDokumen.map((item: any) => ({
        ...item,
        IsSelected:
        data?.barangDokumen?.some(
            (d: any) => d.seriDokumen === item.seriDokumen
        ) || false,
    }));

    setMappedData(mapped);
    }, [dataDokumen, data?.barangDokumen]);
    return (
        <div style={{ marginTop: 16 }}>
            <CustomTable
                title="Dokumen Lartas"
                titleStyle={{fontWeight:500, fontSize:18}}
                containerStyle={{ background: "#f9fafc", height: "300px" }}
                columns={[
                    { header: "", accessor: "IsSelected", //ceklist atau icon lain
                        render: (row) => (
                            <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                cursor: "pointer",
                            }}
                            onClick={() => toggleDokumenSelection(row.seriDokumen)}
                            >
                            {row.IsSelected ? (
                                <FaCheckSquare color="green" />
                            ) : (
                                <FaRegCheckSquare color="gray" />
                            )}
                            </div>
                        ),
                    },
                    { header: "Seri", accessor: "seriDokumen",thStyle:{ textAlign: "center" }, tdStyle: { minWidth: 50, textAlign: "center" } },
                    { header: "Jenis", accessor: "kodeDokumen", tdStyle: { minWidth: 100}, render: (row) => getNamaDokumen(row.kodeDokumen) },
                    { header: "Nomor", accessor: "nomorDokumen", tdStyle: { minWidth: 100}, },
                    { header: "Tanggal", accessor: "tanggalDokumen", tdStyle: { minWidth: 100}, render: (row) => row.tanggalDokumen ? moment(row.tanggalDokumen).format("DD MMM YYYY") : "" },
                    { header: "", accessor: "id"},
                ]}
                data={mappedData ?? []}
                striped={false}
                bordered={false}
                hover={true}
            />
            <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 8 }}>
                <Button style={{borderRadius:0, width: 100}}  size="sm" variant="primary"  onClick={handleSaveSelectedDokumen}>Simpan</Button>
                <Button style={{borderRadius:0, width: 100}}  size="sm" variant="outline-secondary" onClick={() => sethideModal(false)}>Batal</Button>
            </div>
            
        </div>
    )
};

export default ModalDokumenLartas;