import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

const AVAILABLE_CENTURIES = ['16', '17', '18', '19', '20'];

export const CenturyFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCenturies = searchParams.getAll('centuries');

  const handleCenturyClick = (century: string) => {
    const newCenturies = selectedCenturies.includes(century)
      ? selectedCenturies.filter((c: string) => c !== century)
      : [...selectedCenturies, century];

    setSearchParams(
      getSearchWith(searchParams, {
        centuries: newCenturies.length ? newCenturies : null,
      }),
    );
  };

  const handleResetCenturies = () => {
    setSearchParams(getSearchWith(searchParams, { centuries: null }));
  };

  return (
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        {AVAILABLE_CENTURIES.map(century => (
          <button
            key={century}
            data-cy="century"
            className={`button mr-1 ${
              selectedCenturies.includes(century) ? 'is-info' : ''
            }`}
            onClick={() => handleCenturyClick(century)}
          >
            {century}
          </button>
        ))}
      </div>

      <div className="level-right ml-4">
        <a
          data-cy="centuryALL"
          className={`button ${
            !selectedCenturies.length ? 'is-success' : 'is-success is-outlined'
          }`}
          onClick={handleResetCenturies}
        >
          All
        </a>
      </div>
    </div>
  );
};
