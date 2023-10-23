import { useEffect, useState } from 'react';
import { Person } from '../../types/Person';

import { PeopleFilters } from '../FilterBox/PeopleFilter';
import { Loader } from '../Loader';
import { PeopleTable } from '../Table/PeopleTable';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setLoading(true);

        const result = await getPeople();

        setPeople(result);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !people?.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
