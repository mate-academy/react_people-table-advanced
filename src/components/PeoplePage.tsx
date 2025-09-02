import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const handleQueryChange = (
    event: React.ChangeEvent<HTMLInputElement> | null,
  ) => {
    setSearchWith({ query: event?.target.value || null });
  };

  const handleSexChange = (gender: string | null) => {
    setSearchWith({ sex: gender || null });
  };

  const handleCenturiesChange = (cent: number | null) => {
    const newCenturies = centuries.includes(String(cent))
      ? centuries.filter(currentCentury => currentCentury !== String(cent))
      : [...centuries, String(cent)];

    setSearchWith({ centuries: newCenturies || null });
  };

  const filteredPeople = people.filter(person => {
    const nameFilter = query.trim().toLowerCase();

    const filterByName =
      person.name.toLocaleLowerCase().includes(nameFilter) ||
      person.motherName?.toLocaleLowerCase().includes(nameFilter) ||
      person.fatherName?.toLocaleLowerCase().includes(nameFilter);

    const filterByCentury =
      centuries.length !== 0
        ? centuries.includes(String(Math.ceil(person.born / 100)))
        : true;
    const filterByGender = sex ? person.sex === sex : true;

    return filterByName && filterByCentury && filterByGender;
  });

  const handlePeopleSort = (sortField: string) => {
    let newSortField = null;
    let newSortOrder = null;

    if (sort !== sortField) {
      newSortField = sortField;
      newSortOrder = null;
    } else if (!order) {
      newSortField = sortField;
      newSortOrder = 'desc';
    } else {
      newSortField = null;
      newSortOrder = null;
    }

    setSearchWith({ sort: newSortField || null, order: newSortOrder || null });
  };

  const sortedPeople = !sort
    ? filteredPeople
    : [...filteredPeople].sort((a, b) => {
      /* eslint-disable */
        const direction = order === 'desc' ? -1 : 1;

        switch (sort) {
          case 'name':
            return direction * a.name.localeCompare(b.name);

          case 'sex':
            return direction * a.sex.localeCompare(b.sex);

          case 'born':
            return direction * (+a.born - +b.born);

          case 'died':
            return direction * (+a.died - +b.died);

          default:
            return 0;
        }
      });
  {
    /* eslint-enable */
  }

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopeFromServer => setPeople(peopeFromServer))
      .catch(() => setErrorMessage('Unable to load people from server'))
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
                query={query}
                sex={sex}
                centuries={centuries}
                searchParams={searchParams}
                handleQueryChange={handleQueryChange}
                handleSexChange={handleSexChange}
                handleCenturiesChange={handleCenturiesChange}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {errorMessage !== '' && !isLoading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {people.length === 0 && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {isLoading ? (
                <Loader />
              ) : (
                <PeopleTable
                  people={people}
                  sort={sort}
                  order={order}
                  searchParams={searchParams}
                  sortedPeople={sortedPeople}
                  handlePeopleSort={handlePeopleSort}
                />
              )}

              {/* eslint-disable */}
              {!isLoading &&
                filteredPeople.length === 0 &&
                people.length !== 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}
              {/* eslint-enable */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
