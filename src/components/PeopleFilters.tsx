import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Centuries, PersonSex } from '../types/Filters';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const nameQuery = searchParams.get('query') || '';
  const filterSex = searchParams.get('sex') || null;

  const filterCentury = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    const params = new URLSearchParams(searchParams);

    params.set('query', value);
    setSearchParams(params);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const getCenturies = (century: Centuries) => {
    const centuries = searchParams.getAll('centuries');

    if (centuries.includes(century)) {
      return centuries.filter(c => c !== century);
    }

    return [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': filterSex === null })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': filterSex === PersonSex.Male })}
          params={{ sex: PersonSex.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': filterSex === PersonSex.Female })}
          params={{ sex: PersonSex.Female }}
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
            onChange={handleQueryChange}
            value={nameQuery}
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
              className={cn('button mr-1', {
                'is-info': filterCentury.includes(Centuries.C16),
              })}
              params={{ centuries: getCenturies(Centuries.C16) }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': filterCentury.includes(Centuries.C17),
              })}
              params={{ centuries: getCenturies(Centuries.C17) }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': filterCentury.includes(Centuries.C18),
              })}
              params={{ centuries: getCenturies(Centuries.C18) }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': filterCentury.includes(Centuries.C19),
              })}
              params={{ centuries: getCenturies(Centuries.C19) }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': filterCentury.includes(Centuries.C20),
              })}
              params={{ centuries: getCenturies(Centuries.C20) }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': searchParams.get('centuries'),
              })}
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
