import React from 'react';
import { Person } from '../types';
import PersonInfo from './PersonInfo';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

type Params =
  | { sort: string; order: null }
  | { order: string }
  | { order: null; sort: null };

const LIST_CELLS = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort');
  const sortDesc = searchParams.get('order') === 'desc';

  const sortedBy = (
    sort: string,
    desc: boolean,
    selectedSort: null | string = '',
  ): Params => {
    if (sort !== selectedSort) {
      return { sort, order: null };
    }

    if (!desc) {
      return { order: 'desc' };
    }

    return { order: null, sort: null };
  };

  const sortFieldClass = (isActive: boolean, isOrderDesc: boolean) =>
    classNames('fas', {
      'fa-sort': !isActive,
      'fa-sort-down': isActive && isOrderDesc,
      'fa-sort-up': isActive && !isOrderDesc,
    });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {LIST_CELLS.map(cell => {
            const isActive =
              sortBy ===
              cell?.charAt(0).toLowerCase() + cell?.slice(1, cell.length);

            return (
              <th key={cell}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {cell}
                  <SearchLink
                    params={sortedBy(cell.toLowerCase(), sortDesc, sortBy)}
                  >
                    <span className="icon">
                      <i className={sortFieldClass(isActive, sortDesc)} />
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
          const { slug } = person;

          return <PersonInfo person={person} key={slug} />;
        })}
      </tbody>
    </table>
  );
};
