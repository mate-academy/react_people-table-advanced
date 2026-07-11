import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

const columns = ['Name', 'Sex', 'Born', 'Died'];

const getSortIcon = (isActive: boolean, order: string | null) => {
  if (!isActive) {
    return 'fa-sort';
  }

  return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (field: string) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const findParent = (parentName: string | null) =>
    people.find(person => person.name === parentName);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(column => {
            const field = column.toLowerCase();
            const isActive = sort === field;

            return (
              <th key={column}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {column}
                  <SearchLink params={getSortParams(field)}>
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas',
                          getSortIcon(isActive, order),
                        )}
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
          const mother = findParent(person.motherName);
          const father = findParent(person.fatherName);

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
