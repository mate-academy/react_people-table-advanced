import { Dispatch } from 'react';
import cn from 'classnames';

interface FilterCenturyProps {
  centuryFilter: number[];
  setCenturyFilter: Dispatch<React.SetStateAction<number[]>>;
}

export const FilterCenturyValue = [16, 17, 18, 19, 20];

export const FilterCentury: React.FC<FilterCenturyProps> = ({
  centuryFilter,
  setCenturyFilter,
}) => {
  const handleToggleCentury = (century: number) => {
    setCenturyFilter(currentCentury =>
      currentCentury.includes(century)
        ? currentCentury.filter(centur => centur !== century)
        : [...currentCentury, century],
    );
  };

  const handleToggleAllCentury = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    setCenturyFilter([]);
  };

  return (
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        {FilterCenturyValue.map(century => (
          <a
            key={century}
            data-cy="century"
            className={cn('button mr-1', {
              'is-info': centuryFilter.includes(century),
            })}
            href={`#/people?centuries=${century}`}
            onClick={event => {
              event.preventDefault();
              handleToggleCentury(century);
            }}
          >
            {century}
          </a>
        ))}
      </div>

      <div className="level-right ml-4">
        <a
          data-cy="centuryALL"
          className={cn('button is-success', {
            'is-outlined': centuryFilter.length > 0,
          })}
          href="#/people"
          onClick={handleToggleAllCentury}
        >
          All
        </a>
      </div>
    </div>
  );
};
