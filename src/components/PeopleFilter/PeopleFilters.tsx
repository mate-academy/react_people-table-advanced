import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink/SearchLink';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';

type Props = {};

export const PeopleFilters: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const toggledCenturies = (century: number) => {
    return centuries.includes(century.toString())
      ? centuries.filter(cent => cent !== century.toString())
      : [...centuries, century].map(String);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={`${sex !== 'm' && sex !== 'f' ? 'is-active' : ''}`}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={`${sex === 'm' ? 'is-active' : ''}`}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={`${sex === 'f' ? 'is-active' : ''}`}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => {
              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={`button mr-1 ${centuries.includes(century.toString()) ? 'is-info' : ''}`}
                  params={{ centuries: toggledCenturies(century) }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, centuries: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
