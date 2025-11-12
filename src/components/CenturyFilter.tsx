import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {'16,17,18,19,20'.split(',').map(century => (
            <Link
              key={century}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: centuries.includes(century)
                    ? centuries.filter(n => century !== n)
                    : [...centuries, century],
                }),
              }}
              className={cn('button', 'mr-1', {
                'is-info': centuries.includes(century),
              })}
            >
              {century}
            </Link>
          ))}
        </div>

        <div className="level-right ml-4">
          {/* <Link
            to={{ search: getSearchWith(searchParams, { centuries: null }) }}
            data-cy="centuryALL"
            className={cn('button', 'is-success', {
              'is-outlined': centuries.length !== 0,
            })}
          >
            All
          </Link> */}
          <SearchLink
            params={{ centuries: null }}
            data-cy="centuryALL"
            className={cn('button', 'is-success', {
              'is-outlined': centuries.length !== 0,
            })}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};
