import { useContext, useEffect } from 'react';
import { PeopleContext } from '../../peopleContext';

export const HomePage = () => {
  const { setLoader } = useContext(PeopleContext);

  useEffect(() => {
    setLoader(true);
  });

  return (
    <div className="container">
      <h1 className="title">Home Page</h1>
    </div>
  );
};
