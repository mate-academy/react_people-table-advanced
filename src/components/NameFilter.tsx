import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const NameFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <p className="control has-icons-left">
      <input
        value={query}
        onChange={event => setSearchParams(
          getSearchWith(searchParams, {
            query: event.target.value || null,
          }),
        )}
        className="input"
        type="text"
        placeholder="Search"
      />
      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>
    </p>
  );
};
