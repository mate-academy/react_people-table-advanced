import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader/index';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setisLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  useEffect(() => {
    setisLoading(true);
    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
      })
      .catch(() => setHasLoadingError(true))
      .finally(() => setisLoading(false));
  }, []);

  const preparedPeople = people.map(person => {
    const mother = people.find(pers => pers.name === person.motherName);
    const father = people.find(pers => pers.name === person.fatherName);

    return { ...person, mother, father };
  });

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && <PeopleFilters />}
          </div>
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {hasLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length > 0 && <PeopleTable people={preparedPeople} />}
              {!people.length && !isLoading && !hasLoadingError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
