/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { SortField } from './PeoplePage';

type Props = {
  people: Person[];
  sort: string | null;
  order: string | null;
  onSort: (field: SortField) => void;
};

const getPerson = (name: string, people: Person[]) =>
  people.find(person => person.name === name);

export const PeopleTable: React.FC<Props> = ({
  people,
  sort,
  order,
  onSort,
}) => {
  const { slug } = useParams();

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return 'fa-sort';
    }

    if (!order) {
      return 'fa-sort-up';
    }

    return 'fa-sort-down';
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
              <a onClick={() => onSort('name')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('name')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => onSort('sex')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('sex')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => onSort('born')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('born')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => onSort('died')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('died')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = person.motherName
            ? getPerson(person.motherName, people)
            : null;

          const father = person.fatherName
            ? getPerson(person.fatherName, people)
            : null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
