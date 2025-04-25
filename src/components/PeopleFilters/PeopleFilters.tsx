import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleCentury = (value: string) => {
    const current = searchParams.getAll('centuries');
    const updated = current.includes(value)
      ? current.filter(c => c !== value)
      : [...current, value];

    return { centuries: updated };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className="is-active"
          params={{ sex: null }}
          onClick={() => {}}
        >
          All
        </SearchLink>
        <SearchLink className="" params={{ sex: 'm' }}>
          Male
        </SearchLink>
        <SearchLink className="" params={{ sex: 'f' }}>
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            onChange={event => {
              setSearchParams(prev => {
                prev.set('query', event.target.value);

                if (prev.get('query') === '') {
                  prev.delete('query');
                }

                return prev;
              });
            }}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchParams.get('query')?.toString()}
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
              className="button mr-1"
              params={toggleCentury('16')}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className="button mr-1 is-info"
              params={toggleCentury('17')}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className="button mr-1 is-info"
              params={toggleCentury('18')}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className="button mr-1 is-info"
              params={toggleCentury('19')}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className="button mr-1"
              params={toggleCentury('20')}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
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
