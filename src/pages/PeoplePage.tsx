import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    getPeople()
      .then(data => setPeople(data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const filteredPeople = useMemo(() => {
    return people.filter(p => {
      const matchesQuery =
        !query ||
        [p.name, p.motherName, p.fatherName].some(val =>
          val?.toLowerCase().includes(query.toLowerCase()),
        );

      const matchesSex = !sex || p.sex === sex;

      const century = Math.ceil(p.born / 100).toString();
      const matchesCentury =
        centuries.length === 0 || centuries.includes(century);

      return matchesQuery && matchesSex && matchesCentury;
    });
  }, [people, query, sex, centuries]);

  const sortedPeople = useMemo(() => {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (!sort) {
      return filteredPeople;
    }

    return [...filteredPeople].sort((a, b) => {
      let aVal = a[sort as keyof Person];
      let bVal = b[sort as keyof Person];

      if (sort === 'born' || sort === 'died') {
        aVal = Number(aVal);
        bVal = Number(bVal);
      } else {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }

      if (aVal > bVal) {
        return order === 'desc' ? -1 : 1;
      }

      if (aVal < bVal) {
        return order === 'desc' ? 1 : -1;
      }

      return 0;
    });
  }, [filteredPeople, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !isError && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters query={query} sex={sex} centuries={centuries} />
            </div>
          )}

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

              {!isLoading && !isError && people.length > 0 && (
                <>
                  {filteredPeople.length === 0}

                  <PeopleTable
                    people={sortedPeople}
                    totalPeople={people.length}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
