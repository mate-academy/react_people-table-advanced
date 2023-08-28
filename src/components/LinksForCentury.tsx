import { Link, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

const startedCenturies = ['16', '17', '18', '19', '20'];

export const LinksForCentury: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const centuries = searchParams.getAll('centuries') || [];

  const handlerCenturiesChange = (ch: string | null) => {
    if (ch) {
      if (centuries.includes(ch)) {
        return getSearchWith(
          searchParams,
          { centuries: [...centuries].filter(cen => cen !== ch) || [] },
        );
      }

      return getSearchWith(searchParams, { centuries: [...centuries, ch] });
    }

    return getSearchWith(searchParams, { centuries: null });
  };

  return (
    <>
      <div className="level-left">
        {startedCenturies.map(century => (
          <Link
            key={`century-${century}`}
            data-cy="century"
            className={classNames('button', 'mr-1', {
              'is-info': centuries.includes(century),
            })}
            to={{
              pathname: location.pathname,
              search: handlerCenturiesChange(century),
            }}
          >
            {century}
          </Link>
        ))}
      </div>

      <div className="level-right ml-4">
        <Link
          data-cy="centuryALL"
          className={classNames(
            'button', 'is-success', { 'is-outlined': centuries.length > 0 },
          )}
          to={{
            pathname: location.pathname,
            search: handlerCenturiesChange(null),
          }}
        >
          All
        </Link>
      </div>
    </>

  );
};
