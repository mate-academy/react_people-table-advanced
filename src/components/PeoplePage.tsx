import React, { useEffect, useState } from 'react';
// eslint-disable-next-line object-curly-newline, max-len
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [loadedPeople, setLoadedPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [requestStatus, setRequestStatus] = useState(false);
  const [searchParams] = useSearchParams();

  const { id = '' } = useParams();

  const loadPeople = () => {
    setLoading(true);
    getPeople()
      .then(people => {
        setLoadedPeople(people);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        setRequestStatus(true);
      });
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const filteredPeople = () => {
    let res = loadedPeople.filter(
      (person) => {
        switch (searchParams.get('sex')) {
          case 'm':
            return person.sex === 'm';
            break;
          case 'f':
            return person.sex === 'f';
            break;
          default:
            return true;
        }
      },
    ).filter(
      (person) => {
        if (searchParams.getAll('centuries').length === 0) {
          return true;
        }

        const centuries = searchParams.getAll('centuries');

        return centuries.includes(Math.ceil(person.born / 100).toString());
      },
    ).filter(
      (person) => {
        const query = searchParams.get('query');

        if (query === null) {
          return true;
        }

        const names = `${person.name}${person.fatherName}${person.motherName}`.toLowerCase();

        return names.includes(query.toLowerCase());
      },
    );

    const sortKey = searchParams.get('sort');

    if (sortKey) {
      res = res.sort((a, b) => {
        let elA = a[sortKey as keyof Person];
        let elB = b[sortKey as keyof Person];

        if (searchParams.get('order') === 'desc') {
          elA = b[sortKey as keyof Person];
          elB = a[sortKey as keyof Person];
        }

        if (typeof elA === 'string' && typeof elB === 'string') {
          return elA.localeCompare(elB);
        }

        if (typeof elA === 'number' && typeof elB === 'number') {
          return elA - elB;
        }

        return 0;
      });
    }

    return res;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {(requestStatus)
            && (
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>
            )}
          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {(requestStatus)
                && (
                  <PeopleTable
                    allPeople={loadedPeople}
                    people={filteredPeople()}
                    slug={id}
                  />
                )}
              {loadedPeople && !loading && loadedPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
