import classNames from 'classnames';
import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export const FilterBySex: FC = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');

  return (
    <p className="panel-tabs">
      <Link
        to={{ search: getSearchWith(searchParams, { sex: '' }) }}
        className={classNames({ 'is-active': !sex })}
      >
        All
      </Link>
      <Link
        to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        className={classNames({ 'is-active': sex === 'm' })}
      >
        Male
      </Link>
      <Link
        to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
        className={classNames({ 'is-active': sex === 'f' })}
      >
        Female
      </Link>
    </p>

  );
};
