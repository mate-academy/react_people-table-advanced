import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const QueryFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(searchParams, { query: event.target.value });

    setSearchParams(search);
  };

  return (
    <p className="control has-icons-left">
      <input
        data-cy="NameFilter"
        type="search"
        className="input"
        value={query}
        placeholder="Search"
        onChange={event => handleQueryChange(event)}
      />

      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>
    </p>
  );
};
