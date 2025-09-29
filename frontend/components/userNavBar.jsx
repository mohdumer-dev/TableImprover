
import React, { useState, useContext, useEffect } from "react";
import { BarChart3, Users, Menu } from "lucide-react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import IsSession from "../context.js";
import getData from "../functions/getData.js";
import { useLocation } from "react-router-dom";
import auLocal from "../functions/addLocal.js";
import resetLocalStorage, { isLocalStorageCorrupted } from "../functions/resetLocalStorage.js";

const SimpleSidebar = ({ isMobile, isTablet }) => {

  const location=useLocation()
  const { isSession } = useContext(IsSession);
  const { user } = useUser();  // get user info from Clerk

  // Initialize localStorage if it doesn't exist or is corrupted
  useEffect(() => {
    if (!localStorage.getItem("UniData") || isLocalStorageCorrupted()) {
      resetLocalStorage();
    }
  }, []);

  // Get current active item with proper fallback
  const getCurrentActiveItem = () => {
    const stored = getData("UniData", "activeItem");
    return stored || "dashboard";
  };

  // Determine active item based on current path
  const getActiveItemFromPath = () => {
    const path = location.pathname;
    if (path === "/app/dashboard") return "dashboard";
    if (path === "/app/sessions") return "sessions";
    if (path === "/app/sessions/improve") return "sessions/improve";
    return "dashboard";
  };

  const [activeItem, setActiveItem] = useState(getCurrentActiveItem());
  const [isOpen, setIsOpen] = useState(!(isMobile || isTablet));
  const navigateTo = useNavigate();

  // Update active item based on current path
  useEffect(() => {
    const pathBasedItem = getActiveItemFromPath();
    const currentItem = getCurrentActiveItem();
    
    // Update if path doesn't match stored item
    if (pathBasedItem !== currentItem) {
      auLocal("UniData", "activeItem", pathBasedItem);
      setActiveItem(pathBasedItem);
    } else {
      setActiveItem(currentItem);
    }
  }, [location.pathname])






  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    {
      id: isSession ? "sessions" : "sessions/improve",
      label: "Sessions",
      icon: Users,
    },
  ];

  const sidebarStyle = {
    position: "fixed",
    left: isOpen ? 0 : "-280px",
    top: 0,
    height: "100vh",
    width: "280px",
    background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #121212 100%)",
    borderRight: "1px solid rgba(255, 255, 255, 0.1)",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    transition: "left 0.3s ease",
  };

  const getNavItemStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "12px 16px",
    marginBottom: "12px",
    borderRadius: "12px",
    background: isActive ? "rgba(255, 255, 255, 0.1)" : "transparent",
    color: isActive ? "#ffffff" : "#b3b3b3",
    cursor: "pointer",
    transition: "all 0.3s ease",
  });

  return (
    <>
      {(isMobile || isTablet) && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: "fixed",
            top: "20px",
            left: "20px",
            zIndex: 1100,
            background: "#222",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Menu size={24} />
        </button>
      )}

      <div style={sidebarStyle}>
        {/* Logo */}
        <div
          style={{
            padding: "2rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(45deg, #7c3aed, #ec4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                color: "white",
              }}
            >
              T
            </div>
            <div>
              <div style={{ fontSize: "20px", fontWeight: "600", color: "white" }}>
                Table Improver
              </div>
              <div style={{ color: "#888", fontSize: "14px" }}>
                Professional Suite
              </div>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <div style={{ flex: 1, padding: "2rem 1.5rem" }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <div
                key={item.id}
                style={getNavItemStyle(isActive)}
                onClick={() => {
                  // Update active item in localStorage
                  auLocal("UniData", "activeItem", item.id);
                  
                  // Update state
                  setActiveItem(item.id);
                  
                  // Navigate to the page
                  navigateTo(`/app/${item.id}`);
                  
                  // Close sidebar on mobile
                  if (isMobile || isTablet) setIsOpen(false);
                }}
              >
                <Icon size={20} color="white" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* User section — username + gmail */}
        <div
          style={{
            padding: "1.5rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* You can keep a small avatar or icon if you want */}
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-8 h-8 rounded-full", // small avatar
              },
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <span
              style={{
                fontWeight: "600",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user?.fullName || user?.firstName || "User"}
            </span>
            <span
              style={{
                fontSize: "14px",
                opacity: 0.8,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || ""}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleSidebar;
