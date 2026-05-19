import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthStyle.css";

const CustomInput = ({ type, placeholder, value, onChange }) => (
  <div className="input-group">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);
const CustomButton = ({ label, type = "button", onClick, className = "" }) => (
  <button type={type} onClick={onClick} className={className}>
    {label}
  </button>
);
const AuthPage = () => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("lezzet_jet_users");
    return saved ? JSON.parse(saved) : { admin: { pass: "123", type: "user" } };
  });
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "",
  });
  useEffect(() => {
    localStorage.setItem("lezzet_jet_users", JSON.stringify(users));
  }, [users]);
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
    setLoginData({ username: "", password: "" });
    setRegisterData({ username: "", email: "", password: "", confirmPassword: "", accountType: "" });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = loginData;
    const user = users[username];
    if (user && user.pass === password) {
      localStorage.setItem("currentUser", JSON.stringify({ username, type: user.type }));
      navigate("/dashboard");
    } else {
      alert("Kullanıcı adı veya şifre hatalı!");
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword, accountType } = registerData;
    if (!accountType) return alert("Lütfen hesap türünü seçin!");
    if (password !== confirmPassword) return alert("Şifreler eşleşmiyor!");
    if (users[username]) return alert("Bu kullanıcı adı zaten alınmış!");
    setUsers((prev) => ({ 
      ...prev, 
      [username]: { pass: password, type: accountType, email: email } 
    }));
    alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
    toggleFlip();
  };
  return (
    <div className="auth-container">
      <div className={`card-container ${isFlipped ? "flip" : ""}`}>
        <div className="card">
          <div className="card-face card-front">
            <div className="app-name">Lezzet Jet</div>
            <h2>Giriş Yap</h2>
            <form onSubmit={handleLogin} className="auth-form">
              <CustomInput
                type="text"
                placeholder="Kullanıcı Adı"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              />
              <CustomInput
                type="password"
                placeholder="Şifre"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
              <CustomButton label="Giriş Yap" type="submit" />
              <CustomButton label="Kayıt Ol" onClick={toggleFlip} className="secondary" />
            </form>
            <a href="#forgot" className="forgot-link" onClick={(e) => e.preventDefault()}>
              Şifremi Unuttum?
            </a>
          </div>
          <div className="card-face card-back">
            <div className="app-name">Lezzet Jet</div>
            <h2>Kayıt Ol</h2>
            <form onSubmit={handleRegister} className="auth-form">
              <CustomInput
                type="text"
                placeholder="Kullanıcı Adı"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              />
              <CustomInput
                type="email"
                placeholder="E-posta"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              />
              <div className="select-group">
                <select 
                  className="accountType" 
                  value={registerData.accountType}
                  onChange={(e) => setRegisterData({ ...registerData, accountType: e.target.value })}
                  required
                >
                  <option value="" disabled>Hesap Türünü Seç</option>
                  <option value="restaurant">🍔 Restoran</option>
                  <option value="user">👤 Müşteri</option>
                  <option value="delivery">🛵 Kurye</option>
                </select>
                <span className="select-arrow">▼</span>
              </div>
              <CustomInput
                type="password"
                placeholder="Şifre"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              />
              <CustomInput
                type="password"
                placeholder="Şifreyi Onayla"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              />
              <CustomButton label="Kaydol" type="submit" />
              <CustomButton label="Geri Dön" onClick={toggleFlip} className="secondary" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;