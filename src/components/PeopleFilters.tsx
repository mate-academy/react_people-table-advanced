import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  function addFiltersMale() {
    return { sex: 'm' };
  }

  function addFiltersFemale() {
    return { sex: 'f' };
  }

  function addFiltersAllSex() {
    return { sex: null };
  }

  function addCenturies(century: string) {
    let centuryArray = searchParams.getAll('centuries') || [];

    if (centuryArray.includes(century)) {
      centuryArray.splice(centuries.indexOf(century), 1);
    } else {
      centuryArray = [...centuryArray, century];
    }

    return { centuries: centuryArray };
  }

  const params = new URLSearchParams(searchParams);

  function searchFilter(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      params.delete('query');
    } else {
      params.set('query', e.target.value);
    }

    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">

        <SearchLink
          className={classNames({ 'is-active': (sex !== 'm' && sex !== 'f') })}
          params={addFiltersAllSex()}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': sex === 'm' })}
          params={addFiltersMale()}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': sex === 'f' })}
          params={addFiltersFemale()}
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
            onChange={(e) => searchFilter(e)}
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
                classNames(
                  'button mr-1', { 'is-info': centuries.includes('16') },
                )
              }
              params={addCenturies('16')}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={
                classNames(
                  'button mr-1', { 'is-info': centuries.includes('17') },
                )
              }
              params={addCenturies('17')}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={
                classNames(
                  'button mr-1', { 'is-info': centuries.includes('18') },
                )
              }
              params={addCenturies('18')}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={
                classNames(
                  'button mr-1', { 'is-info': centuries.includes('19') },
                )
              }
              params={addCenturies('19')}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={
                classNames(
                  'button mr-1', { 'is-info': centuries.includes('20') },
                )
              }
              params={addCenturies('20')}
            >
              20
            </SearchLink>
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
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="/people"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
