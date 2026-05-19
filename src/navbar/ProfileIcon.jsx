import "./ProfileIcon.css";
import React, { useState, useEffect, useRef } from "react";
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
  const dropdownRef = useRef(null);
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
  return (
    <div className="profile-container" ref={dropdownRef}>
      <div className="profile-trigger" onClick={() => setIsOpen(!isOpen)}>
        <User size={20} />
        <span className="profile-name">RAŞİT</span>
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
          <div className="menu-item logout">
            <LogOut size={18} /> <span>Çıkış yap</span>
          </div>
        </div>
      )}
    </div>
  );
}
