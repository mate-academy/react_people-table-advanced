import { Navigate } from 'react-router-dom';

export const RedirectToHomePage = () => {
  return <Navigate to="/" replace />;
};
