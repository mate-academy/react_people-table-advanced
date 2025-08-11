import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams, useParams } from 'react-router-dom';
import { SortBy } from '../types/SortBy';
import { peopleWithParents } from '../utils/PeopleWithParents';

type SortMethods = {
  [key in SortBy]?: (a: Person, b: Person) => number;
};

const sortMethods: SortMethods = {
  [SortBy.name]: (a, b) => a.name.localeCompare(b.name),
  [SortBy.sex]: (a, b) => a.sex.localeCompare(b.sex),
  [SortBy.born]: (a, b) => a.born - b.born,
  [SortBy.died]: (a, b) => a.died - b.died,
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();
  const { slugId } = useParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sortBy = searchParams.get('sort') as SortBy | null;
  const sortOrder = searchParams.get('order');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => setPeople(peopleWithParents(data)))
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, []);

  const filterAndSortPeople = (filteredArr: Person[]) => {
    let filteredPeople = [...filteredArr];

    if (query) {
      filteredPeople = filteredPeople.filter(
        person =>
          person.name.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query),
      );
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (sortBy && sortMethods[sortBy]) {
      filteredPeople.sort(sortMethods[sortBy]);
    }

    if (sortOrder === 'desc') {
      filteredPeople.reverse();
    }

    return filteredPeople;
  };

  const preparedPeople = filterAndSortPeople(people);

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
              {loading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && people.length === 0 && !hasError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {preparedPeople.length === 0 && !loading && !hasError && (
                <p>There are no people matching the current search criteria</p>
              )}

              {preparedPeople.length > 0 && !loading && !hasError && (
                <PeopleTable
                  people={preparedPeople}
                  selectedSlug={slugId || ''}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
