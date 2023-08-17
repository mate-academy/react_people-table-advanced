import { FC } from 'react';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  handleQueryChange: (value: React.ChangeEvent<HTMLInputElement>) => void,
  centuries: string[],
  genders: string,
  query: string,
};

export const PeopleFilters: FC<Props> = ({
  handleQueryChange,
  centuries,
  genders,
  query,
}) => {
  const filterByClick = (value: string) => {
    if (value === 'Female') {
      return {
        genders: value,
      };
    }

    if (value === 'Male') {
      return {
        genders: value,
      };
    }

    return {
      genders: null,
    };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['All', 'Male', 'Female'].map(gender => (
          <SearchLink
            params={filterByClick(gender)}
            key={gender}
            className={classNames({
              'is-active': genders.includes(gender),
            })}
          >
            {gender}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(item => century !== item)
                    : [...centuries, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success',
                {
                  'is-outlined': centuries.length !== 0,
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
          params={{ centuries: null, genders: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
