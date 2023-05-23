import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const fetchPeople = async () => {
    try {
      const fetchedPeople = await getPeople();

      const preparedPeople = fetchedPeople.map(person => {
        const father = fetchedPeople.find(personFather => (
          personFather.name === person.fatherName
        ));

        const mother = fetchedPeople.find(personMother => (
          personMother.name === person.motherName
        ));

        return { ...person, father, mother };
      });

      setPeople(preparedPeople);
    } catch (fetchingError) {
      setError(true);
    }

    setIsLoading(false);
  };

  const filterByQuery = useCallback(((person: Person) => {
    const preparedQuery = query.toLowerCase();
    const preparedName = person.name.toLowerCase();
    const preparedMotherName = person.motherName?.toLowerCase();
    const preparedFatherName = person.fatherName?.toLowerCase();

    return (
      preparedName.includes(preparedQuery)
      || preparedFatherName?.includes(preparedQuery)
      || preparedMotherName?.includes(preparedQuery));
  }), [query]);

  const filterBySex = useCallback(((person: Person) => (
    sex ? person.sex === sex : true
  )), [sex]);

  const filterByCentury = useCallback(((person: Person) => {
    const personsBornCentury = Math.round(person.born / 100).toString();

    return centuries.length ? centuries.includes(personsBornCentury) : true;
  }), [centuries]);

  const visiblePeople = people.filter(person => {
    return filterByQuery(person)
    && filterBySex(person)
    && filterByCentury(person);
  });

  visiblePeople.sort((first, second) => {
    switch (sort) {
      case 'name':
      case 'sex':
        return (order === 'desc'
          ? second[sort].localeCompare(first[sort])
          : first[sort].localeCompare(second[sort])
        );

      case 'born':
      case 'died':
        return (order === 'desc'
          ? second[sort] - first[sort]
          : first[sort] - second[sort]
        );

      default:
        return 0;
    }
  });

  useEffect(() => {
    fetchPeople();
  }, []);

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

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people.length === 0 && !isLoading && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && !visiblePeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {people.length > 0
                && visiblePeople.length > 0
                && <PeopleTable people={visiblePeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
