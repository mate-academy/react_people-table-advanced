import { Navigate, useLocation } from 'react-router-dom';

export const PageNotFound = () => {
  const { pathname } = useLocation();

  if (pathname === '/home') {
    return <Navigate to="/" />;
  }

  return <h1 className="title">Page not found</h1>;
};
