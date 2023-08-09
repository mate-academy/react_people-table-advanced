import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
                    <PeopleFilters />
                  </div>

                  <div className="column">
                    <div className="box table-container">
                      <PeopleTable
                        people={visiblePeople}
                        error={error}
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
