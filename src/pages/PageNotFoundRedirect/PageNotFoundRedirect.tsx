import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const PageNotFoundRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/not-found');
  }, []);

  return null;
};
