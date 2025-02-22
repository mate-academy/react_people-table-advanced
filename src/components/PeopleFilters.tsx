import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

type Params = {
  [key: string]: string | null;
};

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setSearchWidth(params: Params) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWidth({ query: e.target.value || null });
  };

  const toggleCenturies = (ct: string) => {
    const newCentr = centuries.includes(ct)
      ? centuries.filter(century => century !== ct)
      : [...centuries, ct];

    return { centuries: newCentr };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': sex === '' })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'f' })}
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
            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('16'),
              })}
              params={toggleCenturies('16')}
            >
              16
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('17'),
              })}
              params={toggleCenturies('17')}
            >
              17
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('18'),
              })}
              params={toggleCenturies('18')}
            >
              18
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('19'),
              })}
              params={toggleCenturies('19')}
            >
              19
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('20'),
              })}
              params={toggleCenturies('20')}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="century"
              className={classNames('button is-success', {
                'is-outlined': !(centuries.length === 0),
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ query: null, sex: null, centuries: null }}
          className={classNames('button is-link is-fullwidth', {
            'is-outlined': centuries.length === 0 && !query && !sex,
          })}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
