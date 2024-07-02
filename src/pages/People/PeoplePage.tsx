import { useContext, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleList } from '../../components/PeopleList/PeopleList';
import { PeopleContext } from '../../peopleContext';
import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchParams } from '../../utils/searchHelper';
import classNames from 'classnames';

export const PeoplePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loader, warning, setLoader, setPeople, setWarning } =
    useContext(PeopleContext);
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    getPeople()
      .then(res => {
        if (!res) {
          setWarning('There are no people on the server');
        } else {
          setWarning('');
        }

        setPeople([...res]);
      })
      .catch(error => {
        setWarning('Something went wrong');
        throw error;
      })
      .finally(() => {
        setLoader(false);
      });
  }, [setLoader, setPeople, setWarning]);

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const handleSortingChange = (value: string) => {
    const currentValue = value;

    if (value !== sort) {
      setSearchWith({ sort: currentValue || null });
    } else {
      setSearchWith({ order: 'desc' || null });
    }

    if (value === sort && order) {
      setSearchWith({
        sort: null,
        order: null,
      });
    }
  };

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {loader || (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}
              {loader || warning || (
                <table
                  data-cy="peopleTable"
                  className="
                  table is-striped is-hoverable is-narrow is-fullwidth
                  "
                >
                  <thead>
                    <tr>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Name
                          <Link
                            to={{
                              pathname: '/people',
                              search: searchParams.toString(),
                            }}
                            onClick={e => {
                              e.preventDefault();
                              handleSortingChange('name');
                            }}
                          >
                            <span className="icon">
                              <i
                                className={classNames('fas', {
                                  'fa-sort': sort !== 'name',
                                  'fa-sort-up': sort === 'name' && !order,
                                  'fa-sort-down': sort === 'name' && order,
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
                              pathname: '/people',
                              search: searchParams.toString(),
                            }}
                            onClick={e => {
                              e.preventDefault();
                              handleSortingChange('sex');
                            }}
                          >
                            <span className="icon">
                              <i
                                className={classNames('fas', {
                                  'fa-sort': sort !== 'sex',
                                  'fa-sort-up': sort === 'sex' && !order,
                                  'fa-sort-down': sort === 'sex' && order,
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
                              pathname: '/people',
                              search: searchParams.toString(),
                            }}
                            onClick={e => {
                              e.preventDefault();
                              handleSortingChange('born');
                            }}
                          >
                            <span className="icon">
                              <i
                                className={classNames('fas', {
                                  'fa-sort': sort !== 'born',
                                  'fa-sort-up': sort === 'born' && !order,
                                  'fa-sort-down': sort === 'born' && order,
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
                              pathname: '/people',
                              search: searchParams.toString(),
                            }}
                            onClick={e => {
                              e.preventDefault();
                              handleSortingChange('died');
                            }}
                          >
                            <span className="icon">
                              <i
                                className={classNames('fas', {
                                  'fa-sort': sort !== 'died',
                                  'fa-sort-up': sort === 'died' && !order,
                                  'fa-sort-down': sort === 'died' && order,
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
                  <PeopleList />
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
