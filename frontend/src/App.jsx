
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "../page/Home";
import Dashboard from "../page/Dashboard";
import SimpleSidebar from "../components/userNavBar";
import Session from "../page/session.jsx";
import Improver from "../page/sessionImprove.jsx";
import IsSession from "../context.js";
import ProtectedRoute from "../components/RouteProtector.jsx";
import NotFoundPage from "../page/404.jsx";


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
          minHeight: "100vh",
          width: "100%",
          transition: "all 0.3s ease",
        };
      } else {
        return {
          marginLeft: "280px",
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
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFoundPage/>}/>

          {/* Protected layout */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="sessions" element={<Session />} />
            <Route path="sessions/improve" element={<Improver />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </IsSession.Provider>
  );
}

export default App;
