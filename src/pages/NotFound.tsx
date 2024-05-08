import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('..', { replace: true });
    }, 2000);
  }, [navigate]);

  return (
    <div className="container">
      <h1 className="title">Page not found</h1>
    </div>
  );
};
