import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useLocation } from 'react-router-dom';
import { SortType } from '../types/SortType';
import { OrderType } from '../types/OrderType';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
  sort: SortType;
  order: OrderType;
  onSortClick: (sortKey: string) => void;
};

export const PeopleTable: React.FC<Props> = props => {
  const { sort, order, people, onSortClick } = props;
  const location = useLocation();
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
              <a
                href="#/people?sort=name"
                onClick={() => {
                  onSortClick('name');
                }}
              >
                <span className="icon">
                  <i
                    className={cn("fas",
                      { "fa-sort": sort !== "name" },
                      { "fa-sort-down": sort === "name" && order === "asc" },
                      { "fa-sort-up": sort === "name" && order === "desc" },
                    )}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
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
