import { SearchLink } from '../SearchLink';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

const CENTURIES_FILTER = ['16', '17', '18', '19', '20'];

export function CenturyFilter() {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('century');

  function handleSearchParams(param: string, val: string) {
    const params = new URLSearchParams(searchParams);

    const century = params.getAll(param);

    if (century.includes(val)) {
      return century.filter(item => item !== val);
    } else {
      return [...century, val];
    }
  }

  return (
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        {CENTURIES_FILTER.map(century => (
          <SearchLink
            data-cy="century"
            params={{
              century: handleSearchParams('century', century),
            }}
            className={classNames('button mr-1', {
              'is-info': centuries.includes(century),
            })}
            key={century}
          >
            {century}
          </SearchLink>
        ))}
      </div>

      <div className="level-right ml-4">
        <SearchLink
          data-cy="centuryALL"
          className={classNames('button', {
            'is-success': centuries.length === 0,
            'is-outlined': centuries.length,
          })}
          params={{ century: null }}
        >
          All
        </SearchLink>
      </div>
    </div>
  );
}
