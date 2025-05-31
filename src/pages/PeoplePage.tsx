import { useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from '../components/PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('century');
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
        (person.motherName &&
          person.motherName.toLowerCase().includes(query)) ||
        (person.fatherName &&
          person.fatherName.toLowerCase().includes(query)) ||
        person.sex.toLowerCase().includes(query);

      const matchesSex = sex ? person.sex === sex : true;

      const matchesCentury =
        centuries.length === 0 ||
        centuries.includes(Math.floor((person.born - 1) / 100 + 1).toString());

      return matchesQuery && matchesSex && matchesCentury;
    });
  }, [people, query, sex, centuries]);

  const sortedPeople = useMemo(() => {
    if (!sort) {
      return filteredPeople;
    }

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
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {!isLoading &&
                !hasError &&
                (filteredPeople.length === 0 ? (
                  <p data-cy="noPeopleMessage">
                    There are no people matching the current search criteria
                  </p>
                ) : (
                  <PeopleTable
                    people={sortedPeople}
                    PersonLinkComponent={({ person }) => (
                      <PersonLink person={person} />
                    )}
                    getPersonByName={getPersonByName}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
