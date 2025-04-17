import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();
  const currentSex = searchParams.get('sex');

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        params={{ sex: null }}
        className={!currentSex ? 'is-active' : ''}
      >
        All
      </SearchLink>

      <SearchLink
        params={{ sex: 'm' }}
        className={currentSex === 'm' ? 'is-active' : ''}
      >
        Male
      </SearchLink>

      <SearchLink
        params={{ sex: 'f' }}
        className={currentSex === 'f' ? 'is-active' : ''}
      >
        Female
      </SearchLink>
    </p>
  );
};
