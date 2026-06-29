import { useEffect, useMemo, useState } from "react";
import fedData from "../fedData.json"
import { jsonConversion} from "../utils/normalizedData";
import DataTable from "./DataTable";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    setData(jsonConversion(fedData));
  }, []);

 

  const filteredData = useMemo(() => {
    const searchData= data.filter((item) =>
      item.source.toLowerCase().includes(search.toLowerCase())
    );
    return searchData
  }, [data, search]);

    useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => [...prev]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);



  return (
    <div className="dashboard">
      <h1>Fed-Watch Dashboard</h1>
      <div className="toolbar">
        <input
          type="text"
          placeholder="Search Source..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label className="toggle">
          <input
            type="checkbox"
            checked={highlight}
            onChange={() => setHighlight(!highlight)}
          /> 
          Highlight Inflation >5%
        </label>
      </div>

      <DataTable
        data={filteredData}
        highlight={highlight}
      />

    </div>
  );
};

export default Dashboard;