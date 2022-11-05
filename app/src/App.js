import { Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
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
        <Route path="/search" element={<Landing/>}></Route>
        <Route path="/register" element={<Landing/>}></Route>
        <Route path="/login" element={<Landing/>}></Route>
        <Route path="/main" element={<Landing/>}></Route>
      </Routes>
    </MainContext.Provider>
  );
}

export default App;
