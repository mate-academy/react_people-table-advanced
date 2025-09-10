import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { usePeople } from '../utils/usePeople';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export const PeoplePage = () => {
  const { people, isLoading, error } = usePeople();

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex') || '';

  const visiblePeople = useMemo(() => {
    let result = people;

    if (query) {
      result = result.filter(p =>
        [p.name, p.motherName, p.fatherName].some(val =>
          val?.toLowerCase().includes(query),
        ),
      );
    }

    if (centuries.length > 0) {
      result = result.filter(p => {
        const bornCentury = Math.floor(p.born / 100) + 1;
        return centuries.includes(String(bornCentury));
      });
    }

    if (sex) {
      result = result.filter(p => p.sex === sex);
    }

    if (sortField) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortField as keyof typeof a];
        const bVal = b[sortField as keyof typeof b];

        if (aVal === undefined || bVal === undefined) return 0;

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return order === 'desc'
            ? bVal.localeCompare(aVal)
            : aVal.localeCompare(bVal);
        }

        return order === 'desc'
          ? (bVal as number) - (aVal as number)
          : (aVal as number) - (bVal as number);
      });
    }

    return result;
  }, [people, query, centuries, sortField, order, sex]);

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
