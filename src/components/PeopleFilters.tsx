import React, { useCallback } from 'react';
import classNames from 'classnames';
import { NavLink, useSearchParams, useLocation } from 'react-router-dom';
import { FEMALE, MALE } from '../utils/constants';

interface Props {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSex: React.Dispatch<React.SetStateAction<string>>;
  setCenturies: React.Dispatch<React.SetStateAction<string[]>>;
}

const setActiveClass = ({ isActive }: { isActive: boolean }) => {
  return classNames({ 'is-active': isActive });
};

export const PeopleFilters: React.FC<Props> = ({
  setSearchQuery,
  setSex,
  setCenturies,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const isFemalePicked = location.search.includes('sex=f');
  const isMalePicked = location.search.includes('sex=m');
  const isSexPicked = isMalePicked || isFemalePicked;

  const searchHandler = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newSearchQuery = event.target.value;

    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.set('searchQuery', newSearchQuery);

    if (newSearchQuery === '') {
      newSearchParams.delete('searchQuery');
    }

    setSearchQuery(newSearchQuery);
    setSearchParams(newSearchParams);
  }, []);

  const sexPickHandler = useCallback((sex: string) => {
    setSex(sex);
  }, [setSex]);

  const generateSexPickURL = useCallback((sex: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if (currentParams.has('sex')) {
      currentParams.set('sex', sex);
    } else {
      currentParams.append('sex', sex);
    }

    return `/people?${currentParams.toString()}`;
  }, [searchParams]);

  const centuryPickHandler = useCallback((century: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const centuriesFromURL = currentParams.getAll('century');

    const newCenturies = centuriesFromURL.includes(century)
      ? centuriesFromURL.filter(c => c !== century)
      : [...centuriesFromURL, century];

    setCenturies(century ? newCenturies : []);
  }, [searchParams, setCenturies]);

  const generateCenturyPickURL = useCallback((century: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const centuriesFromURL = currentParams.getAll('century');

    if (!century) {
      currentParams.delete('century');
    } else {
      const newCenturies = centuriesFromURL.includes(century)
        ? centuriesFromURL.filter(c => c !== century)
        : [...centuriesFromURL, century];

      currentParams.delete('century');
      newCenturies.forEach(c => currentParams.append('century', c));
    }

    return `/people?${currentParams.toString()}`;
  }, [searchParams]);

  const isCenturyActive = useCallback((century: string) => {
    return searchParams.getAll('century').some(
      (centuryFromURL) => centuryFromURL === century,
    );
  }, [searchParams]);

  const generateResetURL = useCallback(() => {
    const currentParams = new URLSearchParams(searchParams.toString());

    currentParams.delete('century');
    currentParams.delete('sex');
    currentParams.delete('searchQuery');

    return `/people?${currentParams.toString()}`;
  }, [searchParams]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          to={{
            pathname: '/people',
            search: location.search.replace(/([&?])sex=[^&]+(&|$)/, '$1'),
          }}
          className={
            setActiveClass({ isActive: !isSexPicked })
          }
          onClick={() => setSex('')}
        >
          All
        </NavLink>

        <NavLink
          className={
            setActiveClass({ isActive: isMalePicked })
          }
          to={generateSexPickURL(MALE)}
          onClick={() => sexPickHandler(MALE)}
        >
          Male
        </NavLink>

        <NavLink
          className={
            setActiveClass({ isActive: isFemalePicked })
          }
          to={generateSexPickURL(FEMALE)}
          onClick={() => sexPickHandler(FEMALE)}
        >
          Female
        </NavLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={searchParams.get('searchQuery') || ''}
            onChange={(event) => searchHandler(event)}
            data-cy="NameFilter"
            type="search"
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
            {['16', '17', '18', '19', '20'].map(century => (
              <NavLink
                key={century}
                data-cy="century"
                className={`button mr-1 ${isCenturyActive(century) ? 'is-info' : ''}`}
                to={generateCenturyPickURL(century)}
                onClick={() => centuryPickHandler(century)}
              >
                {century}
              </NavLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <NavLink
              data-cy="centuryALL"
              className={`button is-success ${searchParams.has('century') ? 'is-outlined' : ''}`}
              to={generateCenturyPickURL('')}
              onClick={() => centuryPickHandler('')}
            >
              All
            </NavLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <NavLink
          className="button is-link is-outlined is-fullwidth"
          to={generateResetURL()}
          onClick={() => {
            setSex('');
            setSearchQuery('');
            setCenturies([]);
          }}
        >
          Reset all filters
        </NavLink>
      </div>
    </nav>
  );
};
