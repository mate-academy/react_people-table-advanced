import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { Filters, Order, Person, Sex, SortField } from '../types';
import { getPeople } from '../api';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export function getFilteredPeople(
  people: Person[],
  filters: Filters,
): Person[] {
  let result = [...people];
  const { sex, query, centuries } = filters;

  if (sex) {
    result = result.filter(person => person.sex === sex);
  }

  if (query) {
    result = result.filter(person =>
      [person.name, person.motherName, person.fatherName].some(field =>
        field?.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }

  if (centuries.length) {
    result = result.filter(person => {
      const bornCentury = Math.ceil(person.born / 100);

      return centuries.includes(bornCentury);
    });
  }

  return result;
}

type Sort = {
  sortField: SortField;
  order: Order;
};

export function getSortedPeople(
  people: Person[],
  sort?: Sort | null,
): Person[] {
  if (!sort || !sort.sortField) {
    return people;
  }

  const { sortField, order } = sort;

  const sortedPeople = [...people].sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueA.localeCompare(valueB);
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueA - valueB;
    }

    return 0;
  });

  return order === 'desc' ? sortedPeople.reverse() : sortedPeople;
}

export const PeoplePage: React.FC = () => {
  const { slug } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setIsloading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setShowError(true);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  const sortedPeople = useMemo(() => {
    const query = searchParams.get('query');
    const centuries = searchParams.getAll('centuries').map(c => Number(c));
    const sex = searchParams.get('sex') as Sex | null;
    const sortField = searchParams.get('sort') as SortField | null;
    const order = searchParams.get('order') === 'desc' ? Order.DESC : Order.ASC;

    const filters = {
      query: query ?? '',
      centuries,
      sex,
    };

    const sortOptions = !sortField ? null : { sortField, order };
    const filtered = getFilteredPeople(people, filters);
    const sorted = getSortedPeople(filtered, sortOptions);

    return sorted;
  }, [people, searchParams]);

  const sortField = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order') === 'desc' ? Order.DESC : Order.ASC;

  const handleSearchChange = (clickedField: SortField) => {
    let nextSort: SortField | null = null;
    let nextOrder: Order | null = null;

    if (sortField !== clickedField) {
      nextSort = clickedField;
      nextOrder = Order.ASC;
    } else if (order !== Order.DESC) {
      nextSort = clickedField;
      nextOrder = Order.DESC;
    } else {
      nextSort = null;
      nextOrder = null;
    }

    const nextSearch = new URLSearchParams(searchParams.toString());

    if (nextSort === null) {
      nextSearch.delete('sort');
      nextSearch.delete('order');
    } else {
      nextSearch.set('sort', nextSort);
    }

    if (nextOrder === Order.DESC) {
      nextSearch.set('order', 'desc');
    } else {
      nextSearch.delete('order');
    }

    setSearchParams(nextSearch);
  };

  const noMatchingPeople =
    !isLoading && !showError && people.length > 0 && sortedPeople.length === 0;

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
              />
            )}
          </div>
          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <PeopleTable
                  people={sortedPeople}
                  slug={slug}
                  currentSortField={sortField}
                  currentOrder={order}
                  onSearchChange={handleSearchChange}
                />
              )}

              {showError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !showError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {noMatchingPeople && (
                <p data-cy="noMatchMessage">
                  There are no people matching the current search criteria
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
