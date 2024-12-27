import {
  NavLink,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../types';
import { iconClass } from '../utils/iconClass';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { PeopleTableRow } from './PersonTableRow';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const setSearchWith = (newParam: SearchParams): void | string => {
    const newSearch = getSearchWith(searchParams, newParam);

    setSearchParams(newSearch);
  };

  const handleSort = (sortField: string) => {
    if (sort === sortField) {
      if (order) {
        setSearchWith({ sort: null, order: null });

        return;
      }

      setSearchWith({ order: 'desc' });

      return;
    }

    setSearchWith({ sort: sortField });
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
                  handleSort('name');
                }}
              >
                <span className="icon">
                  <i className={`fas ${iconClass('name', sort, order)}`} />
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
                  handleSort('sex');
                }}
              >
                <span className="icon">
                  <i className={`fas ${iconClass('sex', sort, order)}`} />
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
                  handleSort('born');
                }}
              >
                <span className="icon">
                  <i className={`fas ${iconClass('born', sort, order)}`} />
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
                  handleSort('died');
                }}
              >
                <span className="icon">
                  <i className={`fas ${iconClass('died', sort, order)}`} />
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
          <PeopleTableRow
            key={person.slug}
            person={person}
            people={people}
            selected={person.slug === personSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
