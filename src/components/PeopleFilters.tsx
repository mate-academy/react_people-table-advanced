import React, { FC } from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  sex: string | null;
  query: string;
  selectedCenturies: string[];
};

export const PeopleFilters: FC<Props> = ({ sex, query, selectedCenturies }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const gendersList = [
    { title: 'All', value: null },
    { title: 'Male', value: 'm' },
    { title: 'Female', value: 'f' },
  ];

  const centuriesList = ['16', '17', '18', '19', '20'];

  const getParamsForReset = () => {
    const paramsForReset = ['sex', 'query', 'centuries'];
    const paramsToUpdate: { [key: string]: null } = {};

    paramsForReset.forEach(param => {
      paramsToUpdate[param] = null;
    });

    return paramsToUpdate;
  };

  const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {gendersList.map(gender => (
          <SearchLink
            key={gender.value}
            params={{ sex: gender.value }}
            className={sex === gender.value ? 'is-active' : ''}
          >
            {gender.title}
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
            onChange={onChangeQuery}
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
                data-cy="century"
                className={classNames(
                  'button mr-1',
                  { 'is-info': selectedCenturies.includes(century) },
                )}
                params={{
                  centuries: selectedCenturies.includes(century)
                    ? selectedCenturies.filter(c => c !== century)
                    : [...selectedCenturies, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                { 'is-outlined': selectedCenturies.length },
              )}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith(searchParams, getParamsForReset()),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
