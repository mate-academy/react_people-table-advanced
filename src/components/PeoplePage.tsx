import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../types/SortBy';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [ErrorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase().trim();
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setErrorMessage(false);
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setIsLoading(false));
  }, [people.length]);

  const peopleWithParents = people.map(person => ({
    ...person,
    father: people.find(p => p.name === person.fatherName),
    mother: people.find(p => p.name === person.motherName),
  }));

  function preparePeople(peopleList: Person[]) {
    let filteredPeople = [...peopleList];

    if (query) {
      filteredPeople = filteredPeople.filter(
        person =>
          person.name.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query),
      );
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (sort) {
      filteredPeople.sort((per1, per2) => {
        switch (sort) {
          case SortBy.name:
          case SortBy.sex:
            return per1[sort].localeCompare(per2[sort]);

          case SortBy.born:
          case SortBy.died:
            return per1[sort] - per2[sort];

          default:
            return 0;
        }
      });
    }

    if (order) {
      filteredPeople.reverse();
    }

    return filteredPeople;
  }

  const preparedPeople = preparePeople(peopleWithParents);

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

              {ErrorMessage && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!people.length && !isLoading && !ErrorMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!preparedPeople.length && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !!preparedPeople.length && (
                <PeopleTable people={preparedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
