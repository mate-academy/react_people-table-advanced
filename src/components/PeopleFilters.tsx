import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { SearchParams } from '../utils/searchHelper';
import { Sex } from '../types/sex';

type Props = {
  toggleCentury: (centuryProp: string) => SearchParams;
};

export const PeopleFilters: React.FC<Props> = ({ toggleCentury }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCenturies = ['16', '17', '18', '19', '20'];
  const century = searchParams.getAll('centuries') || [];

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      searchParams.delete('query');
    } else {
      searchParams.set('query', event.target.value);
    }

    setSearchParams(searchParams);
  };

  const handlerClickButton = (sorted: string) => {
    if (sex === sorted) {
      return { sex: sorted };
    }

    return { sex: sorted };
  };

  const getSortIcon = (sorted: string) => {
    if (sex === sorted || (!sex && sorted === Sex.All)) {
      return 'is-active';
    }

    return '';
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames(getSortIcon(Sex.All), Sex.All)}
          params={handlerClickButton(Sex.All)}
        >
          All
        </SearchLink>
        <SearchLink
          className={getSortIcon(Sex.Male)}
          params={handlerClickButton(Sex.Male)}
        >
          Male
        </SearchLink>
        <SearchLink
          className={getSortIcon(Sex.Female)}
          params={handlerClickButton(Sex.Female)}
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
            value={query}
            onChange={handleChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {currentCenturies.map(currentCentury => (
              <SearchLink
                data-cy="century"
                key={currentCentury}
                className={classNames('button mr-1', {
                  'is-info': century.includes(currentCentury),
                })}
                params={toggleCentury(currentCentury)}
              >
                {currentCentury}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !!century.length,
              })}
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
          onClick={() => handlerClickButton(Sex.All)}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
