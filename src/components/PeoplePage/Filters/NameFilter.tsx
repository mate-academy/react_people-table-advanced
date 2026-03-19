import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../utils/searchHelper';

const NameFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('query') || '');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const value = inputValue.trim();
      const newQuery = value === '' ? null : value;

      const newSearch = getSearchWith(searchParams, { query: newQuery });

      setSearchParams(newSearch);
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue, searchParams, setSearchParams]);

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};

export default NameFilter;
