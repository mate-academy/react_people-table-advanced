// .. CenturyFilter.tsx
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  const activeCenturies = searchParams.getAll('centuries');

  const getHref = (centuryValue: string | null) => {
    if (centuryValue === null) {
      return {
        pathname,
        search: getSearchWith(searchParams, { centuries: null }),
      };
    }

    let updatedCenturies = [...activeCenturies];

    if (updatedCenturies.includes(centuryValue)) {
      updatedCenturies = updatedCenturies.filter(c => c !== centuryValue);
    } else {
      updatedCenturies.push(centuryValue);
    }

    return {
      pathname,
      search: getSearchWith(searchParams, { centuries: updatedCenturies }),
    };
  };

  const centuries = ['16', '17', '18', '19', '20'];

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuries.map(century => {
            const isActive = activeCenturies.includes(century);

            return (
              <Link
                key={century}
                data-cy="century"
                className={`button mr-1 ${isActive ? 'is-info' : ''}`}
                to={getHref(century)}
              >
                {century}
              </Link>
            );
          })}
        </div>

        <div className="level-right ml-4">
          <Link
            data-cy="centuryALL"
            className={`button is-success ${
              activeCenturies.length > 0 ? 'is-outlined' : ''
            }`}
            to={getHref(null)}
          >
            All
          </Link>
        </div>
      </div>
    </div>
  );
};
