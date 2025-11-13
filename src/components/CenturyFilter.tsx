import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';

interface Props {
  centuries: number[];
}

export const CenturyFilter: React.FC<Props> = ({ centuries }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCenturies = searchParams.getAll('centuries');

  const handleChange = (century: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (selectedCenturies.includes(century)) {
      newParams.delete('centuries');
      selectedCenturies
        .filter(c => c !== century)
        .forEach(c => newParams.append('centuries', c));
    } else {
      newParams.append('centuries', century);
    }

    setSearchParams(newParams);
  };

  const handleSelectAll = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('centuries');
    setSearchParams(newParams);
  };

  const allSelected = selectedCenturies.length === 0;

  return (
    <div className="field" data-cy="century-filter">
      <div className="buttons">
        {centuries.map(century => (
          <button
            key={century}
            type="button"
            className={classNames('button', {
              'is-info': selectedCenturies.includes(century.toString()),
            })}
            onClick={() => handleChange(century.toString())}
          >
            {century}
          </button>
        ))}

        <button
          type="button"
          className={classNames('button', {
            'is-success': allSelected,
          })}
          onClick={handleSelectAll}
        >
          All
        </button>
      </div>
    </div>
  );
};
