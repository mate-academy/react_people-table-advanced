import { useSearchParams } from 'react-router-dom';

export const QueryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('search') || '';

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      searchParams.delete('search');
    } else {
      searchParams.set('search', e.target.value);
    }

    setSearchParams(searchParams);
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
          onChange={handleSearchQuery}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
