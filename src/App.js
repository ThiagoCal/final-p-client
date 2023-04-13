import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Component/Home'
import CreateParty from './Component/CreateParty';
import ControlPanel from './Component/ControlPanel';
import Navbar from './Component/Navbar';
import CreateUser from './Component/CreateUser';
import CreateUser2 from './Component/CreateUser2'
import { Auth } from './auth/Auth';
import { useState, createContext } from 'react';

export const AppContext = createContext(null);

function App() {
  const [accessToken, setAccessToken] = useState();
  return (
    <AppContext.Provider value={{ accessToken, setAccessToken }}>

    <BrowserRouter>
      <div className="App">
      <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<CreateUser2 title='Login' />} />
          <Route path='/register' element={<CreateUser2 title='Register' />} />
          <Route path='/create-party' element={<CreateParty/>}></Route>
          <Route path='/create-user' element={<CreateUser2/>}></Route>
          <Route path='/update-party/:id' element={<CreateParty/>}></Route>
          <Route path='/login' element={<CreateUser2/>}></Route>
          <Route path='/control' element={<ControlPanel/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
