import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const century = searchParams.getAll('century') || [];

  const getCentury = ['16', '17', '18', '19', '20'];

  const getActiveClass = (filt: string) => (sex === filt ? 'is-active' : '');

  const setSearchWith = (params: {
    query?: string | null;
    century?: string[] | null;
  }) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  function handleCenturyChange(cn: string) {
    const newCentury = century.includes(cn)
      ? century.filter(cen => cen !== cn)
      : [...century, cn];

    setSearchWith({ century: newCentury });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={{ sex: null }} className={getActiveClass('')}>
          All
        </SearchLink>
        <SearchLink className={getActiveClass('m')} params={{ sex: 'm' }}>
          Male
        </SearchLink>
        <SearchLink className={getActiveClass('f')} params={{ sex: 'f' }}>
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            onChange={handleQueryChange}
            data-cy="NameFilter"
            type="search"
            className="input"
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
            {getCentury.map(cent => (
              <a
                key={cent}
                onClick={() => handleCenturyChange(cent)}
                data-cy="century"
                className={`button mr-1 ${
                  century.includes(cent) ? 'is-info' : ''
                }`}
              >
                {cent}
              </a>
            ))}
          </div>
          <div className="level-right ml-4">
            <SearchLink
              params={{ century: null }}
              data-cy="centuryALL"
              className={`button is-success ${!!century.length && 'is-outlined'}`}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ query: null, century: null, sex: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
