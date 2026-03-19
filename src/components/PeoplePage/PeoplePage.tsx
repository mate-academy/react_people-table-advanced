import { PeopleFilters } from '../PeoplePage/Filters/PeopleFilters';
import { Loader } from '../Loader/Loader';
import PeopleTable from '../PeoplePage/PeopleTable';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { useSearchParams } from 'react-router-dom';
import { usePeopleSort } from '../../types/usePeopleSort';
import { sortPeople } from '../../utils/SortPeople';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const { slug } = useParams();

  const { sort, order, toggleSort } = usePeopleSort();

  useEffect(() => {
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const selectedCenturies = searchParams.getAll('centuries').map(Number);
  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.toLowerCase() || '';

  const visiblePeople = sortPeople(
    people.filter(person => {
      const personCentury = Math.floor(person.born / 100) + 1;

      if (sex && person.sex !== sex) {
        return false;
      }

      if (query) {
        const matches =
          person.name.toLowerCase().includes(query) ||
          (person.motherName || '').toLowerCase().includes(query) ||
          (person.fatherName || '').toLowerCase().includes(query);

        if (!matches) {
          return false;
        }
      }

      if (
        selectedCenturies.length > 0 &&
        !selectedCenturies.includes(personCentury)
      ) {
        return false;
      } else {
        return true;
      }
    }),
    sort,
    order,
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !error && people.length > 0 && (
              <PeopleFilters selectedCenturies={selectedCenturies} />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !error && people.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  selectedSlug={slug}
                  onSortChange={toggleSort}
                  sortField={sort}
                  sortOrder={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
