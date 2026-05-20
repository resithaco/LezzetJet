import React from "react";
import { QRCodeSVG } from "qrcode.react";
import mySiteLogo from "./assets/L-J.svg";

export default function QRCodeCard({ url }) {
  const qrValue = url || window.location.origin;

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Menüyü Tara</h3>

      <div style={styles.qrContainer}>
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

      <p style={styles.footerText}>Lezzet Jet QR</p>
    </div>
  );
}

const styles = {
  card: {
    zIndex: 100000, /* 🌟 تم التصحيح إلى CamelCase وتحويلها لقيمة رقمية مباشرة */
    fontFamily: "system-ui, -apple-system, sans-serif",
    background: "#ffffff",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    width: "180px", /* 🌟 تم توحيد العرض ليتناسق تماماً مع حجم الـ QR (150px) والـ Padding */
    textAlign: "center",
    border: "1px solid #f3f4f6",
    direction: "rtl", 
  },
  title: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "10px",
    marginTop: "0",
  },
  qrContainer: {
    background: "#f9fafb",
    padding: "10px",
    borderRadius: "8px",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #f3f4f6",
  },
  footerText: {
    fontSize: "11px",
    color: "#9ca3af",
    marginTop: "8px",
    marginBottom: "0",
  },
};