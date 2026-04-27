import { useEffect, useMemo, useState } from 'react';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import Person from '../types/Person';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Cannot load people. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const extendedPeopleData = useMemo(() => {
    if (people.length === 0) {
      return people;
    } else {
      return [...people].map(pers => {
        const mother = people.find(person => person.name === pers.motherName);
        const father = people.find(person => person.name === pers.fatherName);

        return {
          ...pers,
          mother,
          father,
        };
      });
    }
  }, [people]);

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
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!isLoading && !errorMessage && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && <PeopleTable people={extendedPeopleData} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
