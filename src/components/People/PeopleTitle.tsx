import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';
import { Person } from '../../types';

type Props = {
  title: string,
  visiblePeople: Person[],
};

export const PeopleTitle: React.FC<Props> = ({ title, visiblePeople }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const setParams = (sortType: string) => {
    const firstClick = sort !== sortType;
    const secondClick = sort === sortType && order === 'asc';

    if (firstClick) {
      return {
        sort: sortType,
        order: 'asc',
      };
    }

    if (secondClick) {
      return {
        sort: sortType,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const titleLower = title.toLowerCase();

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {title}
        <SearchLink
          params={setParams(titleLower)}
        >
          {
            visiblePeople.length > 0 && (
              <span className="icon">
                <i className={classNames('fas', {
                  'fa-sort': sort !== titleLower,

                  'fa-sort-down': sort === titleLower && order === 'asc',

                  'fa-sort-up': sort === titleLower && order === 'desc',
                })}
                />
              </span>
            )
          }

        </SearchLink>
      </span>
    </th>
  );
};
