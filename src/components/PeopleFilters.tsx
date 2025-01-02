import { useSearchParams } from 'react-router-dom';
import { SexFilter, centuries } from '../utils/filterHelpers';
import cn from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (key: string, value: string[] | string | null) => {
    const newParams = new URLSearchParams(searchParams);

    if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(v => newParams.append(key, v));
    } else if (value) {
      newParams.set(key, value);
    }

    setSearchParams(newParams);
  };

  const sex = searchParams.get('sex');
  const activeCenturies = searchParams.getAll('centuries');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={cn({ 'is-active': sex === SexFilter.All })}
          href="#/people"
          onClick={event => {
            event.preventDefault();
            updateSearchParams('sex', SexFilter.All);
          }}
        >
          All
        </a>
        <a
          className={cn({ 'is-active': sex === SexFilter.Male })}
          href="#/people?sex=m"
          onClick={event => {
            event.preventDefault();
            updateSearchParams('sex', SexFilter.Male);
          }}
        >
          Male
        </a>
        <a
          className={cn({ 'is-active': sex === SexFilter.Female })}
          href="#/people?sex=f"
          onClick={event => {
            event.preventDefault();
            updateSearchParams('sex', SexFilter.Female);
          }}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchParams.get('query') || ''}
            onChange={event =>
              updateSearchParams('query', event.target.value || null)
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
            {centuries.map(century => (
              <a
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': activeCenturies.includes(century),
                })}
                href={`#/people?centuries=${century}`}
                onClick={e => {
                  e.preventDefault();
                  const updatedCenturies = activeCenturies.includes(century)
                    ? activeCenturies.filter(c => c !== century)
                    : [...activeCenturies, century];

                  updateSearchParams(
                    'centuries',
                    updatedCenturies.length ? updatedCenturies : [],
                  );
                }}
              >
                {century}
              </a>
            ))}
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
