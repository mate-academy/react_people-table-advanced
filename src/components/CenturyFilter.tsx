import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();

  const allCenturies = ['16', '17', '18', '19', '20'];
  const currentCenturies = searchParams.getAll('centuries');

  const getUpdatedCenturies = (centuryToUpdate: string): string[] => {
    if (currentCenturies.includes(centuryToUpdate)) {
      return currentCenturies.filter(century => century !== centuryToUpdate);
    }

    return [...currentCenturies, centuryToUpdate];
  };

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {allCenturies.map(century => (
            <SearchLink
              key={century}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': currentCenturies.includes(century),
              })}
              params={{ centuries: getUpdatedCenturies(century) }}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className={classNames('button is-success', {
              'is-outlined': currentCenturies.length,
            })}
            params={{ centuries: null }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};
