import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const getSexClass = (value: string | null) =>
    sex === value ? 'is-active' : '';

  const getCenturyClass = (value: string) =>
    centuries.includes(value) ? 'is-info' : '';

  const getCenturyParams = (century: string) => {
    if (centuries.includes(century)) {
      return {
        centuries: centuries.filter(item => item !== century),
      };
    }

    return {
      centuries: [...centuries, century],
    };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={{ sex: null }} className={getSexClass(null)}>
          All
        </SearchLink>
        <SearchLink params={{ sex: 'm' }} className={getSexClass('m')}>
          Male
        </SearchLink>
        <SearchLink params={{ sex: 'f' }} className={getSexClass('f')}>
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
            onChange={event =>
              setSearchParams(
                getSearchWith(searchParams, {
                  query: event.target.value || null,
                }),
              )
            }
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
              className={`button mr-1 ${getCenturyClass('16')}`}
              params={getCenturyParams('16')}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={`button mr-1 ${getCenturyClass('17')}`}
              params={getCenturyParams('17')}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={`button mr-1 ${getCenturyClass('18')}`}
              params={getCenturyParams('18')}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={`button mr-1 ${getCenturyClass('19')}`}
              params={getCenturyParams('19')}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={`button mr-1 ${getCenturyClass('20')}`}
              params={getCenturyParams('20')}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={`button is-success ${centuries.length > 0 ? 'is-outlined' : ''}`}
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
            sex: null,
            query: null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
