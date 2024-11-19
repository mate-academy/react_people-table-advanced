import { Loader } from '../Loader';
import { ErrorNotification } from '../../shared/ErrorNotification';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { useContext } from 'react';
import { PeopleContext } from '../../context/PeopleContext';
import { usePeopleFilter } from '../../hooks/usePeopleFilter';

const generatePeopleView = () => {
  const { filtredPeople, isLoading, error, people } = useContext(PeopleContext);
  const { centuries, name, sex } = usePeopleFilter();

  const isPeopleEmpthy = !people.length && !isLoading;

  const isFilterParamsExist = !!(centuries.length || name || sex);

  switch (true) {
    case !!error:
      return (
        <ErrorNotification dataCy="peopleLoadingError" errorMessage={error} />
      );

    case isPeopleEmpthy:
      return <p data-cy="noPeopleMessage">There are no people on the server</p>;

    case !filtredPeople.length && isFilterParamsExist:
      return <p>There are no people matching the current search criteria</p>;

    case !!filtredPeople.length:
      return <PeopleTable people={filtredPeople} />;

    default:
      return null;
  }
};

export const People = () => {
  const { isLoading } = useContext(PeopleContext);

  return (
    <div className="column">
      <div className="box table-container">
        {isLoading && <Loader />}

        {generatePeopleView()}
      </div>
    </div>
  );
};
