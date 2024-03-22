import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { REACT_APP_API_URL } from "./config";

function Topsales() {
  // Accessing the authentication token from context
  const { token } = useContext(AuthContext);

  // State variable to hold top sales data
  const [data, setData] = useState([]);

  // Function to fetch top sales data from the server
  const topSales = async () => {
    const topSalesData = await axios.get(
      `${REACT_APP_API_URL}api/sales/topSales`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setData(topSalesData.data.topSalesData);
  };

  // Fetch top sales data on component mount
  useEffect(() => {
    topSales();
    // eslint-disable-next-line
  }, []);

  return (
    // Displaying top 5 sales in a table
    <div className="container">
      <div className="text-center">
        <h2 className="fw-bold my-4 d-inline-flex border-bottom border-info border-3 rounded px-3 pb-1">
          Top 5 Sales!
        </h2>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr className="border-bottom border-info">
              <th scope="col" className=" text-info">
                #
              </th>
              <th scope="col" className=" text-info">
                Product Name
              </th>
              <th scope="col" className=" text-info">
                Quantity
              </th>
              <th scope="col" className=" text-info">
                Sale Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr className="border-bottom border-info" key={index}>
                <th scope="row" className=" text-info">
                  {index + 1}
                </th>
                <td>{item.productname}</td>
                <td>{item.quantity}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Topsales;
