import { Loader } from '../Loader';
import { ErrorNotification } from '../../shared/ErrorNotification';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { usePeopleFilter } from '../../hooks/usePeopleFilter';
import { usePeople } from '../../hooks/usePeople';

export const People = () => {
  const { filtredPeople, isLoading, error, people } = usePeople();
  const { centuries, name, sex } = usePeopleFilter();

  const isPeopleEmpty = !people.length && !isLoading;

  const isFilterParamsExist = !!(centuries.length || name || sex);

  const generatePeopleView = () => {
    switch (true) {
      case !!error:
        return (
          <ErrorNotification dataCy="peopleLoadingError" errorMessage={error} />
        );

      case isPeopleEmpty:
        return (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        );

      case !filtredPeople.length && isFilterParamsExist:
        return <p>There are no people matching the current search criteria</p>;

      case !!filtredPeople.length:
        return <PeopleTable people={filtredPeople} />;

      default:
        return null;
    }
  };

  return (
    <div className="column">
      <div className="box table-container">
        {isLoading && <Loader />}

        {generatePeopleView()}
      </div>
    </div>
  );
};
