import { useEffect, useState } from 'react';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { NameFilter } from './NameFilter';
import { CenturyFilter } from './CenturyFilter';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch (error) {
        setErrorMessage('Unable to load people');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterAndSortPeople = (data: Person[]) => {
    const query = searchParams.get('query')?.toLowerCase() || '';
    const centuries = searchParams.getAll('century');
    const sortField = searchParams.get('sort');
    const sortOrder = searchParams.get('order');

    let filteredPeople = data;

    if (query) {
      filteredPeople = filteredPeople.filter(
        person =>
          (person.name?.toLowerCase() || '').includes(query) ||
          (person.motherName?.toLowerCase() || '').includes(query) ||
          (person.fatherName?.toLowerCase() || '').includes(query),
      );
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(person => {
        const personCentury = Math.floor(person.born / 100);

        return centuries.includes(personCentury.toString());
      });
    }

    if (sortField) {
      filteredPeople = filteredPeople.sort((a, b) => {
        const aValue = a[sortField as keyof Person] || '';
        const bValue = b[sortField as keyof Person] || '';

        if (aValue < bValue) {
          return sortOrder === 'desc' ? 1 : -1;
        }

        if (aValue > bValue) {
          return sortOrder === 'desc' ? -1 : 1;
        }

        return 0;
      });
    }

    return filteredPeople;
  };

  const filteredAndSortedPeople = filterAndSortPeople(people);

  const noDataAvailable =
    !isLoading && !errorMessage && filteredAndSortedPeople.length === 0;
  const dataAvailable =
    !isLoading && !errorMessage && filteredAndSortedPeople.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>
      {people.length > 0 && (
        <div className="sidebar">
          <NameFilter />
          <CenturyFilter />
        </div>
      )}

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {!isLoading && errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}
          {noDataAvailable && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {dataAvailable && <PeopleTable people={filteredAndSortedPeople} />}
        </div>
      </div>
    </>
  );
};
