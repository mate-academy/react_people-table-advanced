import { useContext, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleList } from '../../components/PeopleList/PeopleList';
import { PeopleContext } from '../../PeopleContext';
import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { getSearchWith } from '../../utils/searchHelper';
import { SortingFields } from '../../types/SortingFields';
import classNames from 'classnames';
import { Warning } from '../../components/Warning/Warning';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const { loader, warning, setLoader, setPeople, setWarning } =
    useContext(PeopleContext);
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    getPeople()
      .then(res => {
        if (!res.length) {
          setWarning('There are no people on the server');
        } else {
          setWarning('');
        }

        setPeople([...res]);
      })
      .catch(() => {
        setWarning('Something went wrong');
      })
      .finally(() => {
        setLoader(false);
      });
    // eslint-disable-next-line
  }, []);

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
              {warning && <Warning />}
              {loader || !!warning || (
                <table
                  data-cy="peopleTable"
                  className="
                    table is-striped is-hoverable is-narrow is-fullwidth
                    "
                >
                  <thead>
                    <tr>
                      {Object.entries(SortingFields).map(([key, value]) => (
                        <th key={key}>
                          <span className="is-flex is-flex-wrap-nowrap">
                            {key}
                            <Link
                              to={{
                                pathname: '/people',
                                search: getSearchWith(
                                  {
                                    sort:
                                      sort === value && order ? null : value,
                                    order:
                                      sort === value && !order ? 'desc' : null,
                                  },
                                  searchParams,
                                ),
                              }}
                            >
                              <span className="icon">
                                <i
                                  className={classNames('fas', {
                                    'fa-sort': sort !== value,
                                    'fa-sort-up': sort === value && !order,
                                    'fa-sort-down': sort === value && order,
                                  })}
                                />
                              </span>
                            </Link>
                          </span>
                        </th>
                      ))}
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
