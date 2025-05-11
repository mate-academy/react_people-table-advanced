import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/Table/PeopleTable';
import { useEffect, useState } from 'react';
import { Person, SearchParamsNames } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { SORT_DESC } from '../constants';

const filterPeople = (people: Person[], searchParams: URLSearchParams) => {
  let filteredPeople = people;
  const sex = searchParams.get(SearchParamsNames.Sex);
  const query = searchParams.get(SearchParamsNames.Query);
  const centuries = searchParams
    .getAll(SearchParamsNames.Centuries)
    .map(century => +century);

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query) {
    filteredPeople = filteredPeople.filter(person =>
      person.name.includes(query),
    );
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(
      person =>
        centuries.includes(Math.ceil(person.born / 100)) ||
        centuries.includes(Math.ceil(person.died / 100)),
    );
  }

  return filteredPeople;
};

const sortPeople = (people: Person[], searchParams: URLSearchParams) => {
  const sortField =
    searchParams.get(SearchParamsNames.Sort)?.toLocaleLowerCase() ?? '';
  const sortOrder =
    searchParams.get(SearchParamsNames.Order)?.toLocaleLowerCase() ?? '';

  if (!sortField) {
    return people;
  }

  const sortedPeople = [...people];

  switch (true) {
    case sortField === 'name' || sortField === 'sex':
      sortedPeople.sort((person1, person2) =>
        person1[sortField].localeCompare(person2[sortField]),
      );

      if (sortOrder === SORT_DESC) {
        sortedPeople.reverse();
      }

      return sortedPeople;

    case sortField === 'born' || sortField === 'died':
      sortedPeople.sort(
        (person1, person2) => +person1[sortField] - person2[sortField],
      );

      if (sortOrder === SORT_DESC) {
        sortedPeople.reverse();
      }

      return sortedPeople;
    default:
      return people;
  }
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { slug: selectedSlug } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then((serverPeople: Person[]) => {
        const relatives = serverPeople.map(person => {
          const fullPerson = { ...person };
          const { fatherName, motherName } = fullPerson;

          if (fatherName) {
            fullPerson.father = serverPeople.find(
              person1 => person1.name === fatherName,
            );
          }

          if (motherName) {
            fullPerson.mother = serverPeople.find(
              person2 => person2.name === motherName,
            );
          }

          return fullPerson;
        });

        setPeople(relatives);
      })
      .catch(error => {
        setIsError(true);
        /* eslint-disable no-console */
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredPeople = filterPeople(people, searchParams);
  const sortedPeople = sortPeople(filteredPeople, searchParams);

  const hasNoPeople = !isError && !isLoading && people.length === 0;
  const hasNoSorted = !hasNoPeople && sortedPeople.length === 0;

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
              {hasNoSorted && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isLoading && <Loader />}
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {hasNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {sortedPeople.length > 0 && (
                <PeopleTable
                  people={sortedPeople}
                  selectedSlug={selectedSlug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
