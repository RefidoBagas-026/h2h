import { FaCircleExclamation } from "react-icons/fa6";
import Card from "../../../../../components/Card";
import { Button } from "react-bootstrap";
import CustomTable from "../../../../../components/TableList";
import { FaPlusCircle } from "react-icons/fa";
import { useState } from "react";
import type { Barang } from "../../../../../models/BC23Model/BC23.types";
import { createInitialBarang } from "../../../../../models/BC23Model/DataModel/BarangModels";
import { ListKategoriBarang } from "../../../../../services/loader/ListKategoriBarang";
import { ListNegara } from "../../../../../services/loader/ListNegara";
import { ListJenisKemasan } from "../../../../../services/loader/ListJenisKemasan";
import { ListSatuanBarang } from "../../../../../services/loader/ListSatuanBarang";

export const ModalBarang = ({data, setData, setActiveForm}: any) => {
    const [barang, setBarang] = useState<Barang>(createInitialBarang());
    const [showForm, setShowForm] = useState(false);
    const handleEditDokumen = (field: string, value: any) => {

    }
    const generateSeri = () => {
        if (!data || data.length === 0) return "1";
        const maxSeri = Math.max(...data.map((item: any) => parseInt(item.seriBarang)));
        return (maxSeri + 1).toString();
    }
    const handleSimpan = () => {
      if (!barang.kodeBarang || !barang.uraian || 
          !barang.jumlahSatuan || !barang.kodeSatuanBarang) {
        alert("Lengkapi data terlebih dahulu");
        return;
      }

      setData((prev: any) => ({
        ...prev,
        barang: [...(prev.barang || []), barang],
      }));

      setBarang(createInitialBarang()); // reset otomatis
      setActiveForm(null);
    };
    const updateBarang = (field: string, value: any) => {
        setBarang((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    }
    const pushUraianHS = () => {
        const generatedUraian = `Generated Uraian for ${barang.kodeBarang}`;
        updateBarang("uraian", generatedUraian);
    }
    console.log("Data Barang Modal:", barang);
  return (
    <div>
        <Card
          title="Tambah Barang"
          headerStyle={{ backgroundColor: "#f5f5f5"}}
          headerCustom={(
            <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                <Button size="sm" variant="primary" style={{ display: "flex", alignItems:"center", justifyContent:"center", gap: 4 , borderRadius: 0, fontSize: 12 }} 
                    onClick={() => { handleSimpan(); setActiveForm(false); }}>
                    <span style={{paddingTop:1, minWidth:70}}>Simpan</span>                
                </Button>
                <Button size="sm" variant="outline-secondary" style={{ display: "flex", alignItems:"center", justifyContent:"center", gap: 4 , borderRadius: 0, fontSize: 12 }} 
                onClick={() => {setActiveForm(false);}}> 
                    <span style={{paddingTop:1, minWidth:70}}>Batal</span>                
                </Button>
            </div>
          )}
        >
        <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
          <Card
            title="Jenis"
            headerStyle={{ backgroundColor: "#f5f5f5"}} 
          >
            <Card.Input
              label="Seri"
              name="seriBarang"
              value={barang.seriBarang || generateSeri()}
              onChange={(val) => updateBarang("seriBarang", val)}
              error={!barang.seriBarang ? "Seri wajib diisi" : ""}
              readonly={true}
            />
            <Card.Select
              label="HS"
              name="posTarif"
              value={barang.posTarif}
              onChange={(val) => updateBarang("posTarif", val)}
              error={!barang.posTarif ? "HS wajib diisi" : ""}
              list={[]} // ganti dengan list kode barang yang valid
              readonly={false}
            />
            <div style={{ display: "flex", flexDirection: "column", fontWeight: 500, fontSize: 12, gap: 4, marginBottom: 8}}>
              <span>Lartas</span>
              <div style={{ display: "flex", flexDirection: "row", fontWeight: 500, fontSize: 12, padding: 12, backgroundColor: "#fff7db", alignItems: "center", gap: 6}}>
                <FaCircleExclamation style={{color:"orange"}}/> <span style={{color:"black"}}>HS Terkena Lartas</span>
              </div>
            </div>

            <Card.Input
              label="Kode"
              name="kodeBarang"
              value={barang.kodeBarang}
              onChange={(val) => updateBarang("kodeBarang", val)}
              error={!barang.kodeBarang ? "Kode Barang wajib diisi" : ""}
              readonly={false}
            />

            <Card.Textarea
              label={
                <>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
                  Uraian
                  <Button size="sm" variant="primary" style={{ display: "flex", alignItems:"center", justifyContent:"center", gap: 4 , borderRadius: 0, fontSize: 12 }} 
                    onClick={() => {
                      pushUraianHS();
                    }}>
                    <span style={{paddingTop:1, minWidth:70}}>Sesuai HS</span>
                  </Button>
                  </div>
                </>
              }
              name="uraian"
              value={barang.uraian}
              onChange={(val) => updateBarang("uraian", val)}
              error={!barang.uraian ? "Uraian wajib diisi" : ""}
              readonly={false}
            />
            
            <Card.Input
              label="Merk"
              name="merk"
              value={barang.merk}
              onChange={(val) => updateBarang("merk", val)}
              error={!barang.merk ? "Merk wajib diisi" : ""}
              readonly={false}
            />

            <Card.Input
              label="Tipe"
              name="tipe"
              value={barang.tipe}
              onChange={(val) => updateBarang("tipe", val)}
              error={!barang.tipe ? "Tipe wajib diisi" : ""}
              readonly={false}
            />
            <Card.Input
              label="Ukuran"
              name="ukuran"
              value={barang.ukuran}
              onChange={(val) => updateBarang("ukuran", val)}
              error={!barang.ukuran ? "Ukuran wajib diisi" : ""}
              readonly={false}
            />

            <Card.Input
              label="Spesifikasi Lain"
              name="spesifikasiLain"
              value={barang.spesifikasiLain}
              onChange={(val) => updateBarang("spesifikasiLain", val)}
              error={!barang.spesifikasiLain ? "Spesifikasi Lain wajib diisi" : ""}
              readonly={false}
            />
          </Card>

          <Card 
              title=""
              bodyStyle={{ display: "flex", flexDirection:"column", padding: 0, gap: 10, justifyContent:"space-between", height:"100%"}}
              style={{backgroundColor:"transparent", border:"none", boxShadow:"none"}}      
              >
              <Card 
                  title="Keterangan Lainnya"
                  style={{height:"100%"}}
              >
                  <Card.Select
                      label="Kategori Barang"
                      name="kodeKategoriBarang"
                      value={barang.kodeKategoriBarang}
                      onChange={(val) => {updateBarang("kodeKategoriBarang", val),
                        updateBarang("kodeDokumen", ListKategoriBarang.find(item => item.kodeKategoriBarang === val)?.kodeDokumen)
                      }}
                      error={!barang.kodeKategoriBarang ? "Kategori Barang wajib diisi" : ""}
                      list={ListKategoriBarang.map(item => ({ value: item.kodeKategoriBarang, label: `${item.kodeKategoriBarang} - ${item.uraian}` }))} // ganti dengan list kode kategori yang valid
                      readonly={false}
                  />
                  <Card.Select
                      label="Negara"
                      name="kodeNegaraAsal"
                      value={barang.kodeNegaraAsal}
                      onChange={(val) => updateBarang("kodeNegaraAsal", val)}
                      error={!barang.kodeNegaraAsal ? "Kode Negara wajib diisi" : ""}
                      list={ListNegara.map(item => ({ value: item.value, label: `${item.value} - ${item.label}` }))} // ganti dengan list kode negara yang valid
                      readonly={false} 
                  />
              </Card>
              <Card
                  title="Harga"
                  style={{ height:"100%"}}
                  >
                    <Card.Numeric
                        label="Harga"
                        name="cif"
                        value={barang.cif}
                        onChange={(val) => updateBarang("cif", val)}
                        readonly={false}
                        error={barang.cif <= 0 ? "Harga harus lebih dari 0" : ""}
                    />
                    <Card.Numeric
                        label="Biaya Tambahan"
                        name="hargaPenyerahan"
                        value={barang.hargaPenyerahan}
                        onChange={(val) => updateBarang("hargaPenyerahan", val)}
                        readonly={true}
                    />
                    <Card.Numeric
                        label="FOB"
                        name="fob"
                        value={barang.fob}
                        onChange={(val) => updateBarang("fob", val)}
                        readonly={true}
                    />
                    <Card.Numeric
                        label="Harga Satuan"
                        name="hargaSatuan"
                        value={barang.hargaSatuan}
                        onChange={(val) => updateBarang("hargaSatuan", val)}
                        readonly={true}
                    />
                    <Card.Numeric
                        label="Freight"
                        name="freight"
                        value={barang.freight}
                        onChange={(val) => updateBarang("freight", val)}
                        readonly={true}
                    />
                    <Card.Numeric
                        label="Asuransi"
                        name="asuransi"
                        value={barang.asuransi}
                        onChange={(val) => updateBarang("asuransi", val)}
                        readonly={true}
                    />
                    <Card.Numeric
                        label="Nilai CIF"
                        name="cifRupiah"
                        value={barang.cifRupiah}
                        onChange={(val) => updateBarang("cifRupiah", val)}
                        readonly={true}
                    />
                    <Card.Numeric
                        label="Nilai Pabean"
                        name="nilaiBarang"
                        value={barang.nilaiBarang}
                        onChange={(val) => updateBarang("nilaiBarang", val)}
                        readonly={true}
                    />
              </Card>
          </Card>
          <Card 
              title=""
              bodyStyle={{ display: "flex", flexDirection:"column", padding: 0, gap: 10, justifyContent:"space-between", height:"100%"}}
              style={{backgroundColor:"transparent", border:"none", boxShadow:"none"}}      
              >
              <Card 
                  title="Jumlah & Berat"
                  style={{height:"100%"}}
              >
                <div style={{display:"flex", flexDirection:"row", gap: 8}}>
                  <Card.Numeric
                      label="Satuan"
                      name="jumlahSatuan"
                      value={barang.jumlahSatuan}
                      onChange={(val) => updateBarang("jumlahSatuan", val)}
                      readonly={false}
                      error={barang.jumlahSatuan <= 0 ? "Jumlah Satuan harus lebih dari 0" : ""}
                  />
                  <Card.Select
                      label={"\u00A0"}
                      name="kodeSatuanBarang"
                      value={barang.kodeSatuanBarang}
                      onChange={(val) => updateBarang("kodeSatuanBarang", val)}
                      error={!barang.kodeSatuanBarang ? "Kode Satuan wajib diisi" : ""}
                      list={ListSatuanBarang.map((item) => ({ label: `${item.tableKey} - ${item.tableValue}`, value: item.tableKey }))} // ganti dengan list kode satuan yang valid
                      readonly={false}
                  />
                </div>
                <div style={{display:"flex", flexDirection:"row", gap: 8}}>
                  <Card.Numeric
                      label="Kemasan"
                      name="jumlahKemasan"
                      value={barang.jumlahKemasan}
                      onChange={(val) => updateBarang("jumlahKemasan", val)}
                      readonly={false}
                      error={barang.jumlahKemasan <= 0 ? "Jumlah Kemasan harus lebih dari 0" : ""}
                  />
                  <Card.Select
                      label={"\u00A0"}
                      name="kodeJenisKemasan"
                      value={barang.kodeJenisKemasan}
                      onChange={(val) => updateBarang("kodeJenisKemasan", val)}
                      error={!barang.kodeJenisKemasan ? "Kode Jenis Kemasan wajib diisi" : ""}
                      list={ListJenisKemasan.map((item) => ({ label: `${item.value} - ${item.label}`, value: item.value }))} // ganti dengan list kode jenis kemasan yang valid
                      readonly={false}
                  />
                </div>
                  <Card.Numeric
                      label="Berat Bersih (KG)"
                      name="netto"
                      value={barang.netto}
                      onChange={(val) => updateBarang("netto", val)}
                      readonly={false}
                      error={barang.netto <= 0 ? "Berat Bersih harus lebih dari 0" : ""}
                  />
              </Card>
              <Card
                  title="Dokumen Fasilitas/Lartas"
                  style={{ height:"100%"}}
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
                      { header: "Seri", accessor: "seriDokumen",thStyle:{ textAlign: "center" }, tdStyle: { minWidth: 50, textAlign: "center" } },
                      { header: "Jenis", accessor: "nomorDokumen", tdStyle: { minWidth: 100}, },
                      { header: "Nomor", accessor: "fasilitasDokumen" ,tdStyle: { minWidth: 100} },
                      { header: "Izin", accessor: "izinDokumen", tdStyle: { minWidth: 100} },
                      { header: "Kantor", accessor: "kantorDokumen", tdStyle: { minWidth: 100} },
                      { header: "File", accessor: "fileDokumen", tdStyle: { minWidth: 100} },
                      {
                          header: "Action",
                          accessor: "id",
                          tdStyle: { minWidth: 100 },
                          // render: (row, index) => (
                          //     <div style={{ display: "flex", gap: 6 }}>
                          //     <Button
                          //         size="sm"
                          //         variant="outline-warning"
                          //         onClick={() => handleEditDokumen(row, index)}
                          //     >
                          //         Edit
                          //     </Button>

                          //     <Button
                          //         size="sm"
                          //         variant="outline-danger"
                          //         onClick={() => handleDeleteDokumen(index)}
                          //         // onClick={() => handleDelete(index)}
                          //     >
                          //         Hapus
                          //     </Button>
                          //     </div>
                          // ),
                      },
                  ]}
                  data={data}   
                  striped={false}
                  bordered={false}
                  hover={true}
                  responsive={true}
                  className="custom-table"
              />
              </Card>
          </Card>
        </div>
      </Card>
      <Card
        title="Keterangan Tambahan"
        headerStyle={{ backgroundColor: "#f5f5f5"}} headerCustom={(
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
                      { header: "Seri", accessor: "seriDokumen",thStyle:{ textAlign: "center" }, tdStyle: { minWidth: 50, textAlign: "center" } },
                      { header: "Nomor", accessor: "nomorDokumen", tdStyle: { minWidth: 100}, },
                      { header: "Fasilitas", accessor: "fasilitasDokumen" ,tdStyle: { minWidth: 100} },
                      { header: "Izin", accessor: "izinDokumen", tdStyle: { minWidth: 100} },
                      { header: "Kantor", accessor: "kantorDokumen", tdStyle: { minWidth: 100} },
                      { header: "File", accessor: "fileDokumen", tdStyle: { minWidth: 100} },
                      {
                          header: "Action",
                          accessor: "id",
                          tdStyle: { minWidth: 100 },
                          // render: (row, index) => (
                          //     <div style={{ display: "flex", gap: 6 }}>
                          //     <Button
                          //         size="sm"
                          //         variant="outline-warning"
                          //         onClick={() => handleEditDokumen(row, index)}
                          //     >
                          //         Edit
                          //     </Button>

                          //     <Button
                          //         size="sm"
                          //         variant="outline-danger"
                          //         onClick={() => handleDeleteDokumen(index)}
                          //         // onClick={() => handleDelete(index)}
                          //     >
                          //         Hapus
                          //     </Button>
                          //     </div>
                          // ),
                      },
                  ]}
                  data={data}   
                  striped={false}
                  bordered={false}
                  hover={true}
                  responsive={true}
                  className="custom-table"
              />
      </Card>
      <Card
        title="Catatan"
        headerStyle={{ backgroundColor: "#f5f5f5"}}
      >
        <Card.Textarea
          label="Catatan"
          name="catatan"
          value={data.catatan}
          onChange={(val) => setData((prev: any) => ({ ...prev, catatan: val }))}
          error={""}
          readonly={false}
        />
      </Card>
    </div>
  );
}