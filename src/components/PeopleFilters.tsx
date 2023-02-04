import {
  FC,
  memo,
  useRef,
  useCallback,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { debounce } from '../utils/debounce';

type Props = {
  centuries: string[];
};

export const PeopleFilters: FC<Props> = memo(({ centuries }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useRef<HTMLInputElement>(null);
  const sex = searchParams.get('sex');
  const currentCenturies = searchParams.getAll('centuries');

  const debouncedSetQuery = useCallback(
    debounce((newQuery: string) => {
      searchParams.set('query', newQuery);
      setSearchParams(searchParams);
    }, 300),
    [searchParams, setSearchParams],
  );

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': !sex,
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === 'm',
          })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === 'f',
          })}
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
            ref={query}
            defaultValue={searchParams.get('query') || ''}
            onChange={e => {
              debouncedSetQuery(e.target.value);
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
            {centuries.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames(
                  'button mr-1',
                  { 'is-info': currentCenturies?.includes(century) },
                )}
                params={{
                  centuries: currentCenturies.includes(century)
                    ? currentCenturies.filter(cent => cent !== century)
                    : [...currentCenturies, century],
                }}
              >
                { century }
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button is-outlined',
                { 'is-success': !currentCenturies.length },
              )}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={() => {
            if (query.current) {
              query.current.value = '';
            }
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
});
