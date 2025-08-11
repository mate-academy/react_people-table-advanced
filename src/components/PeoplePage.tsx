import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Person } from '../types';
import { DispatchContext, StateContext } from '../store/GlobalContextProvider';
import { peopleService } from '../utils/peopleService';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const { people, searchResultCount } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const hasError = !loading && errorMessage;
  const hasNoPeople = !loading && !errorMessage && !people.length;
  const showPeople = !loading && !hasError && !hasNoPeople;
  const noResultsFound =
    !loading && !hasError && !hasNoPeople && searchResultCount;

  const findParent = useCallback(
    (parentName: string | null, allPeople: Person[]) => {
      if (!parentName || !allPeople) {
        return;
      }

      return allPeople.find(individual => individual.name === parentName);
    },
    [],
  );

  const addParents = useCallback(
    (allPeople: Person[]) => {
      return allPeople.map(individual => {
        return {
          ...individual,
          mother: findParent(individual.motherName, allPeople),
          father: findParent(individual.fatherName, allPeople),
        };
      });
    },
    [findParent],
  );

  const setPeople = useCallback(
    (peopleFromServer: Person[]) => {
      dispatch({ type: 'setPeople', payload: addParents(peopleFromServer) });
    },
    [addParents, dispatch],
  );

  useEffect(() => {
    setTimeout(
      () =>
        peopleService
          .retrievePeople()
          .then(setPeople)
          .catch(() => setErrorMessage('Something went wrong'))
          .finally(() => setLoading(false)),
      100,
    );
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {showPeople && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {hasNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noResultsFound && (
                <p>There are no people matching the current search criteria</p>
              )}

              {showPeople && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
