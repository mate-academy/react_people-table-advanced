import { useEffect, useMemo, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { ErrorLoading } from './ErrorLoading';
import { NoPeople } from './NoPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch((newError) => {
        setError(true);
        throw newError;
      })
      .finally(() => setLoading(false));
  }, []);

  const allPeople = useMemo(() => (
    people.map(person => {
      const mother = people.find(findPerson => (
        findPerson.name === person.motherName
      ));

      const father = people.find(findPerson => (
        findPerson.name === person.fatherName
      ));

      return { ...person, mother, father };
    })
  ), [people]);

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
              {loading && <Loader />}

              {error && <ErrorLoading />}

              {!error && !loading && people.length === 0 && <NoPeople />}

              {people.length !== 0 && !error
                  && <PeopleTable allPeople={allPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
