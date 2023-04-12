import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Component/Home'
import CreateParty from './Component/CreateParty';
import ControlPanel from './Component/ControlPanel';
import Navbar from './Component/Navbar';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/create_party' element={<CreateParty/>}></Route>
          <Route path='/update_party/:id' element={<CreateParty/>}></Route>
          <Route path='/control' element={<ControlPanel/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
