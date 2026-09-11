import { useEffect, useState } from 'react';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setShowError(false);
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setShowError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const query = searchParams.get('query') || '';
  const normalizedQuery = query.toLowerCase();
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const isInCentury = (born: number, century: string) => {
    const start = (+century - 1) * 100;
    const end = +century * 100 - 1;

    return born >= start && born <= end;
  };

  const filteredPeople = people.filter(person => {
    const name = person.name.toLowerCase();
    const motherName = person.motherName?.toLowerCase() ?? '';
    const fatherName = person.fatherName?.toLowerCase() ?? '';

    const matchesQuery =
      name.includes(normalizedQuery) ||
      motherName.includes(normalizedQuery) ||
      fatherName.includes(normalizedQuery);

    const matchesCentury =
      centuries.length === 0 ||
      centuries.some(century => isInCentury(person.born, century));

    const matchesSex = sex === '' || person.sex === sex;

    return matchesQuery && matchesCentury && matchesSex;
  });

  if (sort) {
    filteredPeople.sort((a, b) => {
      const sortField = sort as keyof Person;
      const aValue = a[sortField] ?? '';
      const bValue = b[sortField] ?? '';

      let compare: number;

      if (sortField === 'born' || sortField === 'died') {
        compare = Number(aValue) - Number(bValue);
      } else {
        compare =
          String(aValue) > String(bValue)
            ? 1
            : String(aValue) < String(bValue)
              ? -1
              : 0;
      }

      return order === 'desc' ? -compare : compare;
    });
  }

  const hasNoMatches = people.length > 0 && filteredPeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !showError && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {showError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !isLoading && !showError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasNoMatches && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !showError && !hasNoMatches && (
                <PeopleTable filteredPeople={filteredPeople} people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
