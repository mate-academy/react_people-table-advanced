import { SearchParams } from '../utils/searchHelper';
import React from 'react';
import classNames from 'classnames';

type Props = {
  selectedCenturies: string[];
  onUpdate: (params: SearchParams) => void;
};

const centuriesList = ['16', '17', '18', '19', '20'];

export const CenturyFilter: React.FC<Props> = ({
  selectedCenturies,
  onUpdate,
}) => {
  const isSelected = (century: string) => selectedCenturies.includes(century);

  const toggleCentury = (century: string) => {
    const newCenturies = isSelected(century)
      ? selectedCenturies.filter(c => c !== century)
      : [...selectedCenturies, century];

    onUpdate({ centuries: newCenturies.length ? newCenturies : null });
  };

  const handleClear = () => {
    onUpdate({ centuries: null });
  };

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuriesList.map(century => (
            <button
              key={century}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': isSelected(century),
              })}
              onClick={() => toggleCentury(century)}
            >
              {century}
            </button>
          ))}
        </div>

        <div className="level-right ml-4">
          <button
            data-cy="centuryALL"
            className={classNames('button is-success', {
              'is-outlined': selectedCenturies.length,
            })}
            onClick={() => handleClear()}
          >
            All
          </button>
        </div>
      </div>
    </div>
  );
};
