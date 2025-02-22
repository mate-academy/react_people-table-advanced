import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { useSearchParams } from 'react-router-dom';
import { Sex } from '../types/SexType';
import { Sort } from '../types/SortType';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoader(true);
    getPeople()
      .then(arr => {
        setPeople(arr);
        setIsLoader(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoader(false);
      });
  }, []);

  const query = searchParams.get('query') || '';
  const sexType = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const filteredPeople = people
    .filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))
    .filter(({ sex }) => {
      if (sexType === Sex.Male) {
        return sex === Sex.Male;
      }

      if (sexType === Sex.Female) {
        return sex === Sex.Female;
      }

      return true;
    })
    .filter(({ born }) => {
      if (centuries.length > 0) {
        for (const century of centuries) {
          const maxCenturyBoard = +century * 100;
          const minCenturyBoard = (+century - 1) * 100;

          if (born > minCenturyBoard && born <= maxCenturyBoard) {
            return true;
          }
        }

        return false;
      }

      return true;
    })
    .sort((element1, element2) => {
      switch (sort) {
        case Sort.Name:
          if (order) {
            return element2.name.localeCompare(element1.name);
          }

          return element1.name.localeCompare(element2.name);
        case Sort.Sex:
          if (order) {
            return element2.sex.localeCompare(element1.sex);
          }

          return element1.sex.localeCompare(element2.sex);
        case Sort.Born:
          if (order) {
            return element2.born - element1.born;
          }

          return element1.born - element2.born;
        case Sort.Died:
          if (order) {
            return element2.died - element1.died;
          }

          return element1.died - element2.died;
        default:
          return 0;
      }
    });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoader && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && !isLoader && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length !== 0 && !isError && !isLoader && (
                <PeopleTable
                  sort={sort}
                  order={order}
                  filteredPeople={filteredPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
