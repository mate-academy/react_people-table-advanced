import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCenturies = searchParams.getAll('centuries');

  const getCenturyParams = (century: string) => {
    const newCenturies = selectedCenturies.includes(century)
      ? selectedCenturies.filter(item => item !== century)
      : [...selectedCenturies, century];

    return {
      centuries: newCenturies.length > 0 ? newCenturies : null,
    };
  };

  const InputHandler = (value: string) => {
    const copy = new URLSearchParams(searchParams);

    copy.set('query', value);
    if (value === '') {
      copy.delete('query');
    }

    setSearchParams(copy);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={searchParams.get('sex') === null ? 'is-active' : ''}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={searchParams.get('query') ?? ''}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={e => {
              InputHandler(e.target.value);
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
                searchParams.getAll('centuries').includes('16')
                  ? 'is-info button mr-1'
                  : 'button mr-1'
              }
              params={getCenturyParams('16')}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={
                searchParams.getAll('centuries').includes('17')
                  ? 'is-info button mr-1'
                  : 'button mr-1'
              }
              params={getCenturyParams('17')}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={
                searchParams.getAll('centuries').includes('18')
                  ? 'is-info button mr-1'
                  : 'button mr-1'
              }
              params={getCenturyParams('18')}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={
                searchParams.getAll('centuries').includes('19')
                  ? 'is-info button mr-1'
                  : 'button mr-1'
              }
              params={getCenturyParams('19')}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={
                searchParams.getAll('centuries').includes('20')
                  ? 'is-info button mr-1'
                  : 'button mr-1'
              }
              params={getCenturyParams('20')}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={
                searchParams.getAll('centuries').length === 0
                  ? 'is-success button'
                  : 'is-success is-outlined button'
              }
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
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
