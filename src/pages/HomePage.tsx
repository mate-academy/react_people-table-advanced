import { Navigate, useLocation } from 'react-router-dom';

export const HomePage = () => {
  const location = useLocation();

  if (location.pathname === '/home') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="section">
      <div className="container">

        <h1 className="title">Home Page</h1>

      </div>
    </div>
  );
};
