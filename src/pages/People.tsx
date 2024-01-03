import { useEffect, useState } from 'react';

import { Person } from '../types';
import { getPeople } from '../api';
import { Table } from '../components/Table';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleToDisplay } from '../components/PeopleToDisplay';

const preparePeople = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(mom => mom.name === person.motherName);
    const father = people.find(dad => dad.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
};

export const People = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        setPeople(preparePeople(peopleFromServer));
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const displayPeople = PeopleToDisplay(preparePeople(people));

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
              {(!displayPeople.length && !isLoading) ? (
                <p>There are no people matching the search criteria</p>
              ) : (
                <Table
                  people={people}
                  loading={isLoading}
                  error={isError}
                  displayPeople={displayPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
