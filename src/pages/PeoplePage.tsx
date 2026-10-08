import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => {
        const peopleWithParents = peopleFromServer.map(person => ({
          ...person,
          mother: peopleFromServer.find(
            personFromServer => personFromServer.name === person.motherName,
          ),
          father: peopleFromServer.find(
            personFromServer => personFromServer.name === person.fatherName,
          ),
        }));

        setPeople(peopleWithParents);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = people
    .filter(person => !sex || person.sex === sex)
    .filter(
      person =>
        !query ||
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase()),
    )
    .filter(person => {
      const personCentury = Math.ceil(person.born / 100);

      return (
        centuries.length === 0 || centuries.includes(String(personCentury))
      );
    });

  const sortedPeople = [...visiblePeople].sort((a, b) => {
    switch (sort) {
      case 'name':
      case 'sex':
        return a[sort].localeCompare(b[sort]);

      case 'born':
      case 'died':
        return a[sort] - b[sort];

      default:
        return 0;
    }
  });

  if (order === 'desc') {
    sortedPeople.reverse();
  }

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
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && !isLoading && !hasError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {visiblePeople.length > 0 && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
