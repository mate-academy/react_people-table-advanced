import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';
import { Errors, Person } from '../../types';
import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isPeopleistLoaded, setIsPeopleListLoaded] = useState<boolean>(false);
  const [personError, setPersonError] = useState<Errors | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const getParent = (persons: Person[], personName: string | null) => {
    return persons.find(pers => pers.name === personName);
  };

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const filteredPeople = [...peopleList]
    .filter(person => {
      if (sex === null) {
        return true;
      }

      return person.sex === sex;
    })
    .filter(person => {
      if (query === null) {
        return true;
      }

      const lowerCaseQuery = query.toLowerCase();
      const { name, fatherName, motherName } = person;

      return (
        name.toLowerCase().includes(lowerCaseQuery) ||
        fatherName?.toLowerCase().includes(lowerCaseQuery) ||
        motherName?.toLowerCase().includes(lowerCaseQuery)
      );
    })
    .filter(person => {
      if (centuries.length === 0) {
        return true;
      }

      const personCenteryBorn = Math.ceil(person.born / 100);

      return centuries.includes(personCenteryBorn.toString());
    })
    .sort((firstPeson, secondPeson) => {
      let sortCoef = 0;

      if (sort === null) {
        return sortCoef;
      }

      if (sort === 'name') {
        sortCoef = firstPeson.name.localeCompare(secondPeson.name);
      }

      if (sort === 'sex') {
        sortCoef = firstPeson.sex.localeCompare(secondPeson.sex);
      }

      if (sort === 'born') {
        sortCoef = firstPeson.born - secondPeson.born;
      }

      if (sort === 'died') {
        sortCoef = firstPeson.died - secondPeson.died;
      }

      return order ? sortCoef * -1 : sortCoef;
    });

  const getErrorMessageBlock = () =>
    personError === Errors.noPeopleMessage ? (
      <p data-cy="noPeopleMessage">There are no people on the server</p>
    ) : (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );

  useEffect(() => {
    getPeople()
      .then(persons => {
        if (persons.length === 0) {
          setPersonError(Errors.noPeopleMessage);

          return;
        }

        setPersonError(null);
        const personsWithParents = persons.map(person => {
          const currentPerson = { ...person };

          currentPerson.father = getParent(persons, person.fatherName);
          currentPerson.mother = getParent(persons, person.motherName);

          return currentPerson;
        });

        setPeopleList(personsWithParents);
        setIsPeopleListLoaded(true);
      })
      .catch(() => {
        setPersonError(Errors.peopleLoadingError);
      })
      .finally(() => {
        setIsPeopleListLoaded(true);
      });
  }, []);

  const pageContent = () => {
    return personError !== null ? (
      getErrorMessageBlock()
    ) : (
      <PeopleTable peopleList={filteredPeople} searchParams={searchParams} />
    );
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isPeopleistLoaded && (
              <PeopleFilters
                setSearchParams={setSearchParams}
                searchParams={searchParams}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {!isPeopleistLoaded ? <Loader /> : pageContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

{
  /* <p data-cy="peopleLoadingError">Something went wrong</p>

              <p data-cy="noPeopleMessage">There are no people on the server</p>

              <p>There are no people matching the current search criteria</p> */
}
