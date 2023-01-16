import cn from 'classnames';
import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export const CenturyFilter: FC = () => {
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries') || [];

  const getSearchParamsStr = (century: string) => {
    searchParams.delete('centuries');

    if (century === '') {
      return searchParams.toString();
    }

    const centuriesToSet = centuries.includes(century)
      ? centuries.filter(centennial => centennial !== century)
      : [...centuries, century];

    centuriesToSet.forEach(centennial => {
      searchParams.append('centuries', centennial);
    });

    return searchParams.toString();
  };

  const centuriesArrForRemder = ['16', '17', '18', '19', '20'];

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {
            centuriesArrForRemder.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={cn(
                  'button mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
                to={{
                  search: getSearchParamsStr(century),
                }}
              >
                {century}
              </Link>
            ))
          }
        </div>

        <div className="level-right ml-4">
          <Link
            data-cy="centuryALL"
            className={cn(
              'button is-success',
              { 'is-outlined': centuries.length !== 0 },
            )}
            to={{
              search: getSearchParamsStr(''),
            }}
          >
            All
          </Link>
        </div>
      </div>
    </div>
  );
};
