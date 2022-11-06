import { Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Register from "./pages/Register";
import SearchDonor from "./pages/SearchDonor";
import { createContext } from 'react';

export const MainContext = createContext();

const link = window.location.href === 'http://localhost:3000/' ? 'http://localhost:3001/' : 'https://blood-link.herokuapp.com/';

const contextData = {
  link: link
}

function App() {

  return (
    <MainContext.Provider value={contextData}>
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/search" element={<SearchDonor />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/main" element={<Main />}></Route>
      </Routes>
    </MainContext.Provider>
  );
}

export default App;
