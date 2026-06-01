/* eslint-disable jsx-a11y/control-has-associated-label */

import { Person } from '../types';
import PersonLink from './PersonLink';
import { useParams } from 'react-router-dom';

type Props = {
  preparedPeopleData: Person[];
  sort: string | null;
  order: string | null;
  handleSort: (field: string) => void;
};

export const PeopleTable: React.FC<Props> = ({
  preparedPeopleData,
  sort,
  handleSort,
  order,
}) => {
  const { slug } = useParams();
  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    return order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
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
              <a onClick={() => handleSort('name')}>
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => handleSort('sex')}>
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => handleSort('born')}>
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => handleSort('died')}>
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparedPeopleData.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={person.slug === slug ? 'has-background-warning' : ''}
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
