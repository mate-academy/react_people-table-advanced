import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');

  const [searchParams] = useSearchParams();

  const loadPeople = () => {
    setIsLoading(true);
    setError('');

    getPeople()
      .then(res => {
        const peopleWithFamily = res.map(person => {
          const father = res.find(p => p.name === person.fatherName);
          const mother = res.find(p => p.name === person.motherName);

          return {
            ...person,
            father,
            mother,
          };
        });

        setPeople(peopleWithFamily);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];

  const filteredPeople = getFilteredPeople(people, { sex, query, centuries });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !error && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && !error && <Loader />}

              {error && <p data-cy="peopleLoadingError">{error}</p>}

              {people.length === 0 && !error && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {filteredPeople.length === 0 && !isLoading ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                !isLoading && <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
