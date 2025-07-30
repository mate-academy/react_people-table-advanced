import { SexFilter } from '../types/SexFilter';
import { usePeopleContext } from '../context/PeopleContext';
import { Link, useSearchParams } from 'react-router-dom';
import { CenturyFilter } from '../types/CenturyFilter';
import { useEffect } from 'react';

const sexOptions = [
  { label: 'All', value: SexFilter.All },
  { label: 'Male', value: SexFilter.Male },
  { label: 'Female', value: SexFilter.Female },
];

const centuryOptions = [
  { label: '16th century', value: CenturyFilter.Sixteen },
  { label: '17th century', value: CenturyFilter.Seventeen },
  { label: '18th century', value: CenturyFilter.Eighteen },
  { label: '19th century', value: CenturyFilter.Nineteen },
  { label: '20th century', value: CenturyFilter.Twenty },
];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { query, setQuery, sex, setSex, centuries, setCenturies } =
    usePeopleContext();

  const handleSexChange = (value: string) => {
    setSex(value);

    const params = new URLSearchParams(searchParams);

    params.set('sex', value);
    setSearchParams(params);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);

    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete('query');
    } else {
      params.set('query', value);
    }

    setSearchParams(params);
  };

  const handleCenturyChange = (value: number | null) => {
    const params = new URLSearchParams(searchParams);

    if (value === null) {
      setCenturies([]);
      params.delete('century');
    } else {
      let newCenturies: number[];

      if (centuries.includes(value)) {
        newCenturies = centuries.filter(c => c !== value);
      } else {
        newCenturies = [...centuries, value];
      }

      setCenturies(newCenturies);

      params.delete('century');
      newCenturies.forEach(c => {
        params.append('century', c.toString());
      });
    }

    setSearchParams(params);
  };

  useEffect(() => {
    setSex(searchParams.get('sex') || 'all');
  }, [searchParams]);

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, [searchParams]);

  useEffect(() => {
    setCenturies(searchParams.getAll('century').map(Number));
  }, [searchParams]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexOptions.map(({ label, value }) => {
          return (
            <a
              key={value}
              onClick={() => {
                handleSexChange(value);
              }}
              className={sex === value ? 'is-active' : ''}
            >
              {label}
            </a>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => {
              handleQueryChange(e.target.value);
            }}
          />

          <span className="icon is-left">
            <i
              className="fas fa-search"
              aria-hidden="true"
              onClick={() => {
                setQuery('');
              }}
            />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryOptions.map(({ value }) => {
              return (
                <a
                  key={value}
                  data-cy="century"
                  className={`button mr-1 ${centuries.includes(value) ? 'is-info' : ''}`}
                  onClick={() => {
                    handleCenturyChange(value);
                  }}
                >
                  {value}
                </a>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => {
                handleCenturyChange(null);
              }}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="#/people"
          onClick={() => {
            setQuery('');
            setSex('all');
            setCenturies([]);
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
