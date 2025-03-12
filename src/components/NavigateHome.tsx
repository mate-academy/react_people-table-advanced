import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const NavigateHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
};
