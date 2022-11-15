import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { Person } from '../types/Person';

import { getPeople } from '../api';

export const PeoplePage = () => {
  const [persons, setPersons] = useState<Person[] | null>(null);
  const [personsRender, setPersonsRender] = useState<Person[] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [personsErrors, setPersonsErrors] = useState(false);

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    getPeople()
      .then(people => {
        setPersons(people);
        setPersonsRender(people);
        setPersonsErrors(false);
      })
      .catch(() => {
        // setPersons([]);
        setPersonsErrors(true);
      });
  }, []);

  useEffect(() => {
    function getSortPersones(): Person[] {
      if (persons) {
        return persons.filter(person => {
          if (person.motherName && person.fatherName) {
            return (person.name.toLowerCase().includes(query.toLowerCase())
            || person.motherName.toLowerCase().includes(query.toLowerCase())
            || person.fatherName.toLowerCase().includes(query.toLowerCase()));
          }

          return false;
        }).filter(person => person.sex.includes(sex))
          .filter(person => {
            if (centuries.length !== 0) {
              return centuries.includes(`${Math.ceil(person.born / 100)}`);
            }

            return true;
          }).sort((person1, person2) => {
            switch (sort) {
              case 'name':
                return person2.name.localeCompare(person1.name);

              case 'sex':
                return person2.sex.localeCompare(person1.sex);

              case 'born':
                return person1.born - person2.born;

              case 'died':
                return person1.died - person2.died;
              default:
                return 1;
                break;
            }
          });
      }

      return [];
    }

    if (order) {
      setPersonsRender(getSortPersones());
    } else {
      setPersonsRender(getSortPersones().reverse());
    }
  }, [searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              persons={persons}
            />
          </div>

          <div className="column">
            <div className="box table-container">

              {((!persons && <Loader />) || (personsErrors && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )))
              || ((persons?.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )) || (personsRender?.length !== 0
                ? (personsRender && (
                  <PeopleTable
                    persons={personsRender}
                    searchParams={searchParams}
                  />
                )) : (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )
              )) }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
