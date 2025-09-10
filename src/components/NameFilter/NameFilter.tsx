import { useSearchParams } from 'react-router-dom';

export function NameFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  function setQuery(val: string) {
    const params = new URLSearchParams(searchParams);

    if (!val) {
      params.delete('query');
    } else {
      params.set('query', val);
    }

    setSearchParams(params);
  }

  return (
    <p className="control has-icons-left">
      <input
        data-cy="NameFilter"
        type="search"
        className="input"
        placeholder="Search"
        onChange={e => setQuery(e.target.value)}
      />

      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>
    </p>
  );
}
