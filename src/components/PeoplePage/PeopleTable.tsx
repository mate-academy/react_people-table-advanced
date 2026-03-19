/* eslint-disable jsx-a11y/control-has-associated-label */
import PersonLink from './PersonLink';
import { Person } from '../../types';
import { SortField, SortOrder } from '../../types/usePeopleSort';

type PeopleTableProps = {
  people: Person[];
  selectedSlug: string | null | undefined;
  onSortChange: (field: SortField) => void;
  sortField: SortField;
  sortOrder: SortOrder;
};

const PeopleTable = ({
  people,
  selectedSlug,
  onSortChange,
  sortField,
  sortOrder,
}: PeopleTableProps) => {
  return (
    <table
      className="table is-striped is-hoverable is-narrow is-fullwidth"
      data-cy="peopleTable"
    >
      <thead>
        <tr>
          {' '}
          <th>
            <span
              onClick={() => onSortChange('name')}
              style={{ cursor: 'pointer' }}
              className="is-flex is-flex-wrap-nowrap"
            >
              Name
              <span className="icon">
                <i
                  className={`fas ${sortField === 'name' ? (sortOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up') : 'fa-sort'}`}
                />
              </span>
            </span>
          </th>
          <th>
            <span
              onClick={() => onSortChange('sex')}
              style={{ cursor: 'pointer' }}
              className="is-flex is-flex-wrap-nowrap"
            >
              Sex
              <span className="icon">
                <i
                  className={`fas ${sortField === 'sex' ? (sortOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up') : 'fa-sort'}`}
                />
              </span>
            </span>
          </th>
          <th>
            <span
              onClick={() => onSortChange('born')}
              style={{ cursor: 'pointer' }}
              className="is-flex is-flex-wrap-nowrap"
            >
              Born
              <span className="icon">
                <i
                  className={`fas ${sortField === 'born' ? (sortOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up') : 'fa-sort'}`}
                />
              </span>
            </span>
          </th>
          <th>
            <span
              onClick={() => onSortChange('died')}
              style={{ cursor: 'pointer' }}
              className="is-flex is-flex-wrap-nowrap"
            >
              Died
              <span className="icon">
                <i
                  className={`fas ${sortField === 'died' ? (sortOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up') : 'fa-sort'}`}
                />
              </span>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={
                person.slug === selectedSlug ? 'has-background-warning' : ''
              }
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

export default PeopleTable;
