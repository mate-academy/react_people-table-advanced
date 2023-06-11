import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  handleCenturySelection: (value: number) => void,
  activeCenturies: number[]
}

export const FilterCenturies: React.FC<Props> = ({
  handleCenturySelection,
  activeCenturies,
}) => {
  const centuries = [16, 17, 18, 19, 20];

  return (
    <div className="level-left">
      {centuries.map((number) => (
        <NavLink
          key={number}
          data-cy="century"
          className={activeCenturies.includes(number - 1)
            ? 'button mr-1 is-info' : 'button mr-1'}
          to={`#/people?centuries=${number}`}
          onClick={() => handleCenturySelection(number - 1)}
        >
          {number}
        </NavLink>
      ))}
    </div>
  );
};
