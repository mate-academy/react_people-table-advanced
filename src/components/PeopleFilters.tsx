import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

enum SexFilter {
  male = 'm',
  female = 'f',
}

const centuries: string[] = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';
  const centuriesParam = searchParams.getAll('century') || [];

  const queryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = getSearchWith(
      searchParams, { query: e.target.value ? e.target.value : null },
    );

    setSearchParams(params);
  };

  const toggleCentury = (century: string) => {
    const newCenturiesParam = centuriesParam.includes(century)
      ? centuriesParam.filter(cent => cent !== century)
      : [...centuriesParam, century];

    return newCenturiesParam;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className="is-active"
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className=""
          params={{ sex: SexFilter.male }}
        >
          Male
        </SearchLink>

        <SearchLink
          className=""
          params={{ sex: SexFilter.female }}
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
            value={queryParam}
            onChange={queryChangeHandler}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map((century) => (
              <SearchLink
                key={century}
                data-cy="century"
                className="button mr-1"
                params={{ centuries: toggleCentury(century) }}
              >
                {century}
              </SearchLink>
            ))}
            {/* <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=16"
            >
              16
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=17"
            >
              17
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=18"
            >
              18
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=19"
            >
              19
            </a>

            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=20"
            >
              20
            </a> */}
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
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
