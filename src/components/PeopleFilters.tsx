import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type CenturyFilterType = {
  centurie: string;
};
const CenturyFilter: React.FC<CenturyFilterType> = ({ centurie }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');

  const handleSetSearchParamsCenturies = (value: string | null) => {
    let toSet = centuries;

    if (centuries.includes(`${value}`)) {
      toSet = centuries.filter(fi => fi !== value);
    } else {
      toSet.push(`${value}`);
    }

    setSearchParams(
      getSearchWith(searchParams, {
        centuries: toSet,
      }),
    );
  };

  return (
    <a
      data-cy="century"
      className={`button mr-1 ${centuries.includes(centurie) && 'is-info'}`}
      onClick={() => handleSetSearchParamsCenturies(centurie)}
    >
      {centurie}
    </a>
  );
};

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const handleSetSearchParamsSexAll = () => {
    setSearchParams(
      getSearchWith(searchParams, {
        sex: null,
      }),
    );
  };

  const handleSetSearchParamsSex = (value: string | null) => {
    setSearchParams(
      getSearchWith(searchParams, {
        sex: value,
      }),
    );
  };

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const toSet = event.target.value.toString().trim();

    setSearchParams(
      getSearchWith(searchParams, {
        query: toSet === '' ? null : toSet,
      }),
    );
  }

  const handleResetSearchAllParams = () => {
    setSearchParams(
      getSearchWith(searchParams, {
        sex: null,
        centuries: null,
        query: null,
      }),
    );
  };

  const handleSetAllCentury = () => {
    setSearchParams(
      getSearchWith(searchParams, {
        centuries: null,
      }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={`${sex === null && 'is-active'}`}
          onClick={() => handleSetSearchParamsSexAll()}
        >
          All
        </a>
        <a
          className={`${sex === 'm' && 'is-active'}`}
          onClick={() => handleSetSearchParamsSex('m')}
        >
          Male
        </a>
        <a
          className={`${sex === 'f' && 'is-active'}`}
          onClick={() => handleSetSearchParamsSex('f')}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query ? query : ''}
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
            <CenturyFilter centurie="16" />
            <CenturyFilter centurie="17" />
            <CenturyFilter centurie="18" />
            <CenturyFilter centurie="19" />
            <CenturyFilter centurie="20" />
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={`button is-success ${centuries.length > 0 && 'is-outlined'}`}
              onClick={() => handleSetAllCentury()}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => handleResetSearchAllParams()}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
