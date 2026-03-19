import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';
  const order = searchParams.get('order') || '';

  const sortBy = searchParams.get('sort') || '';

  function sortedPeople(sortingBy, orderStatus): Person[] {
    if (!sortBy) {
      return people;
    }

    const validFields = ['name', 'sex', 'born', 'died'];

    if (validFields.includes(sortingBy)) {
      return [...people].sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
          case 'name':
          case 'sex':
            comparison = a[sortingBy].localeCompare(b[sortingBy]);
            break;

          case 'born':
          case 'died':
            comparison = a[sortingBy] - b[sortingBy];
            break;
        }

        return orderStatus === 'desc' ? -comparison : comparison;
      });
    }

    return people;
  }

  const sorted = sortedPeople(sortBy, order) || [];

  const filteredPeople = sorted.filter(person => {
    const matchesSex = !sex || person.sex === sex;

    const selectedCenturies = centuries.map(Number);
    const personCentury = Math.ceil(person.born / 100);

    const normalizedQuery = query.toLowerCase();

    const matchesQuery =
      !query ||
      person.name.toLowerCase().includes(normalizedQuery) ||
      person.motherName?.toLowerCase().includes(normalizedQuery) ||
      person.fatherName?.toLowerCase().includes(normalizedQuery);

    const matchesCentury =
      selectedCenturies.length === 0 ||
      selectedCenturies.includes(personCentury);

    return matchesSex && matchesCentury && matchesQuery;
  });

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(data => setPeople(data))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !errorMessage && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && !errorMessage && filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} />
              )}

              {!loading && !errorMessage && filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !errorMessage && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!loading && errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
