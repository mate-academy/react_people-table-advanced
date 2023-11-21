import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { Table } from '../Table/Table';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { NoPeople } from '../NoPeople/NoPeople';
import { PeopleError } from '../PeopleError/PeopleError';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';

/* eslint-disable max-len */
export const PeoplePage = () => {
  const [loader, setLoader] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || 'all';
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then(serverPeople => {
        setPeople(serverPeople);
        setError(false);
      })
      .catch(() => setError(true)).finally(() => setLoader(false));
  }, []);

  const getfilteredPeople = () => {
    let filteredPeople = [...people];

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(
        person => centuries.includes(
          Math.ceil(person.born / 100).toString(),
        ),
      );
    }

    if (sex !== 'all') {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (query) {
      const validQuery = query.toLocaleLowerCase().trim();

      filteredPeople = filteredPeople.filter(
        (person) => person.name.toLocaleLowerCase().includes(validQuery)
          || person.fatherName?.toLocaleLowerCase().includes(validQuery)
          || person.motherName?.toLocaleLowerCase().includes(validQuery),
      );
    }

    if (sort) {
      switch (sort) {
        case 'name':
        case 'sex':
          filteredPeople = filteredPeople.sort((person1, person2) => {
            return (order === 'desc')
              ? person2[sort].localeCompare(person1[sort])
              : person1[sort].localeCompare(person2[sort]);
          });
          break;
        case 'born':
        case 'died':
          filteredPeople = filteredPeople.sort((person1, person2) => {
            return (order === 'desc')
              ? person2[sort] - person1[sort]
              : person1[sort] - person2[sort];
          });
          break;
        default:
      }
    }

    return filteredPeople;
  };

  const displayedPeople = getfilteredPeople();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loader && (<PeopleFilters />)}
          </div>
          <div className="column">
            <div className="box table-container">
              {loader && (<Loader />)}
              {people?.length === 0 && error === false && !loader && (<NoPeople />)}
              {error && (<PeopleError />)}
              {error === false && people?.length && !loader && (<Table people={displayedPeople} />)}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
