import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { Person } from '../types';
import { getPeople } from '../api';
import { sortPeople } from '../utils/sortPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  async function getPeopleList() {
    try {
      setLoading(true);

      const peopleList = await getPeople();

      setPeople(peopleList);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function filterByQuery(str: string | null) {
    return str?.toLowerCase().includes(query?.toLowerCase() || '') || false;
  }

  const shownPeopleList = useMemo(() => {
    let filteredArray = [...people];

    if (!sex && !query && !centuries && !sort) {
      return people;
    }

    if (sex || query || centuries) {
      filteredArray = people.filter(person => {
        return (!sex ? true : person.sex === sex)
          && (filterByQuery(person.name)
            || filterByQuery(person.motherName)
            || filterByQuery(person.fatherName))
          && (
            centuries.length === 0
              ? true
              : centuries.includes(`${Math.ceil(person.born / 100)}`)
          );
      });
    }

    if (sort) {
      return sortPeople(filteredArray, sort, order);
    }

    return filteredArray;
  }, [sex, query, centuries, sort, order]);

  useEffect(() => {
    getPeopleList();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">

          {!isError && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">

              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isError && !isLoading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isError && !isLoading && shownPeopleList.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isError && shownPeopleList.length > 0 && (
                <PeopleTable people={shownPeopleList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
