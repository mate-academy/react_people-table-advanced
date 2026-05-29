import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { Sex } from '../types/Sex';
import { TableTitles } from '../types/TableTitles';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || Sex.All;
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const isSuccess = !loading && !error && people.length > 0;

  const filteredPeople = people.filter(person => {
    let matchesQuery = true;
    let matchesSex = true;
    let matchesCenturie = true;

    if (query) {
      const normalizedQuery = query.toLowerCase();

      if (
        !person.name.toLowerCase().includes(normalizedQuery) &&
        !person.motherName?.toLowerCase().includes(normalizedQuery) &&
        !person.fatherName?.toLowerCase().includes(normalizedQuery)
      ) {
        matchesQuery = false;
      }
    }

    if (sex) {
      if (person.sex !== sex) {
        matchesSex = false;
      }
    }

    if (centuries.length > 0) {
      const personCen = Math.ceil(person.born / 100);

      if (!centuries.includes(personCen.toString())) {
        matchesCenturie = false;
      }
    }

    return matchesQuery && matchesSex && matchesCenturie;
  });

  const sortedPeople = [...filteredPeople].sort((personA, personB) => {
    switch (sort) {
      case TableTitles.Name:
        return order
          ? personB.name.localeCompare(personA.name)
          : personA.name.localeCompare(personB.name);

      case TableTitles.Sex:
        return order
          ? personB.sex.localeCompare(personA.sex)
          : personA.sex.localeCompare(personB.sex);

      case TableTitles.Born:
        return order
          ? personB.born - personA.born
          : personA.born - personB.born;

      case TableTitles.Died:
        return order
          ? personB.born - personA.born
          : personA.born - personB.born;

      default:
        return 0;
    }
  });

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              {isSuccess && <PeopleFilters />}
            </div>

            <div className="column">
              <div className="box table-container">
                {loading && <Loader />}

                {error && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {!loading && !error && people.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {isSuccess && filteredPeople.length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

                {isSuccess && filteredPeople.length > 0 && (
                  <PeopleTable people={sortedPeople} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
