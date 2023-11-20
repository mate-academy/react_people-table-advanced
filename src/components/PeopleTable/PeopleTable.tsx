import classNames from 'classnames';
import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleLink } from '../PeopleLink/PeopleLink';
import { SearchLink } from '../SearchLink';
import { Person } from '../../types';
import { Sort } from '../../types/Sort';

const sorts = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<{ people: Person[] }> = ({ people }) => {
  const { selectedSlug } = useParams();
  const [searchParams] = useSearchParams();

  const currentSort: Sort = useMemo(() => {
    return {
      sortBy: (searchParams.get('sort')),
      order: (searchParams.get('order')),
    };
  }, [searchParams]);

  return (
    <table
      data-cy="peopleTable"
      className={classNames(
        'table',
        'is-striped',
        'is-hoverable',
        'is-narrow',
        'is-fullwidth',
      )}
    >
      <thead>
        <tr>
          {sorts.map(sort => {
            const sortLower = sort.toLowerCase();

            return (
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  {sort}
                  <SearchLink
                    params={{
                      sort: currentSort.order !== 'desc'
                        ? sortLower
                        : null,
                      order: sortLower === currentSort.sortBy
                          && currentSort.order !== 'desc'
                        ? 'desc'
                        : null,
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas',
                          {
                            'fa-sort': currentSort.sortBy !== sortLower,
                            'fa-sort-up': currentSort.sortBy === sortLower
                              && !currentSort.order,
                            'fa-sort-down': currentSort.sortBy === sortLower
                              && currentSort.order,
                          },
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
          const {
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug,
            father,
            mother,
          } = person;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames(
                {
                  'has-background-warning': slug === selectedSlug,
                },
              )}
            >
              <td>
                <PeopleLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? <PeopleLink person={mother as Person} />
                  : motherName || '-'}
              </td>
              <td>
                {father
                  ? <PeopleLink person={father as Person} />
                  : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
