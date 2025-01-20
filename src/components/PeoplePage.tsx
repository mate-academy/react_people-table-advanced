/* eslint-disable @typescript-eslint/indent */

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable, SortKeys } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

function filterPeople(
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
) {
  const filteredBySex = sex
    ? people.filter(person => person.sex === sex)
    : people;
  const filteredByName = query
    ? filteredBySex.filter(person => {
        const normalizedQuery = query.toLowerCase();
        const isMatchesName = person.name
          .toLowerCase()
          .includes(normalizedQuery);
        let isMatchesMotherName;
        let isMatchesFatherName;

        if (person.motherName) {
          isMatchesMotherName = person.motherName
            .toLowerCase()
            .includes(normalizedQuery);
        }

        if (person.fatherName) {
          isMatchesFatherName = person.fatherName
            .toLowerCase()
            .includes(normalizedQuery);
        }

        return isMatchesName || isMatchesMotherName || isMatchesFatherName;
      })
    : filteredBySex;
  const filteredByCenturies = centuries.length
    ? filteredByName.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      )
    : filteredByName;

  return filteredByCenturies;
}

function sortPeople(people: Person[], sort: string, order: string) {
  const sortedPeople = [...people];

  switch (sort) {
    case SortKeys.name:
      sortedPeople.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case SortKeys.sex:
      sortedPeople.sort((a, b) => a.sex.localeCompare(b.sex));
      break;

    case SortKeys.born:
      sortedPeople.sort((a, b) => a.born - b.born);
      break;

    case SortKeys.died:
      sortedPeople.sort((a, b) => a.died - b.died);
      break;
  }

  if (order) {
    sortedPeople.reverse();
  }

  return sortedPeople;
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [sortedPeople, setSortedPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getPeopleData = async () => {
      try {
        const peopleData = await getPeople();

        const modifiedPeopleData = peopleData.map(person => {
          const modifiedPerson = { ...person };
          const personMother = peopleData.find(
            p => p.name === person.motherName,
          );
          const personFather = peopleData.find(
            p => p.name === person.fatherName,
          );

          if (personMother) {
            modifiedPerson.mother = personMother;
          }

          if (personFather) {
            modifiedPerson.father = personFather;
          }

          return modifiedPerson;
        });

        setPeople(modifiedPeopleData);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    getPeopleData();
  }, []);

  useEffect(() => {
    const sex = searchParams.get('sex') || '';
    const query = searchParams.get('query') || '';
    const centuries = searchParams.getAll('centuries') || [];

    const filteredPeopleData = filterPeople(people, sex, query, centuries);

    setFilteredPeople(filteredPeopleData);
  }, [people, searchParams]);

  useEffect(() => {
    const sort = searchParams.get('sort') || '';
    const order = searchParams.get('order') || '';

    const sortedPeopleData = sortPeople(filteredPeople, sort, order);

    setSortedPeople(sortedPeopleData);
  }, [filteredPeople, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !people.length && !isError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !filteredPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && <PeopleTable people={sortedPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
