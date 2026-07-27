import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { PersonLink } from './PersonLink';

interface PeopleTableProps {
  people: Person[];
}

const sortFields = ['name', 'sex', 'born', 'died'];

function getNextSortParams(
  field: string,
  sort: string | null,
  order: string | null,
) {
  if (sort !== field) {
    return { sort: field, order: null };
  }

  if (order !== 'desc') {
    return { sort: field, order: 'desc' };
  }

  return { sort: null, order: null };
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug: selectedSlug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortFields.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field[0].toUpperCase() + field.slice(1)}
                <SearchLink params={getNextSortParams(field, sort, order)}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== field,
                        'fa-sort-up': sort === field && order !== 'desc',
                        'fa-sort-down': sort === field && order === 'desc',
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const { sex, born, died, motherName, fatherName, slug } = person;

          const mother = people.find(p => p.name === motherName);
          const father = people.find(p => p.name === fatherName);

          const isSelected = slug === selectedSlug;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': isSelected,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {!motherName ? (
                  '-'
                ) : mother ? (
                  <PersonLink person={mother} />
                ) : (
                  motherName
                )}
              </td>
              <td>
                {!fatherName ? (
                  '-'
                ) : father ? (
                  <PersonLink person={father} />
                ) : (
                  fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
