
import './App.css'
import HomePage from './components/Landing/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/Landing/LoginPage';
import Dashboard from './components/Dashboard/DashboardTemp';
import CreateAccountPage from './components/Landing/CreatePage';
import GoogleLoginSuccess from './components/Landing/GoogleLoginSuccess';


function App() {


  return (
    <Router>
        <Routes>
            <Route path = "/" element = {<HomePage/>}/>
            <Route path = "/login" element = {<LoginPage/>}/>
            <Route path = "/dashboard" element = {<Dashboard/>}/>
            <Route path = "/create" element = {<CreateAccountPage/>}/>
            <Route path = "/login/success" element={<GoogleLoginSuccess />} />
        </Routes>
    </Router>

    
  )
}

export default App
