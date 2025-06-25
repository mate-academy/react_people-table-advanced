import cn from 'classnames';
import { SetURLSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

interface Props {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

const SEX_FILTERS = [
  { label: 'All', value: '' },
  { label: 'Male', value: 'm' },
  { label: 'Female', value: 'f' },
];

const CENTURY_FILTERS = [16, 17, 18, 19, 20];

export const PeopleFilters = ({ searchParams, setSearchParams }: Props) => {
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  }

  function getCenturyParams(century: number) {
    const centuryStr = century.toString();
    const hasCentury = selectedCenturies.includes(centuryStr);

    const newListOfCenturies = hasCentury
      ? selectedCenturies.filter(selectedCent => selectedCent !== centuryStr)
      : [...selectedCenturies, centuryStr];

    return { centuries: newListOfCenturies };
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {SEX_FILTERS.map(({ label, value }) => (
          <SearchLink
            params={{ sex: value }}
            key={label}
            className={cn({ 'is-active': sex === value })}
          >
            {label}
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
            onChange={event => handleQueryChange(event)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURY_FILTERS.map(century => {
              const hasCentury = selectedCenturies.includes(century + '');

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={cn('button mr-1', { 'is-info': hasCentury })}
                  params={getCenturyParams(century)}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': searchParams.getAll('centuries').length,
              })}
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
            query: null,
            sex: null,
            centuries: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
