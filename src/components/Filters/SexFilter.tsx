import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();
  const pickedSexFilter = searchParams.get('sex');

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        params={{ sex: null }}
        className={classNames({ 'is-active': pickedSexFilter === null })}
      >
        All
      </SearchLink>
      <SearchLink
        params={{ sex: 'm' }}
        className={classNames({ 'is-active': pickedSexFilter === 'm' })}
      >
        Male
      </SearchLink>
      <SearchLink
        params={{ sex: 'f' }}
        className={classNames({ 'is-active': pickedSexFilter === 'f' })}
      >
        Female
      </SearchLink>
    </p>
  );
};
