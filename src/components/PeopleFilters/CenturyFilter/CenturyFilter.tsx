import React from 'react';
import cn from 'classnames';

type Props = {
  centuries: string[];
  centuryArr: string[];
  onToggleCentury: (century: string) => void;
  onClearCenturies: () => void;
};

export const CenturyFilter: React.FC<Props> = ({
  centuries,
  centuryArr,
  onToggleCentury,
  onClearCenturies,
}) => (
  <div className="panel-block">
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        {centuryArr.map(century => (
          <button
            data-cy="century"
            className={cn('button mr-1', {
              'is-info': centuries.includes(century),
            })}
            key={century}
            onClick={() => onToggleCentury(century)}
          >
            {century}
          </button>
        ))}
      </div>
      <div className="level-right ml-4">
        <button
          data-cy="centuryALL"
          className={cn('button is-success', {
            'is-outlined': centuries.length,
          })}
          onClick={onClearCenturies}
        >
          All
        </button>
      </div>
    </div>
  </div>
);
