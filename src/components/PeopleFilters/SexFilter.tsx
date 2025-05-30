import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();
  const currentSex = searchParams.get('sex');

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        className={currentSex === null ? 'is-active' : ''}
        params={{ sex: null }}
      >
        All
      </SearchLink>

      <SearchLink
        className={currentSex === 'm' ? 'is-active' : ''}
        params={{ sex: 'm' }}
      >
        Male
      </SearchLink>

      <SearchLink
        className={currentSex === 'f' ? 'is-active' : ''}
        params={{ sex: 'f' }}
      >
        Female
      </SearchLink>
    </p>
  );
};
