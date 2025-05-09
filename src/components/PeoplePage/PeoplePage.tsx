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

  //variables that helps filtering and sorting based on searchParams
  const query = searchParams.get('query')?.toLowerCase().trim();
  const filteredByCenturies = searchParams.getAll('centuries');
  const filteredBySex = searchParams.get('sex');
  const sortParam = searchParams.get('sort');
  const orderParam = searchParams.get('order');

  /**
   * Function that filter people by sex, centuries and input
   */
  const filteredPeople = useMemo(() => {
    let filtered = people;

    //filter by input
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

    //filter bt century
    if (filtered) {
      filtered = filtered?.filter(person => {
        if (filteredByCenturies.length === 0) {
          return true;
        }

        return filteredByCenturies.some(centuryString => {
          const century = +centuryString;
          const start = (century - 1) * 100;
          const end = start + 99;

          return person.died >= start && person.born <= end;
        });
      });

      //filter by sex
      if (filtered && filteredBySex === 'f') {
        filtered = filtered.filter(person => person.sex === 'f');
      }

      if (filtered && filteredBySex === 'm') {
        filtered = filtered.filter(person => person.sex === 'm');
      }
    }

    return filtered;
  }, [filteredByCenturies, people, query, filteredBySex]);

  /**
   * sort people based on name, sex, bord and died params in
   * ascending or descending order
   */
  switch (sortParam) {
    case orderParam === 'desc' && 'name':
      filteredPeople?.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'name':
      filteredPeople?.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case orderParam === 'desc' && 'sex':
      filteredPeople?.sort((a, b) => b.sex.localeCompare(a.sex));
      break;
    case 'sex':
      filteredPeople?.sort((a, b) => a.sex.localeCompare(b.sex));
      break;
    case orderParam === 'desc' && 'born':
      filteredPeople?.sort((a, b) => +b.born - +a.born);
      break;
    case 'born':
      filteredPeople?.sort((a, b) => +a.born - +b.born);
      break;
    case orderParam === 'desc' && 'died':
      filteredPeople?.sort((a, b) => +b.died - +a.died);
      break;
    case 'died':
      filteredPeople?.sort((a, b) => +a.died - +b.died);
      break;

    default:
      break;
  }

  /**
   * Function that load people from API
   * @returns Promise<void>
   */
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
