import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import { SearchParams, getSearchWith } from '../../utils/searchHelper';

enum ESexFilter {
  Male = 'm',
  Female = 'f',
}

const centuries: string[] = ['16', '17', '18', '19', '20'];

type TGender = string | null;

const getGenderLinkStyle = (gender: TGender, sexParam: TGender) => (
  classNames({ 'is-active': gender === sexParam })
);

const getCenturiesLinkStyle = (centery: string, centuriesParam: string[]) => (
  classNames('button', 'mr-1', {
    'is-info': centuriesParam.includes(centery),
  })
);

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sexParam = searchParams.get('sex');
  const queryParam = searchParams.get('query') ?? '';
  const centuriesParam = searchParams.getAll('centuries') ?? [];

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleSearchFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const toggleCentries = (centery: string) => {
    const newCenturies = centuriesParam.includes(centery)
      ? centuriesParam.filter(cent => cent !== centery)
      : [...centuriesParam, centery];

    return newCenturies;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={getGenderLinkStyle(null, sexParam)}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: ESexFilter.Male }}
          className={getGenderLinkStyle(ESexFilter.Male, sexParam)}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: ESexFilter.Female }}
          className={getGenderLinkStyle(ESexFilter.Female, sexParam)}
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
            value={queryParam}
            onChange={handleSearchFilter}
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map((centery) => (
              <SearchLink
                key={centery}
                data-cy="century"
                className={getCenturiesLinkStyle(centery, centuriesParam)}
                params={{ centuries: toggleCentries(centery) }}
              >
                {centery}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': centuriesParam.length,
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
          className="button is-link is-outlined is-fullwidth"
          params={{
            centuries: [],
            query: null,
            sex: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
