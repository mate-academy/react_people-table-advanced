import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';

export const AGES = [16, 17, 18, 19, 20];

export const CenturiesFilter = () => {
  const [searchParams] = useSearchParams();

  const getCenturiesParams = (century: string) => {
    const currentCenturies = searchParams.getAll('centuries');

    return currentCenturies.includes(century)
      ? currentCenturies.filter(v => v !== century)
      : [String(century), ...searchParams.getAll('centuries')];
  };

  return (
    <>
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {AGES.map(century => {
              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={cn('button mr-1', {
                    'is-info': searchParams.getAll('centuries')
                      .find(v => v.includes(String(century))),
                  })}
                  params={{ centuries: getCenturiesParams(String(century)) }}
                >
                  {century}
                </SearchLink>
              );
            })}

          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': searchParams.get('centuries') !== null,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            sex: null,
            query: null,
            centuries: null,
            sortBy: null,
            sortOrder: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </>
  );
};
