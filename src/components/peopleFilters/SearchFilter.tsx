import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export const SearchFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('query') || '';

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;

    const newSearch = getSearchWith(searchParams, { query: newText || null });

    setSearchParams(newSearch);
  };

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          value={q}
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          onChange={handleOnChange}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
