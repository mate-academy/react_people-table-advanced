import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(peopleFromApi => {
        setPeople(peopleFromApi);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const getParent = useCallback(
    (name: string | null) => {
      return people.find(parent => parent.name === name);
    },
    [people],
  );

  const peopleWithParents = useMemo(
    () =>
      people.map(person => {
        const mother = getParent(person.motherName);
        const father = getParent(person.fatherName);

        return { ...person, mother, father };
      }),
    [getParent, people],
  );

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              people={peopleWithParents}
              setVisiblePeople={setVisiblePeople}
            />
          </div>

          <div className="column">
            <PeopleTable
              people={visiblePeople}
              loading={loading}
              errorMessage={errorMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
