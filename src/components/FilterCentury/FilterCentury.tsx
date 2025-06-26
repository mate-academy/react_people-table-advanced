import cn from 'classnames';
import { SearchLink } from '../SearchLink';

interface FilterCenturyProps {
  centuries: string[];
}

export const FilterCenturyValue = [16, 17, 18, 19, 20];

export const FilterCentury: React.FC<FilterCenturyProps> = ({ centuries }) => {
  return (
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        {FilterCenturyValue.map(century => {
          const centuryStr = String(century);
          const newCenturies = centuries.includes(centuryStr)
            ? centuries.filter(c => c !== centuryStr)
            : [...centuries, centuryStr];

          return (
            <SearchLink
              key={century}
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes(centuryStr),
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
            'is-outlined': centuries.length > 0,
          })}
          params={{ centuries: [] }}
        >
          All
        </SearchLink>
      </div>
    </div>
  );
};
