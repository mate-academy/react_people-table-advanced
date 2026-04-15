import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const toggleCentury = (century: string) => {
    const next = selectedCenturies.includes(century)
      ? selectedCenturies.filter(c => c !== century)
      : [...selectedCenturies, century];

    return {
      centuries: next.length ? next : null,
    };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs">
        <SearchLink params={{ sex: null }}>All</SearchLink>
        <SearchLink params={{ sex: 'm' }}>Male</SearchLink>
        <SearchLink params={{ sex: 'f' }}>Female</SearchLink>
      </p>

      <div className="panel-block">
        <input
          className="input"
          value={query}
          onChange={e => {
            const value = e.target.value;

            navigate({
              search: getSearchWith(searchParams, {
                query: value || null,
              }),
            });
          }}
        />
      </div>

      <div className="panel-block">
        {[16, 17, 18, 19, 20].map(c => (
          <SearchLink
            key={c}
            params={toggleCentury(String(c))}
            className={`button mr-1 ${
              selectedCenturies.includes(String(c)) ? 'is-info' : ''
            }`}
          >
            {c}
          </SearchLink>
        ))}
      </div>

      <div className="panel-block">
        <SearchLink params={{ query: null, sex: null, centuries: null }}>
          Reset
        </SearchLink>
      </div>
    </nav>
  );
};
