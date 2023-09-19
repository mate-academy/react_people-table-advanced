import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getSearchWith } from '../utils/searchHelper';

interface FilterParams {
  query: string;
  sex: string;
  centuries: string[];
  sort: string;
  order: string;
}

const getVisiblePeople = (
  peopleData: Person[],
  {
    query,
    sex,
    centuries,
    sort,
    order,
  }: FilterParams,
): Person[] => {
  let filteredPeople = [...peopleData];
  const normalQuery = query.toLowerCase().trim();

  if (query) {
    filteredPeople = filteredPeople.filter((person) => {
      return (
        person.name.toLowerCase().includes(normalQuery)
        || person.motherName?.toLowerCase().includes(normalQuery)
        || person.fatherName?.toLowerCase().includes(normalQuery)
      );
    });
  }

  if (sex) {
    switch (sex) {
      case 'male':
        filteredPeople = filteredPeople.filter((person) => person.sex === 'm');
        break;
      case 'female':
        filteredPeople = filteredPeople.filter((person) => person.sex === 'f');
        break;
      default:
        break;
    }
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter((person) => {
      const personBornCentury = Math.ceil(person.born / 100).toString();

      return centuries.includes(personBornCentury);
    });
  }

  if (sort) {
    filteredPeople = filteredPeople.sort((person1, person2) => {
      switch (sort) {
        case 'Name':
          return person1.name.localeCompare(person2.name);
        case 'Sex':
          return person1.sex.localeCompare(person2.sex);
        case 'Born':
          return person1.born - person2.born;
        case 'Died':
          return person1.died - person2.died;
        default:
          return 0;
      }
    });
  }

  if (order) {
    filteredPeople.reverse();
  }

  return filteredPeople;
};

export const PeoplePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = getSearchWith(searchParams, { query: event.target.value });

    setSearchParams(params);
  };

  const handleSex = (newSex: string) => {
    const params = getSearchWith(searchParams, { sex: newSex });

    setSearchParams(params);
  };

  const matchMotherAndFather = (peopleFromServer: Person[]): Person[] => {
    return peopleFromServer.map((per): Person => {
      const mother = peopleFromServer.find(
        person => person.name === per.motherName,
      );

      const father = peopleFromServer.find(
        person => person.name === per.fatherName,
      );

      return { ...per, mother, father };
    });
  };

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => matchMotherAndFather(data))
      .then(data => setPeople(data))
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, []);

  const allPeople = getVisiblePeople(people, {
    query,
    sex,
    centuries,
    sort,
    order,
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length !== 0 && !loading && (
              <PeopleFilters
                query={query}
                sex={sex}
                centuries={centuries}
                handleSex={handleSex}
                handleQueryChange={handleQueryChange}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}
              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {people.length === 0 && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {allPeople.length === 0 && !loading && (
                <p>There are no people matching the current search criteria</p>
              )}
              {allPeople.length !== 0 && !loading && (
                <PeopleTable people={allPeople} sort={sort} order={order} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
