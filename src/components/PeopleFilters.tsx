import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { Gender } from '../types/gender';

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  sex: string;
  query: string;
  centuries: string[];
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  sex,
  setSearchParams,
  query,
  centuries,
}) => {
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  };

  const activeCenturies = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === Gender.male })}
          params={{ sex: Gender.male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === Gender.female })}
          params={{ sex: Gender.female }}
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
            {activeCenturies.map(num => (
              <SearchLink
                key={num}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(num),
                })}
                params={{
                  centuries: centuries.includes(num)
                    ? centuries.filter(n => n !== num)
                    : [...centuries, num],
                }}
              >
                {num}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
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
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
