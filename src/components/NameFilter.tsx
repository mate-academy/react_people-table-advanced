import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const NameFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newParams = getSearchWith(
      searchParams,
      { query: e.target.value || null },
    );

    setSearchParams(newParams);
  };

  return (
    <p className="control has-icons-left">
      <input
        data-cy="NameFilter"
        type="search"
        className="input"
        placeholder="Search"
        value={searchParams.get('query') || ''}
        onChange={handleInputChange}
      />

      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>
    </p>
  );
};
