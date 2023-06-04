import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const letters = searchParams.getAll('letters') || [];
  const sexArray = ['All', 'Male', 'Female'];
  const centuryArray = ['16', '17', '18', '19', '20'];

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  const onSelectSex = (element: string) => {
    switch (element) {
      case 'Female':
        return 'f';
      case 'Male':
        return 'm';
      default:
        return null;
    }
  };

  return (
    <>
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          {sexArray.map(elem => (
            <SearchLink
              key={elem}
              className={classNames({ 'is-active': sex === onSelectSex(elem) })}
              params={{ sex: onSelectSex(elem) }}
            >
              {elem}
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
              onChange={onQueryChange}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              {centuryArray.map(letter => (
                <SearchLink
                  key={letter}
                  data-cy="century"
                  className={classNames(
                    'button mr-1', { 'is-info': letters.includes(letter) },
                  )}
                  params={{
                    letters: letters.includes(letter)
                      ? letters.filter(l => l !== letter)
                      : [...letters, letter],
                  }}
                >
                  {letter}
                </SearchLink>
              ))}
            </div>

            <div className="level-right ml-4">
              <SearchLink
                data-cy="centuryALL"
                className={classNames(
                  'button is-success', { 'is-outlined': letters.length },
                )}
                params={{ letters: [] }}
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
              sex: null,
              query: null,
              letters: [],
            }}
          >
            Reset all filters
          </SearchLink>
        </div>
      </nav>
    </>
  );
};
