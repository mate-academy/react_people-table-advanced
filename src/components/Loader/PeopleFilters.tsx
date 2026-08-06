import '../../App.scss';
import cn from 'classnames';

export enum Filter {
  All = 'All',
  Male = 'Male',
  Female = 'Female',
}

interface Props {
  setFilter: (filter: Filter) => void;
  filter: Filter;
  setTitleFilter: (titleFilter: string) => void;
  titleFilter: string;
  century: boolean[];
  setCentury: (century: boolean[]) => void;
}

export const PeopleFilters: React.FC<Props> = ({
  setFilter,
  filter,
  setTitleFilter,
  titleFilter,
  century,
  setCentury,
}) => {
  return (
    <nav className="panel marginneeded">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={cn({ 'is-active': filter === Filter.All })}
          href="#/people"
          onClick={() => setFilter(Filter.All)}
        >
          All
        </a>
        <a
          className={cn({ 'is-active': filter === Filter.Male })}
          href="#/people?sex=m"
          onClick={() => setFilter(Filter.Male)}
        >
          Male
        </a>
        <a
          className={cn({ 'is-active': filter === Filter.Female })}
          href="#/people?sex=f"
          onClick={() => setFilter(Filter.Female)}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={titleFilter}
            onChange={e => setTitleFilter(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <a
              data-cy="century"
              className={cn('button mr-1', { 'is-info': century[0] })}
              href="#/people?centuries=16"
              onClick={() =>
                setCentury(
                  century.map((val, index) => (index === 0 ? !val : val)),
                )
              }
            >
              16
            </a>

            <a
              data-cy="century"
              className={cn('button mr-1', { 'is-info': century[1] })}
              href="#/people?centuries=17"
              onClick={() =>
                setCentury(
                  century.map((val, index) => (index === 1 ? !val : val)),
                )
              }
            >
              17
            </a>

            <a
              data-cy="century"
              className={cn('button mr-1', { 'is-info': century[2] })}
              href="#/people?centuries=18"
              onClick={() =>
                setCentury(
                  century.map((val, index) => (index === 2 ? !val : val)),
                )
              }
            >
              18
            </a>

            <a
              data-cy="century"
              className={cn('button mr-1', { 'is-info': century[3] })}
              href="#/people?centuries=19"
              onClick={() =>
                setCentury(
                  century.map((val, index) => (index === 3 ? !val : val)),
                )
              }
            >
              19
            </a>

            <a
              data-cy="century"
              className={cn('button mr-1', { 'is-info': century[4] })}
              href="#/people?centuries=20"
              onClick={() =>
                setCentury(
                  century.map((val, index) => (index === 4 ? !val : val)),
                )
              }
            >
              20
            </a>
          </div>

          <div
            className={cn('level-right', {
              'ml-4':
                century[0] === true ||
                century[1] === true ||
                century[2] === true ||
                century[3] === true ||
                century[4] === true,
            })}
          >
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={() => setCentury(century.map(() => false))}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={() => {
            setCentury(century.map(() => false));
            setTitleFilter('');
            setFilter(Filter.All);
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
