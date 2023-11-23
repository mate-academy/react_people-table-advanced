import cn from 'classnames';
import { useSearchParams, Link } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

const SEXES = {
  m: 'Male',
  f: 'Female',
};
const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  // Функція для визначення активності посилання
  const isLinkActive = (param: string | null) => {
    return cn({
      'is-active': sex === param,
    });
  };

  const onSexChange = (newSex: string | null) => {
    if (sex === null) {
      return getSearchWith(searchParams, { newSex: null });
    }

    return getSearchWith(searchParams, { sex: newSex });
  };

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const onCenturiesChange = (century: string | null) => {
    if (century === null) {
      return getSearchWith(searchParams, {
        centuries: null,
      });
    }

    return getSearchWith(searchParams, {
      centuries: centuries.includes(century)
        ? centuries.filter(ch => ch !== century)
        : [...centuries, century],
    });
  };

  const onResetAll = () => {
    return getSearchWith(new URLSearchParams(), {});
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link to={{ search: onSexChange(null) }} className={isLinkActive(null)}>
          All
        </Link>

        {Object.entries(SEXES).map(([param, text]) => (
          <Link
            key={param}
            to={{ search: onSexChange(param) }}
            className={isLinkActive(param)}
          >
            {text}
          </Link>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={onQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                to={{ search: onCenturiesChange(century) }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length,
              })}
              to={{ search: onCenturiesChange(null) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ search: onResetAll() }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
