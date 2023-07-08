import React from 'react';
import { SearchLink } from './SearchLink';

interface Props {
  handleCenturySelection: (value: number[]) => void;
  activeCenturies: number[];
  currentUrl: number[];
}

export const FilterCenturies: React.FC<Props> = ({
  handleCenturySelection,
  activeCenturies,
  currentUrl,
}) => {
  const centuries = [15, 16, 17, 18, 19];

  return (
    <div className="level-left">
      {centuries.map((number) => {
        const isInfo = activeCenturies.includes(number)
        && activeCenturies.length < 5;
        const includesCentury = activeCenturies.includes(number);
        let centuriesParam: string[] | string | null = null;

        if (activeCenturies.length === 1 && includesCentury) {
          centuriesParam = null;
        } else if (activeCenturies.length === 5) {
          centuriesParam = String(number);
        } else if (activeCenturies.length < 5
          && activeCenturies.length > 0
          && !includesCentury) {
          centuriesParam = [...activeCenturies, number].map(String);
        } else if (activeCenturies.length < 5
          && activeCenturies.length > 0
          && includesCentury) {
          centuriesParam = activeCenturies.filter((activeCentury) => {
            return activeCentury !== number;
          }).map(String);
        } else if (activeCenturies.length === 4
          && includesCentury) {
          centuriesParam = null;
        }

        return (
          <SearchLink
            key={number}
            data-cy="century"
            className={`button mr-1 ${isInfo ? 'is-info' : ''}`}
            params={{
              centuries: currentUrl.length === 4 ? null : centuriesParam,
            }}
            onClick={() => handleCenturySelection([number])}
          >
            {number + 1}
          </SearchLink>
        );
      })}
    </div>
  );
};
