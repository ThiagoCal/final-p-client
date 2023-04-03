import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Component/Home'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
