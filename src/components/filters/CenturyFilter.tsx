import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { CENTURIES } from '../../constants';
import { SearchLink } from '..';

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  function handleSelectCentury(selectedCentury: string) {
    return centuries.includes(selectedCentury)
      ? centuries.filter(cemtury => cemtury !== selectedCentury)
      : [...centuries, selectedCentury];
  }

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {CENTURIES.map(century => {
            return (
              <SearchLink
                key={century}
                params={{ centuries: handleSelectCentury(century) }}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                data-cy="century"
              >
                {century}
              </SearchLink>
            );
          })}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            params={{ centuries: null }}
            className={classNames('button is-success', {
              'is-outlined': searchParams.has('centuries'),
            })}
            data-cy="centuryALL"
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};
