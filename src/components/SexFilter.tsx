import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

export const SexFilter: React.FC = () => {
  const [searchParams] = useSearchParams();

  const sexFilter = searchParams.get('sex') || '';

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        className={cn({ 'is-active': sexFilter === '' })}
        params={{ sex: null }}
      >
        All
      </SearchLink>
      <SearchLink
        className={cn({ 'is-active': sexFilter === 'm' })}
        params={{ sex: 'm' }}
      >
        Male
      </SearchLink>
      <SearchLink
        className={cn({ 'is-active': sexFilter === 'f' })}
        params={{ sex: 'f' }}
      >
        Female
      </SearchLink>
    </p>
  );
};
