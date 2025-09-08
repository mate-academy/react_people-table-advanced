import React from 'react';

type CenturyFilterProps = {
  searchParams: URLSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
};

export const CenturyFilter: React.FC<CenturyFilterProps> = ({
  searchParams,
  setSearchParams,
}) => {
  const centuries = searchParams.getAll('centuries') || [];
  const centuriesNums = [16, 17, 18, 19, 20];

  const toggleCentury = (cent: string) => {
    const params = new URLSearchParams(searchParams);
    const newCenturies = centuries.includes(cent)
      ? centuries.filter(c => c !== cent)
      : [...centuries, cent];

    params.delete('centuries');
    newCenturies.forEach(c => params.append('centuries', c));
    setSearchParams(params);
  };

  const handleClearCenturies = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('centuries');
    setSearchParams(newParams);
  };

  return (
    <>
      {centuriesNums.map(cent => {
        const isActive = centuries.includes(String(cent));

        return (
          <button
            key={cent}
            data-cy="century"
            className={`button mr-1 ${isActive ? 'is-info' : ''}`}
            onClick={() => toggleCentury(String(cent))}
          >
            {cent}
          </button>
        );
      })}
      <div className="level-right ml-4">
        <button
          data-cy="centuryALL"
          className="button is-success is-outlined"
          onClick={handleClearCenturies}
        >
          All
        </button>
      </div>
    </>
  );
};
