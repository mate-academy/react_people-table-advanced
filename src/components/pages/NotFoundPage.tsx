import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../Loader';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }, []);

  return (
    <>
      <h1 className="title">Page not found</h1>
      <div className="notification is-info is-light">
        Redirecting you back to the <strong>home</strong> page
      </div>
      <Loader />
    </>
  );
};
