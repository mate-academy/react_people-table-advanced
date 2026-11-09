import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [isLoadding, setIsLoadding] = useState(false);
  const [isLoaddingError, setIsLoaddingError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const getParents = (persons: Person[]) => {
    return persons.map(person => {
      return {
        ...person,
        mother: persons.find(p => p.name === person.motherName),
        father: persons.find(p => p.name === person.fatherName),
      };
    });
  };

  const SortPeople = (persons: Person[]) => {
    if (!searchParams.has('sort')) {
      return persons;
    }

    const sortBy = searchParams.get('sort');

    switch (sortBy) {
      case 'name':
      case 'sex':
        persons.sort((p1, p2) => p1[sortBy].localeCompare(p2[sortBy]));
        break;
      case 'born':
      case 'died':
        persons.sort((p1, p2) => p1[sortBy] - p2[sortBy]);
    }

    const isDescending = searchParams.get('order') === 'desc';

    return isDescending ? persons.reverse() : persons;
  };

  const filterPeople = () => {
    let peopleCopy = [...people];

    if (searchParams.has('sex')) {
      const sex = searchParams.get('sex');

      peopleCopy = peopleCopy.filter(person => person.sex === sex);
    }

    if (searchParams.has('query')) {
      const query = searchParams.get('query')?.toLowerCase() || '';

      peopleCopy = peopleCopy.filter(
        person =>
          person.name.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query),
      );
    }

    if (searchParams.has('centuries')) {
      const centuries = searchParams.getAll('centuries');
      const filteredPeople: Person[] = [];

      for (const century of centuries) {
        peopleCopy
          .filter(
            person =>
              person.born >= (+century - 1) * 100 &&
              person.born < +century * 100,
          )
          .forEach(person => filteredPeople.push(person));
      }

      peopleCopy = filteredPeople;
    }

    return peopleCopy;
  };

  const preparePeopleList = () => {
    return SortPeople(filterPeople());
  };

  useEffect(() => {
    setIsLoadding(true);
    setIsLoaddingError(false);

    getPeople()
      .then(data => setPeople(getParents(data)))
      .catch(() => setIsLoaddingError(true))
      .finally(() => setIsLoadding(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoadding ? (
          <div className="box">
            <Loader />
          </div>
        ) : (
          <>
            {isLoaddingError ? (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            ) : (
              <>
                {people.length === 0 ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (
                  // eslint-disable-next-line max-len
                  <div className="columns is-desktop is-flex-direction-row-reverse">
                    <div className="column is-7-tablet is-narrow-desktop">
                      <PeopleFilters />
                    </div>

                    <div className="column">
                      <PeopleTable people={preparePeopleList()} />
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
