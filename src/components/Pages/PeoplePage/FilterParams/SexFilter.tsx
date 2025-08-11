import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import classNames from 'classnames';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        params={{ sex: null }}
        className={classNames({ 'is-active': !sex })}
      >
        All
      </SearchLink>

      <SearchLink
        params={{ sex: 'm' }}
        className={classNames({ 'is-active': sex === 'm' })}
      >
        Male
      </SearchLink>

      <SearchLink
        params={{ sex: 'f' }}
        className={classNames({ 'is-active': sex === 'f' })}
      >
        Female
      </SearchLink>
    </p>
  );
};
