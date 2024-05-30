import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  useEffect(() => {
    setLoaded(true);

    getPeople()
      .then(peopleData => {
        const preparedPeople = peopleData.map(p => ({ ...p }));

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
      .catch(() => setHasError(true))
      .finally(() => setLoaded(false));
  }, []);

  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query) {
    const normalizeText = query.toLocaleLowerCase();

    visiblePeople = visiblePeople.filter(person => {
      return [person.name, person.motherName || '', person.fatherName || '']
        .join('/n')
        .toLocaleLowerCase()
        .includes(normalizeText);
    });
  }

  if (centuries.length > 0) {
    const getCenturies = (person: Person) => Math.ceil(person.born / 100);

    visiblePeople = visiblePeople.filter(person =>
      centuries.includes(getCenturies(person).toString()),
    );
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
  }

  if (isReversed) {
    visiblePeople.reverse();
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loaded && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loaded && <Loader />}

              {!loaded && hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loaded && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loaded && !hasError && people.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}

              {!loaded && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
