import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../../utils/searchHelper';

const QueryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const onChange = (e: ChangeEvent<HTMLInputElement>) => (
    setSearchParams(
      getSearchWith(searchParams, { query: e.target.value || null }),
    )
  );

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          value={query}
          onChange={onChange}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};

export default QueryFilter;
