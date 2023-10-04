import { Navigate } from 'react-router-dom';

export const HomePage = () => {
  return (
    <>
      <h1 className="title">Home Page</h1>
      <Navigate to="/" replace />
    </>
  );
};
