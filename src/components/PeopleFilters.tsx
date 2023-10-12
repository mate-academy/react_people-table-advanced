import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const allCenturies = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');
  const setSexFilterActiveClass = (selectedSex: string) => {
    return classNames(
      {
        'is-active':
          sex === selectedSex || (selectedSex === 'all' && sex === null),
      },
    );
  };

  const setSearchCenturyClass = (centuryValue: string) => {
    return classNames('button', 'mr-1', {
      'is-info': allCenturies.includes(centuryValue),
    });
  };

  const centuriesAllClasses = classNames('button', 'is-success', {
    'is-outlined': allCenturies.length > 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    if (newQuery === '') {
      searchParams.delete('query');
    } else {
      searchParams.set('query', newQuery);
    }

    setSearchParams(searchParams);
  };

  const setCenturyValues = (clickedCentury: string) => {
    if (allCenturies.includes(clickedCentury)) {
      return allCenturies.filter(century => century !== clickedCentury);
    }

    return [...allCenturies, clickedCentury];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={setSexFilterActiveClass('all')}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={setSexFilterActiveClass('m')}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={setSexFilterActiveClass('f')}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="text"
            className="input"
            placeholder="Search"
            onChange={handleChange}
            value={searchParams.get('query') || ''}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <SearchLink
              data-cy="century"
              className={setSearchCenturyClass('16')}
              params={{ centuries: setCenturyValues('16') }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={setSearchCenturyClass('17')}
              params={{ centuries: setCenturyValues('17') }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={setSearchCenturyClass('18')}
              params={{ centuries: setCenturyValues('18') }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={setSearchCenturyClass('19')}
              params={{ centuries: setCenturyValues('19') }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={setSearchCenturyClass('20')}
              params={{ centuries: setCenturyValues('20') }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={centuriesAllClasses}
              params={{ centuries: null }}
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
            centuries: null,
            sex: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
