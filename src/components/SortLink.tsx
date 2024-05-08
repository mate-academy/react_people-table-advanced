import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  field: string;
};

export const SortLink: React.FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();

  const sortParam = searchParams.get('sort');
  const orderReversed = searchParams.get('order') === 'desc';

  const isButtonSelected = field === sortParam;

  const params = {
    sort: isButtonSelected && orderReversed ? null : field,
    order: isButtonSelected && !orderReversed ? 'desc' : null,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': sortParam !== field,
            'fa-sort-up': sortParam === field && !orderReversed,
            'fa-sort-down': sortParam === field && orderReversed,
          })}
        />
      </span>
    </SearchLink>
  );
};
