import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export const FilterQuery = () => {
  const [search, setSearch] = useSearchParams();
  const query = search.get('query') || '';

  const hendlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(getSearchWith(search, { query: e.target.value }));
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
          onChange={hendlerInput}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
