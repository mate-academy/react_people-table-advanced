import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();

  const handleClass = () => {
    return searchParams.getAll('centuries').toString();
  };

  const getCenturyParams = (century: string) => {
    const currentCenturies = searchParams.getAll('centuries');

    return currentCenturies.includes(century)
      ? currentCenturies.filter((num) => num !== century)
      : [String(century), ...searchParams.getAll('centuries')];
  };

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {[16, 17, 18, 19, 20].map((century) => (
            <SearchLink
              key={century}
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': handleClass().includes(century.toString()),
              })}
              params={{ centuries: getCenturyParams(String(century)) }}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="century"
            className={cn('button mr-1', {
              'is-success': !searchParams.get('centuries'),
            })}
            params={{ centuries: null }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};
