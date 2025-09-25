import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

const allCenturies = ['16', '17', '18', '19', '20'];

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries');

  const isInfo = (century: string) => {
    return centuries.includes(century);
  };

  const allCenturiesAreActive =
    centuries.length === allCenturies.length &&
    allCenturies.every(c => centuries.includes(c));

  const getNewCenturies = (century: string) => {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(cen => cen !== century)
      : [...centuries, century];

    return newCenturies;
  };

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {allCenturies.map(century => (
            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': isInfo(century),
              })}
              params={{
                centuries: getNewCenturies(century),
              }}
              key={century}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className="button is-success is-outlined"
            params={{
              centuries: allCenturiesAreActive ? null : allCenturies,
            }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};
