import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../../utils/searchHelper';

export const FilterByNames = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newParamsString = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setSearchParams(newParamsString);
  };

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          value={query}
          onChange={event => handleQueryChange(event)}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};
