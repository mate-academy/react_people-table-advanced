import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';

type Props = {
  people: Person[];
};

const getCentury = (year: number) => Math.ceil(year / 100);

export const CenturyFilter: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCenturies = searchParams.getAll('centuries');

  const centuries = Array.from(
    new Set(people.map(person => getCentury(person.born))),
  ).sort((a, b) => a - b);

  const handleChange = (century: number) => {
    const params = new URLSearchParams(searchParams);
    const value = String(century);
    const current = params.getAll('centuries');

    params.delete('centuries');

    if (!current.includes(value)) {
      [...current, value].forEach(item => {
        params.append('centuries', item);
      });
    } else {
      current
        .filter(item => item !== value)
        .forEach(item => {
          params.append('centuries', item);
        });
    }

    setSearchParams(params);
  };

  const handleAll = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    setSearchParams(params);
  };

  return (
    <div className="field">
      <label className="label" htmlFor="centuryFilter">
        Century
      </label>

      <div className="control">
        <label className="checkbox">
          <input
            id="centuryFilter"
            type="checkbox"
            data-cy="centuryFilter"
            checked={selectedCenturies.length === 0}
            onChange={handleAll}
          />
          {' All'}
        </label>
      </div>

      {centuries.map(century => (
        <div className="control" key={century}>
          <label className="checkbox">
            <input
              type="checkbox"
              data-cy={`century-${century}`}
              checked={selectedCenturies.includes(String(century))}
              onChange={() => handleChange(century)}
            />
            {` ${century}`}
          </label>
        </div>
      ))}
    </div>
  );
};

