import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const NameFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setSearchParams(getSearchWith(searchParams, { query: newQuery || null }));
  };

  return (
    <div className="field">
      <label className="label" htmlFor="name-input">
        Search by name
      </label>
      <div className="control">
        <input
          id="name-input"
          type="text"
          className="input"
          placeholder="Type to search"
          value={query}
          onChange={handleQueryChange}
        />
      </div>
    </div>
  );
};