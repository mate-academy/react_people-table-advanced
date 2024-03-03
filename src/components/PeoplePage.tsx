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
  const [filterPeople, setFilterPeople] = useState<Person[]>([...people]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then((data: Person[]) => {
        setPeople(data);
        setFilterPeople(data);
      })
      .finally(() => setLoader(false));
  }, [setLoader]);

  const handleFilter = () => {
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

    return filteredPeople;
  };

  const handleSort = () => {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    const sortedPeople = handleFilter();

    if (sort) {
      switch (sort) {
        case 'name':
          if (!order) {
            sortedPeople.sort((a, b) => a.name.localeCompare(b.name));

            break;
          }

          sortedPeople.sort((a, b) => b.name.localeCompare(a.name));
          break;

        case 'sex':
          if (!order) {
            sortedPeople.sort((a, b) => a.sex.localeCompare(b.sex));

            break;
          }

          sortedPeople.sort((a, b) => b.sex.localeCompare(a.sex));
          break;

        case 'born':
          if (!order) {
            sortedPeople.sort((a, b) => a.born - b.born);

            break;
          }

          sortedPeople.sort((a, b) => b.born - a.born);
          break;

        case 'died':
          if (!order) {
            sortedPeople.sort((a, b) => a.died - b.died);

            break;
          }

          sortedPeople.sort((a, b) => b.died - a.died);
          break;

        default:
          return filterPeople;
      }
    }

    return [...sortedPeople];
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loader && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters handleFilter={handleFilter} />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}

              {false && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {false && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {false && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loader && (
                <PeopleTable
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                  handleSort={handleSort}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
