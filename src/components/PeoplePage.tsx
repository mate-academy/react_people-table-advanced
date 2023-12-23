import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);

  function loadPeople() {
    setIsloading(true);

    return getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => setIsloading(false));
  }

  useEffect(() => {
    loadPeople();
  }, []);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function getPreparedPeople() {
    let result = [...people];

    if (query) {
      result = people.filter(
        (person: Person) => (person.name.toLowerCase()
          .includes(query.toLowerCase()))
          || (person.motherName
            ? person.motherName.toLowerCase()
              .includes(query.toLowerCase()) : false)
          || (person.fatherName
            ? person.fatherName.toLowerCase()
              .includes(query.toLowerCase()) : false),
      );
    }

    if (sex) {
      result = result.filter(person => {
        switch (sex) {
          case 'm':
            return person.sex === 'm';

          case 'f':
            return person.sex === 'f';

          default:
            return true;
        }
      });
    }

    if (centuries.length) {
      let peopleOfCentyries: Person [] = [];

      for (let i = 16; i < 21; i += 1) {
        if (centuries.includes(`${i}`)) {
          peopleOfCentyries = [...peopleOfCentyries,
            ...result.filter(
              (person: Person) => Math.ceil(person.born / 100) === i,
            )];
        }
      }

      result = peopleOfCentyries;
    }

    if (sort) {
      result.sort((p1, p2) => {
        switch (sort) {
          case 'name':
          case 'sex':
            return p1[sort].localeCompare(p2[sort]);
          case 'born':
          case 'died':
            return p1[sort] - p2[sort];
          default:
            return 1;
        }
      });
    }

    if (order) {
      return result.reverse();
    }

    return result;
  }

  const preparedPeople = getPreparedPeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(people.length === 0 && !isLoading) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(preparedPeople.length === 0 && !isLoading) && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!preparedPeople.length && (
                <PeopleTable people={preparedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
