import { useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../../../utils/searchHelper';

const NameFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';

  const handleInputQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setSearchParams(newSearchParams);
  };

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          value={queryParam}
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          onChange={handleInputQuery}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};

export default NameFilter;
