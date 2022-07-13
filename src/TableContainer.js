import React, { useState, useEffect } from "react";
import "./table.scss";
import data from "./data/db.json";
import monthsList from "./data/months.json";
import Table from "react-bootstrap/Table";

const TableContainer = () => {
  const [months, setMonths] = useState(monthsList);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/db")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  
  return (
    <div className="container">
      {!loading ? (
        <Table responsive bordered size="md">
          <thead>
            <tr>
              <th>Month</th>
              {months &&
                months.map((month, index) => (
                  <th key={`month-${index}`}>{month}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              Object.keys(data).map((value, index) => (
                <tr key={`table-row-${index}`}>
                  <td>{value}</td>
                  {data[value].map((item, idx) => {
                    return <td key={`row-${index}-amount-${idx}`}>{item}</td>;
                  })}
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <div className="loader-list">
          <div>
            <div className="loader-1 center">
              <span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableContainer;
