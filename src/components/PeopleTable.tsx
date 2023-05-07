import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink/PersonLink';
import { SearchLink } from './SearchLink';

const COLUMN_FOR_SEARCH = ['Name', 'Sex', 'Born', 'Died'];

interface Props {
  people: Person[];
  sort: string;
  order: string;
}

export const PeopleTable: React.FC<Props> = ({ people, sort, order }) => {
  const { personSlug } = useParams();

  const getSortParams = (column: string) => {
    if (column === sort && !order) {
      return { sort: column, order: 'desc' };
    }

    if (column === sort && order) {
      return { sort: null, order: null };
    }

    return { sort: column, order: null };
  };

  return (
    <div className="block">
      <div className="box table-container">
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {COLUMN_FOR_SEARCH.map((column: string) => {
                const formattedColumn = column.toLowerCase();

                return (
                  <th key={column}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {column}
                      <SearchLink params={getSortParams(formattedColumn)}>
                        <span className="icon">
                          <i
                            className={classNames('fas', {
                              'fa-sort': sort !== formattedColumn,
                              'fa-sort-up': sort === formattedColumn && !order,
                              'fa-sort-down': sort === formattedColumn && order,
                            })}
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
            {people.map((person) => {
              return (
                <tr
                  data-cy="person"
                  key={person.name}
                  className={classNames({
                    'has-background-warning': person.slug === personSlug,
                  })}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.mother && <PersonLink person={person.mother} />}
                    {person.motherName && !person.mother && (
                      <p>{person.motherName}</p>
                    )}
                    {!person.motherName && '-'}
                  </td>
                  <td>
                    {person.father && <PersonLink person={person.father} />}
                    {person.fatherName && !person.father && (
                      <p>{person.fatherName}</p>
                    )}
                    {!person.fatherName && '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
