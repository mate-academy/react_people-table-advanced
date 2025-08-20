import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { getSearchWith } from '../utils/searchHelper';
import { SearchParams } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams
    .getAll('centuries')
    .map(cent => parseInt(cent));
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const setSearchWith = (params: SearchParams) => {
    const newSearch = getSearchWith(searchParams, params);

    setSearchParams(newSearch);
  };

  const handleQueryChange = (newQuery: string) => {
    setSearchWith({ query: newQuery || null });
  };

  const handleSexChange = (newSex: string) => {
    setSearchWith({ sex: newSex || null });
  };

  const handleCenturiesChange = (newCenturies: number[]) => {
    setSearchWith({
      centuries: newCenturies.length > 0 ? newCenturies.map(String) : null,
    });
  };

  const handleSortChange = (newSort: string) => {
    if (sort !== newSort) {
      setSearchWith({ sort: newSort, order: null });
    } else if (order === 'desc') {
      setSearchWith({ sort: null, order: null });
    } else {
      setSearchWith({ sort: newSort, order: order ? null : 'desc' });
    }
  };

  const filteredAndSortedPeople = useMemo(() => {
    let filtered = people;

    if (query) {
      const lowerQuery = query.toLowerCase();

      filtered = filtered.filter(
        person =>
          person.name.toLowerCase().includes(lowerQuery) ||
          person.motherName?.toLowerCase().includes(lowerQuery) ||
          person.fatherName?.toLowerCase().includes(lowerQuery),
      );
    }

    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(person => {
        const bornCentury = Math.ceil(person.born / 100);

        return centuries.includes(bornCentury);
      });
    }

    if (sort) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sort as keyof Person];
        const bValue = b[sort as keyof Person];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return order === 'desc'
            ? bValue.localeCompare(aValue)
            : aValue.localeCompare(bValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return order === 'desc' ? bValue - aValue : aValue - bValue;
        }

        return 0;
      });
    }

    return filtered;
  }, [people, query, sex, centuries, sort, order]);

  const showLoader = loading;
  const showError = !loading && error;
  const showNoPeople = !loading && !error && people.length === 0;
  const showNoResults =
    !loading &&
    !error &&
    people.length > 0 &&
    filteredAndSortedPeople.length === 0;
  const showTable = !loading && !error && filteredAndSortedPeople.length > 0;
  const isPanelVisible = !loading && !error && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isPanelVisible && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                sex={sex}
                centuries={centuries}
                onQueryChange={handleQueryChange}
                onSexChange={handleSexChange}
                onCenturiesChange={handleCenturiesChange}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {showLoader && <Loader />}
              {showError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}
              {showNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {showNoResults && (
                <p>There are no people matching the current search criteria</p>
              )}
              {showTable && (
                <PeopleTable
                  people={filteredAndSortedPeople}
                  sort={sort}
                  order={order}
                  onSortChange={handleSortChange}
                  selectedSlug={slug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
