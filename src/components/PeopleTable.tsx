import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types/Person';
import { sortFields } from '../utils/peopleHelper';
import { SearchLink } from './SearchLink';
import { PersonLink } from './PersonLink';

type Props = { people: Person[] };

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const descending = searchParams.get('order') === 'desc';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortFields.map(field => {
            const selected = sort === field;

            return (
              <th
                key={field}
                aria-sort={
                  selected ? (descending ? 'descending' : 'ascending') : 'none'
                }
              >
                <span className="is-flex is-flex-wrap-nowrap">
                  {field[0].toUpperCase() + field.slice(1)}
                  <SearchLink
                    aria-label={`Sort by ${field}`}
                    params={{
                      sort: selected && descending ? null : field,
                      order: selected && !descending ? 'desc' : null,
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': !selected,
                          'fa-sort-up': selected && !descending,
                          'fa-sort-down': selected && descending,
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
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({ 'has-background-warning': person.slug === slug })}
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
