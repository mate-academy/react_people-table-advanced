import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { SearchParams } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [isLoader, setIsLoader] = useState(true);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const toggleByParams = (param: string): SearchParams => {
    if (param === sort) {
      if (order === 'desc') {
        return { sort: null, order: null };
      }

      return { sort: param, order: 'desc' };
    }

    return { sort: param };
  };

  const getClassParams = (param: string) => {
    if (param === sort) {
      if (order === 'desc') {
        return 'fas fa-sort-up';
      }

      return 'fas fa-sort-down';
    }

    return 'fas fa-sort';
  };

  const getCentury = (year: number) => Math.floor(year / 100) + 1;

  const preparePeopleList = [...people]
    .sort((p1, p2) => {
      let res = 0;

      switch (sort) {
        case 'name':
          res = p1.name.localeCompare(p2.name);
          break;
        case 'sex':
          res = p1.sex.localeCompare(p2.sex);
          break;

        case 'born':
          res = p2.born - p1.born;
          break;

        case 'died':
          res = p2.died - p1.died;
          break;

        default:
          res = 0;
          break;
      }

      return order ? -res : res;
    })
    .filter(person => {
      return (
        person.name.toLowerCase().includes(query.toLowerCase()) &&
        person.sex.includes(sex) &&
        (centuries.length
          ? centuries.includes(`${getCentury(person.born)}`)
          : true)
      );
    });

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoader(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoader && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoader && <Loader />}

              {isError && !isLoader && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!people.length && !isLoader && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!preparePeopleList.length && !isLoader && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!preparePeopleList.length && (
                <PeopleTable
                  preparePeopleList={preparePeopleList}
                  toggleByParams={toggleByParams}
                  getClassParams={getClassParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
