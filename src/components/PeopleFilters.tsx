import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { FC } from 'react';
import { getSearchWith } from '../utils';
import { SearchLink } from './SearchLink';
import { Filter } from '../types';

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
  const centuriesList = ['16', '17', '18', '19', '20'];
  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;

    setSearchParams(
      getSearchWith(searchParams, { query: targetValue || null }),
    );
  };

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
          params={{ sex: Filter.Male }}
          className={classNames({ 'is-active': sex === Filter.Male })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: Filter.Female }}
          className={classNames({ 'is-active': sex === Filter.Female })}
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

            {centuriesList.map(century => (
              <SearchLink
                key={century}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(el => el !== century)
                    : [...centuries, century],
                }}
                className={classNames('button mr-1',
                  { 'is-info': centuries.includes(century) })}
              >
                {century}
              </SearchLink>
            ))}
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
