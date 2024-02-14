import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmpListing from './pages/EmpListing';
import EmpCreate from './pages/EmpCreate';
import EmpDetail from './pages/EmpDetail';
import EmpEdit from './pages/EmpEdit';
import './App.css';
function App() {
  return (
    <div className="App">
      <h1>USER LIST</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmpListing />}></Route>
          <Route path='/employee/create' element={<EmpCreate />}></Route>

          <Route path='/employee/detail/:empid' element={<EmpDetail />}></Route>
          <Route path='/employee/edit/:empid' element={<EmpEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
