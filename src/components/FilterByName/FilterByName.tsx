import lodash from 'lodash';
import { FC, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export const FilterByName: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [targetValue, setTargetValue] = useState('');

  const applyQuery = useCallback(
    lodash.debounce(
      (value: string) => {
        setSearchParams(
          getSearchWith(searchParams, { query: value }),
        );
      }, 500,
    ), [],
  );

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          className="input"
          type="text"
          placeholder="Search"
          value={targetValue}
          onChange={event => {
            setTargetValue(event.target.value);
            applyQuery(targetValue);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
