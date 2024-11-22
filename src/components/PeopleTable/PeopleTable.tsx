import { Person } from '../../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink/SearchLink';
import { PersonLink } from '../PersonLink/PersonLink';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const isSelected = people.find(person => person.slug === slug);

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const getNextSortParams = (field: string) => {
    if (currentSort === field && currentOrder === 'asc') {
      return { sort: field, order: 'desc' };
    } else if (currentSort === field && currentOrder === 'desc') {
      return { sort: null, order: null };
    } else {
      return { sort: field, order: 'asc' };
    }
  };

  const sortedPeople = [...people].sort((a, b) => {
    if (!currentSort) {
      return 0;
    }

    const valueA = a[currentSort as keyof Person] ?? '';
    const valueB = b[currentSort as keyof Person] ?? '';

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return currentOrder === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return currentOrder === 'asc' ? valueA - valueB : valueB - valueA;
    }

    return 0;
  });

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
                  params={getNextSortParams(field)}
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
              className={classNames({
                'has-background-warning': isSelected?.slug === personSlug,
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
