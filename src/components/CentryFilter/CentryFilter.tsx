import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  return (
    <div className="level is-flex-grow-1 is-mobile">
      <div className="level-left">
        {[16, 17, 18, 19, 20].map(String).map(century => (
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
          className="button is-success"
        >
          All
        </SearchLink>
      </div>
    </div>
  );
};
