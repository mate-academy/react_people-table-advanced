import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SortField } from '../types/SortField';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[] | [],
  allPeople: Person[] | [],
  searchParams: URLSearchParams,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  allPeople,
  searchParams,
}) => {
  const { slug } = useParams();

  type SortField = keyof typeof SortField;
  const sortField: SortField[] = Object.keys(SortField) as SortField[];

  const personExist = (parentName: string | null) => {
    return allPeople.find(p => p.name === parentName);
  };

  const setSort = (searchParams.get('sort') === null);

  const setOrder = searchParams.get('sort') !== null
    && searchParams.get('order') === null;

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortField.map(field => (
            <th
              key={field}
            >
              <span className="is-flex is-flex-wrap-nowrap">
                {field}
                <SearchLink
                  params={{
                    sort: (setSort ? SortField[field] : null)
                    || (setOrder ? SortField[field] : null),
                    order: setOrder ? 'desc' : null,
                  }}
                >
                  <span className="icon">
                    <i className={cn('fas', {
                      'fa-sort-up': searchParams.get('sort')
                        && SortField[field] === searchParams.get('sort')
                        && searchParams.get('order') !== 'desc',
                      'fa-sort-down': searchParams.get('sort')
                        && SortField[field] === searchParams.get('sort')
                        && searchParams.get('order') === 'desc',
                      'fa-sort': SortField[field] !== searchParams.get('sort'),
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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink
                person={person}
              />
            </td>

            <td>
              {person.sex}
            </td>
            <td>
              {person.born}
            </td>
            <td>
              {person.died}
            </td>
            <td>

              {personExist(person.motherName) ? (
                <PersonLink
                  person={personExist(person.motherName)}
                />
              ) : (
                <p>{person.motherName || '-'}</p>
              )}
            </td>
            <td>
              {personExist(person.fatherName) ? (
                <PersonLink
                  person={personExist(person.fatherName)}
                />
              ) : (
                <p>{person.fatherName || '-'}</p>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
