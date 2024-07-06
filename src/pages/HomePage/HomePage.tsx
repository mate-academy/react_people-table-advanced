import { useContext, useEffect } from 'react';
// eslint-disable-next-line
import { PeopleContext } from '../../PeopleContext';

export const HomePage = () => {
  const { setLoader } = useContext(PeopleContext);

  useEffect(() => {
    setLoader(true);
  }, [setLoader]);

  return (
    <div className="container">
      <h1 className="title">Home Page</h1>
    </div>
  );
};
