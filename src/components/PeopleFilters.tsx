import classNames from 'classnames';
import {
  useQueryParams,
  StringParam,
  withDefault,
  ArrayParam,
} from 'use-query-params';

import { SexEnum } from '../types/SexEnum';

const MyFiltersParam = withDefault(ArrayParam, []);

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useQueryParams({
    sex: StringParam,
    century: MyFiltersParam,
    query: StringParam,
  });

  const { century, sex, query } = searchParams;

  const handleCenturyFilter = (
    cent: string | null,
  ) => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    if (!cent) {
      setSearchParams({
        century: undefined,
      });

      return;
    }

    if (!century.includes(cent as never)) {
      setSearchParams({
        century: [...century, cent],
      });

      return;
    }

    setSearchParams({
      century: century.filter(c => c !== cent),
    });
  };

  const handleSexChange = (
    newSex: string | null,
  ) => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    if (!newSex) {
      setSearchParams({
        sex: undefined,
      });

      return;
    }

    setSearchParams({
      sex: newSex,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/[^a-zA-Z\s\u0400-\u04FF]/gu, '');

    setSearchParams({
      query: value || null,
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames(
            { 'is-active': !sex },
          )}
          href="#/people"
          onClick={handleSexChange(null)}
        >
          All
        </a>
        <a
          href="#/people?sex=m"
          onClick={handleSexChange(SexEnum.Man)}
          className={classNames(
            { 'is-active': sex === SexEnum.Man },
          )}
        >
          Male
        </a>
        <a
          className={classNames(
            { 'is-active': sex === SexEnum.Woman },
          )}
          href="#/people?sex=f"
          onClick={handleSexChange(SexEnum.Woman)}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            onChange={handleInputChange}
            value={query || ''}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(String).map(value => (
              <a
                key={value}
                data-cy="century"
                className={classNames(
                  'button mr-1',
                  { 'is-info': century.includes(value as never) },
                )}
                href={`#/people?centuries=${value}`}
                onClick={handleCenturyFilter(value)}
              >
                {value}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                { 'is-outlined': century.length !== 0 },
              )}
              href="#/people"
              onClick={handleCenturyFilter(null)}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
