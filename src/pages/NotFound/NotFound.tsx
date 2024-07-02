import { useContext, useEffect } from 'react';
import { PeopleContext } from '../../peopleContext';

export const NotFound = () => {
  const { setLoader } = useContext(PeopleContext);

  useEffect(() => {
    setLoader(true);
  });

  return <h1 className="title">Page not found</h1>;
};
