import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { SearchOptions } from '../utils/SearchOptions';
import { SortType } from '../utils/SortType';
import { SearchParams } from '../utils/searchHelper';

const isIncludeQuery = (
  personName: Person | undefined,
  normalizeQuery: string,
) => (
  personName?.name.toLocaleLowerCase().trim().includes(normalizeQuery)
);

const filterPeople = (
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
  sort: string,
): Person[] => {
  let preparedPeople = [...people];
  const normalizeQuery = query.toLocaleLowerCase().trim();
  const centuriesToNumber = centuries.map(c => Number(c));

  if (centuriesToNumber.length > 0) {
    preparedPeople = preparedPeople.filter(person => {
      const personCentury = Math.ceil(person.born / 100);

      return centuriesToNumber.includes(personCentury) && person;
    });
  }

  if (query) {
    preparedPeople = preparedPeople.filter(person => (
      person.name.includes(normalizeQuery)
      || isIncludeQuery(person.mother, normalizeQuery)
      || isIncludeQuery(person.father, normalizeQuery)
    ));
  }

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (sort) {
    preparedPeople.sort((personA, personB) => {
      switch (sort) {
        case SortType.Name:
          return personA.name.localeCompare(personB.name);
        case SortType.Sex:
          return personA.sex.localeCompare(personB.sex);
        case SortType.Born:
          return personA.born - personB.born;
        case SortType.Died:
          return personA.died - personB.died;
        default:
          return 0;
      }
    });
  }

  return preparedPeople;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSerchParams] = useSearchParams();
  const query = searchParams.get(SearchOptions.Query) || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get(SearchOptions.Sort) || '';
  const order = searchParams.get(SearchOptions.Order) || '';

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => (
        setIsLoading(false)
      ));
  }, []);

  const peopleWithParents = people.map(person => {
    const mother = people.find(({ name }) => name === person.motherName);
    const father = people.find(({ name }) => name === person.fatherName);

    return { ...person, mother, father };
  });

  const visiblePeople = filterPeople(
    peopleWithParents,
    sex,
    query,
    centuries,
    sort,
  );

  const getSortParams = (sortType: SortType): SearchParams => {
    if (sort !== sortType) {
      return {
        [SearchOptions.Sort]: sortType,
        [SearchOptions.Order]: null,
      };
    }

    if (sort === sortType && !order) {
      return { [SearchOptions.Order]: 'desc' };
    }

    return {
      [SearchOptions.Sort]: null,
      [SearchOptions.Order]: null,
    };
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {(!isLoading && !isError) && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                searchParams={searchParams}
                setSerchParams={setSerchParams}
                centuries={centuries}
                sex={sex}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              <PeopleTable
                visiblePeople={visiblePeople}
                isError={isError}
                isLoading={isLoading}
                people={people}
                sort={sort}
                order={order}
                getSortParams={getSortParams}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
