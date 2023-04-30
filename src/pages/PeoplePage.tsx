import { FC, useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [errLoad, setErrLoad] = useState(false);
  const isPeoplePage = useMatch('/people');

  useEffect(() => {
    if (isPeoplePage) {
      setIsLoader(true);
      getPeople()
        .then(result => setPeople(result))
        .catch(() => setErrLoad(true))
        .finally(() => setIsLoader(false));
    }
  }, [isPeoplePage]);

  const preparedPeople = () => {
    return people.map((person, _, arr) => {
      return {
        ...person,
        mother: arr.find(mom => mom.name === person.motherName),
        father: arr.find(dad => dad.name === person.fatherName),
      };
    });
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoader && <Loader />}

              {errLoad && (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  Something went wrong
                </p>
              )}

              {!isLoader && !errLoad && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && (
                <PeopleTable people={preparedPeople()} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
