import classNames from 'classnames';
import { type FC } from 'react';
import { SearchLink } from '../SearchLink';

const SEX_FILTER_OPTIONS = {
  All: null,
  Male: 'm',
  Female: 'f',
};
const CENTURIES_FILTER_OPTIONS = ['16', '17', '18', '19', '20'];
const RESET_FILTER_OPTIONS = {
  centuries: null,
  sex: null,
  query: null,
};

interface PropsValues {
  query: string;
  sex: string | null;
  centuries: string[];
  handleQueryChange: (query: string) => void;
  handleSexChange: (sex: string | null) => void;
  toggleCenturies: (centuries: string) => string[];
}

export type Props = {
  searchState: PropsValues;
};

export const PeopleFilters: FC<Props> = ({ searchState }) => {
  const {
    query: selectQuery,
    sex: selectSex,
    centuries: selectCenturies,
    handleQueryChange,
    handleSexChange,
    toggleCenturies,
  } = searchState;

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SEX_FILTER_OPTIONS).map(([key, value]) => {
          return (
            <SearchLink
              key={key}
              className={classNames({ 'is-active': value === selectSex })}
              params={{ sex: value }}
              onClick={() => handleSexChange(value)}
            >
              {key}
            </SearchLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={selectQuery}
            onChange={event => handleQueryChange(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES_FILTER_OPTIONS.map(century => {
              return (
                <SearchLink
                  className={classNames('button mr-1', {
                    'is-info': selectCenturies.includes(century),
                  })}
                  data-cy="century"
                  key={century}
                  params={{ centuries: toggleCenturies(century) }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: null }}
              className={classNames('button is-success', {
                'is-outlined': !!selectCenturies.length,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={RESET_FILTER_OPTIONS}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
