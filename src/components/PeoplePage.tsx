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
  const [filterPeople, setFilterPeople] = useState<Person[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  console.log(searchParams.toString());

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then((data: Person[]) => {
        setPeople(data);
      })
      .finally(() => setLoader(false));
  }, [setLoader]);

  const handleSort = () => {
    const sortedPeople = [...people];

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
        return [...people];
    }

    return [...sortedPeople];
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters setFilterPeople={setFilterPeople} people={people} />
          </div>

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

              <PeopleTable
                handleSort={handleSort}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
