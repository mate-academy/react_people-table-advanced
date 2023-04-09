import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelper';

export const FilterBySearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const preparedSearch = getSearchWith(
      searchParams,
      { query: event.target.value.trimStart() || null },
    );

    setSearchParams(preparedSearch);
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
          onChange={onQueryChange}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
