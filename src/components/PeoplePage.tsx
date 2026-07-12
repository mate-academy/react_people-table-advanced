import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { slug } = useParams();

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = people.filter(person => {
    const matchesSex = !sex || person.sex === sex;

    const personCentury = Math.ceil(person.born / 100);
    const matchesCentury =
      centuries.length === 0 || centuries.includes(String(personCentury));

    const matchesQuery =
      !query || person.name.toLowerCase().includes(query.toLowerCase());

    return matchesSex && matchesCentury && matchesQuery;
  });

  const showNoMatches =
    !isLoading && !hasError && people.length > 0 && visiblePeople.length === 0;

  if (sort === 'name') {
    visiblePeople.sort((a, b) =>
      order === 'desc'
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name),
    );
  }

  if (sort === 'sex') {
    visiblePeople.sort((a, b) =>
      order === 'desc'
        ? b.sex.localeCompare(a.sex)
        : a.sex.localeCompare(b.sex),
    );
  }

  if (sort === 'born') {
    visiblePeople.sort((a, b) =>
      order === 'desc' ? b.born - a.born : a.born - b.born,
    );
  }

  if (sort === 'died') {
    visiblePeople.sort((a, b) =>
      order === 'desc' ? b.died - a.died : a.died - b.died,
    );
  }

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showNoMatches && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} selectedSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
