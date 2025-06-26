import classNames from 'classnames';
import { SearchLink } from '../../../../components/SearchLink';
import { useSearchParams } from 'react-router-dom';

const SEX_FILTER_LINKS = [
  { id: 1, title: 'All', sex: null },
  { id: 2, title: 'Male', sex: 'm' },
  { id: 3, title: 'Female', sex: 'f' },
];

const CENTURIES_FILTER_LINKS = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trimStart();

    if (value) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {SEX_FILTER_LINKS.map(link => (
          <SearchLink
            key={link.id}
            params={{ sex: link.sex }}
            className={classNames({ 'is-active': sex === link.sex })}
          >
            {link.title}
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
            {CENTURIES_FILTER_LINKS.map(link => (
              <SearchLink
                key={link}
                params={{
                  centuries: centuries.includes(link)
                    ? centuries.filter(c => c !== link)
                    : [...centuries, link],
                }}
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(link),
                })}
              >
                {link}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': centuries.length > 0,
              })}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          data-cy="centuryALL"
          className={classNames('button', 'is-link', 'is-fullwidth', {
            'is-outlined': centuries.length > 0,
          })}
          params={{ query: null, sex: null, centuries: [] }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
