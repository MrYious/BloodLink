import { Route, Routes } from "react-router-dom";

import Active from "./pages/Active";
import AdminLogin from "./pages/AdminLogin";
import BrowseDonor from "./pages/BrowseDonor";
import Dashboard from "./pages/Dashboard";
import HistoryCancelled from "./pages/HistoryCancelled";
import HistoryCompleted from "./pages/HistoryCompleted";
import HistoryDeclined from "./pages/HistoryDeclined";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Requests from "./pages/Requests";
import SearchDonor from "./pages/SearchDonor";
import UpdateProfile from "./pages/UpdateProfile";
import { createContext } from 'react';

export const MainContext = createContext();

const link = window.location.href.includes('http://localhost:3000/') ? 'http://localhost:3001/' : 'https://bloodlink.netlify.app/';

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
        <Route path="/main" element={<Main />} />

        <Route path="/main/search" element={<BrowseDonor />} />
        <Route path="/main/profile" element={<Profile />} />
        <Route path="/main/update" element={<UpdateProfile />} />

        <Route path="/main/profile/:nameID" element={<Profile />} />

        <Route path="/main/requests" element={<Requests />} />
        <Route path="/main/active" element={<Active />} />
        <Route path="/main/history/completed" element={<HistoryCompleted />} />
        <Route path="/main/history/declined" element={<HistoryDeclined />} />
        <Route path="/main/history/cancelled" element={<HistoryCancelled />} />

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />

      </Routes>
    </MainContext.Provider>
  );
}

export default App;
