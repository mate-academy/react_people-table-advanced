import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { SortBy } from '../types/SortBy';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getPeople()
      .then(gettedPeople => {
        if (gettedPeople.length === 0) {
          setPeople([]);

          return;
        }

        const fullInfoPeople = gettedPeople.map(person => {
          const findedMother = gettedPeople
            .find((findMother: Person) => (
              person.motherName === findMother.name
            )) || null;

          const findedFather = gettedPeople
            .find((findFather: Person) => (
              person.fatherName === findFather.name
            )) || null;

          return { ...person, mother: findedMother, father: findedFather };
        });

        setPeople(fullInfoPeople as Person[]);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    return (): Person[] => {
      if (people.length === 0) {
        return [];
      }

      let newPeopleArr = [...people];

      const sort = searchParams.get('sort');

      if (sort) {
        switch (sort) {
          case SortBy.NAME:
          case SortBy.SEX:
            newPeopleArr.sort((firstPerson, secondPerson) => (
              firstPerson[sort].localeCompare(secondPerson[sort])
            ));
            break;

          case SortBy.BORN:
          case SortBy.DIED:
            newPeopleArr.sort((firstPerson, secondPerson) => (
              firstPerson[sort] - secondPerson[sort]
            ));
            break;

          default:
            break;
        }
      }

      if (searchParams.get('order')) {
        newPeopleArr.reverse();
      }

      const sex = searchParams.get('sex');

      if (sex) {
        newPeopleArr = newPeopleArr.filter(person => person.sex === sex);
      }

      const query = searchParams.get('query');

      if (query) {
        newPeopleArr = newPeopleArr.filter(person => (
          person.name.includes(query)
          || person.motherName?.includes(query)
          || person.fatherName?.includes(query)
        ));
      }

      const centuries = searchParams.getAll('centuries');

      if (centuries.length > 0) {
        newPeopleArr = newPeopleArr.filter(
          person => centuries.some(year => (
            Math.ceil(person.born / 100) === +year
          )),
        );
      }

      return newPeopleArr;
    };
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !isError && people && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && (<Loader />)}

              {!isLoading && isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !isError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !isError && people.length > 0
                && visiblePeople().length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !isError && people.length > 0
                && visiblePeople().length > 0 && (
                <PeopleTable people={visiblePeople()} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
