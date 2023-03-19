import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext/AuthContex";
import HomePage from "./pages/DashboardPage";
import { Switch } from "antd";
import CompanyPage from "./pages/CompanyPage";
import ProductPage from "./pages/ProductPage";

function App() {
  const {state} = useAuthContext();
  if(state.isLoggedIn){
    console.log("geldiii")
  }

  return (
  <div className="App" >
  {state.isLoggedIn ? 
      <BrowserRouter>
        <Sidebar/>
        <Routes>
          <Route path="dashboard" element={<HomePage/>}/>
          <Route path = "company" element={<CompanyPage/>}/>
          <Route path = "product" element={<ProductPage/>}/>
        </Routes>
      </BrowserRouter>:
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}/>
          <Route path="register" element={<RegisterPage/>}/>
        </Routes>
      </BrowserRouter>}
  </div>
     
  );
}

export default App;
