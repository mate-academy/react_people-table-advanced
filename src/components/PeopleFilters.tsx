import { Person } from '../types';
import classNames from 'classnames';
import {
  getSaveSearchParams,
  searchParamsSetSex,
  searchQueryParams,
} from '../utils/utilsPeopleFilters';
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useEffect } from 'react';

type Props = {
  setPeoplesList: (Set: Person[] | null) => void;
  initialList: Person[] | null;
};

export const PeopleFilters: React.FC<Props> = ({
  initialList,
  setPeoplesList,
}) => {
  const [searchParams] = useSearchParams();
  const { search } = useLocation();
  const navigate = useNavigate();

  const ass = searchParams.toString();

  useEffect(() => {
    if (!initialList) {
      return;
    }

    const centuriesValues = searchParams.getAll('centuries');
    const newPeoplesList: Person[] = [];

    initialList.forEach(person => {
      const century = Math.ceil(person.born / 100);

      if (centuriesValues.includes(century.toString())) {
        newPeoplesList.push(person);
      }
    });

    setPeoplesList(newPeoplesList.length === 0 ? initialList : newPeoplesList);
  }, [ass, initialList]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          className={({ isActive }) =>
            isActive && search === '' ? 'is-active' : ''
          }
          to="/people"
        >
          All
        </NavLink>
        <Link
          className={classNames({
            'is-active': searchQueryParams(searchParams, 'sex', 'm'),
          })}
          to={{ search: searchParamsSetSex(searchParams, 'sex', 'm') }}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': searchQueryParams(searchParams, 'sex', 'f'),
          })}
          to={{ search: searchParamsSetSex(searchParams, 'sex', 'f') }}
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
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(item => {
              const isActive = searchQueryParams(
                searchParams,
                'centuries',
                item,
              );
              const newSearch = getSaveSearchParams(
                searchParams,
                'centuries',
                item,
              );

              return (
                <button
                  key={item + 3}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': isActive,
                  })}
                  onClick={() => navigate({ search: newSearch })}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="/people"
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
