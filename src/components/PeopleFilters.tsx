import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { useEffect, useState } from 'react';
import { usePeople } from './PeopleContext';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const { peopleFromServer, setVisiblePeople } = usePeople();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSex = searchParams.get('sex');
  const currentQuery = searchParams.get('query');
  const currentCenturies = searchParams.getAll('centuries');
  const [query, setQuery] = useState(currentQuery);

  const setCenturies = (century: string) => {
    if (currentCenturies?.includes(century)) {
      return { centuries: [...currentCenturies].filter(c => c !== century) };
    }

    return { centuries: [...currentCenturies, century] };
  };

  const handleFilter = () => {
    const filter = [...peopleFromServer].filter(person => {
      switch (currentSex) {
        case 'm':
          return person.sex === 'm';
        case 'f':
          return person.sex === 'f';
        default:
          return person;
      }
    });

    const filterTwo = [...filter].filter(person => {
      if (currentCenturies?.length === 0) {
        return person;
      }

      return currentCenturies?.includes(
        Math.ceil(person.born / 100).toString(),
      );
    });

    const filterThree = [...filterTwo].filter(person => {
      if (currentQuery?.length === 0 || currentQuery === null) {
        return person;
      }

      return person.name
        .toLowerCase()
        .trim()
        .includes(currentQuery.toLowerCase().trim());
    });

    setVisiblePeople(filterThree);
  };

  useEffect(() => {
    handleFilter();
  }, [currentSex, currentCenturies, currentQuery]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={currentSex === null ? 'is-active' : ''}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={currentSex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={currentSex === 'f' ? 'is-active' : ''}
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
            value={query!}
            onChange={e => {
              const value = e.target.value;

              setQuery(value);
              setSearchParams(prev => {
                const newParams = new URLSearchParams(prev);

                if (value) {
                  newParams.set('query', value);
                } else {
                  newParams.delete('query');
                }

                return newParams;
              });
            }}
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
              className={classNames(
                'button mr-1',
                currentCenturies.includes('16') ? 'is-info' : '',
              )}
              params={setCenturies('16')}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames(
                'button mr-1',
                currentCenturies.includes('17') ? 'is-info' : '',
              )}
              params={setCenturies('17')}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames(
                'button mr-1',
                currentCenturies.includes('18') ? 'is-info' : '',
              )}
              params={setCenturies('18')}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames(
                'button mr-1',
                currentCenturies.includes('19') ? 'is-info' : '',
              )}
              params={setCenturies('19')}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames(
                'button mr-1',
                currentCenturies.includes('20') ? 'is-info' : '',
              )}
              params={setCenturies('20')}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                currentCenturies.length === 0 ? '' : 'is-outlined',
              )}
              params={{ sex: null, centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          // href="#/people"
          params={{ sex: null, centuries: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
