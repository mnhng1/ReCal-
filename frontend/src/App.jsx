
import './App.css'
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from './components/LoginPage';



function App() {


  return (
    <Router>
        <Routes>ç
            <Route path = "/" element = {<HomePage/>}/>
            <Route path = "/login" element = {<LoginPage/>}/>
            
        </Routes>
    </Router>

    
  )
}

export default App
