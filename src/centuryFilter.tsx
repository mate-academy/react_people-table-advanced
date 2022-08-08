import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

const AVAILABLE_CENTURIES = ['16', '17', '18', '19', '20'];

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');

  return (
    <div className="level is-flex-grow-1 is-mobile">
      <div className="level-left">
        {AVAILABLE_CENTURIES.map(century => (
          <SearchLink
            key={century}
            className={classNames('button', 'mr-1', {
              'is-info': centuries.includes(century),
            })}
            params={{
              centuries: centuries.includes(century)
                ? centuries.filter(c => c !== century)
                : [...centuries, century],
            }}
          >
            {century}
          </SearchLink>
        ))}
      </div>

      <div className="level-right ml-4">
        <SearchLink
          params={{ centuries: null }}
          className={classNames('button', 'is-success', {
            'is-outlined': centuries.length > 0,
          })}
        >
          All
        </SearchLink>
      </div>
    </div>
  );
};
