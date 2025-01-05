import { useSearchParams } from 'react-router-dom';
import React, { useContext, useRef } from 'react';
import { PeopleContext } from '../store/PeopleContext';
import classNames from 'classnames';
import { useEffect } from 'react';

type Props = {
  filterItem: string | null;
  filterCentury: number;
  queryInput: string;
};

export const PeopleFilters: React.FC<Props> = () => {
  // const [searchParams] = useSearchParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const queryInput = searchParams.get('query') || '';
  // const centuries = searchParams.get('centuries') || null;
  // const selected = searchParams.get('sex') || '';
  const {
    filterPeople,
    resetAllCenturyList,
    setActiveCenturies,
    activeCenturies,
    centuries,
    setQueryInput,
    // queryInput,
    totalReset,
    selectedSex,
    setSelectedSex,
    isResetAllActive,
    setIsResetAllAcive,
  } = useContext(PeopleContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryInput(event.target.value);

    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);

    setSearchParams(params);
  };

  const handleFilter = (filterItem: string) => {
    filterPeople(filterItem);
    setSelectedSex(filterItem);
    const params = new URLSearchParams(searchParams);

    params.set('sex', filterItem);

    setSearchParams(params);
  };

  const toggleCentury = (centuryNum: number) => {
    const isActive = activeCenturies.includes(centuryNum);
    const updatedCenturies = isActive
      ? activeCenturies.filter(item => item !== centuryNum)
      : [...activeCenturies, centuryNum];

    setActiveCenturies(updatedCenturies);

    const params = new URLSearchParams(searchParams);

    if (updatedCenturies.length > 0) {
      params.set('centuries', updatedCenturies.join(','));
    } else {
      params.delete('centuries');
    }

    setSearchParams(params);
  };
  // const toggleCentury = (centuryNum: number) => {
  //   const params = new URLSearchParams(searchParams);

  //   params.set('activeCenturies', centuryNum);
  //   setSearchParams(params);
  // };
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (buttonRef.current && !buttonRef.current.contains(target)) {
        setIsResetAllAcive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setIsResetAllAcive]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['all', 'm', 'f'].map(sex => (
          <a
            key={sex}
            className={classNames({ 'is-active': selectedSex === sex })}
            href={`#/people${sex === 'All' ? '' : `?sex=${sex}`}`}
            onClick={() => handleFilter(sex)}
          >
            {sex === 'all' ? 'All' : sex === 'm' ? 'Male' : 'Female'}
          </a>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={queryInput}
            onChange={handleChange}
            data-cy="NameFilter"
            type="search"
            id="search-query"
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
            {centuries.map(item => (
              <a
                key={item}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': activeCenturies.includes(item),
                })}
                href={`#/people?centuries=${item}`}
                onClick={event => {
                  event.preventDefault();
                  toggleCentury(item);
                }}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': activeCenturies.length !== 0,
              })}
              href="#/people"
              onClick={() => {
                setActiveCenturies([]);
                resetAllCenturyList();
              }}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          ref={buttonRef}
          className={classNames('button is-link is-fullwidth', {
            'is-outlined': !isResetAllActive,
          })}
          href="#/people"
          onClick={() => {
            setIsResetAllAcive(true);
            totalReset();
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
