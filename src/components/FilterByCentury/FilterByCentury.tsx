import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

const allowableCenturies = ['16', '17', '18', '19', '20'];

export const FilterByCentury: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');

  return (
    <div className="panel-block is-flex-direction-column">
      <div className="buttons is-justify-content-center">
        {allowableCenturies.map(century => (
          <button
            key={century}
            type="button"
            className={
              classNames(
                'button',
                { 'is-success': centuries.includes(century) },
              )
            }
            onClick={() => setSearchParams(
              getSearchWith(searchParams, {
                centuries: centuries.includes(century)
                  ? centuries.filter(selectedCentury => {
                    return selectedCentury !== century;
                  })
                  : [...centuries, century],
              }),
            )}
          >
            {century}
          </button>
        ))}
        <button
          type="button"
          className={
            classNames(
              'button',
              { 'is-success': centuries.length === 0 },
            )
          }
          onClick={() => setSearchParams(
            getSearchWith(searchParams, { centuries: [] }),
          )}
        >
          Show All
        </button>
      </div>
    </div>

  );
};
