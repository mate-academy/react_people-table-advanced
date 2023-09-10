import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { Sort } from '../types/Sort';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const getPreparedPeople = (peopleAll: Person[]) => {
    let visiblePeople = [...peopleAll];

    if (sort) {
      visiblePeople.sort((person1, person2) => {
        switch (sort) {
          case Sort.name:
          case Sort.sex:
            return person1[sort].localeCompare(person2[sort]);

          case Sort.born:
          case Sort.died:
            return person1[sort] - person2[sort];

          default:
            return 0;
        }
      });
    }

    if (sex) {
      visiblePeople = visiblePeople.filter(person => person.sex === sex);
    }

    if (query) {
      visiblePeople = visiblePeople.filter(person => {
        const normalizedQuery = query.toLowerCase().trim();
        const filteredFields = (
          person.name + person.motherName + person.fatherName
        ).toLowerCase();

        return filteredFields.includes(normalizedQuery);
      });
    }

    if (centuries) {
      visiblePeople = visiblePeople.filter(person => centuries.includes(
        String(Math.ceil(person.born / 100)),
      ));
    }

    if (order) {
      visiblePeople.reverse();
    }

    return visiblePeople;
  };

  const filteredPeople = getPreparedPeople(people);

  // console.log(filteredPeople)
  // console.log(people)

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters
                sex={sex}
                query={query}
                centuries={centuries}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              <PeopleTable
                people={filteredPeople}
                sort={sort}
                order={order}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
