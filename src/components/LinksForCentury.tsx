import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchParams } from '../types/SearchPapams';
import { SearchLink } from './SearchLink';

const startedCenturies = ['16', '17', '18', '19', '20'];

export const LinksForCentury: React.FC = () => {
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll(SearchParams.Centuries) || [];

  const handlerCenturiesChange = (ch: string) => {
    if (centuries.includes(ch)) {
      return { centuries: [...centuries].filter(cen => cen !== ch) || [] };
    }

    return { centuries: [...centuries, ch] };
  }

  return (
    <>
      <div className="level-left">
        {startedCenturies.map(century => {
          const newParams = handlerCenturiesChange(century);

          return (
            <SearchLink
              key={`century-${century}`}
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': centuries.includes(century),
              })}
              params={newParams}
            >
              {century}
            </SearchLink>
          )
        })}
      </div>

      <div className="level-right ml-4">
        <SearchLink
          data-cy="centuryALL"
          className={classNames(
            'button', 'is-success', { 'is-outlined': centuries.length > 0 },
          )}
          params={{ centuries: null }}
        >
          All
        </SearchLink>
      </div>
    </>

  );
};
