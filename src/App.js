import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import CreateParty from "./Component/CreateParty";
import ControlPanel from "./Component/ControlPanel";
import Navbar from "./Component/Navbar";
import CreateUser from "./Component/CreateUser";
import CreateUser2 from "./Component/LoginRegister";
import RequireAuth from "./auth/RequireAuth";
import { useEffect } from "react";
import { Collapse, Dropdown, initTE } from "tw-elements";
import { AppContextProvider } from "./Component/AppContext";

function App() {
  useEffect(() => {
    initTE({ Collapse });
  }, []);
  return (
    <AppContextProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<CreateUser2 title="Login" />} />
            <Route
              path="/register"
              element={<CreateUser2 title="Register" />}
            />
            <Route
              path="/create-party"
              element={
                <RequireAuth>
                  <CreateParty />
                </RequireAuth>
              }
            ></Route>
            <Route path="/create-user" element={<CreateUser2 />}></Route>
            <Route
              path="/update-party/:id"
              element={
                <RequireAuth>
                  <CreateParty />
                </RequireAuth>
              }
            ></Route>
            <Route path="/login" element={<CreateUser2 />}></Route>
            <Route path="/control" element={<ControlPanel />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
