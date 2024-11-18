import { Loader } from '../Loader';
import { ErrorNotification } from '../../shared/ErrorNotification';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { useContext } from 'react';
import { PeopleContext } from '../../context/PeopleContext';

export const People = () => {
  const { filtredPeople, isLoading, error } = useContext(PeopleContext);

  const isPeopleEmpthy = !filtredPeople.length && !isLoading;

  const getPeopleView = () => {
    if (error) {
      return (
        <ErrorNotification dataCy="peopleLoadingError" errorMessage={error} />
      );
    }

    if (isPeopleEmpthy) {
      return <p data-cy="noPeopleMessage">There are no people on the server</p>;
    }

    if (!!filtredPeople.length) {
      return <PeopleTable people={filtredPeople} />;
    }

    return null;
  };

  return (
    <div className="column">
      <div className="box table-container">
        {isLoading && <Loader />}

        {getPeopleView()}
      </div>
    </div>
  );
};

{
  /* <p>There are no people matching the current search criteria</p> */
}
