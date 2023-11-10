import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

interface Props {
  title: string
}

export const TableColumnHead: React.FC<Props> = ({ title }) => {
  const [searchParams] = useSearchParams();

  const getIconClass = () => {
    return classNames('fas', {
      'fa-sort': (!searchParams.get('sort') && !searchParams.get('order'))
        || (searchParams.get('sort') !== title),
      'fa-sort-up': searchParams.get('sort') === title
        && !searchParams.get('order'),
      'fa-sort-down': searchParams.get('sort') === title
        && searchParams.get('order'),
    });
  };

  const getNewParams = () => {
    const prevSort = searchParams.get('sort');
    const prevOrder = searchParams.get('order');
    let sort = null;
    let order = null;

    if (prevSort !== title) {
      sort = title;
    }

    if (prevSort === title) {
      sort = prevSort;
      order = 'desc';
    }

    if (prevSort === title && prevOrder) {
      sort = null;
      order = null;
    }

    return {
      sort,
      order,
    };
  };

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {title[0].toUpperCase() + title.slice(1)}
        <SearchLink
          params={getNewParams()}
          className="px-2"
        >
          <i className={getIconClass()} />
        </SearchLink>
      </span>
    </th>
  );
};
