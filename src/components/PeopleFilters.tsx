import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const currentSex = searchParams.get('sex') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const paramsToUpdate: Record<string, string | null> = {
      query: value || null,
    };

    const searchString = getSearchWith(searchParams, paramsToUpdate);

    setSearchParams(searchString);
  };

  return (
    <>
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          <SearchLink
            className={currentSex === '' ? 'is-active' : ''}
            params={{ sex: null }}
          >
            All
          </SearchLink>
          <SearchLink
            className={currentSex === 'm' ? 'is-active' : ''}
            params={{ sex: 'm' }}
          >
            Male
          </SearchLink>
          <SearchLink
            className={currentSex === 'f' ? 'is-active' : ''}
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
              onChange={handleSearchChange}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              <SearchLink
                data-cy="century"
                className={`button mr-1 ${selectedCenturies.includes('16') ? 'is-info' : ''}`}
                params={{
                  centuries: selectedCenturies.includes('16')
                    ? selectedCenturies.filter(c => c !== '16')
                    : [...selectedCenturies, '16'],
                }}
              >
                16
              </SearchLink>

              <SearchLink
                data-cy="century"
                className={`button mr-1 ${selectedCenturies.includes('17') ? 'is-info' : ''}`}
                params={{
                  centuries: selectedCenturies.includes('17')
                    ? selectedCenturies.filter(c => c !== '17')
                    : [...selectedCenturies, '17'],
                }}
              >
                17
              </SearchLink>

              <SearchLink
                data-cy="century"
                className={`button mr-1 ${selectedCenturies.includes('18') ? 'is-info' : ''}`}
                params={{
                  centuries: selectedCenturies.includes('18')
                    ? selectedCenturies.filter(c => c !== '18')
                    : [...selectedCenturies, '18'],
                }}
              >
                18
              </SearchLink>

              <SearchLink
                data-cy="century"
                className={`button mr-1 ${selectedCenturies.includes('19') ? 'is-info' : ''}`}
                params={{
                  centuries: selectedCenturies.includes('19')
                    ? selectedCenturies.filter(c => c !== '19')
                    : [...selectedCenturies, '19'],
                }}
              >
                19
              </SearchLink>

              <SearchLink
                data-cy="century"
                className={`button mr-1 ${selectedCenturies.includes('20') ? 'is-info' : ''}`}
                params={{
                  centuries: selectedCenturies.includes('20')
                    ? selectedCenturies.filter(c => c !== '20')
                    : [...selectedCenturies, '20'],
                }}
              >
                20
              </SearchLink>
            </div>

            <div className="level-right ml-4">
              <SearchLink
                data-cy="centuryALL"
                className={`button is-success ${selectedCenturies.length === 0 ? '' : 'is-outlined'}`}
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
            params={{ sex: null, query: null, centuries: null }}
          >
            Reset all filters
          </SearchLink>
        </div>
      </nav>
    </>
  );
};
