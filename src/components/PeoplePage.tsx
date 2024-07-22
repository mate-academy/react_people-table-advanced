import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(p => p.sex === sex);
  }

  if (query) {
    const normalizedQuery = query.toLocaleLowerCase();

    filteredPeople = filteredPeople.filter(person => {
      const name = person.name || '';
      const motherName = person.motherName || '';
      const fatherName = person.fatherName || '';

      const combinedNames =
        `${name} ${motherName} ${fatherName}`.toLocaleLowerCase();

      return combinedNames.includes(normalizedQuery);
    });
  }

  if (centuries.length > 0) {
    const getCentury = (born: number) => Math.ceil(born / 100);

    filteredPeople = filteredPeople.filter((person: Person) => {
      const century = getCentury(person.born).toString();

      return centuries.includes(century);
    });
  }

  if (sort) {
    const sortDirection = order ? -1 : 1;

    filteredPeople.sort((a, b) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]) * sortDirection;
        case 'born':
        case 'died':
          return (a[sort] - b[sort]) * sortDirection;
        default:
          return 0;
      }
    });
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !!people.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {errorMessage && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      {errorMessage}
                    </p>
                  )}

                  {!people.length && !errorMessage && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {!!people.length && <PeopleTable people={filteredPeople} />}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
