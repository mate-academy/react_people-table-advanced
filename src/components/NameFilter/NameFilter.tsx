import { useSearchParams } from 'react-router-dom';

export const NameFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <p className="control has-icons-left">
      <input
        className="input"
        type="text"
        placeholder="Search"
        value={query}
        onChange={event => {
          const newQuery = event.target.value;

          if (newQuery) {
            searchParams.set('query', newQuery);
          } else {
            searchParams.delete('query');
          }

          setSearchParams(searchParams);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>
    </p>
  );
};
