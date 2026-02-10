import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Errors } from '../types/Errors';

const peopleWithParents = (people: Person[]) => {
  return people.map(person => ({
    ...person,
    mother: people.find(parent => parent.name === person.motherName),
    father: people.find(parent => parent.name === person.fatherName),
  }));
};

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<Errors>(Errors.Default);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(people => {
        setPeopleFromServer(people);

        if (people.length === 0) {
          setErrorMessage(Errors.NoPeople);
        }
      })
      .catch(() => setErrorMessage(Errors.Loading))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const people = peopleWithParents(peopleFromServer);

  const handleErrorMessage = (error: Errors): string | null => {
    switch (error) {
      case Errors.Loading:
        return 'peopleLoadingError';

      case Errors.NoPeople:
        return 'noPeopleMessage';
    }

    return null;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isloading || <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {errorMessage && (
                <p data-cy={handleErrorMessage(errorMessage)}>{errorMessage}</p>
              )}

              {(isloading && <Loader />) ||
                (people.length !== 0 && <PeopleTable people={people} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
