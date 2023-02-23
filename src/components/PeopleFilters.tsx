import classNames from 'classnames';
import { SetStateAction, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  urlSlug: string | undefined;
  searchParams: URLSearchParams;
  setSearchParams: (value: string) => void;
};

const centuriesList: string[] = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const centuriesInUrl = searchParams.getAll('centuries');
  const filterByGender = searchParams.get('sex');

  const location = useLocation().pathname;

  const setFilterGender = (sex: string) => {
    setSearchParams(getSearchWith(searchParams, { sex }));
  };

  const setQuery = (e: { target: { value: SetStateAction<string> } }) => {
    const value = String(e.target.value);

    setSearchParams(getSearchWith(searchParams, { query: value || null }));
    setSearchInput(value);
  };

  const setParamCenturies = (century: string) => {
    let centuries = searchParams.getAll('centuries');
    const isAddedBefore = centuries.includes(century);

    if (isAddedBefore) {
      centuries = centuries.filter((c) => c !== century);
    } else {
      centuries.push(century);
    }

    setSearchParams(getSearchWith(searchParams, { centuries }));
  };

  const allCenturies = () => {
    setSearchParams(getSearchWith(searchParams, { centuries: null }));
  };

  const resetAll = () => {
    setSearchParams('');
  };

  useEffect(() => {
    if (filterByGender) {
      setSearchParams(getSearchWith(searchParams, { sex: filterByGender }));
    }
  }, []);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({
            'is-active': !filterByGender,
          })}
          href={`#${location}`}
          onClick={() => setFilterGender('')}
        >
          All
        </a>
        <a
          className={classNames({
            'is-active': filterByGender === 'm',
          })}
          href={`#${location}?${searchParams}`}
          onClick={() => setFilterGender('m')}
        >
          Male
        </a>
        <a
          className={classNames({
            'is-active': filterByGender === 'f',
          })}
          href={`#${location}?${searchParams}`}
          onClick={() => setFilterGender('f')}
        >
          Female
        </a>
      </p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchInput}
            onChange={setQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map((c) => (
              <button
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuriesInUrl.includes(c),
                })}
                type="button"
                key={c}
                onClick={() => setParamCenturies(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuriesInUrl.length,
              })}
              type="button"
              onClick={allCenturies}
            >
              All
            </button>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={resetAll}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
