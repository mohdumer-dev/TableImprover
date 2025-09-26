

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Home from "../page/Home";
import Dashboard from "../page/Dashboard";
import SimpleSidebar from "../components/userNavBar";
import Session from "../page/session.jsx";
import Improver from "../page/sessionImprove.jsx";
import IsSession from "../context.js";

function App() {
  const [isSession, setIsSession] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const Layout = () => {
    const getMainContentStyle = () => {
      if (isMobile || isTablet) {
        return {
          // padding: isMobile ? "1rem" : "1.5rem",
          minHeight: "100vh",
          width: "100%",
          transition: "all 0.3s ease",
        
        };
      } else {
        return {
          marginLeft: "280px", // push content right
          padding: "0rem",
          minHeight: "100vh",
          width: "calc(100% - 280px)",
          transition: "all 0.3s ease",
        };
      }
    };

    return (
      <div style={{ display: "flex", position: "relative", minHeight: "100vh" }}>
        <SimpleSidebar isMobile={isMobile} isTablet={isTablet} />
        <main style={getMainContentStyle()}>
          <Outlet />
        </main>
      </div>
    );
  };

  return (
    <IsSession.Provider value={{ isSession, setIsSession }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="sessions" element={<Session />} />
            <Route path="sessions/improve" element={<Improver />} />
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </IsSession.Provider>
  );
}

export default App;
