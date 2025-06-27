import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { ErrorMesages } from '../constants/errorMesages';
import { usePeople } from '../hooks/usePeople';
import { useParams } from 'react-router-dom';
import { useFilters } from '../hooks/useFilters';
import { getFilteredPeople } from '../utils/peopleTableFunctions';

export const PeoplePage = () => {
  const { people, loading, errorMessage, findPersonByName } = usePeople();
  const { slug } = useParams();
  const { isFiltered, queryLower, currentSex, selectedCenturies } =
    useFilters();

  const hasError = !!errorMessage;
  const noPeopleFromServer =
    !people.length && !hasError && !loading && !isFiltered;

  const filteredPeople = getFilteredPeople(
    people,
    queryLower,
    currentSex,
    selectedCenturies,
  );

  const showPeopleTable = filteredPeople.length > 0 && !loading && !hasError;
  const noMatchesFound =
    people.length > 0 && filteredPeople.length === 0 && !hasError && !loading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length && !loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError">
                  {ErrorMesages.SOMETHING_WENT_WRONG}
                </p>
              )}

              {noPeopleFromServer && (
                <p data-cy="noPeopleMessage">
                  {ErrorMesages.NO_PEOPLE_ON_SERVER}
                </p>
              )}

              {noMatchesFound && <p>{ErrorMesages.NO_MATCH_SEARCH_CRITERIA}</p>}

              {showPeopleTable && (
                <PeopleTable
                  people={people}
                  findPersonByName={findPersonByName}
                  selectedPersonSlug={slug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
