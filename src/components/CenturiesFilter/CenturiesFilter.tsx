import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../../utils/SearchLink';

const centuriesOnPage = ['16', '17', '18', '19', '20'];

export const CenturiesFilter = () => {
  const [searchParams] = useSearchParams();
  const centuris = searchParams.getAll('centuries');

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuriesOnPage.map(century => (
            <SearchLink
              key={century}
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': centuris.includes(century),
              })}
              params={{
                centuries: centuris.includes(century)
                  ? centuris.filter(cen => cen !== century)
                  : [...centuris, century],
              }}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className={classNames('button', 'is-success', {
              'is-outlined': centuris.length > 0,
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
