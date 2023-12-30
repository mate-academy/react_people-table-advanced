import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import { Sex } from '../../types/Sex';

const CENTURIES_ARRAY = [16, 17, 18, 19, 20];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    if (!event.target.value.length) {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  }

  function toggleCentury(newCentury: string) {
    const params = new URLSearchParams(searchParams);
    const newCenturies = centuries.includes(String(newCentury))
      ? centuries.filter(century => century !== newCentury)
      : [...centuries, newCentury];

    params.delete('centuries');
    newCenturies.forEach(century => params.append('centuries', century));
    setSearchParams(params);
  }

  const isActivatedFilter = (century: number) => {
    const selectedCenturies = searchParams.getAll('centuries');

    return selectedCenturies.includes(String(century));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames(
            { 'is-active': searchParams.get('sex') === null },
          )}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames(
            { 'is-active': searchParams.get('sex') === Sex.MALE },
          )}
          params={{ sex: Sex.MALE }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames(
            { 'is-active': searchParams.get('sex') === Sex.FEMALE },
          )}
          params={{ sex: Sex.FEMALE }}
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
            value={query}
            placeholder="Search"
            onChange={(input) => handleQueryChange(input)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES_ARRAY.map(century => (
              <a
                key={century}
                data-cy="century"
                className={classNames('button mr-1',
                  { 'is-info': isActivatedFilter(century) })}
                href={`#/people?centuries=${century}`}
                onClick={(event) => {
                  event.preventDefault();
                  toggleCentury(String(century));
                }}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success',
                { 'is-outlined': centuries.length })}
              params={{ centuries: [] }}
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
