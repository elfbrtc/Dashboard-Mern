import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Sidebar from './components/Sidebar';
import './App.css';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  // const {isloggedIn, logout} = useLoginContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="register" element={<RegisterPage/>}/>
        </Routes>
        


      
      </BrowserRouter>
      {/* <Sidebar></Sidebar> */}
     
    </div>
  );
}

export default App;
