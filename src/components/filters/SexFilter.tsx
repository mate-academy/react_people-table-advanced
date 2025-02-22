import { useSearchParams } from 'react-router-dom';

import cn from 'classnames';
import { SearchLink } from '../SearchLink';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        key={'All'}
        className={cn({ 'is-active': sex === '' })}
        params={{ sex: null }}
      >
        All
      </SearchLink>
      <SearchLink
        key={'Male'}
        className={cn({ 'is-active': sex === 'm' })}
        params={{ sex: 'm' }}
      >
        Male
      </SearchLink>
      <SearchLink
        key={'Female'}
        className={cn({ 'is-active': sex === 'f' })}
        params={{ sex: 'f' }}
      >
        Female
      </SearchLink>
    </p>
  );
};
