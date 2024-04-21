import { useSearchParams } from 'react-router-dom';
import { FilterSearchParams } from '../../types/Filter';
import { getSearchWith } from '../../utils/searchHelper';

export const QueryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query =
    (searchParams.get('query') as FilterSearchParams['query']) || '';

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value || null;

    setSearchParams(getSearchWith(searchParams, { query: newValue }));
  };

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          value={query}
          onChange={handleQueryChange}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
