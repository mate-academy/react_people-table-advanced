import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/getSearchWith';

export const NameFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <input
      data-cy="NameFilter"
      type="search"
      className="input"
      placeholder="Search"
      value={query}
      onChange={event => {
        const value = event.target.value;

        setSearchParams(getSearchWith({ searchParams, key: 'query', value }));
      }}
    />
  );
};
