import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  setFilterSex: (arg: string) => void;
  setQuery: (query: string) => void;
  setCenturies: Dispatch<SetStateAction<number[]>>;
  filterSex: string;
  centuries: number[];
}

enum FilterBySex {
  'All' = '',
  'Male' = 'm',
  'Female' = 'f',
}

const centuriesForLinks = [16, 17, 18, 19, 20];

export const PeopleFilters = ({
  setFilterSex,
  setQuery,
  setCenturies,
  filterSex,
  centuries,
}: Props) => {
  const handleCenturyClick = (century: number) => {
    setCenturies((current: number[]) =>
      current.includes(century)
        ? current.filter(c => c !== century)
        : [...current, century],
    );
  };

  const handleResetFilters = () => {
    setFilterSex('');
    setQuery('');
    setCenturies([]);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(FilterBySex).map(entry => {
          const [key, value] = entry;

          return (
            <Link
              key={key}
              className={cn({ 'is-active': filterSex === value })}
              to={`${key === 'All' ? '' : `?sex=${value}`}`}
              onClick={() => setFilterSex(value)}
            >
              {key}
            </Link>
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
            onChange={event => setQuery(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesForLinks.map(century => {
              return (
                <Link
                  key={century}
                  data-cy="century"
                  className={cn('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  to={`?centuries=${century}`}
                  onClick={() => handleCenturyClick(century)}
                >
                  {century}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="."
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
          to="."
          onClick={() => handleResetFilters()}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
