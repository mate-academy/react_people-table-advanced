import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [peopleWithParents, setPeopleWithParents] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const hasPeople = !!people.length && !hasError;
  const hasNoPeople = !people.length && !hasError && !isLoading;

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const findParents = (peopleData: Person[]) => {
    const allPeople = [...peopleData];

    allPeople.forEach((person) => {
      const newPerson = person;

      newPerson.mother = allPeople.find((p) => p.name === newPerson.motherName);
      newPerson.father = allPeople.find((p) => p.name === newPerson.fatherName);
    });

    return setPeopleWithParents(allPeople);
  };

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((response) => {
        setPeople(response);
        findParents(response);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  let filteredPeople = [...peopleWithParents];

  if (sex) {
    filteredPeople = filteredPeople.filter((person) => person.sex === sex);
  }

  if (query) {
    const queryNormalize = query.trim().toLowerCase();

    filteredPeople = filteredPeople.filter((person) => {
      return (
        person.name.toLowerCase().includes(queryNormalize)
        || person.motherName?.toLowerCase().includes(queryNormalize)
        || person.fatherName?.toLowerCase().includes(queryNormalize));
    });
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter((person) => {
      return (
        centuries.includes(Math.ceil(person.born / 100).toString())
      );
    });
  }

  if (sort) {
    filteredPeople = filteredPeople.sort((a, b) => {
      switch (sort) {
        case 'Name':
          return a.name.localeCompare(b.name);
        case 'Sex':
          return a.sex.localeCompare(b.sex);
        case 'Born':
          return a.born - b.born;
        case 'Died':
          return a.died - b.died;
        default:
          return 0;
      }
    });

    if (order === 'desc') {
      filteredPeople.reverse();
    }
  }

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
              {isLoading && (<Loader />)}

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {hasNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasPeople && (
                <PeopleTable people={filteredPeople} />
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
