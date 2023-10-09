import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();
  const currentCenturies = searchParams.getAll('centuries');

  const getCenturiesParams = (century: string) => {
    return currentCenturies.includes(century)
      ? currentCenturies.filter(v => v !== century)
      : [String(century), ...currentCenturies];
  };

  return (
    <div className="level-left">
      {[16, 17, 18, 19, 20].map(century => (
        <SearchLink
          key={century}
          data-cy="century"
          className={cn('button mr-1', {
            'is-info': currentCenturies.includes(String(century)),
          })}
          params={{
            centuries: getCenturiesParams(String(century)),
          }}
        >
          {century}
        </SearchLink>
      ))}
    </div>
  );
};
