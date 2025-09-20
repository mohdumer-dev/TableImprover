import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../page/Home";
import Dashboard from "../page/Dashboard";
import { Outlet } from 'react-router-dom';
import SimpleSidebar from '../components/userNavBar';
import Session from "../page/session.jsx";
import Improver from "../page/sessionImprove.jsx";
import IsSession from "../context.js";
import { useState } from "react";

function App() {
  const [isSession,setIsSession]=useState(true)
    const Layout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SimpleSidebar />
      <main style={{ 
        marginLeft: '280px', 
        padding: '2rem',
        minHeight: '100vh',
        width: 'calc(100% - 280px)'
      }}>
        <Outlet />
      </main>
    </div>
  );
};
  return (<IsSession.Provider value={{isSession,setIsSession}}>

    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Home></Home>} />
        
          <Route path="/app" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="sessions" element={<Session />} />
          <Route path="sessions/improve" element={<Improver/>}/>
          <Route index element={<Dashboard />} /> {/* Default route */}
        </Route>

      </Routes>
    </BrowserRouter>
    </IsSession.Provider>
  );


}

export default App;
