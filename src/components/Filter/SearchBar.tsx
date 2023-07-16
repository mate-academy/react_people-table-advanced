import { ChangeEvent, FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export const SearchBar: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get('query') || '';

  const handleSearchField = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchParams(
      getSearchWith(searchParams, { query: value || null }),
    );
  };

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchField}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
