import { useSearchParams, useParams, useLocation } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { useNavigate } from 'react-router-dom';

interface PeoplePageProps {
  people: Person[];
  loading?: boolean;
  error?: string | null;
}

export const PeoplePage = ({
  people = [],
  loading,
  error,
}: PeoplePageProps) => {
  const [params, setParams] = useSearchParams();
  const query = params.get('query');
  const centuries = params.getAll('centuries');
  const sort = params.get('sort');
  const order = params.get('order');
  const sex = params.get('sex');
  const { slug: selectedSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const handleSelect = (targetSlug: string) => {
    navigate(`/people/${targetSlug}${location.search}`);
  };

  const filtered = people
    .filter(person => {
      if (!query) {
        return true;
      }

      const q = query.toLowerCase();

      return (
        (person.name && person.name.toLowerCase().includes(q)) ||
        (person.motherName && person.motherName.toLowerCase().includes(q)) ||
        (person.fatherName && person.fatherName.toLowerCase().includes(q))
      );
    })

    .filter(person => {
      if (centuries.length === 0) {
        return true;
      }

      const bornYear = Number(person.born);

      if (!bornYear) {
        return false;
      }

      const century = Math.ceil(bornYear / 100);

      return centuries.includes(String(century));
    })

    .filter(person => {
      if (!sex) {
        return true;
      }

      return person.sex === sex;
    });

  const result = sort
    ? filtered.slice().sort((a, b) => {
        let res = 0;

        switch (sort) {
          case 'name':
            res = (a.name || '').localeCompare(b.name || '');
            break;
          case 'sex':
            res = (a.sex || '').localeCompare(b.sex || '');
            break;
          case 'born':
            res = (a.born ?? 0) - (b.born ?? 0);
            break;
          case 'died':
            res = (a.died ?? 0) - (b.died ?? 0);
            break;
        }

        return order === 'desc' ? -res : res;
      })
    : filtered;

  const setQuery = (value: string) => {
    const newParams = new URLSearchParams(params);

    if (value.trim() === '') {
      newParams.delete('query');
    } else {
      newParams.set('query', value);
    }

    setParams(newParams);
  };

  const toggleCentury = (value: string) => {
    const newParams = new URLSearchParams(params);
    let current = params.getAll('centuries');

    if (current.includes(value)) {
      current = current.filter(c => c !== value);
    } else {
      current.push(value);
    }

    newParams.delete('centuries');
    current.forEach(c => newParams.append('centuries', c));
    setParams(newParams);
  };

  const setSort = (field: string) => {
    const newParams = new URLSearchParams(params);
    const currentSort = params.get('sort');
    const currentOrder = params.get('order');

    if (currentSort !== field) {
      newParams.set('sort', field);
      newParams.set('order', 'asc');
    } else if (currentOrder !== 'desc') {
      newParams.set('order', 'desc');
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    setParams(newParams);
  };

  const setSex = (value: string | null) => {
    const newParams = new URLSearchParams(params);

    if (value === null) {
      newParams.delete('sex');
    } else {
      newParams.set('sex', value);
    }

    setParams(newParams);
  };

  const resetFilters = () => {
    const newParams = new URLSearchParams();

    setParams(newParams);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && people.length > 0 && (
              <PeopleFilters
                query={query || ''}
                setQuery={setQuery}
                centuries={centuries}
                toggleCentury={toggleCentury}
                sex={sex}
                setSex={setSex}
                resetFilters={resetFilters}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading &&
                !error &&
                people.length > 0 &&
                result.length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {!loading &&
                !error &&
                (result.length > 0 ? (
                  <PeopleTable
                    people={result}
                    sort={sort ?? ''}
                    order={order ?? ''}
                    setSort={setSort}
                    selectedSlug={selectedSlug}
                    onSelect={handleSelect}
                  />
                ) : (
                  <p data-cy="noFilteredPeople">
                    There are no people matching the current search criteria
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
