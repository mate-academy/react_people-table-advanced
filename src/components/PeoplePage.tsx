import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person/Person';
import { SortOrder } from '../types/SortOrder';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>({});
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    setIsLoading(true);
    setPeople([]);

    getPeople()
      .then(data => {
        const dataWithParents = data.map(person => {
          const foundFather = data.find(
            findingFather => findingFather.name === person.fatherName,
          );
          const foundMother = data.find(
            findingMother => findingMother.name === person.motherName,
          );

          return {
            ...person,
            mother: foundMother || undefined,
            father: foundFather || undefined,
          };
        });

        setPeople(dataWithParents);
        setVisiblePeople(dataWithParents);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
        setPeople([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // PeoplePage.tsx
  const sortPeople = (persons: Person[], order: SortOrder) => {
    const foundEntry = Object.entries(order).find(([, v]) => v !== undefined);

    if (!foundEntry) {
      return persons;
    }

    const [sortKey, direction] = foundEntry as [keyof Person, 'asc' | 'desc'];
    const isNumber = sortKey === 'born' || sortKey === 'died';

    return [...persons].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];

      if (isNumber) {
        const na = (typeof av === 'number' ? av : Number(av ?? NaN)) ?? NaN;
        const nb = (typeof bv === 'number' ? bv : Number(bv ?? NaN)) ?? NaN;
        const cmp = na - nb || 0;

        return direction === 'asc' ? cmp : -cmp;
      }

      const sa = String(av ?? '').toLowerCase();
      const sb = String(bv ?? '').toLowerCase();
      const cmp = sa.localeCompare(sb);

      return direction === 'asc' ? cmp : -cmp;
    });
  };

  useEffect(() => {
    let result = [...people];

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (query) {
      const q = query.trim().toLowerCase();

      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          (p.motherName?.toLowerCase().includes(q) ?? false) ||
          (p.fatherName?.toLowerCase().includes(q) ?? false),
      );
    }

    if (centuries.length > 0) {
      result = result.filter(person => {
        const bornCentury = String(Math.ceil(person.born / 100));

        return centuries.includes(bornCentury);
      });
    }

    result = sortPeople(result, sortOrder);

    setVisiblePeople(prevVisiblepeople => {
      if (JSON.stringify(prevVisiblepeople) !== JSON.stringify(result)) {
        return result;
      }

      return prevVisiblepeople;
    });
  }, [sex, query, centuries, people, sortOrder]);

  useEffect(() => {
    const sort = searchParams.get('sort') as keyof Person | null; // 'name' | 'sex' | 'born' | 'died'
    const order = searchParams.get('order'); // 'desc' | null

    const next: SortOrder = {};

    if (sort) {
      next.name =
        sort === 'name' ? (order === 'desc' ? 'desc' : 'asc') : undefined;
      next.sex =
        sort === 'sex' ? (order === 'desc' ? 'desc' : 'asc') : undefined;
      next.born =
        sort === 'born' ? (order === 'desc' ? 'desc' : 'asc') : undefined;
      next.died =
        sort === 'died' ? (order === 'desc' ? 'desc' : 'asc') : undefined;
    }

    setSortOrder(next);
  }, [searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && people.length > 0 && (
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                sex={sex}
                query={query}
                centuries={centuries}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !isError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {
                // prettier-ignore
                !isLoading &&
                  !isError &&
                  people.length > 0 &&
                  visiblePeople.length === 0 && (
                  <p>
                      There are no people matching the current search criteria
                  </p>
                )
              }

              {!isLoading && !isError && visiblePeople.length > 0 && (
                <PeopleTable
                  visiblePeople={visiblePeople}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
