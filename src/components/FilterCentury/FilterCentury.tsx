import cn from 'classnames';
import { SearchLink } from '../SeachLink';

interface FilterCenturyProps {
  centuryFilter: string[];
}

export const FilterCenturyValue = [16, 17, 18, 19, 20];

export const FilterCentury: React.FC<FilterCenturyProps> = ({
  centuryFilter,
}) => {
  return (
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        {FilterCenturyValue.map(century => {
          const centuryStr = String(century);
          const newCenturies = centuryFilter.includes(centuryStr)
            ? centuryFilter.filter(c => c !== centuryStr)
            : [...centuryFilter, centuryStr];

          return (
            <SearchLink
              key={century}
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuryFilter.includes(centuryStr),
              })}
              params={{ centuries: newCenturies }}
            >
              {century}
            </SearchLink>
          );
        })}
      </div>

      <div className="level-right ml-4">
        <SearchLink
          data-cy="centuryALL"
          className={cn('button', 'is-success', {
            'is-outlined': centuryFilter.length > 0,
          })}
          params={{ centuries: [] }}
        >
          All
        </SearchLink>
      </div>
    </div>
  );
};
