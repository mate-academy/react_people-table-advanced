/* eslint-disable @typescript-eslint/indent */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';

import { Person } from '../types';

export const PeoplePage = () => {
  const { slug } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const filterPeoples = people.filter(person => {
    return (
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
      person.fatherName?.toLowerCase().includes(query.toLowerCase())
    );
  });

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sexFilter = searchParams.get('sex');

  const sortedPeople = () => {
    let result = [...filterPeoples];

    if (sexFilter) {
      result = result.filter(person => person.sex === sexFilter);
    }

    if (sort) {
      switch (sort) {
        case 'name':
          result.sort((a: Person, b: Person) => {
            return a.name.localeCompare(b.name);
          });
          break;

        case 'born':
          result.sort((a: Person, b: Person) => {
            return a.born - b.born;
          });
          break;

        case 'died':
          result.sort((a: Person, b: Person) => {
            return a.died - b.died;
          });
          break;

        case 'sex':
          result.sort((a: Person, b: Person) => {
            return a.sex.localeCompare(b.sex);
          });
          break;
      }

      if (order === 'desc') {
        result.reverse();
      }
    }

    return result;
  };

  useEffect(() => {
    setLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading &&
                !hasError &&
                people.length > 0 &&
                sortedPeople().length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {!loading && !hasError && sortedPeople().length > 0 && (
                <PeopleTable people={sortedPeople()} slug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
