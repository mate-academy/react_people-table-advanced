import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { usePeople } from '../utils/usePeople';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export const PeoplePage = () => {
  const { peopleData, isLoading, error } = usePeople();

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const order = searchParams.get('order');
  const sortField = searchParams.get('sort');

  const visiblePeople = useMemo(() => {
    let result = peopleData;

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (query) {
      result = result.filter(person =>
        [person.name, person.motherName, person.fatherName].some(val =>
          val?.toLowerCase().includes(query),
        ),
      );
    }

    if (centuries.length > 0) {
      result = result.filter(person => {
        const bornCentury = Math.floor(person.born / 100) + 1;

        return centuries.includes(String(bornCentury));
      });
    }

    if (sortField) {
      const sorted = [...result].sort((item1, item2) => {
        const val1 = item1[sortField as keyof typeof item1];
        const val2 = item2[sortField as keyof typeof item2];

        if (typeof val1 === 'number' || typeof val2 === 'number') {
          const num1 =
            typeof val1 === 'number'
              ? val1
              : order === 'desc'
                ? Number.NEGATIVE_INFINITY
                : Number.POSITIVE_INFINITY;

          const num2 =
            typeof val2 === 'number'
              ? val2
              : order === 'desc'
                ? Number.NEGATIVE_INFINITY
                : Number.POSITIVE_INFINITY;

          return order === 'desc' ? num2 - num1 : num1 - num2;
        }

        if (typeof val1 === 'string' && typeof val2 === 'string') {
          return order === 'desc'
            ? val2.localeCompare(val1)
            : val1.localeCompare(val2);
        }

        return 0;
      });

      result = sorted;
    }

    return result;
  }, [peopleData, query, centuries, sortField, order, sex]);

  const isFiltered =
    query.length > 0 ||
    centuries.length > 0 ||
    sortField !== null ||
    order !== null ||
    sex.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !error && <PeopleFilters />}
          </div>

          <PeopleTable
            people={visiblePeople}
            isLoading={isLoading}
            error={error}
            isFiltered={isFiltered}
            sort={sortField || ''}
            order={order}
          />
        </div>
      </div>
    </>
  );
};
