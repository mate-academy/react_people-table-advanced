import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { useState } from 'react';
import classNames from 'classnames';

export const PeopleFilters = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchinput, setSearchInput] = useState(searchParams.get('query') || '');




  const sex = searchParams.get('sex');

  const currentCenturies = searchParams.getAll('century');

  const renderCenturies = ['16', '17', '18', '19', '20'];

  const toggleCentury = (value: string) => {
    if (currentCenturies.includes(value)) {
      // если уже есть → убираем
      return currentCenturies.filter(c => c !== value);
    } else {
      // если нет → добавляем
      return [...currentCenturies, value];
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchInput(value);

    if (value) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSearchParams({});
    setSearchInput('');

  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink className={!sex ? 'is-active' : ''} params={{ sex: null }}>
          All
        </SearchLink>

        <SearchLink
          className={sex === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={sex === 'f' ? 'is-active' : ''}
          params={{ sex: 'f' }}
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
            value={searchinput}
            onChange={e => handleInputChange(e)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {renderCenturies.map(c => (
              <SearchLink
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': currentCenturies.includes(c),
                })}
                params={{ century: toggleCentury(`${c}`) }}
                key={c}
              >
                {c}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': currentCenturies.length !== 0,
              })}
              params={{ century: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={resetFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
