import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import type { Person } from '../types/Person';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const normalizedQuery = query.toLowerCase().trim();

  const matchesQuery = (person: Person) => {
    return (
      person.name.toLowerCase().includes(normalizedQuery) ||
      person.motherName?.toLowerCase().includes(normalizedQuery) ||
      person.fatherName?.toLowerCase().includes(normalizedQuery)
    );
  };

  const matchesCentury = (person: Person) => {
    return (
      centuries.length === 0 ||
      centuries.includes(String(Math.ceil(person.born / 100)))
    );
  };

  const matchesSex = (person: Person) => !sex || person.sex === sex;

  const filteredPeople = people.filter(
    person =>
      matchesQuery(person) && matchesCentury(person) && matchesSex(person),
  );

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    let comparison = 0;

    switch (sort) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;

      case 'born':
        comparison = a.born - b.born;
        break;

      case 'died':
        comparison = a.died - b.died;
        break;

      case 'sex':
        comparison = a.sex.localeCompare(b.sex);
        break;
    }

    return order === 'desc' ? -comparison : comparison;
  });

  const hasPeople = !loading && !error && people.length > 0;

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              {hasPeople && <PeopleFilters />}
            </div>

            <div className="column">
              <div className="box table-container">
                {loading && <Loader />}

                {!loading && error && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {!loading && !error && people.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {hasPeople && filteredPeople.length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

                {hasPeople && filteredPeople.length > 0 && (
                  <PeopleTable
                    visiblePeople={sortedPeople}
                    people={people}
                    slug={slug}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
