import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonItem } from '../PersonItem/PersonItem';
import { SearchLink } from '../SearchLink';
import { SortColumns } from '../../utils/SortColumns';
import { sortingLinks } from '../../data';

interface Props {
  people: Person[],
}

export const People: React.FC<Props> = ({
  people,
}) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const findPerson = useCallback((name: string | null) => {
    if (!name) {
      return undefined;
    }

    return people.find(personItem => {
      return personItem.name === name;
    });
  }, []);

  const handleOnSort = (sortColumn: SortColumns) => {
    let isShouldBeReversed: boolean | null = null;

    if (sort && !order) {
      isShouldBeReversed = true;
    }

    return {
      sort: (sort && order) ? null : sortColumn,
      order: isShouldBeReversed ? 'desc' : null,
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortingLinks.map(({ title, value }) => (
            <th key={value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}
                <SearchLink
                  params={handleOnSort(
                    value,
                  )}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== value,
                        'fa-sort-up': sort === value && !order,
                        'fa-sort-down': sort === value && order,
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
          <PersonItem
            person={person}
            key={person.slug}
            findPerson={findPerson}
          />
        ))}
      </tbody>
    </table>
  );
};
