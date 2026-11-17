import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../utils/searchHelper';

export const NameFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const handleChange = (value: string) => {
    const search = getSearchWith(searchParams, {
      query: value || null,
    });

    setSearchParams(search);
  };

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          className="input"
          type="search"
          placeholder="Search"
          value={query}
          onChange={event => handleChange(event.target.value)}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
