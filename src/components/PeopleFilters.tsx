import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('century') || [];

  const centuriesList = ['16', '17', '18', '19', '20'];

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = getSearchWith(searchParams, {
      query: event.target.value,
    });

    setSearchParams(newSearchParams);
  };

  const showCenturies = centuriesList.map(cent => (
    <SearchLink
      key={cent}
      data-cy="century"
      className={cn('button mr-1', {
        'is-active': centuries.includes(cent),
      })}
      params={{
        century: centuries.includes(cent)
          ? centuries.filter(c => c !== cent)
          : [...centuries, cent],
      }}
    >
      {cent}
    </SearchLink>
  ));

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink className={cn({ 'is-active': !sex })} params={{ sex: '' }}>
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === 'f' })}
          params={{ sex: 'f' }}
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
            onChange={handleChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">{showCenturies}</div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length,
              })}
              params={{ century: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, century: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
