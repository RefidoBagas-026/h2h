import { useEffect, useState } from "react";
import { masterHsService } from "../../../services/support/MasterHS/MasterHs";
import LoadingOverlay from "../../../components/LoadingOverlay";
import Card from "../../../components/Card";
import CustomTable from "../../../components/TableList";
import { Button } from "react-bootstrap";
import { FaEdit, FaEye, FaPlusCircle, FaTrash } from "react-icons/fa";
import ActionDropdown from "../../../components/ActionDropdown";
import { FaEllipsisVertical } from "react-icons/fa6";
import CustomPagination from "../../../components/CustomPagination";
import SearchBar from "../../../components/SearchBar";
import FloatingNotification from "../../../components/FloatingNotification";

const MasterHSView = () => {
const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [dataForm, setDataForm] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const pageSize = 15;
  const [isViewMode, setIsViewMode] = useState(false);
  const [messageResponse, setMessageResponse] = useState<{ error: string | null , success: string | null } | null>(null);

  const handleEdit = (row: any) => {
    setDataForm({ Id: row.Id, HSNo: row.HSNo, HSRemark: row.HSRemark });
    setModalShow(true);
  }
  const handleView = (row: any) => {
    setDataForm({ Id: row.Id, HSNo: row.HSNo, HSRemark: row.HSRemark });
    setIsViewMode(true);
    setModalShow(true);
  }
  const handleReset = () => {
    setDataForm({});
    setIsViewMode(false);
    setModalShow(false);
  }

  const handleDelete = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      // Lakukan proses delete data menggunakan API
      masterHsService.deleteHS(id)
        .then((response) => {
          if (response.statusCode === 200) {
            setMessageResponse({ success: "Data Master HS berhasil dihapus!", error: null });
            // Refresh data setelah berhasil menghapus
            fetchMasterHS();
          } else {
            setMessageResponse({ success: null, error: "Gagal menghapus data Master HS." });
          }
        })
        .catch(() => {
          setMessageResponse({ success: null, error: "Gagal menghapus data Master HS." });
        });
    }
  };
  const handleSimpan = async () => {
    
    if (dataForm.Id) {
      // Update existing data
      try {
        const response = await masterHsService.putHS(dataForm.Id, dataForm);
        (response.statusCode === 202 || response.statusCode === 200) && setMessageResponse({ success: "Data Master HS berhasil diupdate!", error: null });
        setDataForm({});
        setModalShow(false);
        fetchMasterHS(); // Refresh data setelah update
      } catch (error) {
        setMessageResponse({ success: null, error: "Gagal mengupdate data Master HS." });
      }
    } else {
      // Create new data
      try {
        const response = await masterHsService.postHS(dataForm);
        response.statusCode === 200 && setMessageResponse({ success: "Data Master HS berhasil disimpan!", error: null });
        setDataForm({});
        setModalShow(false);
        fetchMasterHS(); // Refresh data setelah simpan
      } catch (error) {
        setMessageResponse({ success: null, error: "Gagal menyimpan data Master HS." });
      }
    }
  };

  //fetch data master HS dari API
  const [keyword, setKeyword] = useState<string>("");
  const fetchMasterHS = async () => {
    try {
      const response = await masterHsService.getHs(currentPage, pageSize, keyword || undefined); // Contoh: ambil halaman 1 dengan 10 item per halaman
      setData(response.data); 
      setTotalData(response.info.total);// Sesuaikan dengan struktur data yang diterima dari API
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
const totalPages = Math.ceil(totalData / pageSize);
  // Panggil fetchMasterHS saat komponen pertama kali dimuat
  useEffect(() => {
    fetchMasterHS();
  }, [currentPage, keyword]);

  const handleSearchHS = async (keyword: string) => {
      const response = await masterHsService.getHs(1, pageSize, keyword);
      setKeyword(keyword);
      setData(response.data);
      setTotalData(response.info.total);
      setCurrentPage(1); // Reset ke halaman pertama saat melakukan pencarian
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
    
      <LoadingOverlay
        show={isLoading}
        // text="Generating Nomor AJU..."
      />
      {messageResponse?.success && (
        <FloatingNotification
          message={messageResponse.success}
          type="success"
          onClose={() => setMessageResponse(null)}
        />
      )}
      {messageResponse?.error && (
        <FloatingNotification
          message={messageResponse.error}
          type="error"
          onClose={() => setMessageResponse(null)}
        />
      )}
    {modalShow ? (
    <Card
      title={isViewMode ? "View Master HS" : "Tambah Master HS"}
      headerStyle={{ backgroundColor: "#f5f5f5"}}
      bodyStyle={{display:"flex", flexDirection:"row", width:"100%", gap: 16, justifyContent:"center"}}
            headerCustom={(
                <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                    <Button size="sm" variant={isViewMode ? "secondary" : "primary"} style={{ display: "flex", alignItems:"center", justifyContent:"center", gap: 4 , borderRadius: 0, fontSize: 12 }} 
                        onClick={handleSimpan} disabled={isViewMode}>
                        <span style={{paddingTop:1, minWidth:70}}>Simpan</span>                
                    </Button>
                    <Button size="sm" variant="outline-secondary" style={{ display: "flex", alignItems:"center", justifyContent:"center", gap: 4 , borderRadius: 0, fontSize: 12 }} 
                        onClick={handleReset}>
                        <span style={{paddingTop:1, minWidth:70}}>{isViewMode ? "Kembali" : "Batal"}</span>                
                    </Button>
                </div>
            )}
      >
        <Card.Input
          label="Kode HS"
          name="kodeHS"
          value={dataForm.HSNo}
          onChange={(val) => setDataForm({ ...dataForm, HSNo: val })}
          readonly={isViewMode}
          error={!dataForm.HSNo ? "Kode HS wajib diisi" : ""}
        />
        <Card.Textarea
          label="Uraian"
          name="uraian"
          value={dataForm.HSRemark}
          onChange={(val) => setDataForm({ ...dataForm, HSRemark: val.target.value })}
          readonly={isViewMode}
          inputStyle={{height:36}}
          error={!dataForm.HSRemark ? "Uraian wajib diisi" : ""}
          />
    </Card>
    ) : (
    <Card
      title="HS Code List"
      bodyStyle={{padding:0, height: "100%"}}>
    <CustomTable<any>
      title={(
        <>  
         <SearchBar
              style={{ marginBottom: 0 }}
              placeholder="Pencarian..."
              onReset={() => handleSearchHS("")}
              onSearch={handleSearchHS}
              controlStyle={{fontSize:12}}
            />
        </>
      )}
      containerStyle={{ background: "#f9fafc", height: "calc(100vh - 220px)", overflowY: "auto" }}
      titleStyle={{ fontWeight: 500, fontSize: 18 }}
      headerStyle={{ paddingBottom: 10, marginBottom: 0}}
      actionContainerStyle={{ gap: 15 }}
      tableStyle={{ fontSize: 12, marginBottom: 0}}
      striped={false}
      bordered={false}
      responsive={false}
      columns={[
        { header: "Kode HS", accessor: "HSNo" },
        { header: "Uraian", accessor: "HSRemark" },
        { header: "Aksi", accessor: "Id",
          render: (row) => (
            <ActionDropdown
              label={<FaEllipsisVertical />}
              actions={[
                {
                  label: "Edit",
                  icon: <FaEdit />,
                  onClick: () => handleEdit(row),
                  condition: () => row.isUsed === false,
                },
                {
                  label: "View",
                  icon: <FaEye />,
                  onClick: () => handleView(row),
                },
                {
                  label: "Delete",
                  icon: <FaTrash style={{ transform: "rotate(90deg)" }} />,
                  onClick: () => handleDelete(row.Id),
                  condition: () => row.isUsed === false,
                }
               ]}
            />
          ),
        },
      ]}
      data={data}
      headerActions={[
              {
                label: (
                  <>
                    <FaPlusCircle style={{ marginRight: 3 }} />
                    Tambah Master HS
                  </>
                ),
                onClick: () => setModalShow(true),
                variant: "primary",
              },
            ]}
     /> 
     <div style={{ display: "flex", justifyContent: "center", gap: 6, margin: "16px 0" }}>
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={(p) => setCurrentPage(p)}
      />
      </div>
    </Card>
    )}
  </div>
  
  );
}
export default MasterHSView;
