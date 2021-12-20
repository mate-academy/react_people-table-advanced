import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MoveBackBtn.scss';

export const MoveBackBtn: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      className="MoveBackBtn"
      type="button"
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  );
};
