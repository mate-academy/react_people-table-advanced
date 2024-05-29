import { SearchLink } from '../SearchLink/SearchLink';
import cn from 'classnames';
import { useRef } from 'react';
import { useFilterParams } from '../hooks/useFilterParam';

export const PeopleFilters = () => {
  const { searchParams, setSearchParams, selectedCenturies, selectedGenders } =
    useFilterParams();

  const inputRef = useRef<HTMLInputElement>(null);

  const centuriesList: string[] = ['16', '17', '18', '19', '20'];

  const toggleParamInList = (paramList: string[], param: string) => {
    return paramList.includes(param)
      ? paramList.filter(item => item !== param)
      : [...paramList, param];
  };

  const genderLinkClassName = (gender: string) => {
    if (selectedGenders.includes(gender)) {
      return 'is-active';
    }

    return '';
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const param = new URLSearchParams(searchParams);

    param.set('query', event.target.value);
    setSearchParams(param);
  };

  const resetAll = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': !selectedGenders.length })}
        >
          All
        </SearchLink>
        <SearchLink params={{ sex: 'm' }} className={genderLinkClassName('m')}>
          Male
        </SearchLink>
        <SearchLink params={{ sex: 'f' }} className={genderLinkClassName('f')}>
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            ref={inputRef}
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
            {centuriesList.map(century => {
              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={cn('button mr-1', {
                    'is-info': selectedCenturies.includes(century),
                  })}
                  params={{
                    centuries: toggleParamInList(selectedCenturies, century),
                  }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={cn('button is-success ', {
                'is-outlined': !!selectedCenturies.length,
              })}
              href="#/people"
            >
              All
            </a>
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
