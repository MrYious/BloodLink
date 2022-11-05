import {createContext, useEffect, useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import ContextSample from './components/ContextSample';

export const MainContext = createContext();

const link = window.location.href === 'http://localhost:3000/' ? 'http://localhost:3001/' : 'https://blood-link.herokuapp.com/';

const contextData = {
  link: link
}

function App() {
  const [data, setData] = useState('')

  useEffect(() => {
    let endpoint = link + "api";
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, [])

  return (
    <MainContext.Provider value={contextData}>
      <div className="">
        Blood Link Sample App
        PUSH - Changed
        <p>{!data ? "Loadingss..." : data}</p>
      </div>
      <ContextSample />
    </MainContext.Provider>
  );
}

export default App;
