// Floating notification component
import{ useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import CustomTable from "../../../../../components/TableList";
import { useNavigate } from "react-router-dom";
import { FaCopy, FaEdit, FaEye, FaPlusCircle, FaPrint, FaSave, FaSync, FaTrash, FaUpload } from "react-icons/fa";
import { bc23Service } from "../../../../../services/support/TPB/BC23/AccessBC23";
import { useLocation } from "react-router-dom";
import LoadingOverlay from "../../../../../components/LoadingOverlay";
import Card from "../../../../../components/Card";
import { FaEllipsisVertical } from "react-icons/fa6";
import ActionDropdown from "../../../../../components/ActionDropdown";
import CustomPagination from "../../../../../components/CustomPagination";
import { ceisaService } from "../../../../../services/support/Ceisa/AccessCeisa";

const BASE_ROUTE = "/dashboard/tpb/bc23";

interface BC23Item {
  id: string;
  nomorAju: string;
  tanggalAju: string;
  nomorDaftar: string;
  tanggalDaftar: string;
  namaPenerima: string;
  status: string;
  postedBy: string;
  isBCTemps?: string;
}
interface ViewModelPush {
  Id: number;
  nomorAju: string;
  kodeDokumen: string;
  tanggalAju: string;
  nomorDaftar: string | null;
  tanggalDaftar: string | null;
  namaPenerima: string;
  isPosted: boolean;
  postedBy: string;
  CreatedDate: string;
  tanggalDatang: string;
  isBCTemps: boolean;
}


import { Modal } from "react-bootstrap";
import moment from "moment";
import FloatingNotification from "../../../../../components/FloatingNotification";
import SearchBar from "../../../../../components/SearchBar";

const BC23View = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<BC23Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [syncData, setSyncData] = useState<{ id: string; nomorDaftar: string; tanggalDaftar: string; nomorAju: string } | null>(null);
  const [messageResponse, setMessageResponse] = useState<{ error: string | null , success: string | null } | null>(null);
  const [dataChanged, setDataChanged] = useState(false);
  const [keyword, setKeyword] = useState<string>("");
  const location = useLocation();
  useEffect(() => {
  if (location.state?.success) {
    setMessageResponse({
      success: location.state.success,
      error: null
    });
  }

  if (location.state?.error) {
    setMessageResponse({
      success: null,
      error: location.state.error
    });
  }
}, [location.state]);

  const mapData = (items: any[]): BC23Item[] => {
  return items.map((item) => ({
    id: item.Id?.toString() ?? "",
    nomorAju: item.nomorAju ?? "",
    tanggalAju: item.tanggalAju ?? "",
    nomorDaftar: item.nomorDaftar ?? "-",
    tanggalDaftar: item.tanggalDaftar ?? "-",
    namaPenerima: item.namaPenerima ?? "",
    status: item.isPosted ? "Sudah Posting" : "Belum Posting",
    postedBy: item.postedBy ?? "",
    isBCTemps: item.isBCTemps ? "Sudah" : "Belum",
  }));
};
  const pageSize = 15;

const printBC23 = async (id: number) => {
  setIsLoading(true);
  try {
    const result = await bc23Service.getById(id);
    const nomorAju = result.data.nomorAju;
    await ceisaService.printExcelTPB(nomorAju).then(() => {
      setMessageResponse({ error: null, success: "BC 2.3 berhasil diunduh!" });
    });
  } catch (error) {
    console.error("Error printing BC 2.3:", error);
    setMessageResponse({ error: "Gagal mencetak BC 2.3", success: null });
  } finally {
    setIsLoading(false);
  }
};

const handleDelete = async (id: number) => {
  if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) {
    return;
  }
  setIsLoading(true);
  try {
    await bc23Service.deleteTPB(id).then(() => {
      navigate(`${BASE_ROUTE}`, { state: { refresh: true, success: "Data BC 2.3 berhasil dihapus!" } });
    });
    // setMessageResponse({ error: null, success: "Data berhasil dihapus!" });
    // setDataChanged(prev => !prev); // trigger fetch data
  } catch (error) {
    console.error("Error deleting BC 2.3:", error);
    setMessageResponse({ error: error instanceof Error ? error.message : "Gagal menghapus data", success: null });
  }
  finally {
    setIsLoading(false);
  }
};
const GetTPB23ById = async (id: number, route: string) => {
  setIsLoading(true);
  try {
    const result = await bc23Service.getById(id);
    navigate(`${BASE_ROUTE}/${route}`, { state: { data: result.data } });
  } catch (error) {
    console.error("Error fetching BC 2.3 data:", error);
  } finally {
    setIsLoading(false);
  }
};
const handleSyncCeisa = async (row: BC23Item) => {
  try {
    setIsLoading(true);
    
    const response = await ceisaService.getBCTPB(Number(row.id));
    const dataResult = response.data;

    if (!dataResult) {
      alert("Data tidak ditemukan di Ceisa");
      return;
    }
    
    setSyncData({
      id: row.id,
      nomorDaftar: dataResult.nomorDaftar ?? row.nomorDaftar,
      tanggalDaftar: dataResult.tanggalDaftar ?? row.tanggalDaftar,
      nomorAju: row.nomorAju,
    });

    setShowSyncModal(true);

    await bc23Service.updateNoDaftar(Number(row.id), {
      nomorAju: row.nomorAju,
      nomorDaftar: dataResult.nomorDaftar,
      tanggalDaftar: dataResult.tanggalDaftar,
    }).then(() => {
      setMessageResponse({ error: null, success: "Sinkronisasi dengan Ceisa berhasil! Nomor daftar dan tanggal daftar telah diperbarui." });
      setDataChanged(prev => !prev); // trigger fetch data
    });
  } catch (error: any) {
    console.error("Error during Ceisa synchronization:", error);
    const message =
      error?.message ||
      "Terjadi kesalahan saat sinkronisasi dengan Ceisa";
    setMessageResponse({ error: message, success: null });
  }finally {
    setIsLoading(false);
  }
};

const [dataPostSupport, setDataPostSupport] = useState<ViewModelPush | null>(null);
const [showPostSupportModal, setShowPostSupportModal] = useState(false);
const openPostSupportModal = (row: BC23Item) => {
  setDataPostSupport({
    Id: Number(row.id),
    nomorAju: row.nomorAju,
    kodeDokumen: "",
    tanggalAju: row.tanggalAju,
    nomorDaftar: row.nomorDaftar === "-" ? null : row.nomorDaftar,
    tanggalDaftar: row.tanggalDaftar === "-" ? null : row.tanggalDaftar,
    namaPenerima: row.namaPenerima,
    isPosted: row.status === "Sudah Posting",
    postedBy: row.postedBy,
    CreatedDate: new Date().toISOString(),
    tanggalDatang: "",
    isBCTemps: row.isBCTemps === "Sudah",
  });
  setShowPostSupportModal(true);
};
const handlePushSupport = async () => {
  if (!dataPostSupport || !dataPostSupport.tanggalDatang) {
    setMessageResponse({ error: "Tanggal Datang wajib diisi!", success: null });
    return;
  }
  setIsLoading(true);
  try {
    await bc23Service.postingBCTemps(Number(dataPostSupport.Id), dataPostSupport);
    setMessageResponse({ error: null, success: "Data berhasil diposting ke support TPB!" });
    setShowPostSupportModal(false);
    setDataChanged(prev => !prev); // trigger fetch data
  } catch (error) {
    setMessageResponse({ error: error instanceof Error ? error.message : "Gagal memposting data ke support TPB", success: null });
  } finally {
    setIsLoading(false);
  }
};

const handleCloseModal = () => {
  setShowSyncModal(false);
  setShowPostSupportModal(false);
};
const handleSearchTPB = async (keyword: string) => {
  const result = await bc23Service.getTPB(1, pageSize, keyword);
  setKeyword(keyword);
  setTotalData(result.info.total);
  setData(mapData(result.data));
  setCurrentPage(1);
};
const totalPages = Math.ceil(totalData / pageSize);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await bc23Service.getTPB(currentPage, pageSize, keyword || undefined);
        setTotalData(result.info.total);
        setData(mapData(result.data));
      } catch (err) {
        setMessageResponse({ error: "Gagal memuat data.", success: null });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage, dataChanged, keyword]);

  return (
    <div style={{ position: "relative"}}>

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
      
      <Modal show={showPostSupportModal} style={{top:60, borderRadius:0}} onHide={handleCloseModal} contentClassName="no-radius-modal">
        <Modal.Body style={{ fontSize: 12, gap: 5, display: "flex", flexDirection: "column", borderRadius:0 }}>
          <Card title="Input Tanggal Datang" bodyStyle={{ display: "flex", flexDirection: "column", gap: 10, borderRadius:0 }}>
            <Card.DatePicker
              label="Tanggal Datang"
              name="tanggalDatang"
              value={dataPostSupport?.tanggalDatang || ""}
              onChange={(val) => {
                setDataPostSupport(dataPostSupport ? { ...dataPostSupport, tanggalDatang: val ? moment(val).format("YYYY-MM-DD") : "" } : null);
              }}
              error={!dataPostSupport?.tanggalDatang ? "Tanggal Datang wajib diisi" : ""}
              readonly={false}
            />
          </Card>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "center", gap: 5 }}>
          <Button variant="secondary" style={{fontSize:12, borderRadius:0}} onClick={handleCloseModal}>Batal</Button>
          <Button variant="primary" style={{fontSize:12, borderRadius:0}} onClick={handlePushSupport}>Simpan</Button>
        </Modal.Footer>
      </Modal>
      <style>
        {`
          .no-radius-modal {
            border-radius: 0 !important;
          }
        `}
      </style>
      <Modal show={showSyncModal} style={{top:60, borderRadius:0}} onHide={handleCloseModal} contentClassName="no-radius-modal">
        <Modal.Body style={{ fontSize: 12, gap: 5, display: "flex", flexDirection: "column", borderRadius:0 }}> 
          <div>
            <table>
              <tbody>
              <tr>
                <td style={{ fontWeight: "bold", paddingRight: 10 }}>ID</td>
                <td>: {syncData?.id}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", paddingRight: 10 }}>Nomor Daftar</td>
                <td>: {syncData?.nomorDaftar}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", paddingRight: 10 }}>Tanggal Daftar</td>
                <td>: {syncData?.tanggalDaftar}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", paddingRight: 10 }}>Nomor AJU</td>
                <td>: {syncData?.nomorAju}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "center", gap: 5 }}>
          <Button variant="primary" style={{fontSize:12,  borderRadius:0}} onClick={handleCloseModal} >Kembali</Button>
        </Modal.Footer>
      </Modal>
    <Card
      title="BC 2.3 List"
      titleStyle={{ fontWeight: 500, fontSize: 24 }}
      bodyStyle={{padding:0, height: "100%"}}
      >
    <CustomTable<BC23Item>
      title={(
        <>  
         <SearchBar
              style={{ marginBottom: 0 }}
              placeholder="Pencarian..."
              onReset={() => handleSearchTPB("")}
              onSearch={handleSearchTPB}
              controlStyle={{fontSize:12}}
            />
        </>
      )}
      containerStyle={{ background: "#f9fafc", height: "calc(100vh - 220px)" }}
      
      headerStyle={{ paddingBottom: 10, marginBottom: 0}}
      actionContainerStyle={{ gap: 15 }}
      tableStyle={{ fontSize: 12, marginBottom: 0}}
      striped={false}
      bordered={false}
      responsive={false}
      columns={[
        { header: "Nomor Aju", accessor: "nomorAju" },
        { header: "Tanggal Aju", accessor: "tanggalAju" },
        { header: "Nomor Daftar", accessor: "nomorDaftar" },
        { header: "Tanggal Daftar", accessor: "tanggalDaftar" },
        { header: "Supplier", accessor: "namaPenerima" },
        { header: "Status", accessor: "status" },
        { header: "Status Inventory", accessor: "isBCTemps" },
        { header: "Petugas", accessor: "postedBy" },
        {
          header: "Action",
          accessor: "id",
          tdStyle: { textAlign: "left" },
          render: (row) => (
            <ActionDropdown
              label={<FaEllipsisVertical />}
              actions={[
                {
                  label: "Edit",
                  icon: <FaEdit />,
                  onClick: () => GetTPB23ById(Number(row.id), "edit"),
                  condition: () => row.status === "Belum Posting" && row.isBCTemps === "Belum" && row.nomorDaftar === "-",
                },
                {
                  label: "View",
                  icon: <FaEye />,
                  onClick: () => GetTPB23ById(Number(row.id), "view"),
                },
                {
                  label: "Copy",
                  icon: <FaCopy />,
                  onClick: () => GetTPB23ById(Number(row.id), "copy"),
                },
                {label: "Posting", icon: <FaSave />, onClick: () => GetTPB23ById(Number(row.id), "view/posting"), condition: () => row.status === "Belum Posting"},
                {label: "Sync Ceisa", icon: <FaSync />, onClick: () => handleSyncCeisa(row), condition: () => row.nomorDaftar === "-" && row.status === "Sudah Posting" && row.isBCTemps === "Belum"},
                {label: "Support", icon: <FaUpload />, onClick: () => openPostSupportModal(row), condition: () => row.nomorDaftar !== "-" && row.status === "Sudah Posting" && row.isBCTemps === "Belum" },
                {label: "Excel", icon: <FaPrint />, onClick: () => printBC23(Number(row.id))},
                {label: "Delete", icon: <FaTrash />, onClick: () => handleDelete(Number(row.id)), condition: () => row.isBCTemps === "Belum" && row.nomorDaftar === "-" && row.status === "Belum Posting"},
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
              Dokumen Baru
            </>
          ),
          onClick: () => navigate(`${BASE_ROUTE}/create`),
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
    
    </div>
    
  );

};

export default BC23View;