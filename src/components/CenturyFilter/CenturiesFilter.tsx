import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

const filteringCenturies = ['16', '17', '18', '19', '20'];

export const CenturiesFilter = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {filteringCenturies.map(century => (
            <SearchLink
              data-cy="century"
              key={century}
              className={classNames('button', 'mr-1', {
                'is-info': centuries.includes(century),
              })}
              params={{
                centuries: centuries.includes(century) // if this century is already selected
                  ? centuries.filter(c => c !== century) // we remove it from the selected
                  : [...centuries, century], // otherwise we add it to the selected
              }}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            params={{ centuries: null }}
            className={classNames('button', 'is-success', {
              'is-outlined': centuries.length > 0,
            })}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};
