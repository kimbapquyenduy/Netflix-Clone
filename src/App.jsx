import { useState } from "react";

import "./App.css";
import { Navbar } from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { AuthContextProvider } from "./Context/AuthContext";
import Login from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";
import { Account } from "./Pages/Account";
import { ProtectRoute } from "./Components/ProtectRoute";
import { Watch } from "./Pages/Watch";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/watch/:tOS/:id" element={<Watch />} />
          <Route
            path="/account"
            element={
              <ProtectRoute>
                <Account />
              </ProtectRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
