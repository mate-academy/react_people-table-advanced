import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const filteredPeople = people
    .filter(person => !sex || person.sex === sex)
    .filter(
      person =>
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        (person.motherName ?? '').toLowerCase().includes(query.toLowerCase()) ||
        (person.fatherName ?? '').toLowerCase().includes(query.toLowerCase()),
    )
    .filter(
      person =>
        !centuries.length ||
        centuries.includes(String(Math.ceil(person.born / 100))),
    );

  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');
  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!sortField) {
      return 0;
    }

    let result = 0;

    if (sortField === 'name' || sortField === 'sex') {
      result = String(a[sortField]).localeCompare(String(b[sortField]));
    } else if (sortField === 'born' || sortField === 'died') {
      result = Number(a[sortField]) - Number(b[sortField]);
    }

    return sortOrder === 'desc' ? -result : result;
  });

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !isError && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !isError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !isError && people.length > 0 && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
