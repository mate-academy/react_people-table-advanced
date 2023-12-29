import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonRow } from '../PersonRow/Person';
import { getSearchWith } from '../../utils/searchHelper';
import { SortType } from '../../types/SortType';
import {
  getArrowClass,
  getSortOrder,
} from './helper';

interface Props {
  people: Person[],
}
const SORT = 'sort';
const SORT_ORDER = 'order';

export const PeopleTable: React.FC<Props> = (props) => {
  const [searchParams] = useSearchParams();
  const { people } = props;

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
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    [SORT]: SortType.Name,
                    [SORT_ORDER]: getSortOrder(searchParams),
                  }),
                }}
              >
                <span className="icon">
                  <i className={
                    cn('fas', getArrowClass(searchParams, SortType.Name))
                  }
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
                  search: getSearchWith(searchParams, {
                    [SORT]: SortType.Sex,
                    [SORT_ORDER]: getSortOrder(searchParams),
                  }),
                }}
              >
                <span className="icon">
                  <i className={
                    cn('fas', getArrowClass(searchParams, SortType.Sex))
                  }
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
                  search: getSearchWith(searchParams, {
                    [SORT]: SortType.Born,
                    [SORT_ORDER]: getSortOrder(searchParams),
                  }),
                }}
              >
                <span className="icon">
                  <i className={
                    cn('fas', getArrowClass(searchParams, SortType.Born))
                  }
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
                  search: getSearchWith(searchParams, {
                    [SORT]: SortType.Died,
                    [SORT_ORDER]: getSortOrder(searchParams),
                  }),
                }}
              >
                <span className="icon">
                  <i className={
                    cn('fas', getArrowClass(searchParams, SortType.Died))
                  }
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonRow person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
