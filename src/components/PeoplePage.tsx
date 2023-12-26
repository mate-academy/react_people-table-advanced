import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { SortMethod } from '../types/Sort';

export const PeoplePage = () => {
  const [
    peopleFromServer,
    setPeopleFromServer,
  ] = useState<Person[] | null>(null);
  const [errorShowing, setErrorShowing] = useState(false);
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsPeopleLoading(true);
    getPeople()
      .then(setPeopleFromServer)
      .catch(() => setErrorShowing(true))
      .finally(() => setIsPeopleLoading(false));
  }, []);

  const peopleToView = useMemo(() => {
    if (!peopleFromServer || peopleFromServer.length === 0) {
      return [];
    }

    const sortMethod = searchParams.get('sort');
    const sortOrder = searchParams.get('order');

    const filteredPeople = [...peopleFromServer].filter(person => {
      const sex = searchParams.get('sex');
      const query = searchParams.get('query')?.toLowerCase();
      const century = searchParams.getAll('century');

      if (sex && sex !== person.sex) {
        return false;
      }

      if (query
        && !person.name.toLowerCase().includes(query)
        && !person.motherName?.toLowerCase().includes(query)
        && !person.fatherName?.toLowerCase().includes(query)
      ) {
        return false;
      }

      if (century.length > 0
        && !century.includes(`${+person.born.toString().slice(0, 2) + 1}`)) {
        return false;
      }

      return true;
    });

    return filteredPeople.sort((a, b) => {
      let result;

      switch (sortMethod) {
        case SortMethod.Born:
        case SortMethod.Died:
          result = a[sortMethod] - b[sortMethod];
          break;

        case SortMethod.Name:
        case SortMethod.Sex:
          result = a[sortMethod].localeCompare(b[sortMethod]);
          break;

        default:
          return 0;
      }

      if (sortOrder) {
        result *= -1;
      }

      return result;
    });
  }, [peopleFromServer, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {peopleFromServer && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isPeopleLoading && <Loader />}

              {errorShowing && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {/* <p>There are no people matching the current search criteria</p> */}

              {peopleFromServer && (
                <>
                  {peopleFromServer.length === 0 ? (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  ) : (
                    <PeopleTable people={peopleToView} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
