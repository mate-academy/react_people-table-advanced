import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const filterSex = searchParams.get('sex') || 'all';
  const filterCenturies = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const getPreparePeople = (peopleAll: Person[]) => {
    let filteredPeople = [...peopleAll];

    if (query) {
      const queryToLower = query.toLowerCase();

      filteredPeople = filteredPeople.filter(person => (
        person.name.toLowerCase().includes(queryToLower)
        || person.motherName?.toLowerCase().includes(queryToLower)
        || person.fatherName?.toLowerCase().includes(queryToLower)
      ));
    }

    if (filterSex !== 'all') {
      filteredPeople = filteredPeople
        .filter(person => person.sex === filterSex);
    }

    if (filterCenturies.length > 0) {
      filteredPeople = filteredPeople
        .filter(person => filterCenturies
          .includes(Math.ceil(person.born / 100).toString()));
    }

    if (sort) {
      switch (sort) {
        case 'name':
        case 'sex':
          return filteredPeople.sort((a, b) => a[sort].localeCompare(b[sort]));

        case 'born':
        case 'died':
          return filteredPeople.sort((a, b) => a[sort] - b[sort]);

        default:
          return filteredPeople;
      }
    }

    if (order === 'desc') {
      filteredPeople.reverse();
    }

    return filteredPeople;
  };

  const visiblePeople = getPreparePeople(people);

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters setSearchWith={setSearchWith} />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {!isLoading && errorMessage && (
                <p data-cy="peopleLoadingError">
                  {errorMessage}
                </p>
              )}

              {people.length === 0 && !isLoading && !errorMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && people.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && people.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
