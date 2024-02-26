import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

const CENTURIES = [16, 17, 18, 19, 20];

export const CenturiesFilter = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  const getNewCenturies = (century: string) =>
    centuries.includes(century)
      ? centuries.filter(prevCentury => prevCentury !== century)
      : [...centuries, century];

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {CENTURIES.map(century => (
            <SearchLink
              key={century}
              params={{ centuries: getNewCenturies(century.toString()) }}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes(century.toString()),
              })}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            params={{ centuries: null }}
            data-cy="centuryALL"
            className={classNames('button is-success', {
              'is-outlined': !!centuries.length,
            })}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};
