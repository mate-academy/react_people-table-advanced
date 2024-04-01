import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';
import { sortPeople } from '../utils/sortPeople';
import { useSearchParams } from 'react-router-dom';
import { filterPeople } from '../utils/filterPeople';

type ResponseStatus = 'idle' | 'fulfield' | 'rejected' | 'pending';

export const PeoplePage: React.FC = () => {
  const [status, setStatus] = useState<ResponseStatus>('idle');
  const [people, setPeople] = useState<Person[]>([]);

  const [searchParams] = useSearchParams();
  const centuries = searchParams
    .getAll('centuries')
    .map(century => parseInt(century))
    .filter(century => !isNaN(century));

  const preparedPeople = sortPeople(
    filterPeople(
      people,
      searchParams.get('query'),
      centuries,
      searchParams.get('sex'),
    ),
    searchParams.get('sort'),
    searchParams.get('order') ? 'desc' : 'asc',
  );

  useEffect(() => {
    setStatus('pending');
    getPeople()
      .then(response => {
        setPeople(response);
        setStatus('fulfield');
      })
      .catch(() => {
        setPeople([]);
        setStatus('rejected');
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
              {status === 'pending' && <Loader />}

              {status === 'rejected' && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {status === 'fulfield' && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {status === 'fulfield' && !preparedPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}
              {status === 'fulfield' && <PeopleTable people={preparedPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
