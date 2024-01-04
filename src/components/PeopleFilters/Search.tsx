import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../types/SearchParams';
import { getSearchWith } from '../../utils/searchHelper';

export const Search: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = searchParams.get(SearchParams.Query) || '';

  return (
    <p className="control has-icons-left">
      <input
        data-cy="NameFilter"
        value={queryParams}
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
