// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LogIn from './pages/LogIn';
import RideDetails from './pages/RideDetails';
import RideSearch from './pages/RideSearch';
import { Register } from './pages/Register';
import CustomNavbar from './Navbar';
import Footer from './Footer';
import GlobalStyle from './GlobalStyle'; 

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <GlobalStyle /> {/* Apply GlobalStyle */}
        <CustomNavbar />
        <div style={{ flex: '1' }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={LogIn} />
            <Route path="/register" component={Register} />
            <Route path="/ride/:id" component={RideDetails} />
            <Route path="/rides" component={RideSearch} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
