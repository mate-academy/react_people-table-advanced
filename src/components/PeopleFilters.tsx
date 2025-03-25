import { Link, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeGender, setActiveGender] = useState(
    searchParams.get('sex') || 'All',
  );
  const [querry, setQuerry] = useState(searchParams.get('querry') || '');

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (querry) {
      newParams.set('querry', querry);
    } else {
      newParams.delete('querry');
    }

    setSearchParams(newParams);
  }, [querry, setSearchParams, searchParams]);

  const handleAddingCentury = (number: string) => {
    const currentParams = searchParams.getAll('centuries');

    const newParams = currentParams.includes(number)
      ? currentParams.filter((num: string) => number !== num)
      : [...currentParams, number];

    return {
      centuries: newParams.length > 0 ? newParams : null,
    };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': activeGender === 'All' })}
          onClick={() => setActiveGender('All')}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': activeGender === 'm' })}
          onClick={() => setActiveGender('m')}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': activeGender === 'f' })}
          onClick={() => setActiveGender('f')}
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
            value={querry}
            onChange={event => setQuerry(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(number => (
              <SearchLink
                key={number}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': searchParams.getAll('centuries').includes(number),
                })}
                params={handleAddingCentury(number)}
              >
                {number}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': searchParams.getAll('centuries').length !== 0,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="#/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
