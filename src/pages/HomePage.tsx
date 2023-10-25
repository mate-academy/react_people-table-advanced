import { Navigate } from 'react-router-dom';

export const HomePage = () => (
  <>
    <Navigate to="/" replace />
    <h1 className="title">Home Page</h1>
  </>
);
