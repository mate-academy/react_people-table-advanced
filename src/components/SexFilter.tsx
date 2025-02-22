import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <Link
        className={classNames({ 'is-active': !searchParams.has('sex') })}
        to={{ search: getSearchWith(searchParams, { sex: null }) }}
      >
        All
      </Link>
      <Link
        className={classNames({
          'is-active': searchParams.get('sex') === 'm',
        })}
        to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
      >
        Male
      </Link>
      <Link
        className={classNames({
          'is-active': searchParams.get('sex') === 'f',
        })}
        to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
      >
        Female
      </Link>
    </p>
  );
};
