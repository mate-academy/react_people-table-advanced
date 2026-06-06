import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();

  const CENTURIES = ['16', '17', '18', '19', '20'];
  const values = searchParams.getAll('centuries');

  return (
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        {CENTURIES.map(century => {
          return (
            <SearchLink
              key={century}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': values.includes(century),
              })}
              params={{
                centuries: values.includes(century)
                  ? values.filter(value => value !== century)
                  : [...values, century],
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
          className="button is-success is-outlined"
          params={{ centuries: null}}
        >
          All
        </SearchLink>
      </div>
    </div>
  );
};
