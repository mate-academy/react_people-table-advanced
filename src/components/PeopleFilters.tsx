import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  function helperCenturies(century: string) {
    const thisCentury = century.toString();
    const newCenturies = centuries.includes(thisCentury)
      ? centuries.filter(c => c !== thisCentury)
      : [...centuries, thisCentury];

    return newCenturies;
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={{ sex: null }} className={!sex ? 'is-active' : ''}>
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={sex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={sex === 'f' ? 'is-active' : ''}
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
            value={query || ''}
            onChange={event => {
              setSearchParams(
                getSearchWith(searchParams, {
                  query: event.target.value || null,
                }),
              );
            }}
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
              params={{ centuries: helperCenturies('16') }}
              data-cy="century"
              className={`button mr-1${centuries.includes('16') ? ' is-info' : ''}`}
            >
              16
            </SearchLink>

            <SearchLink
              params={{ centuries: helperCenturies('17') }}
              data-cy="century"
              className={`button mr-1${centuries.includes('17') ? ' is-info' : ''}`}
            >
              17
            </SearchLink>

            <SearchLink
              params={{ centuries: helperCenturies('18') }}
              data-cy="century"
              className={`button mr-1${centuries.includes('18') ? ' is-info' : ''}`}
            >
              18
            </SearchLink>

            <SearchLink
              params={{ centuries: helperCenturies('19') }}
              data-cy="century"
              className={`button mr-1${centuries.includes('19') ? ' is-info' : ''}`}
            >
              19
            </SearchLink>

            <SearchLink
              params={{ centuries: helperCenturies('20') }}
              data-cy="century"
              className={`button mr-1${centuries.includes('20') ? ' is-info' : ''}`}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: [] }}
              className={`button is-success is-outlined${centuries.length === 0 ? ' is-info' : ''}`}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ sex: null, query: null, centuries: [] }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
