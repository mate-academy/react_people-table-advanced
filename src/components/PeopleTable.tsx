import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { SortField, SortOrder } from '../types/SortArrows';

type Props = {
  people: Person[];
  arrowField: SortField | null;
  arrowOrder: SortOrder | null;
  handleSort: (value: SortField) => void;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({
  people,
  arrowField,
  arrowOrder,
  handleSort,
}) => {
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
              <Link
                to={`?${arrowField}`}
                onClick={() => handleSort(SortField.Name)}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': arrowField !== SortField.Name,
                      'fa-sort-up':
                        arrowField === SortField.Name &&
                        arrowOrder === SortOrder.Asc,
                      'fa-sort-down':
                        arrowField === SortField.Name &&
                        arrowOrder === SortOrder.Desc,
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
                to={`?${arrowField}`}
                onClick={() => handleSort(SortField.Sex)}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': arrowField !== SortField.Sex,
                      'fa-sort-up':
                        arrowField === SortField.Sex &&
                        arrowOrder === SortOrder.Asc,
                      'fa-sort-down':
                        arrowField === SortField.Sex &&
                        arrowOrder === SortOrder.Desc,
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
                to={`?${arrowField}`}
                onClick={() => handleSort(SortField.Born)}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': arrowField !== SortField.Born,
                      'fa-sort-up':
                        arrowField === SortField.Born &&
                        arrowOrder === SortOrder.Asc,
                      'fa-sort-down':
                        arrowField === SortField.Born &&
                        arrowOrder === SortOrder.Desc,
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
                to={`?${arrowField}`}
                onClick={() => handleSort(SortField.Died)}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': arrowField !== SortField.Died,
                      'fa-sort-up':
                        arrowField === SortField.Died &&
                        arrowOrder === SortOrder.Asc,
                      'fa-sort-down':
                        arrowField === SortField.Died &&
                        arrowOrder === SortOrder.Desc,
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

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            className={classNames({
              'has-background-warning':
                location.pathname === `/people/${person.slug}`,
            })}
            key={person.name}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <Link
                  to={`/people/${person.mother.slug}`}
                  className={classNames({
                    'has-text-danger': person.mother.sex === 'f',
                  })}
                >
                  {person.mother.name}
                </Link>
              ) : (
                person.motherName || '-'
              )}
            </td>

            <td>
              {person.father ? (
                <Link to={`/people/${person.father.slug}`}>
                  {person.father.name}
                </Link>
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
