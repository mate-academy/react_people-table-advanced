import { useEffect, useMemo, useState } from 'react'; //
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'; //
import { getPeople } from '../api'; //
import { Person } from '../types/Person'; //
import { Loader } from './Loader'; //
import { PeopleFilters } from './PeopleFilters'; //
import { PeopleTable } from './PeopleTable'; //

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();
  const navigate = useNavigate();

  // Сортування з URL
  const sortByParam = searchParams.get('sortBy') as keyof Person | null;
  const sortOrderParam = searchParams.get('sortOrder') as
    | 'asc'
    | 'desc'
    | 'default'
    | null;

  const [sortBy, setSortBy] = useState<keyof Person | null>(sortByParam);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'default'>(
    sortOrderParam || 'default',
  );

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const data = await getPeople();

        setPeople(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      const nameFilter = searchParams.get('name')?.toLowerCase() || '';
      const sexFilter = searchParams.get('sex');
      const centuryFilters = searchParams.getAll('centuries');

      if (nameFilter && !person.name.toLowerCase().includes(nameFilter)) {
        return false;
      }

      if (sexFilter && person.sex !== sexFilter) {
        return false;
      }

      if (centuryFilters.length > 0) {
        const century = Math.ceil(person.born / 100);

        if (!centuryFilters.includes(String(century))) {
          return false;
        }
      }

      return true;
    });
  }, [people, searchParams]);

  const sortedPeople = useMemo(() => {
    if (!sortBy || sortOrder === 'default') {
      return filteredPeople;
    }

    return [...filteredPeople].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue == null) {
        return 1;
      }

      if (bValue == null) {
        return -1;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return sortOrder === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [filteredPeople, sortBy, sortOrder]);

  const handleSort = (field: keyof Person) => {
    let nextOrder: 'asc' | 'desc' | 'default' = 'asc';

    if (sortBy === field) {
      nextOrder =
        sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? 'default' : 'asc';
    }

    const newSortBy = nextOrder === 'default' ? null : field;

    setSortBy(newSortBy);
    setSortOrder(nextOrder);

    const newParams = new URLSearchParams(searchParams);

    if (newSortBy) {
      newParams.set('sortBy', newSortBy);
      newParams.set('sortOrder', nextOrder);
    } else {
      newParams.delete('sortBy');
      newParams.delete('sortOrder');
    }

    setSearchParams(newParams);
  };

  const handleSlugChange = (newSlug: string | null) => {
    const base = '/people';
    const newPath = newSlug ? `${base}/${newSlug}` : base;

    navigate({
      pathname: newPath,
      search: `?${searchParams.toString()}`,
    });
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!isLoading && !error && sortedPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}
              {!isLoading && !error && sortedPeople.length > 0 && (
                <PeopleTable
                  people={sortedPeople}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                  selectedSlug={slug || null}
                  onSlugChange={handleSlugChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
