import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

const CENTURIES = [16, 17, 18, 19, 20];

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  const getCenturyFilter = (century: string) => (
    centuries.includes(century)
      ? centuries.filter(prevCentury => prevCentury !== century)
      : [...centuries, century]
  );

  return (
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        {CENTURIES.map(century => (
          <SearchLink
            data-cy="century"
            key={century}
            params={{ centuries: getCenturyFilter(century.toString()) }}
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
          data-cy="centuryALL"
          params={{ centuries: null }}
          className={classNames('button is-success', {
            'is-outlined': !!centuries.length,
          })}
        >
          All
        </SearchLink>
      </div>
    </div>
  );
};
