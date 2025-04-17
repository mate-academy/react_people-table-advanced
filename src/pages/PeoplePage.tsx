import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PeopleTable } from '../components/PeopleTable';
import { PersonLink } from '../components/PersonLink';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const getPersonByName = (name: string | null): Person | null => {
    if (!name) {
      return null;
    }

    return people.find(p => p.name === name) || null;
  };

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      const matchesQuery =
        person.name.toLowerCase().includes(query) ||
        person.sex.toLowerCase().includes(query);

      const matchesSex = sex ? person.sex === sex : true;

      const matchesCentury =
        centuries.length === 0 ||
        centuries.includes(Math.floor((person.born - 1) / 100 + 1).toString());

      return matchesQuery && matchesSex && matchesCentury;
    });
  }, [people, query, sex, centuries]);

  const sortedPeople = useMemo(() => {
    if (!sort) return filteredPeople;

    return [...filteredPeople].sort((a, b) => {
      const aValue = a[sort as keyof Person];
      const bValue = b[sort as keyof Person];

      if (aValue == null || bValue == null) {
        return 0;
      }

      if (order === 'desc') {
        return aValue < bValue ? 1 : -1;
      }

      return aValue > bValue ? 1 : -1;
    });
  }, [filteredPeople, sort, order]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (hasError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns">
          <div className="column">
            <div className="box table-container">
              {/* Сохраняем вашу логику с загрузкой, ошибкой и таблицей */}
              {!isLoading && !hasError && (
                <PeopleTable
                  persons={sortedPeople}
                  PersonLinkComponent={({ person }) => (
                    <PersonLink person={person} />
                  )}
                  getPersonByName={getPersonByName}
                />
              )}
            </div>
          </div>

          <div className="column is-7-tablet is-narrow-desktop">
            {/* Фильтры отображаются только если есть данные */}
            {people.length > 0 && <PeopleFilters />}
          </div>
        </div>
      </div>
    </>
  );
};
