import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') ?? 'all';
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);

    return searchParams;
  };

  const toggleCenturiesList = (newCentury: string) => {
    if (centuries.includes(newCentury)) {
      return centuries.filter(value => value !== newCentury);
    } else {
      return [...centuries, newCentury];
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: 'all' }}
          className={classNames({
            'is-active': sex === 'all',
          })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({
            'is-active': sex === 'm',
          })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({
            'is-active': sex === 'f',
          })}
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
            onChange={event => handleQueryChange(event)}
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
              params={{ centuries: toggleCenturiesList('16') }}
              className={classNames('button mr-1', {
                'is-info': centuries.includes('16'),
              })}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              params={{ centuries: toggleCenturiesList('17') }}
              className={classNames('button mr-1', {
                'is-info': centuries.includes('17'),
              })}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              params={{ centuries: toggleCenturiesList('18') }}
              className={classNames('button mr-1', {
                'is-info': centuries.includes('18'),
              })}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              params={{ centuries: toggleCenturiesList('19') }}
              className={classNames('button mr-1', {
                'is-info': centuries.includes('19'),
              })}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              params={{ centuries: toggleCenturiesList('20') }}
              className={classNames('button mr-1', {
                'is-info': centuries.includes('20'),
              })}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="century"
              params={{ centuries: [] }}
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
