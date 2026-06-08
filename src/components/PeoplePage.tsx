import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') ?? '';
  const sex = searchParams.get('sex');
  const century = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = people.filter(person => {
    const matchesQuery =
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
      person.fatherName?.toLowerCase().includes(query.toLowerCase());
    const matchesSex = !sex || person.sex === sex;
    const matchesCentury =
      century.length === 0 ||
      century.includes(String(Math.ceil(person.born / 100)));

    return matchesQuery && matchesSex && matchesCentury;
  });

  let sortedPeople = [...visiblePeople].sort((a, b) => {
    if (sort === 'name' || sort === 'sex') {
      return (a[sort as keyof Person] as string).localeCompare(
        b[sort as keyof Person] as string,
      );
    }

    if (sort === 'born' || sort === 'died') {
      return (
        (a[sort as keyof Person] as number) -
        (b[sort as keyof Person] as number)
      );
    }

    return 0;
  });

  if (order === 'desc') {
    sortedPeople = sortedPeople.reverse();
  }

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!isLoading && !error && people.length > 0 && (
                <PeopleTable people={sortedPeople} />
              )}
              {!isLoading &&
                !error &&
                sortedPeople.length === 0 &&
                people.length > 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
