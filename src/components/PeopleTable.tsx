import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';
import { SortType } from '../types/SortType';
import classNames from 'classnames';
import { filterPeople } from '../utils/filterPeople';
import { useContext } from 'react';
import { PeopleContext } from '../store/PeopleContext';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { errorMessage, loading } = useContext(PeopleContext);

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handleSort = (sortType: SortType) => {
    if (sort === sortType && order === 'desc') {
      return { sort: null, order: null };
    }

    if (sort === sortType) {
      return { sort: sortType, order: 'desc' };
    }

    return { sort: sortType, order: null };
  };

  const filteredPeople = filterPeople(
    people,
    query,
    centuries,
    sex,
    sort,
    order,
  );

  const sortIconClass = (sortType: SortType) =>
    classNames('fas', {
      'fa-sort': sort !== sortType,
      'fa-sort-up': sort === sortType && !order,
      'fa-sort-down': sort === sortType && order,
    });

  return (
    <>
      {!errorMessage && !loading && !filteredPeople.length ? (
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
                  <Link
                    to={{
                      search: getSearchWith(
                        searchParams,
                        handleSort(SortType.Name),
                      ),
                    }}
                    onClick={() => handleSort(SortType.Name)}
                  >
                    <span className="icon">
                      <i className={sortIconClass(SortType.Name)} />
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
                        handleSort(SortType.Sex),
                      ),
                    }}
                    onClick={() => handleSort(SortType.Sex)}
                  >
                    <span className="icon">
                      <i className={sortIconClass(SortType.Sex)} />
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
                        handleSort(SortType.Born),
                      ),
                    }}
                    onClick={() => handleSort(SortType.Born)}
                  >
                    <span className="icon">
                      <i className={sortIconClass(SortType.Born)} />
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
                        handleSort(SortType.Died),
                      ),
                    }}
                    onClick={() => handleSort(SortType.Died)}
                  >
                    <span className="icon">
                      <i className={sortIconClass(SortType.Died)} />
                    </span>
                  </Link>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {filteredPeople.map(person => (
              <PersonLink key={person.name} person={person} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
