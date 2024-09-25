
import './App.css'
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard/DashboardTemp';



function App() {


  return (
    <Router>
        <Routes>
            <Route path = "/" element = {<HomePage/>}/>
            <Route path = "/login" element = {<LoginPage/>}/>
            <Route path = "/dashboard" element = {<Dashboard/>}/>

        </Routes>
    </Router>

    
  )
}

export default App
