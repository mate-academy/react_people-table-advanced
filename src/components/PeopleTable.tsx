import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';
import { PersonInfo } from './PersonInfo';
import { SearchLink } from './SearchLink';
import { ColumnTitle } from '../types/columnTitle';
import cn from 'classnames';

export interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const selectedSorting = searchParams.get('sort');
  const selectedOrder = searchParams.get('order');

  const handleSortParams = (title: ColumnTitle) => {
    const lowerCaseTitle = title.toLowerCase();
    const isThisColumnSorted = selectedSorting === lowerCaseTitle;

    if (!selectedSorting) {
      return { sort: lowerCaseTitle, order: null };
    } else if (isThisColumnSorted && !selectedOrder) {
      return { sort: lowerCaseTitle, order: 'desc' };
    } else if (!isThisColumnSorted) {
      return { sort: lowerCaseTitle, order: null };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(ColumnTitle).map(title => {
            const isCurrentColumnSorted =
              selectedSorting === title.toLowerCase();
            const isAscSorting = isCurrentColumnSorted && !selectedOrder;
            const isDescSorting = isCurrentColumnSorted && !!selectedOrder;
            const isTitleWithoutSorting =
              title === 'Mother' || title === 'Father';

            return isTitleWithoutSorting ? (
              <th key={title}>{title}</th>
            ) : (
              <th key={title}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {title}
                  <SearchLink params={handleSortParams(title)}>
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': !isCurrentColumnSorted,
                          'fa-sort-up': isAscSorting,
                          'fa-sort-down': isDescSorting,
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonInfo person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
