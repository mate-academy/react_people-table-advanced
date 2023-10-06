import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { REDIRECT_DELAY } from '../utils/constants';

export const UnknownPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setTimeout(() => {
      navigate('/');
    }, REDIRECT_DELAY);

    return () => (
      clearTimeout(timerId)
    );
  }, []);

  return (
    <h1 className="title">Page not found</h1>
  );
};
