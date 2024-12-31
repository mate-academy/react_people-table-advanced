import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import {
  SORTING_COLUMNS,
  SORTING_COLUMNS_WITH_ICONS,
} from '../constants/SORTING_COLUMNS';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
  sort: string;
  order: string;
  handleSortClick: (sortField: string) => void;
};

const getIconClass = (sortField: string, sort: string, order: string) => {
  if (sortField === sort) {
    if (order) {
      return 'fa-sort-down';
    }

    return 'fa-sort-up';
  }

  return 'fa-sort';
};

export const PeopleTable: React.FC<Props> = props => {
  const { sort, order, people, handleSortClick } = props;
  const location = useLocation();

  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORTING_COLUMNS.map(column => (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column}
                {SORTING_COLUMNS_WITH_ICONS.includes(column) && (
                  <NavLink
                    to={`${pathname}?${searchParams.toString()}`}
                    onClick={event => {
                      event.preventDefault();
                      handleSortClick(column.toLowerCase());
                    }}
                  >
                    <span className="icon">
                      <i
                        className={`fas ${getIconClass(column.toLowerCase(), sort, order)}`}
                      />
                    </span>
                  </NavLink>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning':
                location.pathname === `/people/${person.slug}`,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
