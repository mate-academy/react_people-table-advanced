import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoaging] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const years = searchParams.getAll('years');
  const sortField = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  useEffect(() => {
    setIsLoaging(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => setIsLoaging(false));
  }, []);

  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query) {
    const normalQuery = query.toLocaleLowerCase();

    visiblePeople = visiblePeople.filter(person => {
      return [person.name, person.motherName || '', person.fatherName || '']
        .join('\n')
        .toLocaleLowerCase()
        .includes(normalQuery);
    });
  }

  if (years.length > 0) {
    visiblePeople = visiblePeople.filter(person =>
      years.includes(Math.ceil(person.born / 100).toString()),
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

    if (isReversed) {
      visiblePeople.reverse();
    }
  }

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
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !isLoading ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                ''
              )}

              {!isLoading && errorMessage === '' && (
                <PeopleTable
                  people={visiblePeople}
                  peopleFromServer={[...people]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
