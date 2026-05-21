import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import mySiteLogo from "./assets/L-J.svg";
import "./QRCodeCard.css";

export default function QRCodeCard({ url }) {
  const qrValue = url || window.location.origin;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (isMobile) return null;
  return (
    <div className="qr-card">
      <h3 className="qr-card-title">Menüyü Tara</h3>
      <div className="qr-code-container">
        <QRCodeSVG
          value={qrValue}
          size={150}
          bgColor={"#ffffff"}
          fgColor={"#1f2937"}
          level={"H"}
          imageSettings={{
            src: mySiteLogo,
            x: undefined,
            y: undefined,
            height: 30,
            width: 30,
            excavate: true,
          }}
        />
      </div>
      <p className="qr-card-footer">Lezzet Jet QR</p>
    </div>
  );
}