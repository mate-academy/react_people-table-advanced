import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleFilters } from '../../components/PeopleFilters';
import { PeopleTable } from '../../components/PeopleTable';
import { Loader } from '../../components/Loader';
import { useSearchParams } from 'react-router-dom';

function getFiltredPeople(
  incomePeople: Person[],
  query: string,
  sex: string | null,
  centuries: string[],
  sort: string | null,
  order: string | null,
) {
  const normalizedQuery = query.trim().toLowerCase();
  let filtredPeople = [...incomePeople];

  if (normalizedQuery) {
    filtredPeople = filtredPeople.filter(
      person =>
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (sex) {
    switch (sex) {
      case 'm':
        filtredPeople = filtredPeople.filter(person => person.sex === 'm');
        break;

      case 'f':
        filtredPeople = filtredPeople.filter(person => person.sex === 'f');
        break;

      default:
        return filtredPeople;
    }
  }

  if (centuries.length > 0) {
    filtredPeople = filtredPeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(String(century));
    });
  }

  if (sort) {
    filtredPeople.sort((a, b) => {
      const valueA = a[sort as keyof Person];
      const valueB = b[sort as keyof Person];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return order === 'desc'
          ? valueB.localeCompare(valueA)
          : valueA.localeCompare(valueB);
      }

      return order === 'desc'
        ? Number(valueB) - Number(valueA)
        : Number(valueA) - Number(valueB);
    });
  }

  return filtredPeople;
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = getFiltredPeople(
    people,
    query,
    sex,
    centuries,
    sort,
    order,
  );

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {!isLoading && error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isLoading && !error && (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                setSearchParams={setSearchParams}
                sex={sex}
                centuries={centuries}
              />
            </div>

            <div className="column">
              <div className="box table-container">
                <PeopleTable
                  visiblePeople={visiblePeople}
                  people={people}
                  isLoading={isLoading}
                  error={error}
                  sort={sort}
                  order={order}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
