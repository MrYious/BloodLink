import {createContext, useEffect, useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Template from './components/Template';

const UserContext = createContext();

const link = window.location.href === 'http://localhost:3000/' ? 'http://localhost:3001/' : 'https://blood-link.herokuapp.com/';

function App() {
  const [data, setData] = useState('')
  console.log('App 1', data)

  useEffect(() => {
    console.log('App 2 ', data)
    let endpoint = link + "api";
    console.log('Link ', link);
    console.log('Endpoint ', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setData(data.message));

    return () => {
      console.log('App 3', data)
    }
  }, [])

  return (
    <UserContext.Provider value="Reed">
      <Template />
      <div className="">
        Blood Link Sample App
        <p>{!data ? "Loadingss..." : data}</p>
      </div>
    </UserContext.Provider>
  );
}

export default App;
