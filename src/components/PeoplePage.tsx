import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sexFilter = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        setVisiblePeople([...peopleFromServer].map(person => {
          return {
            ...person,
            mother: peopleFromServer
              .find(mother => mother.name === person.motherName),
            father: peopleFromServer
              .find(father => father.name === person.fatherName),
          };
        }));
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            {loading
              ? <Loader />
              : (
                <>
                  <div className="column is-7-tablet is-narrow-desktop">
                    <PeopleFilters
                      searchParams={searchParams}
                      setSearchParams={setSearchParams}
                      query={query}
                      sexFilter={sexFilter}
                      centuries={centuries}
                    />
                  </div>

                  <div className="column">
                    <div className="box table-container">
                      <PeopleTable
                        people={visiblePeople}
                        error={error}
                        searchParams={searchParams}
                        query={query}
                        sexFilter={sexFilter}
                        centuries={centuries}
                      />
                    </div>
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
