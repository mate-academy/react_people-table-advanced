import { SearchLink } from '../../TableHeaders/TableHeder/SearchLink';
import { AllFilter } from './AllFilter';
import { useCenturyFilters } from './useCenturyFilters';

export const CenturyFilters = () => {
  const { centuries, getParams, className } = useCenturyFilters();

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuries.map(century => (
            <SearchLink
              key={century}
              data-cy="century"
              className={className(century)}
              params={{
                centuries: getParams(century.toString()),
              }}
            >
              {century}
            </SearchLink>
          ))}

        </div>
        <AllFilter />
      </div>
    </div>
  );
};
