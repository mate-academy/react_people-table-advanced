import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink className={!sex ? 'is-active' : ''} params={{ sex: null }}>
          All
        </SearchLink>
        <SearchLink
          className={sex === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={sex === 'f' ? 'is-active' : ''}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            onChange={event =>
              setSearchParams(
                getSearchWith(searchParams, {
                  query: event.target.value || null,
                }),
              )
            }
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

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <SearchLink
              data-cy="century"
              className={`button mr-1 ${centuries.includes('16') ? 'is-info' : ''}`}
              params={{
                centuries: centuries.includes('16')
                  ? centuries.filter(c => c !== '16')
                  : [...centuries, '16'],
              }}
            >
              16
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={`button mr-1 ${centuries.includes('17') ? 'is-info' : ''}`}
              params={{
                centuries: centuries.includes('17')
                  ? centuries.filter(c => c !== '17')
                  : [...centuries, '17'],
              }}
            >
              17
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={`button mr-1 ${centuries.includes('18') ? 'is-info' : ''}`}
              params={{
                centuries: centuries.includes('18')
                  ? centuries.filter(c => c !== '18')
                  : [...centuries, '18'],
              }}
            >
              18
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={`button mr-1 ${centuries.includes('19') ? 'is-info' : ''}`}
              params={{
                centuries: centuries.includes('19')
                  ? centuries.filter(c => c !== '19')
                  : [...centuries, '19'],
              }}
            >
              19
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={`button mr-1 ${centuries.includes('20') ? 'is-info' : ''}`}
              params={{
                centuries: centuries.includes('20')
                  ? centuries.filter(c => c !== '20')
                  : [...centuries, '20'],
              }}
            >
              20
            </SearchLink>
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
          params={{ query: null, sex: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
