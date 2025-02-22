import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const CenturiesFilter = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  const toggleCenturies = (c: string) => {
    return centuries.includes(c)
      ? centuries.filter(item => item !== c)
      : [...centuries, c];
  };

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {['16', '17', '18', '19', '20'].map(century => {
            return (
              <Link
                key={century}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: toggleCenturies(century),
                  }),
                }}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </Link>
            );
          })}
        </div>

        <div className="level-right ml-4">
          <Link
            data-cy="centuryALL"
            className={classNames('button is-success', {
              'is-outlined': searchParams.has('centuries'),
            })}
            to={{ search: getSearchWith(searchParams, { centuries: null }) }}
          >
            All
          </Link>
        </div>
      </div>
    </div>
  );
};
