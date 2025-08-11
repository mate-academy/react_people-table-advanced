import { Navigate, useLocation } from 'react-router-dom';

export const HomePage = () => {
  const location = useLocation();

  if (location.pathname.includes('home')) {
    return <Navigate to="/" />;
  }

  return <h1 className="title">Home Page</h1>;
};
