import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') ?? '';
  const sex = searchParams.get('sex');
  const century = searchParams.getAll('centuries');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={sex === null ? 'is-active' : ''}
          params={{ sex: null }}
        >
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
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e =>
              setSearchParams(
                getSearchWith(searchParams, {
                  query: e.target.value || null,
                }),
              )
            }
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
              className={`button mr-1 ${century.includes('16') ? 'is-info' : ''}`}
              params={{
                centuries: century.includes('16')
                  ? century.filter(c => c !== '16')
                  : [...century, '16'],
              }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={`button mr-1 ${century.includes('17') ? 'is-info' : ''}`}
              params={{
                centuries: century.includes('17')
                  ? century.filter(c => c !== '17')
                  : [...century, '17'],
              }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={`button mr-1 ${century.includes('18') ? 'is-info' : ''}`}
              params={{
                centuries: century.includes('18')
                  ? century.filter(c => c !== '18')
                  : [...century, '18'],
              }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={`button mr-1 ${century.includes('19') ? 'is-info' : ''}`}
              params={{
                centuries: century.includes('19')
                  ? century.filter(c => c !== '19')
                  : [...century, '19'],
              }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={`button mr-1 ${century.includes('20') ? 'is-info' : ''}`}
              params={{
                centuries: century.includes('20')
                  ? century.filter(c => c !== '20')
                  : [...century, '20'],
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
          params={{
            query: null,
            sex: null,
            centuries: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
