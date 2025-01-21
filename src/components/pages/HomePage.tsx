import { Navigate, useParams } from 'react-router-dom';

export const HomePage = () => {
  const { param } = useParams();

  if (param === 'home') {
    return <Navigate to=".." />;
  }

  return <h1 className="title">Home Page</h1>;
};
