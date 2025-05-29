// NameFilter.tsx
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSearchWith } from '../../utils/searchHelper';

export const NameFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    const newParams = getSearchWith(searchParams, {
      query: value.trim() || null,
    });

    setSearchParams(newParams);
  };

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          value={inputValue}
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
