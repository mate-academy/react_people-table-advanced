import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const HomeRedirect:React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, []);

  return (
    null
  );
};
