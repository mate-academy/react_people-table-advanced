import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getCenturiesParams = (sortName: string | null): SearchParams => {
    const arrParams: string[] | null
    = [...searchParams.getAll('centuries')];

    if (!sortName) {
      return { centuries: null };
    }

    if (!arrParams.includes(sortName)) {
      arrParams.push(sortName);

      return { centuries: arrParams };
    }

    arrParams.splice(arrParams.indexOf(sortName), 1);

    return { centuries: arrParams };
  };

  const getPersonalParams = (value:string | null) => {
    return { sex: value };
  };

  const resetAllFilters = () => {
    return {
      ...getCenturiesParams(null),
      sex: null,
      query: null,
    };
  };

  const setIsActiveButton = (param: string) => {
    return searchParams.getAll('centuries').includes(param);
  };

  const setQuerySearchParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!searchParams.has('query')) {
      searchParams.append('query', e.target.value);
      setSearchParams(searchParams);

      return;
    }

    searchParams.set('query', e.target.value);
    setSearchParams(searchParams);

    if (!e.target.value) {
      searchParams.delete('query');
      setSearchParams(searchParams);
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames(
            { 'is-active': !searchParams.get('sex') },
          )}
          params={getPersonalParams(null)}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames(
            { 'is-active': searchParams.get('sex') === 'm' },
          )}
          params={getPersonalParams('m')}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames(
            { 'is-active': searchParams.get('sex') === 'f' },
          )}
          params={getPersonalParams('f')}
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
            value={searchParams.get('query') || ''}
            onChange={(e) => setQuerySearchParams(e)}
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
              className={classNames(
                'button mr-1',
                { 'is-info': setIsActiveButton('16') },
              )}
              params={getCenturiesParams('16')}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames(
                'button mr-1',
                { 'is-info': setIsActiveButton('17') },
              )}
              params={getCenturiesParams('17')}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames(
                'button mr-1',
                { 'is-info': setIsActiveButton('18') },
              )}
              params={getCenturiesParams('18')}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames(
                'button mr-1',
                { 'is-info': setIsActiveButton('19') },
              )}
              params={getCenturiesParams('19')}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames(
                'button mr-1',
                { 'is-info': setIsActiveButton('20') },
              )}
              params={getCenturiesParams('20')}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                { 'is-outlined': searchParams.getAll('centuries').length },
              )}
              params={getCenturiesParams(null)}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={resetAllFilters()}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
