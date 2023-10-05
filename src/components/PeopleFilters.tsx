import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const allCenturies = ['16', '17', '18', '19', '20'];

const SexFilter = ({ currentSex }: { currentSex: string | null }) => {
  const sexes = [null, 'm', 'f'];
  const labels = ['All', 'Male', 'Female'];

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {sexes.map((sex, index) => (
        <SearchLink
          key={sex}
          className={currentSex === sex ? 'is-active' : ''}
          params={{ sex }}
        >
          {labels[index]}
        </SearchLink>
      ))}
    </p>
  );
};

// eslint-disable-next-line
const CenturyFilter = ({ currentCenturies }: { currentCenturies: string[] }) => (
  <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
    <div className="level-left">
      {allCenturies.map(century => (
        <SearchLink
          key={century}
          data-cy="century"
          className={classNames('button mr-1', {
            'is-info': currentCenturies.includes(century),
          })}
          params={{
            centuries: currentCenturies.includes(century)
              ? currentCenturies.filter(value => value !== century)
              : [...currentCenturies, century],
          }}
        >
          {century}
        </SearchLink>
      ))}
    </div>

    <div className="level-right ml-4">
      <SearchLink
        data-cy="centuryALL"
        className="button is-success is-outlined"
        params={{ centuries: null }}
      >
        All
      </SearchLink>
    </div>
  </div>
);

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sexFilter = searchParams.get('sex');
  const centuriesFilter = searchParams.getAll('centuries');
  const query = searchParams.get('query') as string;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchParams(getSearchWith(searchParams, {
      query: event.target.value || null,
    }));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter currentSex={sexFilter} />

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            value={query}
            placeholder="Search"
            onChange={handleChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <CenturyFilter currentCenturies={centuriesFilter} />
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
