import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || null;
  const sex = searchParams.get('sex') || null;

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const preparedPeople = (data: Person[]) => {
    const editedData = data.map(person => {
      let father;
      let mother;

      if (person.motherName) {
        mother = data.find(pers => pers.name === person.motherName);
      }

      if (person.fatherName) {
        father = data.find(pers => pers.name === person.fatherName);
      }

      return { ...person, father, mother };
    });

    setPeople(editedData);
  };

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(preparedPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = people?.filter(person => {
    const isPersonValidWithCentury = (personSex: string) => (
      person.name.toLowerCase().includes(query)
      && person.sex === personSex
      && centuries.includes(
        String(Math.ceil(person.born / 100)),
      ));

    const isPersonValid = (personSex: string) => {
      return person.name.toLowerCase().includes(query)
        && person.sex === personSex;
    };

    const defaultValid = person.name.toLowerCase().includes(query);

    if (centuries.length !== 0) {
      switch (sex) {
        case 'm':
          return (
            isPersonValidWithCentury('m')
          );

        case 'f':
          return isPersonValidWithCentury('f');

        default:
          return defaultValid;
      }
    } else {
      switch (sex) {
        case 'm':
          return isPersonValid('m');

        case 'f':
          return isPersonValid('f');

        default:
          return defaultValid;
      }
    }
  }).sort((person, nextPerson) => {
    switch (sort) {
      case 'name':
        return !order
          ? person.name.localeCompare(nextPerson.name)
          : nextPerson.name.localeCompare(person.name);

      case 'sex':
        return !order
          ? person.sex.localeCompare(nextPerson.sex)
          : nextPerson.sex.localeCompare(person.sex);

      case 'born':
        return !order
          ? person.born - nextPerson.born
          : nextPerson.born - person.born;

      case 'died':
        return !order
          ? person.died - nextPerson.died
          : nextPerson.died - person.died;

      default:
        return 0;
    }
  }) || [];

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
              {
                isLoading && (
                  <Loader />
                )
              }

              {
                error && (
                  <p data-cy="peopleLoadingError">Something went wrong</p>
                )
              }

              {
                (!error && !people?.length && !isLoading) && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )
              }

              {
                (!filteredPeople.length && !isLoading && !error) && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )
              }

              {
                (!!people?.length && !!filteredPeople.length) && (
                  <PeopleTable people={filteredPeople} />
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
