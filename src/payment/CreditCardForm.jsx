import React, { useState } from "react";
import "./CreditCardForm.css";

export default function CreditCardForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("Month");
  const [expiryYear, setExpiryYear] = useState("Year");
  const [cvv, setCvv] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  // دالة لتنسيق الأرقام على البطاقة (إخفاء المنتصف)
  const getDisplayCardNumber = () => {
    const rawNumbers = cardNumber.replace(/\s/g, ""); // إزالة المسافات قبل المعالجة
    let str = rawNumbers.padEnd(16, "#");
    let p1 = str.substring(0, 4);
    let p2 = str.substring(4, 8).replace(/\d/g, "*");
    let p3 = str.substring(8, 12).replace(/\d/g, "*");
    let p4 = str.substring(12, 16);
    return `${p1} ${p2} ${p3} ${p4}`;
  };

  // دالة لإضافة مسافة بعد كل 4 أرقام في حقل الإدخال
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
    e.preventDefault(); // منع إعادة تحميل الصفحة تلقائياً

    // تحقق للتأكد من أن جميع الحقول ممتلئة وليست بالقيم الافتراضية
    if (
      !cardNumber ||
      !cardHolder ||
      !cvv ||
      expiryMonth === "Month" ||
      expiryYear === "Year"
    ) {
      alert("Lütfen tüm alanları doldurun."); // رسالة الخطأ بالتركية
      return;
    }

    alert("Ödeme başarıyla tamamlandı! Siparişiniz hazırlanıyor."); // رسالة النجاح بالتركية
  };

  return (
    <div className="payment-page-container">
      <div className="card-3d-wrapper">
        <div className={`credit-card ${isFlipped ? "flipped" : ""}`}>
          <div className="cc-front">
            <div className="card-header">
              <span className="brand-name">CreditCard</span>
              <div className="card-chip"></div>
            </div>
            <div className="card-number-display">{getDisplayCardNumber()}</div>
            <div className="card-footer">
              <div className="footer-section">
                <span className="label">KART SAHİBİ</span>
                <span className="value">
                  {cardHolder.toUpperCase() || "Ad SOyad"}
                </span>
              </div>
              <div className="footer-section">
                <span className="label">EXPIRES</span>
                <span className="value">
                  {expiryMonth === "Month" ? "MM" : expiryMonth}/
                  {expiryYear === "Year" ? "YY" : expiryYear.slice(-2)}
                </span>
              </div>
            </div>
          </div>
          <div className="cc-back">
            <div className="magnetic-strip"></div>
            <div className="cvv-section">
              <span className="label">CVV</span>
              <div className="cvv-box">{cvv || "***"}</div>
            </div>
          </div>
        </div>
      </div>
      <form className="card-form" onSubmit={handleSubmit}>
        <div className="cc-input-group">
          <label></label>
          <input
            type="text"
            placeholder="1234 5678 9123 4568"
            value={cardNumber}
            onChange={handleCardNumberChange}
          />
        </div>
        <div className="cc-input-group">
          <label></label>
          <input
            type="text"
            placeholder="Kart sahibi adı soyadı"
            value={cardHolder}
            onChange={(e) => {
              const onlyLetters = e.target.value.replace(
                /[^a-zA-ZğüşıöçĞÜŞİÖÇ\s]/g,
                ""
              );
              setCardHolder(onlyLetters);
            }}
          />
        </div>
        <div className="form-row">
          <div className="cc-input-group expiration-group">
            <label>Expiration Date</label>
            <div className="cc-select-group">
              <select
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
              >
                <option disabled value="Month">
                  Month
                </option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                    {String(i + 1).padStart(2, "0")}
                  </option>
                ))}
              </select>
              <select
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
              >
                <option disabled value="Year">
                  Year
                </option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2031">2031</option>
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
        <button type="submit" className="submit-btn">
          Onayla
        </button>
      </form>
    </div>
  );
}