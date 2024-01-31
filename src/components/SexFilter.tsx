import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        className={classNames({
          'is-active': !searchParams.toString().includes('sex'),
        })}
        params={{ sex: null }}
      >
        All
      </SearchLink>
      <SearchLink
        className={classNames({
          'is-active': searchParams.toString().includes('sex=m'),
        })}
        params={{ sex: 'm' }}
      >
        Male
      </SearchLink>
      <SearchLink
        className={classNames({
          'is-active': searchParams.toString().includes('sex=f'),
        })}
        params={{ sex: 'f' }}
      >
        Female
      </SearchLink>
    </p>
  );
};
