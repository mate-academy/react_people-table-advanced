import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        className={classNames({
          'is-active': !searchParams.has('sex'),
        })}
        params={{ sex: null }}
      >
        All
      </SearchLink>
      <SearchLink
        className={classNames({
          'is-active': searchParams.get('sex') === 'm',
        })}
        params={{ sex: 'm' }}
      >
        Male
      </SearchLink>
      <SearchLink
        className={classNames({
          'is-active': searchParams.get('sex') === 'f',
        })}
        params={{ sex: 'f' }}
      >
        Female
      </SearchLink>
    </p>
  );
};
