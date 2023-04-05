import { useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { Loader } from './Loader';

type Props = {
  data: Person[],
  allData: Person[],
  searchParams: URLSearchParams,
  setSearchParams: (params: URLSearchParams) => void,
  isLoading: boolean,
};

export const PeopleTable: React.FC<Props> = ({
  data, searchParams, allData, isLoading,
}) => {
  const location = useLocation();
  const { personId } = useParams();

  const femaleNames = useMemo(
    () => new Set(allData
      .filter((item) => item.sex === 'f')
      .map((item) => item.name)),
    [allData],
  );

  const peopleMap = useMemo(
    () => new Map(allData.map((person) => [person.name, person])),
    [allData],
  );

  const setProperParamsSort = (param: string) => {
    if (!searchParams.get('sort')
      || (searchParams.get('sort') === param && !searchParams.get('order'))) {
      return param;
    }

    return null;
  };

  const setProperParamsOrder = (param: string) => {
    if (searchParams.get('sort') === param) {
      if (searchParams.get('order')) {
        return null;
      }

      return 'desc';
    }

    return null;
  };

  const getIconClassNames = (headerSortParam: string) => {
    const isCurrentHeader = searchParams.get('sort') === headerSortParam;

    return classNames('fas', {
      'fa-sort': !isCurrentHeader,
      'fa-sort-up': isCurrentHeader && !searchParams.get('order'),
      'fa-sort-down': isCurrentHeader && searchParams.get('order'),
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {data.length === 0 ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <SearchLink
                    params={{
                      sort: setProperParamsSort('name'),
                      order: setProperParamsOrder('name'),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', getIconClassNames('name'))}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink
                    params={{
                      sort: setProperParamsSort('sex'),
                      order: setProperParamsOrder('sex'),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', getIconClassNames('sex'))}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink
                    params={{
                      sort: setProperParamsSort('born'),
                      order: setProperParamsOrder('born'),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', getIconClassNames('born'))}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink
                    params={{
                      sort: setProperParamsSort('died'),
                      order: setProperParamsOrder('died'),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', getIconClassNames('died'))}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.slug}
                data-cy="person"
                className={classNames({
                  'has-background-warning': item.slug === personId,
                })}
              >
                <td>
                  <Link
                    to={{
                      pathname: `/people/${item.slug}`,
                      search: location.search,
                    }}
                    className={classNames({
                      'has-text-danger': femaleNames.has(item.name),
                    })}
                  >
                    {item.name}
                  </Link>
                </td>

                <td>{item.sex}</td>
                <td>{item.born}</td>
                <td>{item.died}</td>
                <td>
                  {item.motherName && peopleMap.has(item.motherName) ? (
                    <Link
                      to={`/people/${peopleMap.get(item.motherName)?.slug}`}
                      className="has-text-danger"
                    >
                      {item.motherName}
                    </Link>
                  ) : (
                    item.motherName || '-'
                  )}
                </td>
                <td>
                  {item.fatherName && peopleMap.has(item.fatherName) ? (
                    <Link to={`/people/${peopleMap.get(item.fatherName)?.slug}`}>{item.fatherName}</Link>
                  ) : (
                    item.fatherName || '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>

  );
};
