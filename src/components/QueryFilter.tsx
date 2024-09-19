import { ChangeEvent, useEffect, useState } from 'react';
import { getSearchWith } from '../utils/searchHelper';
import { useSearchParams } from 'react-router-dom';

export const QueryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = searchParams.get('query') || '';

  const [query, setQuery] = useState(queryParams);

  useEffect(() => {
    if (queryParams !== query) {
      setQuery(queryParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const trimmedValue = value.trim();

    const newSearchParams = getSearchWith(searchParams, {
      query: trimmedValue || null,
    });

    setSearchParams(newSearchParams);
    setQuery(value);
  };

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          value={query}
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          onChange={handleChange}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
