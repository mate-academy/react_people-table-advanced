import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  th: string;
};

export const ToggleIcon: React.FC<Props> = React.memo(({ th }) => {
  const [searchParams] = useSearchParams();

  const sortType = searchParams.get('sort');
  const order = searchParams.get('order');

  return (
    <span className="icon">
      <i className={classNames('fas',
        { 'fa-sort': sortType !== null || order === null },
        { 'fa-sort-up': sortType === th && order === null },
        {
          'fa-sort-down':
          order === 'desc' && sortType === th,
        })}
      />
    </span>
  );
});
