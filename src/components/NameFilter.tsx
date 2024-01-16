import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const NameFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.getAll('query') || null;

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams(getSearchWith(searchParams, {
      query: event.target.value || null,
    }));
  }

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          value={query}
          type="search"
          className="input"
          placeholder="Search"
          onChange={handleQueryChange}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
