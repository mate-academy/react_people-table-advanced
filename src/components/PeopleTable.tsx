/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
  sort: string | null;
  order: string | null;
};

const SORTABLE_COLUMNS = ['name', 'sex', 'born', 'died'];

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  sort,
  order,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORTABLE_COLUMNS.map(column => {
            const isActive = sort === column;
            const isDesc = order === 'desc';

            let params: Record<string, string | null>;

            if (!isActive) {
              params = { sort: column };
            } else if (!isDesc) {
              params = { sort: column, order: 'desc' };
            } else {
              params = { sort: null, order: null };
            }

            return (
              <th key={column}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {column[0].toUpperCase() + column.slice(1)}

                  <SearchLink params={params}>
                    <span className="icon">
                      <i
                        className={`fas ${
                          isActive
                            ? isDesc
                              ? 'fa-sort-down'
                              : 'fa-sort-up'
                            : 'fa-sort'
                        }`}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          const renderParent = (
            parent: Person | undefined,
            parentName?: string | null,
          ) => {
            if (!parentName) {
              return '-';
            }

            if (parent) {
              return <PersonLink person={parent} />;
            }

            return parentName;
          };

          return (
            <tr
              key={person.slug}
              data-cy="person"
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

              <td>{renderParent(mother, person.motherName)}</td>
              <td>{renderParent(father, person.fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
