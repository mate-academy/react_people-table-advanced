import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { useSearchParams } from 'react-router-dom';
import { filterAndSort } from '../../utils/filterAndSort';
import { FindParent } from '../../utils/findParent';

export const PeoplePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(peopleFromServer => {
        setPeople(FindParent(peopleFromServer));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = filterAndSort(people, searchParams);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !error && people.length !== 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !error && (
                <>
                  {!people.length && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                  {!!people.length && !visiblePeople.length && (
                    <p data-cy="noPeopleMessage">
                      There are no people matching the current search criteria
                    </p>
                  )}
                </>
              )}

              {!!people.length && <PeopleTable people={visiblePeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
