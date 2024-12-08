
import './App.css'
import HomePage from './components/Landing/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/Landing/LoginPage';
import Dashboard from './components/Dashboard/DashboardTemp';
import PrivateRoute from './components/ultils/PrivateRoute';

function App() {


  return (
    <Router>
        <Routes>
            <Route path = "/" element = {<HomePage/>}/>
            <Route path = "/login" element = {<LoginPage/>}/>
            <Route path="/dashboard" element={
                <PrivateRoute>
                    <Dashboard/>
                </PrivateRoute>
            }/>
        </Routes>
    </Router>

    
  )
}

export default App
