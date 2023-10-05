import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();

  const getCenturiesParams = (century: string) => {
    const currentCenturies = searchParams.getAll('centuries');

    return currentCenturies.includes(century)
      ? currentCenturies.filter((v) => v !== century)
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
                // eslint-disable-next-line max-len
                'is-info': searchParams.getAll('centuries').includes(century.toString()),
              })}
              params={{ centuries: getCenturiesParams(String(century)) }}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className="button is-success is-outlined"
            params={{ centuries: null }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};
