import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorServer, setErrorServer] = useState<boolean>(false);
  const [errorNoPeople, setErrorNoPeople] = useState<boolean>(false);
  const [errorFilter, setErrorFilter] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then((data: Person[]) => {
        setPeople(data);
        // setFilterPeople(data);

        if (!data.length) {
          setErrorNoPeople(true);
        }
      })
      .catch(() => setErrorServer(true))
      .finally(() => setLoader(false));
  }, [setLoader]);

  const handleFilter = () => {
    if (people.length === 0) {
      return [];
    }

    setErrorFilter(false);
    let filteredPeople = [...people];
    const century = searchParams.getAll('century');
    const sex = searchParams.get('sex');
    const query = searchParams.get('query');

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (query) {
      filteredPeople = filteredPeople.filter(person => {
        const lowerCaseQuery = query.toLowerCase();
        const nameQuery = person.name.toLowerCase().includes(lowerCaseQuery);
        const fatherNameQuery = person.fatherName
          ?.toLowerCase()
          .includes(lowerCaseQuery);
        const motherNameQuery = person.motherName
          ?.toLowerCase()
          .includes(lowerCaseQuery);

        return nameQuery || fatherNameQuery || motherNameQuery;
      });
    }

    if (century.length > 0) {
      filteredPeople = filteredPeople.filter(person =>
        century.includes(`${Math.ceil(person.born / 100)}`),
      );
    }

    if (!filteredPeople.length) {
      setErrorFilter(true);
    }

    if (filteredPeople.length) {
      setErrorFilter(false);
    }

    return filteredPeople;
  };

  const handleSort = () => {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    const sortedPeople = handleFilter();

    if (sort) {
      switch (sort) {
        case 'name':
        case 'sex':
          if (!order) {
            sortedPeople.sort((a, b) => a[sort].localeCompare(b[sort]));
            break;
          }

          sortedPeople.sort((a, b) => b[sort].localeCompare(a[sort]));
          break;

        case 'born':
        case 'died':
          if (!order) {
            sortedPeople.sort((a, b) => a[sort] - b[sort]);
            break;
          }

          sortedPeople.sort((a, b) => b[sort] - a[sort]);
          break;

        default:
          return [...sortedPeople];
      }
    }

    return [...sortedPeople];
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loader && !errorNoPeople && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters handleFilter={handleFilter} />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}

              {errorServer && !loader && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {errorNoPeople && !loader && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {errorFilter && !loader && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loader && !errorFilter && (
                <PeopleTable
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                  handleSort={handleSort}
                  loader={loader}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
