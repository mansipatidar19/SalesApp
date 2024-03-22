import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header";
import AddEntry from "./components/Addentry";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Revenue from "./components/Revenue";
import Topsales from "./components/Topsales";
import NotFound from "./components/common/Notfound";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "./components/AuthProvider";

function App() {
  // Accessing authentication token from context
  const { token } = useContext(AuthContext);

  return (
    // Router setup for navigation
    <BrowserRouter>
      <div className="App">
        {/* Component for displaying toast messages */}
        <ToastContainer />

        {/* Component for displaying header */}
        <Header />

        {/* Routing setup for different components */}
        <Routes>
          {/* Conditional rendering based on token existence */}
          {token ? (
            <>
              {/* Routes accessible to authenticated users */}
              <Route path="/addEntry" element={<AddEntry />}></Route>
              <Route path="/topsales" element={<Topsales />}></Route>
              <Route path="/totalrevenue" element={<Revenue />}></Route>
            </>
          ) : (
            <>
              {/* Route for registration */}
              <Route path="/register" element={<Registration />}></Route>
            </>
          )}
          {/* Default route for unauthenticated users */}
          <Route path="/" element={<Registration />}></Route>

          {/* Route for login */}
          <Route path="/login" element={<Login />}></Route>

          {/* Route for displaying not found page for unauthenticated users */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
