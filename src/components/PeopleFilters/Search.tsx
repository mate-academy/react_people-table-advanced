import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../types/SearchParams';
import { getSearchWith } from '../../utils/searchHelper';

export const Search: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = searchParams.get(SearchParams.Query) || '';

  const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: e.target.value || null,
      }),
    );
  };

  return (
    <p className="control has-icons-left">
      <input
        data-cy="NameFilter"
        value={queryParams}
        onChange={handlerOnChange}
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
