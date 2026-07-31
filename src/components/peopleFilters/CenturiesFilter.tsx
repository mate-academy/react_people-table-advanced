import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import cn from 'classnames';

export const CenturiesFilter = () => {
  const [searchParams] = useSearchParams();

  const selectedCenturies = searchParams.getAll('centuries');
  const isActiveClass = selectedCenturies.length !== 0;

  const CENTURIES = ['16', '17', '18', '19', '20'];

  return (
    <>
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => {
              const isSelected = selectedCenturies.includes(century);

              const newCenturies = isSelected
                ? selectedCenturies.filter(c => c !== century)
                : [...selectedCenturies, century];

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={cn('button mr-1', {
                    'is-info': isSelected,
                  })}
                  params={{
                    centuries: newCenturies.length ? newCenturies : null,
                  }}
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
                'is-outlined': isActiveClass,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>
    </>
  );
};
