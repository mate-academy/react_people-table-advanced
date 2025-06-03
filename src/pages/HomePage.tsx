import { Navigate, useParams } from 'react-router-dom';

export const HomePage = () => {
  const { home } = useParams();

  if (home === 'home') {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <h1 className="title">Home Page</h1>
    </>
  );
};
