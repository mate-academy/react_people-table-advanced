import { FC } from 'react';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const selected = people.find(person => person.slug === slug);

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const getNewSortParams = (field: string) => {
    if (currentSort === field && currentOrder === 'asc') {
      return { sort: field, order: 'desc' };
    } else if (currentSort === field && currentOrder === 'desc') {
      return { sort: null, order: null };
    } else {
      return { sort: field, order: 'asc' };
    }
  };

  const sortedPeople = [ ...people ].sort((a, b) => {
    if (!currentSort) {
      return 0;
    }

    const aValue = a[currentSort as keyof Person];
    const bValue = b[currentSort as keyof Person];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return currentOrder === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue); 
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return currentOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  })

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(field => (
            <th key={field}>
            <span className="is-flex is-flex-wrap-nowrap">
              {field.charAt(0).toUpperCase() + field.slice(1)}
              <SearchLink
                params={getNewSortParams(field)}
                className="icon ml-2"
              >
                <i
                  className={classNames({
                    'fas fa-sort': currentSort !== field,
                    'fas fa-sort-up':
                      currentSort === field && currentOrder === 'asc',
                    'fas fa-sort-down':
                      currentSort === field && currentOrder === 'desc',
                  })}
                />
              </SearchLink>
            </span>
          </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug: personSlug,
            mother,
            father,
          } = person;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning': selected?.slug === personSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>

              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
