import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
export const PeoplePage = () => {
  const [searchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const query = searchParams.get('query') || '';
  const [sortValue, setSortValue] = useState('');
  const [, setCentury] = useState('');

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeopleList = people
    .filter(person => {
      const lowerQuery = query.toLowerCase();

      return (
        person.name.toLowerCase().includes(lowerQuery) ||
        (person.fatherName !== null &&
          person.fatherName.toLowerCase().includes(lowerQuery)) ||
        (person.motherName !== null &&
          person.motherName.toLowerCase().includes(lowerQuery))
      );
    })
    .filter(person => {
      if (sortValue === 'All') {
        return true;
      }

      if (sortValue === 'Male') {
        return person.sex === 'm';
      }

      if (sortValue === 'Female') {
        return person.sex === 'f';
      }

      return true;
    })
    .filter(person => {
      const bornCentury = Math.floor(person.born / 100) + 1;

      if (searchParams.getAll('centuries').length === 0) {
        return true;
      }

      return searchParams.getAll('centuries').includes(String(bornCentury));
    });

  if (sort) {
    filteredPeopleList.sort((a, b) => {
      const aValue = a[sort as keyof typeof a];
      const bValue = b[sort as keyof typeof b];

      if (aValue === null || bValue === null) {
        return 0;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'desc'
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      }

      return order === 'desc'
        ? (bValue as number) - (aValue as number)
        : (aValue as number) - (bValue as number);
    });
  }

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
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !isError && people.length > 0 && (
              <PeopleFilters
                query={query}
                setSortValue={setSortValue}
                setCentury={setCentury}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!isLoading && !isError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !isError && !filteredPeopleList.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !isError && !!filteredPeopleList.length && (
                <PeopleTable people={filteredPeopleList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
