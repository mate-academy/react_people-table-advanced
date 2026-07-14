// ..  NameFilter.tsx
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export const NameFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trimStart();
    const updatedSearch = getSearchWith(searchParams, {
      query: value || null,
    });

    setSearchParams(updatedSearch);
  };

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          value={query}
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          onChange={handleValue}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
