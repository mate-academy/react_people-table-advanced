import { Navigate, useLocation } from 'react-router-dom';

export const NotFoundPage = () => {
  const { pathname } = useLocation();

  if (pathname === '/home') {
    return <Navigate to="/" replace={true} />;
  }

  return <h1 className="title">Page not found</h1>;
};
