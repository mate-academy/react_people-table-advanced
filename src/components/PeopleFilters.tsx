/* eslint-disable jsx-a11y/label-has-associated-control */
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: e.target.value || null }),
    );
  };

  const getCenturyParams = (century: string) => {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    return {
      centuries: newCenturies.length > 0 ? newCenturies : null,
    };
  };

  const isCenturyActive = (century: string) => centuries.includes(century);

  return (
    <div className="box">
      <h2 className="title is-5 mb-4">Filters</h2>

      <div className="tabs is-centered is-small mb-4">
        <ul>
          <li className={!sex ? 'is-active' : ''}>
            <SearchLink params={{ sex: null }}>All</SearchLink>
          </li>
          <li className={sex === 'm' ? 'is-active' : ''}>
            <SearchLink params={{ sex: 'm' }}>Male</SearchLink>
          </li>
          <li className={sex === 'f' ? 'is-active' : ''}>
            <SearchLink params={{ sex: 'f' }}>Female</SearchLink>
          </li>
        </ul>
      </div>

      <div className="field mb-4">
        <p className="control has-icons-left">
          <input
            className="input"
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="field mb-4">
        <div className="buttons is-centered">
          {CENTURIES.map(century => (
            <SearchLink
              key={century}
              params={getCenturyParams(century)}
              className={`button ${isCenturyActive(century) ? 'is-link' : ''}`}
            >
              {century}
            </SearchLink>
          ))}
          <SearchLink
            params={{ centuries: null }}
            className={`button ${centuries.length === 0 ? 'is-success' : ''}`}
          >
            All
          </SearchLink>
        </div>
      </div>

      <Link to={pathname} className="button is-link is-outlined is-fullwidth">
        Reset all filters
      </Link>
    </div>
  );
};
