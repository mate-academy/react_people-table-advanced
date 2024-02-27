/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useSearchParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleContex } from '../store/PeopleContex';
import { PeopleFilters } from '../components/PeopleFilters';
import { getPeople } from '../api';
import { filterPeople } from '../services/filter';
import { getSearchWith } from '../utils/searchHelper';
import { SortType } from '../types/SortType';

export const PeoplePage = () => {
  const {
    people,
    errorMassage,
    loading,
    setLoading,
    setPeople,
    setErrorMassage,
  } = useContext(PeopleContex);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const filteredPeople =
    people && filterPeople(people, query, centuries, sex, sort, order);

  // const isFiltred = filteredPeople && !!filteredPeople?.length && !loading;

  const isPeopleList = people && !!people?.length && !loading;

  const noPeopleMessage = !filteredPeople?.length && !loading;
  const isErrorMassage = errorMassage && !loading;
  const isLoading = loading && !query && !!people?.length;

  const handleSorting = (sortType: SortType) => {
    if (sort === sortType && order === 'desc') {
      return { sort: null, order: null };
    }

    if (sort === sortType) {
      return { sort: sortType, order: 'desc' };
    }

    return { sort: sortType, order: null };
  };

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(response => {
        setPeople(response);
      })
      .catch(() => {
        setErrorMassage(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isPeopleList && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                isPeopleList && (
                  <table
                    data-cy="peopleTable"
                    className="table is-striped
              is-hoverable is-narrow is-fullwidth"
                  >
                    <thead>
                      <tr>
                        <th>
                          <span className="is-flex is-flex-wrap-nowrap">
                            Name
                            <Link
                              to={{
                                search: getSearchWith(
                                  searchParams,
                                  handleSorting(SortType.Name),
                                ),
                              }}
                            >
                              <span className="icon">
                                <i className="fas fa-sort" />
                              </span>
                            </Link>
                          </span>
                        </th>

                        <th>
                          <span className="is-flex is-flex-wrap-nowrap">
                            Sex
                            <Link
                              to={{
                                search: getSearchWith(
                                  searchParams,
                                  handleSorting(SortType.Sex),
                                ),
                              }}
                            >
                              <span className="icon">
                                <i className="fas fa-sort" />
                              </span>
                            </Link>
                          </span>
                        </th>

                        <th>
                          <span className="is-flex is-flex-wrap-nowrap">
                            Born
                            <Link
                              to={{
                                search: getSearchWith(
                                  searchParams,
                                  handleSorting(SortType.Born),
                                ),
                              }}
                            >
                              <span className="icon">
                                <i className="fas fa-sort-up" />
                              </span>
                            </Link>
                          </span>
                        </th>

                        <th>
                          <span className="is-flex is-flex-wrap-nowrap">
                            Died
                            <Link
                              to={{
                                search: getSearchWith(
                                  searchParams,
                                  handleSorting(SortType.Died),
                                ),
                              }}
                            >
                              <span className="icon">
                                <i className="fas fa-sort" />
                              </span>
                            </Link>
                          </span>
                        </th>

                        <th>Mother</th>
                        <th>Father</th>
                      </tr>
                    </thead>
                    {filteredPeople && <PeopleTable people={filteredPeople} />}
                  </table>
                )
              )}

              {noPeopleMessage && (
                <p data-cy="noPeopleMessage" className="has-text-danger">
                  There are now people
                </p>
              )}

              {isErrorMassage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
