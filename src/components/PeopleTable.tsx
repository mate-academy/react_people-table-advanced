import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Person, TitlesWithSorting } from '../types';
import { PersonItem, SearchLink } from './index';

type Props = {
  people: Person[] | null;
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const order = searchParams.get('order') || null;
  const sort = searchParams.get('sort') || null;

  const getIconClass = (column: string) => {
    return cn('fas', {
      'fa-sort': sort !== column,
      'fa-sort-down': sort === column && order === 'desc',
      'fa-sort-up': sort === column && order === null,
    });
  };

  const getNewSortingParams = (column: string) => {
    const newSortingParams =
      sort === null
        ? { sort: column, order: null }
        : sort === column && order === 'desc'
          ? { sort: null, order: null }
          : { sort: column, order: 'desc' };

    return newSortingParams;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(TitlesWithSorting).map(title => {
            const capitalLetterTitle = title[0].toUpperCase() + title.slice(1);

            return (
              <th key={title}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {capitalLetterTitle}
                  <SearchLink params={getNewSortingParams(title)}>
                    <span className="icon">
                      <i className={getIconClass(title)} />
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
        {people?.map(person => (
          <PersonItem person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
