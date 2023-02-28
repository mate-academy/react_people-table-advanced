import cn from 'classnames';
import { memo, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SortType } from '../types/SortType';
import { getSearchWith } from '../utils/searchHelper';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[],
  selectedSlug: string,
  sort: string | null,
  isReversed: boolean,
};

export const PeopleTable: React.FC<Props> = memo(({
  people,
  selectedSlug,
  sort,
  isReversed,
}) => {
  const [searchParams] = useSearchParams();

  const getSearchSort = useCallback((sortType: string) => {
    if (!sort) {
      return getSearchWith(searchParams, {
        sort: sortType,
      });
    }

    if (!isReversed) {
      return getSearchWith(searchParams, {
        order: 'desc',
      });
    }

    return getSearchWith(searchParams, {
      order: null,
      sort: null,
    });
  }, [sort, isReversed, searchParams]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {(Object.entries(SortType)).map(([key, value]) => {
            const isSortSelected = sort === value;

            return (
              <th
                key={key}
              >
                <span className="is-flex is-flex-wrap-nowrap">
                  {key}
                  <Link
                    to={{
                      search: getSearchSort(value),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': !isSortSelected,
                          'fa-sort-up': isSortSelected && !isReversed,
                          'fa-sort-down': isSortSelected && isReversed,
                        })}
                      />
                    </span>
                  </Link>
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
            slug, sex, motherName, fatherName, born, died,
          } = person;

          const mother = people.find(mom => mom.name === motherName);
          const father = people.find(dad => dad.name === fatherName);
          const hasMotherOnServer = mother
            ? <PersonLink person={mother} /> : motherName;
          const hasFatherOnServer = father
            ? <PersonLink person={father} /> : fatherName;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={cn({
                'has-background-warning': selectedSlug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{motherName ? hasMotherOnServer : '-'}</td>
              <td>{fatherName ? hasFatherOnServer : '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
