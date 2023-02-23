import classNames from 'classnames';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

type Props = {
  urlSlug: string | undefined;
  searchParams: URLSearchParams;
  setSearchParams: (value: string) => void;
};

type FilterGender = 'all' | 'f' | 'm';

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
}) => {
  const [filterByGender, setFilterByGender] = useState<FilterGender>('all');
  const location = useLocation().pathname;

  const setFilterGender = (sex: FilterGender) => {
    setSearchParams(`?sex=${sex}`);
    setFilterByGender(sex);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({
            'is-active': filterByGender === 'all',
          })}
          href={`#${location}`}
          onClick={() => setFilterGender('all')}
        >
          All
        </a>
        <a
          className={classNames({
            'is-active': filterByGender === 'm',
          })}
          href={`#${location}?${searchParams}`}
          onClick={() => setFilterGender('m')}
        >
          Male
        </a>
        <a
          className={classNames({
            'is-active': filterByGender === 'f',
          })}
          href={`#${location}?${searchParams}`}
          onClick={() => setFilterGender('f')}
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
              className="button mr-1"
              href="#/people?centuries=16"
            >
              16
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=17"
            >
              17
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=18"
            >
              18
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=19"
            >
              19
            </a>

            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=20"
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
