import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import cn from 'classnames';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();

  const selectedSex = searchParams.get('sex');

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        className={cn({ 'is-active': !selectedSex })}
        params={{ sex: null }}
      >
        All
      </SearchLink>

      <SearchLink
        className={cn({ 'is-active': selectedSex === 'm' })}
        params={{ sex: 'm' }}
      >
        Male
      </SearchLink>

      <SearchLink
        className={cn({ 'is-active': selectedSex === 'f' })}
        params={{ sex: 'f' }}
      >
        Female
      </SearchLink>
    </p>
  );
};
