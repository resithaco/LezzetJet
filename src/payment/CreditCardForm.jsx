import React, { useState } from "react";
import "./CreditCardForm.css";

export default function CreditCardForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("Month");
  const [expiryYear, setExpiryYear] = useState("Year");
  const [cvv, setCvv] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  // تنسيق رقم البطاقة للعرض في الطبقة العلوية
  const getDisplayCardNumber = () => {
    const rawNumbers = cardNumber.replace(/\s/g, ""); 
    let strokeStr = rawNumbers.padEnd(16, "");
    let p1 = strokeStr.substring(0, 4);
    let p2 = strokeStr.substring(4, 8).replace(/\d/g, "*");
    let p3 = strokeStr.substring(8, 12).replace(/\d/g, "*");
    let p4 = strokeStr.substring(12, 16);
    return `${p1} ${p2} ${p3} ${p4}`;
  };

  // تنسيق تاريخ الانتهاء للعرض
  const getDisplayExpiry = () => {
    const m = expiryMonth === "Month" ? "MM" : expiryMonth;
    const y = expiryYear === "Year" ? "YY" : expiryYear.slice(-2);
    return `${m}/${y}`;
  };

  const handleCardNumberChange = (e) => {
    const numbersOnly = e.target.value.replace(/\D/g, "");
    let formattedValue = "";
    for (let i = 0; i < numbersOnly.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += " ";
      }
      formattedValue += numbersOnly[i];
    }
    if (formattedValue.length <= 19) {
      setCardNumber(formattedValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cardNumber || !cardHolder || !cvv || expiryMonth === "Month" || expiryYear === "Year") {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }
    alert("Ödeme başarıyla tamamlandı!");
  };

  return (
    <div className="payment-page-container">
      <div className="card-3d-wrapper">
        <div className={`credit-card ${isFlipped ? "flipped" : ""}`}>
          
          {/* الوجه الأمامي المسترد عبر وسم img */}
          <div className="cc-front">
            <img src="/card-front.svg" alt="Card Front" className="cc-svg-bg" />
            
            {/* طبقة النصوص التفاعلية المتموضعة بدقة أعلى الصورة */}
            <div className="cc-text-overlay">
              <div className="dynamic-card-num">{getDisplayCardNumber()}</div>
              <div className="dynamic-valid-thru-label">VALID THRU</div>
              <div className="dynamic-expiry">{getDisplayExpiry()}</div>
              <div className="dynamic-card-holder">{cardHolder.toUpperCase() || "AD SOYAD"}</div>
            </div>
          </div>
          {/* الوجه الخلفي المسترد عبر وسم img */}
          <div className="cc-back">
            <img src="/card-back.svg" alt="Card Back" className="cc-svg-bg" />
            
            {/* طبقة رمز الأمن الخلفية */}
            <div className="cc-text-overlay">
              <div className="dynamic-cvv">{cvv || ""}</div>
            </div>
          </div>

        </div>
      </div>
      {/* نموذج الإدخال */}
      <form className="card-form" onSubmit={handleSubmit}>
        <div className="cc-input-group">
          <input
            type="text"
            placeholder="1234 5678 9123 4568"
            value={cardNumber}
            onChange={handleCardNumberChange}
          />
        </div>
        <div className="cc-input-group">
          <input
            type="text"
            placeholder="Kart sahibi adı soyadı"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ\s]/g, ""))}
          />
        </div>
        <div className="form-row">
          <div className="cc-input-group expiration-group">
            <label>Son Kullanma Tarihi</label>
            <div className="cc-select-group">
              <select value={expiryMonth} onChange={(e) => setExpiryMonth(e.target.value)}>
                <option disabled value="Month">Ay</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, "0")}>{String(i + 1).padStart(2, "0")}</option>
                ))}
              </select>
              <select value={expiryYear} onChange={(e) => setExpiryYear(e.target.value)}>
                <option disabled value="Year">Yıl</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2031">2031</option>
                <option value="2033">2033</option>
              </select>
            </div>
          </div>
          <div className="cc-input-group cvv-group">
            <label>CVV</label>
            <input
              type="text"
              maxLength="3"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
              onFocus={() => setIsFlipped(true)}
              onBlur={() => setIsFlipped(false)}
            />
          </div>
        </div>
        <button type="submit" className="submit-btn">Onayla</button>
      </form>
    </div>
  );
}