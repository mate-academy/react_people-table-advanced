import React from 'react';
import { SearchLink } from './SearchLink';

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
      {centuries.map((number) => {
        const isInfo = activeCenturies.includes(number)
        && activeCenturies.length < 5;
        const includesCenturie
        = activeCenturies.includes(number);
        let centuriesParam = '';

        if (activeCenturies.length === 5) {
          centuriesParam = String([number]);
        } else if (activeCenturies.length < 5
          && activeCenturies.length > 0 && !includesCenturie) {
          centuriesParam = String([...activeCenturies, number]);
        } else if (activeCenturies.length < 5
          && activeCenturies.length > 0
          && includesCenturie) {
          centuriesParam = String(activeCenturies.filter((activeCenturie) => {
            return activeCenturie !== number;
          }));
        } else if (activeCenturies.length === 5 && includesCenturie) {
          centuriesParam = String([activeCenturies]);
        }

        const params = {
          centuries: centuriesParam,
        };

        return (
          <SearchLink
            key={number}
            data-cy="century"
            className={`button mr-1 ${isInfo ? 'is-info' : ''}`}
            params={params}
            onClick={() => handleCenturySelection([number])}
          >
            {number + 1}
          </SearchLink>
        );
      })}
    </div>
  );
};
