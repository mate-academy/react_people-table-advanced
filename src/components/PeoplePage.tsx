import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  const { slug } = useParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = people.filter(person => {
    const century = Math.ceil(person.born / 100);

    const matchesQuery =
      person.name.toLowerCase().includes(query.toLocaleLowerCase()) ||
      person.motherName?.toLowerCase().includes(query.toLocaleLowerCase()) ||
      person.fatherName?.toLowerCase().includes(query.toLocaleLowerCase());

    const matchesCentury =
      centuries.length === 0 || centuries.includes(String(century));

    const matchesSex = sex === null || person.sex === sex;

    return matchesQuery && matchesCentury && matchesSex;
  });

  const sortedPeople = [...visiblePeople];

  if (sort === 'name') {
    sortedPeople.sort((personA, personB) =>
      personA.name.localeCompare(personB.name),
    );
  }

  if (sort === 'sex') {
    sortedPeople.sort((personA, personB) =>
      personA.sex.localeCompare(personB.sex),
    );
  }

  if (sort === 'born') {
    sortedPeople.sort((personA, personB) => personA.born - personB.born);
  }

  if (sort === 'died') {
    sortedPeople.sort((personA, personB) => personA.died - personB.died);
  }

  if (order === 'desk') {
    sortedPeople.reverse();
  }

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const noMatchingPeople =
    !isLoading && !error && people.length > 0 && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !error && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noMatchingPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !error && visiblePeople.length > 0 && (
                <PeopleTable
                  people={sortedPeople}
                  allPeople={people}
                  slug={slug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
