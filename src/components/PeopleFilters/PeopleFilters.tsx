import React from 'react';
import { Link } from 'react-router-dom';
import { getSearchWith } from '../../utils/getSearchWith';
import classNames from 'classnames';

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
  searchParams: URLSearchParams;
  sex: string;
  centuries: string[];
};

export const PeopleFilters: React.FC<Props> = ({
  onChange,
  query,
  searchParams,
  sex,
  centuries,
}) => {
  function getSexValue(buttonName: string) {
    const firstLetter = buttonName[0].toLowerCase();

    return firstLetter === 'a' ? null : firstLetter;
  }

  function getSexFullWord() {
    if (!sex) {
      return 'All';
    }

    return sex === 'm' ? 'Male' : 'Female';
  }

  function getNewCenturies(century: string) {
    return centuries.includes(century)
      ? centuries.filter(item => item !== century)
      : [...centuries, century];
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['All', 'Male', 'Female'].map(item => (
          <Link
            key={item}
            className={classNames({
              'is-active': getSexFullWord() === item,
            })}
            to={{
              search: getSearchWith({ sex: getSexValue(item) }, searchParams),
            }}
          >
            {item}
          </Link>
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
            onChange={onChange}
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
              <Link
                key={item}
                data-cy="century"
                className={classNames('button', {
                  'is-info': centuries.includes(item),
                })}
                to={{
                  search: getSearchWith(
                    { centuries: getNewCenturies(item) },
                    searchParams,
                  ),
                }}
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length,
              })}
              to={{ search: getSearchWith({ centuries: null }, searchParams) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-fullwidth is-outlined"
          to={{
            search: getSearchWith(
              {
                query: null,
                sex: null,
                centuries: null,
              },
              searchParams,
            ),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
