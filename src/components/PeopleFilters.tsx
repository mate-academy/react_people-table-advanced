import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import React from 'react';
import { Century, Gender } from '../types/Filters';
import { SearchLink } from './SearchLink';

const centuries = [
  Century.XVI,
  Century.XVII,
  Century.XVIII,
  Century.XIX,
  Century.XX,
];

const genders = [
  { title: Gender.Male, param: 'm' },
  { title: Gender.Female, param: 'f' },
];

type Props = {
  selectedGender: string | null;
  query: string;
  selectedCenturies: Century[] | string[];
};

export const PeopleFilters: React.FC<Props> = ({
  selectedGender,
  query,
  selectedCenturies,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set('query', event?.target.value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter" />
      <SearchLink
        params={{ sex: null }}
        className={classNames({
          'is-active': !selectedGender,
        })}
      >
        All
      </SearchLink>

      {genders.map(gender => (
        <SearchLink
          key={gender.param}
          params={{ sex: gender.param }}
          className={classNames({
            'is-active': selectedGender === gender.param,
          })}
        >
          {gender.title}
        </SearchLink>
      ))}
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
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
            {centuries.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': selectedCenturies.includes(century),
                })}
                params={{
                  centuries: selectedCenturies.includes(century)
                    ? selectedCenturies.filter(prev => prev !== century)
                    : [...selectedCenturies, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': selectedCenturies.length,
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
          params={{
            sex: selectedGender && null,
            query: query && null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
