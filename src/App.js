import React from "react";
import { HashRouter , Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import LandingPage from "./pages/LandingPage/landingpage";
import Register from "./pages/Register/register";
import Login from "./pages/Login/login";
import Profile from "./pages/Profile/profile"
import PublicProfilePage from "./pages/Profile/public_profilepage";
import { UserProvider } from "./context/usercontext";  
import "./styles/index.css";

const App = () => {
  return (
    <HashRouter >
      <UserProvider> 
        <div className="app-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userId" element={<PublicProfilePage />} />
          </Routes>
        </div>
      </UserProvider>
    </HashRouter >
  );
};

export default App;
