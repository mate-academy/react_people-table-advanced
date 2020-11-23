import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import debounce from 'lodash/debounce';

const Filter: React.FC<{ searchParams: URLSearchParams }> = ({
  searchParams,
}) => {
  const apliedQuery = searchParams.get('query');
  const [query, setQuery] = useState(apliedQuery);
  const history = useHistory();

  const applyQuery = useCallback(
    debounce((newQuery) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      console.log(searchParams.toString());

      history.push(`?${searchParams.toString()}`);
    }, 500),
    []
  );

  const onChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    setQuery(e.target.value);
    applyQuery(e.target.value);
  };

  return (
    <form className="form">
      <input
        value={query ? query : ''}
        type="text"
        placeholder="filter"
        onChange={onChange}
      />
    </form>
  );
};

export default Filter;
