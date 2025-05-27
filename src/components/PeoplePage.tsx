import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const PeoplePage = () => {
  const [peoplesList, setPeoplesList] = useState<Person[] | null>(null);
  const [initialList, setInitialList] = useState<Person[] | null>(null);


  useEffect(() => {
    getPeople().then(response => {
      setPeoplesList(response);
      setInitialList(response);
    });
  }, []);

  if (!initialList) return null

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {peoplesList && (
              <PeopleFilters
                initialList={initialList}
                setPeoplesList={setPeoplesList}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {!peoplesList ? (
                <Loader />
              ) : (
                <PeopleTable
                  initialList={initialList}
                  peoplesList={peoplesList}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/*<p data-cy="peopleLoadingError">Something went wrong</p>

<p data-cy="noPeopleMessage">There are no people on the server</p>

<p>There are no people matching the current search criteria</p> */
