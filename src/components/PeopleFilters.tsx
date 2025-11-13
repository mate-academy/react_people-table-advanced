import { useSearchParams } from 'react-router-dom';
import SexFilter from '../types/SexFilter';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Читаємо поточні значення з URL
  const sexFilter = (searchParams.get('sex') as SexFilter) || 'all';
  const inputFilterText = searchParams.get('query') || '';
  const centuriesFilter = searchParams.getAll('centuries');

  const handleInputChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (value) {
      newParams.set('query', value);
    } else {
      newParams.delete('query');
    }
    
    setSearchParams(newParams);
  };

  const getCenturyParams = (century: string) => {
    if (centuriesFilter.includes(century)) {
      // Видаляємо це століття
      return {
        centuries: centuriesFilter.filter(c => c !== century),
      };
    } else {
      // Додаємо це століття
      return {
        centuries: [...centuriesFilter, century],
      };
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={sexFilter === 'all' ? 'is-active' : ''}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={sexFilter === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={sexFilter === 'f' ? 'is-active' : ''}
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
            value={inputFilterText}
            onChange={e => handleInputChange(e.target.value)}
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
              params={getCenturyParams('16')}
              className={`button mr-1 ${centuriesFilter.includes('16') ? 'is-info' : ''}`}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              params={getCenturyParams('17')}
              className={`button mr-1 ${centuriesFilter.includes('17') ? 'is-info' : ''}`}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              params={getCenturyParams('18')}
              className={`button mr-1 ${centuriesFilter.includes('18') ? 'is-info' : ''}`}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              params={getCenturyParams('19')}
              className={`button mr-1 ${centuriesFilter.includes('19') ? 'is-info' : ''}`}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              params={getCenturyParams('20')}
              className={`button mr-1 ${centuriesFilter.includes('20') ? 'is-info' : ''}`}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: [] }}
              className={`button is-success ${centuriesFilter.length > 0 ? 'is-outlined' : ''}`}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ sex: null, query: null, centuries: [], sort: null, order: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};