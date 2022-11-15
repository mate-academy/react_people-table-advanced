import classNames from 'classnames';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

interface Props {
  title: string;
}

export const SortLink:FC<Props> = ({ title }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sortFromTable = title.toLowerCase();
  const withOrder = sortFromTable === sort && order === 'desc';
  const noOrder = sortFromTable === sort && !order;

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {title}
      <SearchLink
        params={{
          sort: withOrder
            ? null
            : sortFromTable,
          order: noOrder
            ? 'desc'
            : null,
        }}
      >
        <span className="icon">
          <i className={classNames('fas fa-sort',
            { 'fa-sort-up': noOrder },
            { 'fa-sort-down': withOrder })}
          />
        </span>
      </SearchLink>
    </span>
  );
};
