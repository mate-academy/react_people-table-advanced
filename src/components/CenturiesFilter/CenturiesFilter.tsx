import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import cn from 'classnames';

const CENTURIES = ['16', '17', '18', '19', '20'];

const getUpdatedCenturies = (searchCenturies: string[], century: string) => {
  return searchCenturies.includes(century)
    ? searchCenturies.filter(c => c !== century)
    : [...searchCenturies, century];
};

export const CenturiesFilter = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        {CENTURIES.map(century => (
          <div className="level-left" key={century}>
            <SearchLink
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes(century),
              })}
              params={{
                centuries: getUpdatedCenturies(centuries, century),
              }}
            >
              {century}
            </SearchLink>
          </div>
        ))}

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className={cn('button is-success', {
              'is-outlined': !!centuries.length,
            })}
            params={{ centuries: [] }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};
