import { useNavigate, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const navigate = useNavigate();
  const [
    searchParams,
  ] = useSearchParams();

  const onSetQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = {
      query: event.target.value || null,
    };

    navigate({ search: getSearchWith(searchParams, newQuery) });
  };

  const currentCentury = searchParams.getAll('centuries');
  const currentSex = searchParams.get('sex');
  const currentQuery = searchParams.get('query');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn(
            { 'is-active': currentSex === null },
          )}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={cn(
            { 'is-active': currentSex === 'm' },
          )}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={cn(
            { 'is-active': currentSex === 'f' },
          )}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={currentQuery || ''}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={onSetQuery}
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
              params={{ centuries: '16' }}
              data-cy="century"
              className={cn(
                'button mr-1',
                { 'is-info': currentCentury.includes('16') },
              )}
            >
              16
            </SearchLink>

            <SearchLink
              params={{ centuries: '17' }}
              data-cy="century"
              className={cn(
                'button mr-1',
                { 'is-info': currentCentury.includes('17') },
              )}
            >
              17
            </SearchLink>

            <SearchLink
              params={{ centuries: '18' }}
              data-cy="century"
              className={cn(
                'button mr-1',
                { 'is-info': currentCentury.includes('18') },
              )}
            >
              18
            </SearchLink>

            <SearchLink
              params={{ centuries: '19' }}
              data-cy="century"
              className={cn(
                'button mr-1',
                { 'is-info': currentCentury.includes('19') },
              )}
            >
              19
            </SearchLink>

            <SearchLink
              params={{ centuries: '20' }}
              data-cy="century"
              className={cn(
                'button mr-1',
                { 'is-info': currentCentury.includes('20') },
              )}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={cn(
                'button is-success',
                { 'is-outlined': currentCentury.length },
              )}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            centuries: null,
            query: null,
            sex: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
