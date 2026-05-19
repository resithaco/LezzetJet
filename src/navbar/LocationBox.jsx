import React, { useState, useEffect } from "react";
import { MapPin, Loader2 } from "lucide-react";

export default function LocationBox() {
  const [location, setLocation] = useState("Detecting location...");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            );
            const data = await response.json();
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "";
            const suburb = data.address.suburb || data.address.district || "";
            setLocation(`${suburb}${suburb ? "/" : ""}${city}`);
          } catch (error) {
            setLocation("Aksu/Antalya");
          }
          setLoading(false);
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
          setLocation("Location denied");
          setLoading(false);
        },
      );
    } else {
      setLocation("Not supported");
      setLoading(false);
    }
  }, []);
  return (
    <div className="location-box">
      {loading ? (
        <Loader2 size={14} className="location-icon animate-spin" />
      ) : (
        <MapPin size={14} className="location-icon" strokeWidth={3} />
      )}
      <span className="location-text">{location}</span>
    </div>
  );
}
