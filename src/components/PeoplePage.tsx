import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredPeople = useMemo(() => {
    const query = searchParams.get('query')?.toLowerCase() || '';
    const centuries = searchParams.getAll('centuries');

    return people.filter(p => {
      const matchesQuery =
        !query ||
        [p.name, p.motherName, p.fatherName].some(val => {
          return val?.toLowerCase().includes(query);
        });

      const century = Math.ceil(p.born / 100).toString();
      const matchesCentury =
        centuries.length === 0 || centuries.includes(century);

      return matchesQuery && matchesCentury;
    });
  }, [people, searchParams]);

  const sortedPeople = useMemo(() => {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');
    const result = [...filteredPeople];

    if (sort) {
      result.sort((a, b) => {
        const aVal = a[sort as keyof Person] || '';
        const bVal = b[sort as keyof Person] || '';

        if (aVal > bVal) {
          return order === 'desc' ? -1 : 1;
        }

        if (aVal < bVal) {
          return order === 'desc' ? 1 : -1;
        }

        return 0;
      });
    }

    return result;
  }, [filteredPeople, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!isLoading && !isError && (
          <>
            {people.length === 0 ? (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ) : (
              <PeopleTable people={sortedPeople} totalPeople={people.length} />
            )}
          </>
        )}
      </div>
    </>
  );
};
