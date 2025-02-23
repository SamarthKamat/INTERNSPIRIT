// App.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LogIn from "./pages/LogIn";
import RideDetails from "./pages/RideDetails";
import RideSearch from "./pages/RideSearch";
import { Register } from "./pages/Register";
import CreateRide from "./pages/CreateRide";

import CustomNavbar from "./Navbar";
import Footer from "./Footer";
import GlobalStyle from "./GlobalStyle";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <GlobalStyle />
          <CustomNavbar />
          <div style={{ flex: "1" }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={LogIn} />
              <Route path="/register" component={Register} />
              <ProtectedRoute path="/dashboard" component={Dashboard} />
              <ProtectedRoute path="/ride/:id" component={RideDetails} />
              <ProtectedRoute path="/rides" component={RideSearch} />
              {/* <ProtectedRoute path="/ride/create" component={CreateRide} /> */}
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;