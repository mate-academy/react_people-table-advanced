import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person, SortType } from '../types';
import { SearchLink } from './SearchLink';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

const sortColumns = [
  { field: SortType.Name, label: 'Name' },
  { field: SortType.Sex, label: 'Sex' },
  { field: SortType.Born, label: 'Born' },
  { field: SortType.Died, label: 'Died' },
];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const isDescending = searchParams.get('order') === 'desc';
  const sortOrder = isDescending ? 'descending' : 'ascending';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortColumns.map(({ field, label }) => {
            const isSorted = sort === field;
            const nextSort = isSorted && isDescending ? null : field;
            const nextOrder = isSorted && !isDescending ? 'desc' : null;

            return (
              <th key={field} aria-sort={isSorted ? sortOrder : 'none'}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {label}
                  <SearchLink
                    params={{ sort: nextSort, order: nextOrder }}
                    aria-label={`Sort by ${label.toLowerCase()}`}
                  >
                    <span className="icon">
                      <i
                        aria-hidden="true"
                        className={classNames('fas', {
                          'fa-sort': !isSorted,
                          'fa-sort-up': isSorted && !isDescending,
                          'fa-sort-down': isSorted && isDescending,
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
