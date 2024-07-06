import { useContext } from 'react';
// eslint-disable-next-line
import { PeopleContext } from '../../PeopleContext';

export const Warning = () => {
  const { warning } = useContext(PeopleContext);

  return (
    <>
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {warning === 'Something went wrong' && warning}
      </p>
      <p data-cy="noPeopleMessage">
        {warning !== 'Something went wrong' && warning}
      </p>
    </>
  );
};
