import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

enum SortType {
  name = 'name',
  sex = 'sex',
  born = 'born',
  died = 'died',
}

export const PeoplePage = () => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>(people);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    getPeople()
      .then(allPeople => {
        setPeople(allPeople);
        setVisiblePeople(allPeople);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let filteredPeople = [...people];

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(
        person => centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (sex && sex !== 'All') {
      filteredPeople = filteredPeople.filter(
        person => person.sex === sex,
      );
    }

    if (query) {
      filteredPeople = filteredPeople.filter(
        person => person.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (sort) {
      filteredPeople = filteredPeople.sort((a: Person, b: Person) => {
        switch (sort) {
          case SortType.name:
            return a.name.localeCompare(b.name);
          case SortType.sex:
            return a.sex.localeCompare(b.sex);
          case SortType.born:
            return a.born - b.born;
          case SortType.died:
            return a.died - b.died;
          default:
            return 0;
        }
      });
    }

    if (order) {
      filteredPeople = filteredPeople.reverse();
    }

    setVisiblePeople(filteredPeople);
  }, [searchParams, order, people, query, sex, sort]);

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

              {error
              && <p data-cy="peopleLoadingError">Something went wrong</p>}

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {error
              && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {!isLoading
                && (
                  <PeopleTable
                    visiblePeople={visiblePeople}
                    people={people}
                    personSlug={personSlug}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
