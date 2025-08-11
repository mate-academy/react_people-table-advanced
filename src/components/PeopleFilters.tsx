import cn from 'classnames';
import { SexType } from '../types/SexType';
import { SearchLink } from './SearchLink';

type Props = {
  query: string;
  sex: SexType;
  centuries: string[];
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // handleSexChange: (sex: SexType) => void;
  // toggleCenturies: (ch: string) => void;
};

export const PeopleFilters: React.FC<Props> = props => {
  const { query, sex, centuries, handleQueryChange } = props;

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': sex === SexType.All })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: SexType.Male }}
          className={cn({ 'is-active': sex === SexType.Male })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: SexType.Female }}
          className={cn({ 'is-active': sex === SexType.Female })}
        >
          Female
        </SearchLink>
      </p>

      {/* <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(SexType).map(sexOption => (
          <SearchLink
            key={sexOption}
            params={{ sex: sexOption === SexType.All ? null : sexOption }}
            className={cn({ 'is-active': sexOption === sex })}
          >
            {sexOption}
          </SearchLink>
        ))}
      </p> */}

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
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(cent => cent !== century)
                    : [...centuries, century],
                }}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ query: '', sex: SexType.All, centuries: [] }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
