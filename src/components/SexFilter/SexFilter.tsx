import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SearchLink } from '../SearchLink';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink params={{ sex: null }} className={cn({ 'is-active': !sex })}>
        All
      </SearchLink>

      <SearchLink
        params={{ sex: 'm' }}
        className={cn({ 'is-active': sex === 'm' })}
      >
        Male
      </SearchLink>

      <SearchLink
        params={{ sex: 'f' }}
        className={cn({ 'is-active': sex === 'f' })}
      >
        Female
      </SearchLink>
    </p>
  );
};
