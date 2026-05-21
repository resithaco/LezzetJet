import "./ProfileIcon.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  ChevronDown,
  Wallet,
  ClipboardList,
  UserCircle,
  Ticket,
  LogOut,
  HelpCircle,
} from "lucide-react";
export default function ProfileIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("Giriş Yap");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUserName(parsedUser.username.toUpperCase()); 
    }
  }, []);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };
  return (
    <div className="profile-container" ref={dropdownRef}>
      <div className="profile-trigger" onClick={() => setIsOpen(!isOpen)}>
        <User size={20} />
        <span className="profile-name">{userName}</span>
        <ChevronDown
          size={16}
          className={`arrow-icon ${isOpen ? "rotate" : ""}`}
        />
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">
          <div className="menu-item">
            <Wallet size={18} color="#e91e63" /> <span>Cüzdan</span>
          </div>
          <div className="menu-item">
            <ClipboardList size={18} /> <span>Önceki Siparişlerim</span>
          </div>
          <div className="menu-item">
            <UserCircle size={18} /> <span>Hesabım</span>
          </div>
          <div className="menu-item">
            <Ticket size={18} /> <span>Kuponlarım</span>
          </div>
          <hr />
          <div className="menu-item">
            <HelpCircle size={18} /> <span>Yardım Merkezi</span>
          </div>
          <div className="menu-item logout" onClick={handleLogout} style={{ cursor: "pointer" }}>
            <LogOut size={18} /> <span>Çıkış yap</span>
          </div>
        </div>
      )}
    </div>
  );
}