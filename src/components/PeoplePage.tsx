import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { SexFilter } from '../types/SexFilter';
import { getFilteredPeople } from '../utils/getFilteredPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || SexFilter.ALL;
  const centuries = searchParams.getAll('centuries') || [];

  const filteredPeople = getFilteredPeople(people, { sex, query, centuries });

  const fetchPeople = () => {
    setLoading(true);

    getPeople()
      .then(res => {
        const peopleWithParents = res.map(person => {
          const father = res.find(
            personFather => person.fatherName === personFather.name,
          );
          const mother = res.find(
            personMother => person.motherName === personMother.name,
          );

          return {
            ...person,
            father,
            mother,
          };
        });

        setPeople(peopleWithParents);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && <p data-cy="peopleLoadingError">{error}</p>}

              {!people.length && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {filteredPeople.length === 0 && !loading ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                !loading && <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
