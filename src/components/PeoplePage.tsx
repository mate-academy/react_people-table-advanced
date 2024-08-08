import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import PeopleTable from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const activeSex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sortParam = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const preparedPeople = useMemo(() => {
    return people.map(person => {
      const newPerson = { ...person };

      const mother = people.find(m => person.motherName === m.name);
      const father = people.find(f => person.fatherName === f.name);

      newPerson.mother = mother;
      newPerson.father = father;

      return newPerson;
    });
  }, [people]);

  const filteredPeople = useMemo(() => {
    function doesIncludesQuery(person: Person) {
      const name = person.name.toLowerCase();
      const fatherName = person.fatherName?.toLowerCase();
      const motherName = person.motherName?.toLowerCase();

      return (
        name.includes(query) ||
        fatherName?.includes(query) ||
        motherName?.includes(query)
      );
    }

    const filteredList = preparedPeople.filter(item => {
      const sexCondition = activeSex === '' ? item : item.sex === activeSex;
      const date = +`${item.born}`.split('').slice(0, 2).join('') + 1;
      const ageCondition =
        centuries.length === 0 ? item : centuries.includes(`${date}`);

      return sexCondition && ageCondition && doesIncludesQuery(item);
    });

    type SortType = 'name' | 'sex' | 'died' | 'born';

    function sortHandler(sortValue: SortType) {
      if (sortValue === 'name' || sortValue === 'sex') {
        return (p1: Person, p2: Person) =>
          order === 'desc'
            ? p2[sortValue].localeCompare(p1[sortValue])
            : p1[sortValue].localeCompare(p2[sortValue]);
      } else {
        return (p1: Person, p2: Person) =>
          order === 'desc'
            ? p2[sortValue] - p1[sortValue]
            : p1[sortValue] - p2[sortValue];
      }
    }

    switch (sortParam) {
      case 'name':
        return [...filteredList].sort(sortHandler('name'));
      case 'sex':
        return [...filteredList].sort(sortHandler('sex'));
      case 'born':
        return [...filteredList].sort(sortHandler('born'));
      case 'died':
        return [...filteredList].sort(sortHandler('died'));
      default:
        return filteredList;
    }
  }, [activeSex, centuries, order, preparedPeople, query, sortParam]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && !isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!filteredPeople.length && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!filteredPeople.length && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
