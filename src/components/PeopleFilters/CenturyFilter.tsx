import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';

export const CenturyFilter:React.FC = () => {
  const centuryList = ['16', '17', '18', '19', '20'];
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuryList.map(century => (
            <SearchLink
              key={century}
              params={{
                centuries: centuries.includes(century)
                  ? centuries.filter(c => c !== century)
                  : [...centuries, century],
              }}
              data-cy="century"
              className={classNames(
                'button',
                'mr-1',
                { 'is-info': centuries.includes(century) },
              )}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            params={{
              centuries: null,
            }}
            data-cy="centuryALL"
            className={classNames(
              'button',
              { 'is-success': !centuries.length },
              { 'is-outlined': centuries.length },
            )}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};
