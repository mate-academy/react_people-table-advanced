import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { PeopleFilters } from '../../components/PeopleFilter/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>();
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [noPeopleOnServer, setNoPeopleOnServer] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoader, setIsLoader] = useState(true);
  const [searchParams] = useSearchParams();

  const filterPeople = (peopleList: Person[]) => {
    const query = searchParams.get('query');
    const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('century').map(century => +century);
    let newFilteredPeople = [...peopleList];

    if (sex) {
      newFilteredPeople = newFilteredPeople
        .filter(person => person.sex === sex);
    }

    if (query) {
      newFilteredPeople = newFilteredPeople.filter(person => person.name
        .toLowerCase().includes(query));
    }

    if (centuries?.length) {
      newFilteredPeople = newFilteredPeople.filter(
        person => centuries.includes(Math.ceil(person.born / 100)),
      );
    }

    return newFilteredPeople;
  };

  const sortPeople = (peopleList: Person[]) => {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');
    const sortedPeople = [...peopleList];

    if (sort) {
      sortedPeople.sort((a, b) => {
        const value1 = a[sort];
        const value2 = b[sort];

        if (typeof value1 === 'string' && typeof value2 === 'string') {
          return value1.toLowerCase()
            .localeCompare(value2.toLowerCase());
        }

        if (typeof value1 === 'number' && typeof value2 === 'number') {
          return value1 - value2;
        }

        return 0;
      });
    }

    if (order) {
      sortedPeople.reverse();
    }

    return setFilteredPeople(sortedPeople);
  };

  useEffect(() => {
    getPeople()
      .then(res => {
        if (!res.length) {
          return setNoPeopleOnServer(true);
        }

        setFilteredPeople(res);

        return setPeople(res);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoader(false));
  }, []);

  useEffect(() => {
    if (people) {
      let newPeopleList = [...people];

      newPeopleList = filterPeople(newPeopleList);
      sortPeople(newPeopleList);
    }
  }, [searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoader && <Loader />}

              {people && people.length > 0 && (
                <PeopleTable
                  people={people}
                  filteredPeople={filteredPeople}
                />
              )}

              {noPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {filteredPeople && people && !filteredPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
