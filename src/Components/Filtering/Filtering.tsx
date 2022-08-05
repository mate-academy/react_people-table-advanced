import React, { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import { useLocation, useNavigate } from 'react-router-dom';

const Filtering: React.FC = () => {
  const [querySearch, setQuerySearch] = useState('');

  const history = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const onQueryChange = useCallback(
    debounce((newQuery) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      history(`?${searchParams.toString()}`);
    }, 500), [],
  );

  const handleQueryChange = (value: string) => {
    setQuerySearch(value);
    onQueryChange(value);
  };

  return (
    <div className="filtering">
      <input
        type="text"
        data-cy="filterInput"
        value={querySearch}
        onChange={(event) => handleQueryChange(event.target.value)}
      />
    </div>
  );
};

export default Filtering;
