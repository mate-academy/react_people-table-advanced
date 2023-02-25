import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { SearchLink } from '../SearchLink';

import { getSearchWith } from '../../utils/searchHelper';

import { Sex } from '../../enums/Sex';
import { SearchParam } from '../../enums/SearchParam';

const centuries: string[] = ['16', '17', '18', '19', '20'];
const genders = Object.entries(Sex);

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCenturies = searchParams.getAll(SearchParam.Centuries) || [];
  const selectedSex = (searchParams.get(SearchParam.Sex) || '') as Sex;
  const enteredQuery = searchParams.get(SearchParam.Query) || '';

  const handleQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setSearchParams(
      getSearchWith(searchParams, {
        [SearchParam.Query]: event.target.value || null,
      }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p
        className="panel-tabs"
        data-cy="SexFilter"
      >
        {genders.map(([genderName, genderAbbr]) => (
          <SearchLink
            key={genderName}
            className={classNames({
              'is-active': genderAbbr === selectedSex,
            })}
            params={{
              [SearchParam.Sex]: genderAbbr === Sex.All ? null : genderAbbr,
            }}
          >
            {genderName}
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
            value={enteredQuery}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i
              className="fas fa-search"
              aria-hidden="true"
            />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div
          className="level is-flex-grow-1 is-mobile"
          data-cy="CenturyFilter"
        >
          <div className="level-left">
            {centuries.map((century) => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': selectedCenturies.includes(century),
                })}
                params={{
                  [SearchParam.Centuries]: selectedCenturies.includes(century)
                    ? selectedCenturies.filter((c) => c !== century)
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
              className={classNames('button', 'is-success', {
                'is-outlined': selectedCenturies.length > 0,
              })}
              params={{
                [SearchParam.Centuries]: null,
              }}
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
            [SearchParam.Query]: null,
            [SearchParam.Sex]: null,
            [SearchParam.Centuries]: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
