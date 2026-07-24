import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.trim().toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(value => setPeople(value))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = people.filter(person => {
    const matchesSex = !sex || person.sex === sex;

    const matchesQuery =
      !query ||
      person.name.toLowerCase().includes(query) ||
      person.motherName?.toLowerCase().includes(query) ||
      person.fatherName?.toLowerCase().includes(query);

    const personCentury = Math.ceil(person.born / 100);

    const matchesCentury =
      centuries.length === 0 || centuries.includes(String(personCentury));

    return matchesSex && matchesQuery && matchesCentury;
  });

  const sortedPeople = [...visiblePeople];

  if (sort) {
    sortedPeople.sort((personA, personB) => {
      let result = 0;

      switch (sort) {
        case 'name':
          result = personA.name.localeCompare(personB.name);
          break;

        case 'sex':
          result = personA.sex.localeCompare(personB.sex);
          break;

        case 'born':
          result = personA.born - personB.born;
          break;

        case 'died':
          result = personA.died - personB.died;
          break;

        default:
          result = 0;
      }

      return order === 'desc' ? -result : result;
    });
  }

  const hasNoPeople = !loading && !error && people.length === 0;

  const hasNoSearchResults =
    !loading && !error && people.length > 0 && sortedPeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {hasNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasNoSearchResults && (
                <p data-cy="noSearchResults">
                  There are no people matching the current search criteria
                </p>
              )}

              {sortedPeople.length > 0 && (
                <PeopleTable slug={slug} people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
