import React, { useState, useEffect } from "react";
import "./table.scss";
import data from "./data/db.json";
import monthsList from "./data/months.json";

const Table = () => {
  const [months, setMonths] = useState(monthsList);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/db")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      {!loading ? (
        <div className="table">
          <div className="months-box">
            <h5 className="fixed-width">Month</h5>
            {months.map((month) => (
              <div className="month fixed-width">
                <h5>{month}</h5>
              </div>
            ))}
          </div>
          <div className="table-info">
            {Object.keys(data).map((value) => (
              <div className="table-row">
                <div className="value fixed-width">
                  <h5>{value}</h5>
                </div>
                <div className="amount-box">
                  {data[value].map((item, index) => {
                    return <h5 className="amount fixed-width">{item}</h5>;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Table;
