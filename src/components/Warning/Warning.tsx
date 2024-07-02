import { useContext } from 'react';
import { PeopleContext } from '../../peopleContext';

export const Warning = () => {
  const { warning } = useContext(PeopleContext);
  let warning1;
  let warning2;
  let warning3;

  if (warning === 'Something went wrong') {
    warning1 = warning;
    warning2 = '';
    warning3 = '';
  }

  if (warning === 'There are no people on the server') {
    warning1 = '';
    warning2 = warning;
    warning3 = '';
  }

  if (warning === 'There are no people matching the current search criteria') {
    warning1 = '';
    warning2 = '';
    warning3 = warning;
  }

  return (
    <>
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {warning1}
      </p>
      <p data-cy="noPeopleMessage">{warning2}</p>
      <p>{warning3}</p>
    </>
  );
};
