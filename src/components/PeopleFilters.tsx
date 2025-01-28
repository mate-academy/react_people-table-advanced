import { FC } from 'react';
import { Filters } from '../types';
import { Link, useSearchParams } from 'react-router-dom';

export interface PeopleFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const basicCentury = [16, 17, 18, 19, 20];
const genders = ['', 'f', 'm'];

export const PeopleFilters: FC<PeopleFiltersProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const gender = searchParams.get('sex') || '';
  const centurys = searchParams.getAll('centurys') || [];

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    const quer = event.target.value;

    if (quer) {
      params.set('query', quer);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function handleGenderChange(sex: string) {
    const params = new URLSearchParams(searchParams);

    if (sex === '') {
      params.delete('sex');
    } else {
      params.set('sex', sex);
    }

    setSearchParams(params);
  }

  function toggleCentury(century: number) {
    const params = new URLSearchParams(searchParams);

    const newCenturys = centurys.includes(century.toString())
      ? centurys.filter(cent => cent !== century.toString())
      : [...centurys, century.toString()];

    params.delete('centurys');

    newCenturys.forEach(cent => params.append('centurys', cent));
    setSearchParams(params);
  }

  function clearAll() {
    const params = new URLSearchParams(searchParams);

    params.delete('centurys');
    params.delete('sex');
    params.delete('query');
    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        {genders.map(sex => (
          <a
            key={sex}
            className={sex === gender ? 'is-active' : ''}
            href="#/"
            onClick={e => {
              e.preventDefault();
              handleGenderChange(sex);
            }}
          >
            {sex === '' ? 'All' : sex === 'f' ? 'Female' : 'Male'}
          </a>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="text"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => {
              handleQueryChange(e);
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
            {basicCentury.map(century => (
              <button
                key={century}
                data-cy="century"
                className={`button mr-1 ${centurys.map(Number).includes(century) ? 'is-info' : ''}`}
                onClick={() => {
                  toggleCentury(century);
                }}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={`button is-success ${
                centurys.length === 0 ? 'is-success' : 'is-outlined'
              }`}
              to="#/"
              onClick={e => {
                e.preventDefault();
                const params = new URLSearchParams(searchParams);

                params.delete('centurys');
                setSearchParams(params);
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="#/"
          onClick={() => {
            clearAll();
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
