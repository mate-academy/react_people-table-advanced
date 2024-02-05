import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();
  const activeCenturies = searchParams.getAll('centuries') || [];
  const centuries = ['16', '17', '18', '19', '20'];

  const getActive = (century: string) => (
    activeCenturies.includes(century)
      ? activeCenturies.filter(num => century !== num)
      : [...activeCenturies, century]);

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuries.map(century => (
            <SearchLink
              key={century}
              params={{ centuries: getActive(century) }}
              data-cy="century"
              className={classNames('button mr-1',
                { 'is-info': activeCenturies.includes(century) })}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            params={{ centuries: null }}
            className={classNames(
              'button is-success',
              { 'is-outlined': activeCenturies.length },
            )}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};
