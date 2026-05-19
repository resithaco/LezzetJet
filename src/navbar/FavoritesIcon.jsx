import React from "react";
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FavoritesIcon() {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate('/favorites')} 
      style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
    >
      <Heart size={20} />
    </div>
  );
}