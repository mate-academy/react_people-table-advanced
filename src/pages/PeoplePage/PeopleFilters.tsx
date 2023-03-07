import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../../utils/SearchLink';

const centuriesValues = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSarchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const quaryUpdateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSarchParams(
      getSearchWith(searchParams, { query: e.target.value || null }),
    );
  };

  const SexFilterLinks = (sexType: string | null) => [
    {
      name: 'All',
      sex: null,
      isActive: !sexType,
    },
    {
      name: 'Male',
      sex: 'm',
      isActive: sexType === 'm',
    },
    {
      name: 'Female',
      sex: 'f',
      isActive: sexType === 'f',
    },
  ];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {SexFilterLinks(sex).map(({ name, sex: value, isActive }) => (
          <SearchLink
            key={name}
            params={{ sex: value }}
            className={classNames({ 'is-active': isActive })}
          >
            {name}
          </SearchLink>
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
            onChange={quaryUpdateHandler}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesValues.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(c => c !== century)
                    : [...centuries, century],
                }}
                className={classNames(
                  'button mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                { 'is-outlined': !!centuries.length },
              )}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            centuries: null,
            sex: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
