import { useContext, useEffect } from 'react';
// eslint-disable-next-line
import { PeopleContext } from '../../PeopleContext';

export const NotFound = () => {
  const { setLoader } = useContext(PeopleContext);

  useEffect(() => {
    setLoader(true);
  }, [setLoader]);

  return <h1 className="title">Page not found</h1>;
};
