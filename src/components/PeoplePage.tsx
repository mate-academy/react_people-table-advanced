import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import type { Person } from '../types/Person';

export const PeoplePage = () => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  useEffect(() => {
    setLoaded(false);

    getPeople()
      .then(peopleFromServer => {
        const preparedPeople = peopleFromServer.map(p => ({ ...p }));

        preparedPeople.forEach(person => {
          Object.assign(person, {
            mother:
              preparedPeople.find(m => m.name === person.motherName) || null,
            father:
              preparedPeople.find(f => f.name === person.fatherName) || null,
          });
        });

        setPeople(preparedPeople);
      })
      .catch(() => setError(true))
      .finally(() => setLoaded(true));
  }, []);

  let visiblePeople = [...people];

  // #region Filtering and sorting
  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    const getCentury = (person: Person) => Math.ceil(person.born / 100);

    visiblePeople = visiblePeople.filter(person =>
      centuries.includes(getCentury(person).toString()),
    );
  }

  if (query) {
    const lowerQuery = query.toLocaleLowerCase();

    visiblePeople = visiblePeople.filter(p => {
      return [p.name, p.motherName || '', p.fatherName || '']
        .join('\n')
        .toLocaleLowerCase()
        .includes(lowerQuery);
    });
  }

  if (sortField) {
    visiblePeople.sort((a, b) => {
      switch (sortField) {
        case 'name':
        case 'sex':
          return a[sortField].localeCompare(b[sortField]);

        case 'born':
        case 'died':
          return a[sortField] - b[sortField];

        default:
          return 0;
      }
    });

    if (isReversed) {
      visiblePeople.reverse();
    }
  }

  return (
    <>
      <h1 className="title mt-6">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {loaded && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {!loaded && <Loader />}

              {loaded && hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {loaded && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {loaded && !hasError && people.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
