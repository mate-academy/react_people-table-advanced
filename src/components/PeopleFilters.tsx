import classNames from 'classnames';
import React, { useCallback, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

type Props = {
  setFilterSex: React.Dispatch<React.SetStateAction<string>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setCenturies: React.Dispatch<React.SetStateAction<string[]>>;
};

const PeopleFilters: React.FC<Props> = React.memo(
  ({ setFilterSex, setQuery, setCenturies }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const query = searchParams.get('query') || '';
    const sexFilter = searchParams.get('sex') || '';
    const centuries = searchParams.getAll('centuries') || [];
    const currentPath = location.pathname; // Получаем текущий путь

    useEffect(() => {
      if (sexFilter !== '') {
        setFilterSex(sexFilter);
      }

      setQuery(query);
      setCenturies(centuries);
    }, [sexFilter, setFilterSex, setQuery, query, setCenturies, centuries]);

    const createFilterLink = useCallback(
      (newFilter: string) => {
        const params = new URLSearchParams(searchParams);

        if (newFilter) {
          params.set('sex', newFilter);
        } else {
          params.delete('sex');
        }

        return `${currentPath}?${params.toString()}`; // Используем текущий путь
      },
      [searchParams, currentPath],
    );

    const createFilterQuery = (newValue: string) => {
      const params = new URLSearchParams(searchParams);

      if (newValue) {
        params.set('query', newValue);
      } else {
        params.delete('query');
      }

      setSearchParams(params);
    };

    const createFilterCenturiesLink = (century?: string) => {
      const params = new URLSearchParams(searchParams);

      if (century) {
        const currentCenturies = searchParams.getAll('centuries');

        if (currentCenturies.includes(century)) {
          params.delete('centuries');
          currentCenturies
            .filter(c => c !== century)
            .forEach(c => params.append('centuries', c));
        } else {
          params.append('centuries', century);
        }
      } else {
        params.delete('centuries');
      }

      return `${currentPath}?${params.toString()}`; // Используем текущий путь
    };

    const resetFilters = () => {
      setFilterSex('');
      setQuery('');
      setCenturies([]);
      setSearchParams(new URLSearchParams()); // Сбрасываем параметры поиска
    };

    return (
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          <Link
            className={classNames({ 'is-active': !sexFilter })}
            to={createFilterLink('')}
            onClick={() => setFilterSex('')}
          >
            All
          </Link>
          <Link
            className={classNames({ 'is-active': sexFilter === 'm' })}
            to={createFilterLink('m')}
          >
            Male
          </Link>
          <Link
            className={classNames({ 'is-active': sexFilter === 'f' })}
            to={createFilterLink('f')}
          >
            Female
          </Link>
        </p>

        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              data-cy="NameFilter"
              type="search"
              className="input"
              placeholder="Search"
              value={query}
              onChange={event => createFilterQuery(event.target.value)}
            />
            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              {['16', '17', '18', '19', '20'].map(century => (
                <Link
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  to={createFilterCenturiesLink(century)}
                >
                  {century}
                </Link>
              ))}
            </div>

            <div className="level-right ml-4">
              <Link
                data-cy="centuryALL"
                className="button is-success is-outlined"
                to={createFilterCenturiesLink()} // Удаляем все фильтры по векам
                onClick={() => setCenturies([])}
              >
                All
              </Link>
            </div>
          </div>
        </div>

        <div className="panel-block">
          <Link
            className="button is-link is-outlined is-fullwidth"
            to={currentPath} // Сбрасываем все фильтры, сохраняя текущий путь
            onClick={resetFilters}
          >
            Reset all filters
          </Link>
        </div>
      </nav>
    );
  },
);

PeopleFilters.displayName = 'PeopleFilters';

export default PeopleFilters;
