import { Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Register from "./pages/Register";
import SearchDonor from "./pages/SearchDonor";
import Template from "./components/Template";
import { createContext } from 'react';

export const MainContext = createContext();

const link = window.location.href !== 'http://localhost:3000/' ? 'http://localhost:3001/' : 'https://blood-link.herokuapp.com/';

const contextData = {
  link: link
}

function App() {

  return (
    <MainContext.Provider value={contextData}>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/search" element={<SearchDonor />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />}>
          <Route index element={<Template />} />
          <Route path="/main/myprofile" element={<Template />} />
          <Route path="/main/search" element={<Template />} />
          <Route path="/main/profile/:nameID" element={<Template />} />
          <Route path="/main/requests" element={<Template />} />
          <Route path="/main/active" element={<Template />} />
          <Route path="/main/history/completed" element={<Template />} />
          <Route path="/main/history/declined" element={<Template />} />
          <Route path="/main/history/cancelled" element={<Template />} />
        </Route>
      </Routes>
    </MainContext.Provider>
  );
}

export default App;
