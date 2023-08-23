import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || 'all';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const handleCenturiesChange = (ch: string) => {
    if (ch === 'all') {
      return { centuries: [] };
    }

    if (centuries.includes(ch)) {
      return { centuries: centuries.filter(century => century !== ch) };
    }

    return { centuries: [...centuries, ch] };
  };

  const handleSexChange = (param: string) => {
    if (param === 'all') {
      return ({ sex: null });
    }

    if (param === 'f') {
      return ({ sex: 'f' });
    }

    if (param === 'm') {
      return ({ sex: 'm' });
    }

    return ({ sex: null });
  };

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={handleSexChange('all')}
          className={classNames(
            { 'is-active': sex === 'all' },
          )}
        >
          All
        </SearchLink>
        <SearchLink
          params={handleSexChange('m')}
          className={classNames(
            { 'is-active': sex === 'm' },
          )}
        >
          Male
        </SearchLink>
        <SearchLink
          params={handleSexChange('f')}
          className={classNames(
            { 'is-active': sex === 'f' },
          )}
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
            <SearchLink
              params={handleCenturiesChange('16')}
              className={classNames(
                'button',
                'mr-1',
                { 'is-info': centuries.includes('16') },
              )}
              data-cy="century"
            >
              16
            </SearchLink>
            <SearchLink
              params={handleCenturiesChange('17')}
              className={classNames(
                'button',
                'mr-1',
                { 'is-info': centuries.includes('17') },
              )}
              data-cy="century"
            >
              17
            </SearchLink>
            <SearchLink
              params={handleCenturiesChange('18')}
              className={classNames(
                'button',
                'mr-1',
                { 'is-info': centuries.includes('18') },
              )}
              data-cy="century"
            >
              18
            </SearchLink>
            <SearchLink
              params={handleCenturiesChange('19')}
              className={classNames(
                'button',
                'mr-1',
                { 'is-info': centuries.includes('19') },
              )}

            >
              19
            </SearchLink>
            <SearchLink
              params={handleCenturiesChange('20')}
              className={classNames(
                'button',
                'mr-1',
                { 'is-info': centuries.includes('20') },
              )}
              data-cy="century"
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={handleCenturiesChange('all')}
              className={classNames(
                'button',
                'is-success',
                { 'is-outlined': centuries.length > 0 },
              )}
              data-cy="centuryALL"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          data-cy="centuryALL"
          params={{ sex: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
