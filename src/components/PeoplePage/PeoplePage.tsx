/* eslint-disable no-console */
import { useEffect, useMemo, useState } from 'react';
import { PeopleFilters } from '../PeopleFilters';
import { PeopleTable } from '../PeopleTable';
import { Status } from '../../types/Status';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [people, setPeople] = useState<Person[] | null>(null);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase().trim();
  const centuriesFilter = searchParams.getAll('centuries');

  const filteredPeople = useMemo(() => {
    let filtered = people;

    if (query && people) {
      filtered = people?.filter(person => {
        return (
          query !== undefined &&
          (person.name.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query)
            ? person
            : null)
        );
      });
    }

    if (filtered) {
      filtered = filtered?.filter(person => {
        console.log(centuriesFilter);
        if (centuriesFilter.length === 0) {
          return true;
        }

        return centuriesFilter.some(centuryString => {
          const century = +centuryString;
          const start = (century - 1) * 100;
          const end = start + 99;

          return person.died >= start && person.born <= end;
        });
      });
    }

    return filtered;
  }, [centuriesFilter, people, query]);

  const loadPeople = () => {
    return getPeople()
      .then(data => {
        setPeople(data);
        setStatus('resolved');
      })
      .catch(() => setStatus('rejected'));
  };

  useEffect(() => {
    setStatus('pending');
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {status === 'resolved' && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              <p>There are no people matching the current search criteria</p>
              <PeopleTable status={status} people={filteredPeople} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
