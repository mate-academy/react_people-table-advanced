import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState<string>('');

  const atualizarLinkCenturies = (param: string, value: number) => {
    if (!searchParams.getAll(param).includes(value.toString())) {
      searchParams.append(param, value.toString());
      setSearchParams(searchParams);
    } else {
      searchParams.delete(param, value.toString());
      setSearchParams(searchParams);
    }
  };

  const atualizarLinkGeneros = (param: string, value: string) => {
    searchParams.set(param, value);
    setSearchParams(searchParams);
  };

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    searchParams.set('query', event.target.value);
    setSearchParams(searchParams);
    if (event.target.value.length === 0) {
      searchParams.delete('query');
      setSearchParams(searchParams);
    }
  };

  const verificador = () => {
    return (
      searchParams.getAll('centuries').length > 0 ||
      searchParams.get('sex') ||
      searchParams.get('query')
    );
  };

  const centuries = [16, 17, 18, 19, 20];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!searchParams.get('sex') ? 'is-active' : ''}
          onClick={() => {
            searchParams.delete('sex');
            setSearchParams(searchParams);
          }}
        >
          All
        </a>
        <a
          className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
          onClick={() => atualizarLinkGeneros('sex', 'm')}
        >
          Male
        </a>
        <a
          className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
          onClick={() => atualizarLinkGeneros('sex', 'f')}
        >
          Famale
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={inputValue}
            onChange={e => changeInput(e)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(r => (
              <button
                key={r}
                data-cy="century"
                className={`button mr-1 ${searchParams.getAll('centuries').includes(r.toString()) ? 'is-info' : ''}`}
                onClick={() => atualizarLinkCenturies('centuries', r)}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={`button is-success ${verificador() ? ' is-outlined' : ''}`}
              to="/people"
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => {
            searchParams.delete('sex');
            setInputValue('');
            searchParams.delete('query');
            searchParams.delete('centuries');
            setSearchParams(searchParams);
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
