import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const isCentury16Selected = selectedCenturies.includes('16');
  const centuriesAfterClick16 = isCentury16Selected
    ? selectedCenturies.filter(century => century !== '16')
    : [...selectedCenturies, '16'];

  const isCentury17Selected = selectedCenturies.includes('17');
  const centuriesAfterClick17 = isCentury17Selected
    ? selectedCenturies.filter(century => century !== '17')
    : [...selectedCenturies, '17'];

  const isCentury18Selected = selectedCenturies.includes('18');
  const centuriesAfterClick18 = isCentury18Selected
    ? selectedCenturies.filter(century => century !== '18')
    : [...selectedCenturies, '18'];

  const isCentury19Selected = selectedCenturies.includes('19');
  const centuriesAfterClick19 = isCentury19Selected
    ? selectedCenturies.filter(century => century !== '19')
    : [...selectedCenturies, '19'];

  const isCentury20Selected = selectedCenturies.includes('20');
  const centuriesAfterClick20 = isCentury20Selected
    ? selectedCenturies.filter(century => century !== '20')
    : [...selectedCenturies, '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={sex === null ? 'is-active' : ''}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={sex === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={sex === 'f' ? 'is-active' : ''}
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
            onChange={event => {
              const value = event.target.value;

              setSearchParams(
                getSearchWith(searchParams, {
                  query: value ? value : null,
                }),
              );
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <SearchLink
              data-cy="century"
              className={
                isCentury16Selected ? 'button mr-1 is-info' : 'button mr-1'
              }
              params={{
                centuries:
                  centuriesAfterClick16.length > 0
                    ? centuriesAfterClick16
                    : null,
              }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={
                isCentury17Selected ? 'button mr-1 is-info' : 'button mr-1'
              }
              params={{
                centuries:
                  centuriesAfterClick17.length > 0
                    ? centuriesAfterClick17
                    : null,
              }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={
                isCentury18Selected ? 'button mr-1 is-info' : 'button mr-1'
              }
              params={{
                centuries:
                  centuriesAfterClick18.length > 0
                    ? centuriesAfterClick18
                    : null,
              }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={
                isCentury19Selected ? 'button mr-1 is-info' : 'button mr-1'
              }
              params={{
                centuries:
                  centuriesAfterClick19.length > 0
                    ? centuriesAfterClick19
                    : null,
              }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={
                isCentury20Selected ? 'button mr-1 is-info' : 'button mr-1'
              }
              params={{
                centuries:
                  centuriesAfterClick20.length > 0
                    ? centuriesAfterClick20
                    : null,
              }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={
                selectedCenturies.length === 0
                  ? 'button is-success is-outlined'
                  : 'button is-success'
              }
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
