import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getParents } from '../utils/getParents';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState(people);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  let visibleElement = null;

  const fetchPeople = () => {
    setLoading(true);
    getPeople()
      .then(response => {
        const preparedPeople = response.map(person => ({
          ...person,
          ...getParents(person, response),
        }));

        setPeople(preparedPeople);
        setVisiblePeople(preparedPeople);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  switch (true) {
    case isLoading:
      visibleElement = <Loader />;
      break;

    case hasError:
      visibleElement = (
        <p data-cy="peopleLoadingError">
          Something went wrong
        </p>
      ); break;

    case people.length === 0:
      visibleElement = (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      ); break;

    default: visibleElement = (
      <div className="columns is-desktop is-flex-direction-row-reverse">
        <div className="column is-7-tablet is-narrow-desktop">
          <PeopleFilters
            people={people}
            setPeople={setVisiblePeople}
          />
        </div>

        <div className="column">
          <div className="box table-container">
            {visiblePeople.length === 0
              ? (
                <p>There are no people matching the current search criteria</p>
              )
              : (
                <PeopleTable
                  people={visiblePeople}
                />
              )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {visibleElement}
      </div>
    </>
  );
};
