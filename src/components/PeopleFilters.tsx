import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSex = searchParams.get('sex') || '';
  const currentQuery = searchParams.get('query') || '';
  const currentCenturies = searchParams.getAll('centuries') || [];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value === '') {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  };

  const handleCenturiesChange = (str: string) => {
    const newCenturies = currentCenturies.includes(str)
      ? currentCenturies.filter(century => century !== str)
      : [...currentCenturies, str];

    const params =
      newCenturies.length > 0
        ? { centuries: newCenturies }
        : { centuries: null };

    return params;
  };

  const isActiveCentury = (str: string) => {
    return searchParams.getAll('centuries').includes(str);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={currentSex === '' ? 'is-active' : ''}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={currentSex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={currentSex === 'f' ? 'is-active' : ''}
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
            value={currentQuery}
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
            <SearchLink
              params={handleCenturiesChange('16')}
              data-cy="century"
              className={
                isActiveCentury('16') ? 'button mr-1 is-active' : 'button mr-1'
              }
            >
              16
            </SearchLink>

            <SearchLink
              params={handleCenturiesChange('17')}
              data-cy="century"
              className={
                isActiveCentury('17') ? 'button mr-1 is-active' : 'button mr-1'
              }
            >
              17
            </SearchLink>

            <SearchLink
              params={handleCenturiesChange('18')}
              data-cy="century"
              className={
                isActiveCentury('18') ? 'button mr-1 is-active' : 'button mr-1'
              }
            >
              18
            </SearchLink>

            <SearchLink
              params={handleCenturiesChange('19')}
              data-cy="century"
              className={
                isActiveCentury('19') ? 'button mr-1 is-active' : 'button mr-1'
              }
            >
              19
            </SearchLink>

            <SearchLink
              params={handleCenturiesChange('20')}
              data-cy="century"
              className={
                isActiveCentury('20') ? 'button mr-1 is-active' : 'button mr-1'
              }
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className="button is-success is-outlined"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ sex: null, query: null, centuries: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
