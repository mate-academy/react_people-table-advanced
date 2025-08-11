import { PeopleFilters } from '../components/PeopleFilters/PeopleFilters';
import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = people.filter(
    person =>
      (!sex || person.sex === sex) &&
      (!query ||
        [
          person.name.toLowerCase(),
          person.motherName?.toLowerCase() || '',
          person.fatherName?.toLowerCase() || '',
        ].some(value => value.includes(query.toLowerCase()))) &&
      (centuries.length === 0 ||
        centuries.includes(String(Math.ceil(person.born / 100)))),
  );

  if (sort) {
    filteredPeople.sort((person1, person2) => {
      let comparison = 0;

      if (sort === 'name' || sort === 'sex') {
        comparison = person1[sort]
          .toLowerCase()
          .localeCompare(person2[sort].toLowerCase());
      } else if (sort === 'born' || sort === 'died') {
        comparison = (person1[sort] || 0) - (person2[sort] || 0);
      }

      return order === 'desc' ? -comparison : comparison;
    });
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !isError && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!isLoading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !isError && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
