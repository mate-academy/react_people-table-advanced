import React from 'react';
import { SearchLink } from './SearchLink'; // Import the SearchLink component

interface Props {
  handleCenturySelection: (value: number[]) => void;
  activeCenturies: number[];
}

export const FilterCenturies: React.FC<Props> = ({
  handleCenturySelection,
  activeCenturies,
}) => {
  const centuries = [15, 16, 17, 18, 19];

  return (
    <div className="level-left">
      {centuries.map((number) => (
        <SearchLink
          key={number}
          data-cy="century"
          className={`button mr-1 ${
            activeCenturies.includes(number) ? 'is-info' : ''
          }`}
          params={{ centuries: [String(number)] }}
          onClick={() => handleCenturySelection([number])}
        >
          {number + 1}
        </SearchLink>
      ))}
    </div>
  );
};
