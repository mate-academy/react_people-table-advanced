import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { FC } from 'react';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import { Filter } from '../utils/Filter';

type Props = {
  query: string;
  centuries: string[];
  sex: string | null;
};

export const PeopleFilters: FC<Props> = ({
  query,
  centuries,
  sex,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;

    setSearchParams(
      getSearchWith(searchParams, { query: targetValue || null }),
    );
  };

  // const onChangeCentury = (e: React.ChangeEvent<HTMLLinkElement>) => {
  //   setSearchParams(
  //     getSearchWith(searchParams, {centuries: e.target.})
  //   )
  // };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !sex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: Filter.MALE }}
          className={classNames({ 'is-active': sex === Filter.MALE })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: Filter.FEMALE }}
          className={classNames({ 'is-active': sex === Filter.FEMALE })}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            value={query}
            type="search"
            onChange={onChangeQuery}
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

            {['16', '17', '18', '19', '20'].map(item => (
              <SearchLink
                params={{
                  centuries: centuries.includes(item)
                    ? centuries.filter(el => el !== item)
                    : [...centuries, item],
                }}
                className={classNames('button mr-1',
                  { 'is-info': centuries.includes(item) })}
              >
                {item}
              </SearchLink>
            ))}

            {/* <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=17"
            >
              17
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=18"
            >
              18
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=19"
            >
              19
            </a>

            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=20"
            >
              20
            </a> */}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{
                centuries: null,
              }}
              data-cy="centuryALL"
              className={classNames('button', 'is-success',
                { 'is-outlined': centuries.length > 0 })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            sex: null,
            centuries: null,
            query: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
