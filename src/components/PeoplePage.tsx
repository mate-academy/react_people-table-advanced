import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const filterGender = searchParams.get('sex') || 'all';
  const filterCenturies = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const filteredPeople = (peopleArray: Person[]) => {
    let filterPeople = [...peopleArray];

    if (query) {
      const normalizeQuery = query.toLowerCase().trim();

      filterPeople = filterPeople.filter(person => (
        person.name.toLowerCase().includes(normalizeQuery)
        || person.motherName?.toLowerCase().includes(normalizeQuery)
        || person.fatherName?.toLowerCase().includes(normalizeQuery)
      ));
    }

    if (filterGender !== 'all') {
      filterPeople = filterPeople.filter(person => (
        person.sex === filterGender
      ));
    }

    if (filterCenturies.length > 0) {
      filterPeople = filterPeople.filter(person => {
        const century = Math.ceil(person.born / 100).toString();

        return filterCenturies.includes(century);
      });
    }

    if (sort) {
      switch (sort) {
        case 'name':
        case 'sex':
          return filterPeople.sort((a, b) => a[sort].localeCompare(b[sort]));

        case 'born':
        case 'died':
          return filterPeople.sort((a, b) => a[sort] - b[sort]);

        default:
          return filterPeople;
      }
    }

    if (order === 'desc') {
      filterPeople.reverse();
    }

    return filterPeople;
  };

  const visiblePeople = filteredPeople(people);

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters
                setSearchWith={setSearchWith}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <PeopleTable
                  people={visiblePeople}
                />
              )}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !visiblePeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
