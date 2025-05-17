import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  //variables for conditional classnames
  const activeCenturies = searchParams.getAll('centuries');
  const activeSex = searchParams.get('sex');

  /**
   *Function that toggle century search params
   * @param value
   * @returns string[]
   */
  const toggleCentury = (value: string) => {
    const current = searchParams.getAll('centuries');
    const updated = current.includes(value)
      ? current.filter(c => c !== value)
      : [...current, value];

    return { centuries: updated };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': activeSex === null })}
          params={{ sex: null }}
          onClick={() => {}}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': activeSex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': activeSex === 'f' })}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            onChange={event => {
              setSearchParams(prev => {
                prev.set('query', event.target.value);

                if (prev.get('query') === '') {
                  prev.delete('query');
                }

                return prev;
              });
            }}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchParams.get('query')?.toString() || ''}
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
              className={classNames('button', 'mr-1', {
                'is-info': activeCenturies.includes('16'),
              })}
              params={toggleCentury('16')}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': activeCenturies.includes('17'),
              })}
              params={toggleCentury('17')}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': activeCenturies.includes('18'),
              })}
              params={toggleCentury('18')}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': activeCenturies.includes('19'),
              })}
              params={toggleCentury('19')}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': activeCenturies.includes('20'),
              })}
              params={toggleCentury('20')}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button', {
                'is-success': activeCenturies.length === 0,
                'is-outlined': activeCenturies.length > 0,
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
            centuries: null,
            sex: null,
            query: null,
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
