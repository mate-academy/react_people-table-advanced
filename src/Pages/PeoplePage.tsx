/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useSearchParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import classNames from 'classnames';
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
  const isPeopleList = people && !!people?.length && !loading;
  const noPeopleMessage = !filteredPeople?.length && !loading;
  const isErrorMassage = errorMassage && !loading;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
              {loading ? (
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
                                <i
                                  className={classNames('fas', {
                                    'fa-sort': sort !== SortType.Name,
                                    'fa-sort-up':
                                      sort && !order && sort === SortType.Name,
                                    'fa-sort-down':
                                      sort && order && sort === SortType.Name,
                                  })}
                                />
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
                                <i
                                  className={classNames('fas', {
                                    'fa-sort': sort !== SortType.Sex,
                                    'fa-sort-up':
                                      sort && !order && sort === SortType.Sex,
                                    'fa-sort-down':
                                      sort && order && sort === SortType.Sex,
                                  })}
                                />
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
                                <i
                                  className={classNames('fas', {
                                    'fa-sort': sort !== SortType.Born,
                                    'fa-sort-up':
                                      sort && !order && sort === SortType.Born,
                                    'fa-sort-down':
                                      sort && order && sort === SortType.Born,
                                  })}
                                />
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
                                <i
                                  className={classNames('fas', {
                                    'fa-sort': sort !== SortType.Died,
                                    'fa-sort-up':
                                      sort && !order && sort === SortType.Died,
                                    'fa-sort-down':
                                      sort && order && sort === SortType.Died,
                                  })}
                                />
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
    </>
  );
};
