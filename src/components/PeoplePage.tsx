import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';

type Props = {
  slugPerson: string | undefined,
};

export const PeoplePage: React.FC<Props> = ({ slugPerson }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadPeople = async () => {
    setIsLoading(true);
    try {
      const result = await getPeople();

      setPeople(result);
      setIsLoading(false);
    } catch (e) {
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  /// //// fsaf

  const location = useLocation();

  return (
    <>
      <h1 className="title">
        {location.pathname}
        {location.search}
      </h1>

      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (<Loader />)}

              {error && !isLoading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/* <p>There are no people matching the current search criteria</p> */}

              <PeopleTable people={people} slugPerson={slugPerson} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
