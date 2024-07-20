import { PeopleLink } from './PeopleLink';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  visiblePeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({ visiblePeople }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort' || null);
  const order = searchParams.get('order' || null);

  const handleClickSortBy = (sortParam: string) => {
    if (sortParam !== sort) {
      return setSearchParams(
        getSearchWith(searchParams, { sort: sortParam, order: null }),
      );
    }

    if (sortParam === sort && !order) {
      return setSearchParams(
        getSearchWith(searchParams, { sort: sortParam, order: 'desc' }),
      );
    }

    return setSearchParams(
      getSearchWith(searchParams, { sort: null, order: null }),
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a onClick={() => handleClickSortBy('name')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && !order,
                      'fa-sort-down': sort === 'name' && order === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => handleClickSortBy('sex')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && !order,
                      'fa-sort-down': sort === 'sex' && order === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => handleClickSortBy('born')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && !order,
                      'fa-sort-down': sort === 'born' && order === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => handleClickSortBy('died')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && !order,
                      'fa-sort-down': sort === 'died' && order === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <PeopleLink person={person} key={person.name} />
        ))}
      </tbody>
    </table>
  );
};
