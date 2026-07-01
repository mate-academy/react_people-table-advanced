import { useMemo } from 'react';
import { Person } from '../../types';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { PeopleFilters } from '../../components/PeopleFilter/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { usePeople } from '../../store/PeopleContext';

const getFilteredPeople = (people: Person[], searchParams: URLSearchParams) => {
  let filtered = people;

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  if (sex) {
    filtered = filtered.filter(person => person.sex === sex);
  }

  if (query) {
    filtered = filtered.filter(person =>
      [person.name, person.motherName, person.fatherName]
        .map(name => name?.toLowerCase())
        .some(name => name?.includes(query.toLowerCase())),
    );
  }

  if (centuries.length) {
    const centuryNumbers = centuries.map(Number);

    filtered = filtered.filter(person =>
      centuryNumbers.includes(Math.ceil(person.born / 100)),
    );
  }

  return filtered;
};

export const PeoplePage = () => {
  const { people, loading, error } = usePeople();
  const [searchParams] = useSearchParams();

  const visiblePeople = useMemo(
    () => getFilteredPeople(people, searchParams),
    [people, searchParams],
  );

  const showError = !loading && error;
  const showNoPeopleOnServer = !loading && !error && people.length === 0;
  const showNoCriteriaMatch =
    !loading && !error && people.length > 0 && visiblePeople.length === 0;
  const showTable = !loading && !error && visiblePeople.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !error && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {showError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {showNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showNoCriteriaMatch && (
                <p>There are no people matching the current search criteria</p>
              )}

              {showTable && <PeopleTable people={visiblePeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
