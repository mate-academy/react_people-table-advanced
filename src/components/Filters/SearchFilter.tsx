import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export const SearchFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          onChange={(e) => {
            const nextParams = getSearchWith(searchParams, {
              query: e.target.value || null,
            });

            setSearchParams(
              new URLSearchParams(nextParams),
            );
          }}
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
