import { Button } from "react-bootstrap";
import CustomTable from "../../../../../components/TableList";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
interface BC23Item {
  id: number;
  nomorAju: string;
  tanggal: string;
  kantor: string;
}

const sampleData: BC23Item[] = [
  {
    id: 1,
    nomorAju: "0001",
    tanggal: "2026-02-23",
    kantor: "050100",
  },
  {
    id: 2,
    nomorAju: "0002",
    tanggal: "2026-02-24",
    kantor: "050200",
  },
];
const BASE_ROUTE = "/dashboard/tpb/bc23";
const BC23View = () => {
    const navigate = useNavigate();
  return (
    <CustomTable
    title="List BC 2.3"
    containerStyle={{ background: "#f9fafc" }}
    titleStyle={{ fontWeight: 500, fontSize: 18 }}
    headerStyle={{ borderBottom: "1px solid #eee", paddingBottom: 10 }}
    actionContainerStyle={{ gap: 15 }}
    tableStyle={{ fontSize: 12 }}
    striped={false}
    bordered={false}
    columns={[
        {
        header: "Nomor Aju",
        accessor: "nomorAju",
        thStyle: { background: "#f1f3f5" },
        },
        {
        header: "Tanggal",
        accessor: "tanggal",
        thStyle: { background: "#f1f3f5" },
        },
        {
        header: "Action",
        accessor: "id",
        thStyle: { background: "#f1f3f5" },
        render: (row) => (
            <Button size="sm" variant="outline-primary">
            Detail
            </Button>
        ),
        },
    ]}
    data={sampleData}
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
  );
};

export default BC23View;