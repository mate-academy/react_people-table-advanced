import { useEffect, useState } from 'react';

import { getPeople } from '../api';
import { Person } from '../types/Person';

import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import React from 'react';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const peopleWithParents = people.map(person => {
    const mother = person.motherName
      ? people.find(parent => parent.name === person.motherName)
      : undefined;

    const father = person.fatherName
      ? people.find(parent => parent.name === person.fatherName)
      : undefined;

    return {
      ...person,
      mother,
      father,
    };
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !hasError && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {hasError && (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  Something went wrong
                </p>
              )}

              {!loading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !hasError && people.length > 0 && (
                <PeopleTable people={peopleWithParents} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
