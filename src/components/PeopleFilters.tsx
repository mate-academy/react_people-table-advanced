import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

const centuries = [16, 17, 18, 19, 20];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const updateParam = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    setSearchParams(params);
  };

  const toggleCentury = (century: number) => {
    const value = String(century);
    const params = new URLSearchParams(searchParams);

    const values = params.getAll('centuries');

    params.delete('centuries');

    const nextValues = values.includes(value)
      ? values.filter(item => item !== value)
      : [...values, value];

    nextValues.forEach(item => {
      params.append('centuries', item);
    });

    setSearchParams(params);
  };

  const selectAllCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  const sexOptions = [
    { value: '', title: 'All' },
    { value: 'm', title: 'Male' },
    { value: 'f', title: 'Female' },
  ];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexOptions.map(option => (
          <a
            key={option.title}
            href={`#${pathname}`}
            className={cn({
              'is-active': sex === option.value,
            })}
            onClick={event => {
              event.preventDefault();
              updateParam('sex', option.value);
            }}
          >
            {option.title}
          </a>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={inputValue}
            onChange={event => {
              const value = event.target.value;

              setInputValue(value);
              updateParam('query', value.trim());
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
            {centuries.map(century => {
              const selected = selectedCenturies.includes(String(century));

              return (
                <a
                  key={century}
                  data-cy="century"
                  className={cn('button', 'mr-1', {
                    'is-info': selected,
                  })}
                  href={`#${pathname}`}
                  onClick={event => {
                    event.preventDefault();
                    toggleCentury(century);
                  }}
                >
                  {century}
                </a>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              href={`#${pathname}`}
              className="button is-success is-outlined"
              onClick={event => {
                event.preventDefault();
                selectAllCenturies();
              }}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          to="/people"
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setInputValue('')}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
