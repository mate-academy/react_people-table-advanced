import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(result => {
        const peopleFromServerWithParents = result.map(person => ({
          ...person,
          mother: null,
          father: null,
        }));

        const peopleWithParents = peopleFromServerWithParents.map(person => ({
          ...person,
          mother: peopleFromServerWithParents
            .find(m => m.name === person.motherName) || null,
          father: peopleFromServerWithParents
            .find(f => f.name === person.fatherName) || null,
        }));

        setPeople(peopleWithParents);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  let visiblePeople = [...people];
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const desc = searchParams.get('order');

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query) {
    const queryLowerCase = query.toLocaleLowerCase();

    visiblePeople = visiblePeople.filter(person => {
      return [person.name,
        person.motherName || '',
        person.fatherName || '']
        .join('\n')
        .toLocaleLowerCase()
        .includes(queryLowerCase);
    });
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => (
      centuries.includes(Math.ceil(person.born / 100).toString())));
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

  if (desc) {
    visiblePeople.reverse();
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading ? <Loader /> : (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {isError && (
                  <p
                    data-cy="peopleLoadingError"
                    className="has-text-danger"
                  >
                    Something went wrong
                  </p>
                )}
                {!people.length ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (
                  <PeopleTable
                    people={visiblePeople}
                  />
                )}

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
