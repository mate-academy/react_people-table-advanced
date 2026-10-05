import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const NameFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;

    const newSearchParams = getSearchWith(searchParams, {
      query: newQuery.trim() || null,
    });

    setSearchParams(newSearchParams);
  }

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          value={query}
          onChange={event => handleChange(event)}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
