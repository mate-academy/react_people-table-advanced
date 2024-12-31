import {
  useParams,
  NavLink,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

const sortIcon = (field: string, sortField: string, isReversed: string) => {
  if (sortField === field) {
    if (isReversed) {
      return 'fa-sort-down';
    }

    return 'fa-sort-up';
  }

  return 'fa-sort';
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const hasSort = searchParams.get('sort') || '';
  const hasOrder = searchParams.get('order') || '';

  const hasSearchParams = (newParams: SearchParams): void | string => {
    const searchNewParam = getSearchWith(searchParams, newParams);

    setSearchParams(searchNewParam);
  };

  const isSorting = (sortField: string) => {
    if (hasSort === sortField) {
      if (hasOrder) {
        hasSearchParams({ sort: null, order: null });

        return;
      }

      hasSearchParams({ order: 'desc' });

      return;
    }

    hasSearchParams({ sort: sortField });
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
              <NavLink
                to={`${pathname}?${searchParams.toString()}`}
                onClick={event => {
                  event.preventDefault();
                  isSorting('name');
                }}
              >
                <span className="icon">
                  <i className={`fas ${sortIcon('name', hasSort, hasOrder)}`} />
                </span>
              </NavLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <NavLink
                to={`${pathname}?${searchParams.toString()}`}
                onClick={event => {
                  event.preventDefault();
                  isSorting('sex');
                }}
              >
                <span className="icon">
                  <i className={`fas ${sortIcon('sex', hasSort, hasOrder)}`} />
                </span>
              </NavLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <NavLink
                to={`${pathname}?${searchParams.toString()}`}
                onClick={event => {
                  event.preventDefault();
                  isSorting('born');
                }}
              >
                <span className="icon">
                  <i className={`fas ${sortIcon('born', hasSort, hasOrder)}`} />
                </span>
              </NavLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <NavLink
                to={`${pathname}?${searchParams.toString()}`}
                onClick={event => {
                  event.preventDefault();
                  isSorting('died');
                }}
              >
                <span className="icon">
                  <i className={`fas ${sortIcon('died', hasSort, hasOrder)}`} />
                </span>
              </NavLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
            people={people}
            isSelected={person.slug === personSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
