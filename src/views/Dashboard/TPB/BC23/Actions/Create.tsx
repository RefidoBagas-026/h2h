import React from "react";
import Header from "../../BC23/Tabs/Header";
import Entitas from "../../BC23/Tabs/Entitas";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from "react-bootstrap";

const BC23CreateView = () => {
    const [data, setData] = React.useState({
        npwp: "123456789012345",
        nama: "PT. Contoh Importir",
        alamat: "Jl. Contoh Alamat No. 123, Jakarta",
        telepon: "021-1234567",
        tanggalBerdiri: new Date("2010-01-01"),
        negara: "ID",
        kantorPelabuhanBongkar: "Tanjung Priok",
        kantorPabeanPengawas: "Tanjung Priok",
        tujuan: "ppn"
    });
  return (
    <Form style={{ display: "flex", flexDirection: "column"}}>
      <Tabs defaultActiveKey="header" id="bc23-tabs" className="mb-3" fill variant="tabs" style={{ marginBottom: 16 }}>
        <Tab eventKey="header" title="Header">
          <Header />
        </Tab>
        <Tab eventKey="entitas" title="Entitas">
          <Entitas data={data} />
        </Tab>
      </Tabs>
    </Form>
  );
};

export default BC23CreateView;
