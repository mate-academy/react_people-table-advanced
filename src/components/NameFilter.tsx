import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const NameFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState('');

  const applyQuery = useCallback(
    debounce((value) => {
      setSearchParams(
        getSearchWith(searchParams, {
          query: value || null,
        }),
      );
    }, 500),
    []
  );

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setInput(value);
    applyQuery(value);
  };

  return (
    <p className="control has-icons-left">
      <input
        type="text"
        className="input"
        placeholder="Search"
        value={input}
        onChange={onQueryChange}
      />
      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>
    </p>
  );
};
