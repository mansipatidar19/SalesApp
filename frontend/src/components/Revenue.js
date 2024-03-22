import axios from "axios";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { REACT_APP_API_URL } from "./config";

function Revenue() {
  // State variable to hold the total revenue
  const [revenue, setRevenue] = useState("");
  const [loading, setLoading] = useState(false);

  // Accessing the authentication token from context
  const { token } = useContext(AuthContext);

  // Function to fetch total revenue from the server
  const getRevenue = async () => {
    setLoading(true);
    const response = await axios.get(
      `${REACT_APP_API_URL}api/sales/totalRevenue`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Setting the total revenue in state
    setRevenue(response.data.totalRevenue);
    setLoading(false);
  };

  // Fetch total revenue on component mount
  useEffect(() => {
    getRevenue();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="text-center">
        <h2 className="fw-bold my-4 d-inline-flex border-bottom border-info border-3 rounded px-3 pb-1">
          Today's Total Revenue Is &nbsp;
          {loading ? (
            <span className="spinner-grow spinner-grow-sm text-dark mt-2"></span>
          ) : (
            <>{revenue}</>
          )}
        </h2>
      </div>
    </div>
  );
}

export default Revenue;
