import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { PersonSex } from '../types/Filters';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const centuries = ['16', '17', '18', '19', '20'];

  const nameQuery = searchParams.get('query') || '';
  const filterSex = searchParams.get('sex') || null;
  const filterCentury = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const getCenturies = (century: string) => {
    if (filterCentury.includes(century)) {
      return filterCentury.filter(c => c !== century);
    }

    return [...filterCentury, century];
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
            {centuries.map(century => (
              <SearchLink
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': filterCentury.includes(century),
                })}
                params={{ centuries: getCenturies(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': searchParams.get('centuries'),
              })}
              to="#/people"
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="#/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
