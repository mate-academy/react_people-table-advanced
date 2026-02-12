import React, { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';

const getVisiblePeople = (
  people: Person[],
  filters: {
    query: string;
    sex: string | null;
    centuries: string[];
    sortBy: string | null;
    order: string | null;
  },
) => {
  const { query, sex, centuries, sortBy, order } = filters;

  let result = people.filter(person => {
    const matchesQuery =
      !query ||
      [person.name, person.motherName, person.fatherName].some(field =>
        field?.toLowerCase().includes(query),
      );

    const matchesSex = !sex || person.sex === sex;

    const personCentury = Math.ceil(person.died / 100).toString();
    const matchesCentury =
      centuries.length === 0 || centuries.includes(personCentury);

    return matchesQuery && matchesSex && matchesCentury;
  });

  if (sortBy) {
    result = [...result].sort((firstPerson, secondPerson) => {
      const firstValue = firstPerson[sortBy as keyof Person] ?? '';
      const secondValue = secondPerson[sortBy as keyof Person] ?? '';

      const comparison =
        typeof firstValue === 'string'
          ? firstValue.localeCompare(secondValue as string)
          : (firstValue as number) - (secondValue as number);

      return order === 'desc' ? -comparison : comparison;
    });
  }

  return result;
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  const query = (searchParams.get('query') || '').toLowerCase();
  const sex = searchParams.get('sex');
  const sortBy = searchParams.get('sort');
  const order = searchParams.get('order');
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
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

  const visiblePeople = useMemo(() => {
    return getVisiblePeople(people, {
      query,
      sex,
      centuries,
      sortBy,
      order,
    });
  }, [people, query, sex, sortBy, order, centuries]);

  const showEmptyMessage = !isLoading && !isError && people.length === 0;
  const showTable = !isLoading && !isError && people.length > 0;
  const showErrorMessage = !isLoading && isError;
  const showPeopleFilter = !isLoading && people.length > 0;
  const isFilteredEmpty = visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {showPeopleFilter && <PeopleFilters />}
          </div>
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {showErrorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {showEmptyMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showTable && (
                <>
                  <PeopleTable people={visiblePeople} />

                  {isFilteredEmpty && (
                    <p className="mt-4">No people matching the filters</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
