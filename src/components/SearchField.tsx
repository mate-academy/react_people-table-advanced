import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const SearchField = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          onChange={event =>
            setSearchParams(
              getSearchWith(searchParams, { query: event.target.value }),
            )
          }
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
